def get_floaf(value):
    return float(value.replace(',', '.').replace(' ', ''))

class IndicatorDTO:
    def __init__(self, indicator_row, currency):
        self.years = {}
        self.__weight = 0
        self.id = indicator_row.id
        self.name = indicator_row.name
        self.unit = indicator_row.unit2 if indicator_row.unit2 and currency == 2 else indicator_row.unit
        self.quantity = indicator_row.quantity
        self.digit = True

    #Добавляем новое значение индикатора
    def add(self, year, value):
        try:
            if self.digit:
                _value = get_floaf(value)

                if _value>0:
                    self.__weight += 1
                elif _value<0:
                    self.__weight -= len(self.years) if len(self.years)>2 else 3

                self.years[year] = _value
            else:
                self.years[year] = value

        except ValueError:
            print('error',value)
            self.digit = False
            self.years[year] = value

    #Вес индикатора
    @property
    def weight(self):
        return self.__weight

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'unit':self.unit,
            'quantity':self.quantity,
            'digit':self.digit,
            'years':self.years,
            'weight':self.weight,
        }

    def __repr__(self):
        return '<Indicator %r:%r - %r>' % (self.id,self.name,self.years)


class LinkDTO:
    def __init__(self, link_rows, url, param):
        self.__indicators = {}
        self.__years = set()
        self.id = link_rows.id
        self.icon = link_rows.icon
        self.name = link_rows.name
        self.url = url
        self.search = link_rows.search_url
        self.param = param

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'icon':self.icon,
            'url':self.url,
            'search':self.search,
            'param':self.param,
        }

    def __repr__(self):
        return '<LinkDTO %r:%r>' % (self.id,self.url)

class CompanyDTO:
    def __init__(self, company_row, sector_row):
        self.__years = set()
        self.id = company_row.id
        self.name = company_row.name
        self.sector_id = sector_row.id
        self.sector_name = sector_row.name
        self.__indicators = {}
        self.__links = []

    #Добавляем новое значение индикатора
    def add_indicator(self, indicator_row, value_row):
        if indicator_row.id not in self.__indicators:
            #Саоздает объект Индикатора
            self.__indicators[indicator_row.id] = IndicatorDTO(indicator_row,value_row.currency)
        #Добавляем год в индикатор
        self.__indicators[indicator_row.id].add(value_row.year, value_row.value)
        self.__years.add(value_row.year)

    #Добавляем новое значение индикатора
    def add_links(self, company_link_rows):
        self.__links = [LinkDTO(cl.link, cl.link.company_url, cl.id ) for cl in company_link_rows]

    #Упорядоченный список лет
    @property
    def years(self):
        return sorted(self.__years)

    @property
    def links(self):
        return self.__links

    #Упорядоченный по ключу список индикаторов
    @property
    def indicators(self):
        return [self.__indicators[key] for key in sorted(self.__indicators.keys())]

    #Вес компании
    @property
    def weight(self):
        return sum([indicator.weight for indicator in self.__indicators.values()])/len(self.__indicators)

    def json(self):
        return {
            'id':self.id,
            'name':self.name,
            'sector_id':self.sector_id,
            'sector_name':self.sector_name,
            'links':[link.json() for link in self.__links],
            'years':self.years,
            'indicators':[indicator.json() for indicator in self.indicators],
            'weight':self.weight,
        }

    def __repr__(self):
        return '<CompanyDTO %r:%r>' % (self.id,self.name)



class SectorDTO:
    def __init__(self, sector_row):
        self.__companies = {}
        self.id = sector_row.id
        self.name = sector_row.name

    #Добавляем новую команию
    def add_company(self, company):
        if company.id not in self.__companies:
            self.__companies[company.id] = company

    def count(self):
        return len(self.__companies)

    #Упорядоченный по весу список компаний
    @property
    def companies(self):
        return sorted(self.__companies.values(),key=lambda company: company.weight,reverse=True)

    def __repr__(self):
        return '<SectorDTO %r:%r>' % (self.id,self.name)