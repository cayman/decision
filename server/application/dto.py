def sorted_dict(dictionary):
    keys = dictionary.keys()
    return [dictionary[key] for key in sorted(keys)]

class IndicatorDTO:
    def __init__(self, indicator_row, currency):
        self.years = {}
        self.id = indicator_row.id
        self.name = indicator_row.name
        self.unit = indicator_row.unit2 if indicator_row.unit2 and currency == 2 else indicator_row.unit
        self.digit = True

    def add(self, year, value):
        try:
            self.years[year] = float(value.replace(',', '.').replace(' ', '')) if(self.digit) else value
        except ValueError:
            print('error',value)
            self.digit = False
            self.years[year] = value

    def __repr__(self):
        return '<Indicator %r:%r - %r>' % (self.id,self.name,self.years)

class CompanyDTO:
    def __init__(self, company_row, sector_row):
        self.__indicators = {}
        self.id = company_row.id
        self.name = company_row.name
        self.sector_id = sector_row.id
        self.sector = sector_row.name

    def add_indicator(self, indicator_row, value_row):
        if indicator_row.id not in self.__indicators:
            self.__indicators[indicator_row.id] = IndicatorDTO(indicator_row,value_row.currency)
        self.__indicators[indicator_row.id].add(value_row.year, value_row.value)

    @property
    def indicators(self):
        return sorted_dict(self.__indicators)

    def __repr__(self):
        return '<CompanyDTO %r:%r>' % (self.id,self.name)

class SectorDTO:
    def __init__(self, sector_row):
        self.__companies = {}
        self.id = sector_row.id
        self.name = sector_row.name

    def add_company(self, company):
        if company.id not in self.__companies:
            self.__companies[company.id] = company

    def count(self):
        return len(self.__companies)

    def companies(self):
        return sorted_dict(self.__companies)

    def __repr__(self):
        return '<SectorDTO %r:%r>' % (self.id,self.name)