import string
from bs4 import BeautifulSoup

units = ['$','$/т.','$/кВт/ч.','$/кВт',
         'руб.','руб./т.','руб./кВт/ч.','руб./кВт',
         'шт.','%','ед.','куб. м.','т.','Гкал','кВт/ч','кВт','чел.']
quantities  = ['тыс.','млн.','млрд.']
ruble = 'руб'
dollar = '$'
rows_count = 118

def read_data(file,company_name,currency,year_min,year_max):
    print('{0}:{1},{2}-{3}'.format(company_name,currency,year_min,year_max))
    data=[]
    assert currency in ['R','U'],'Неверный параметр валюты "{0}"'.format(currency)
    other_currency = dollar if currency == 'R' else ruble

    with open(file) as file_object:
        html_string = file_object.read()

        soup = BeautifulSoup(html_string, 'lxml')
        table = soup.find_all('table')[0]

        rows = table.find_all('tr')
        assert len(rows)==rows_count,'Неверное количество строк в таблице "{0}"'.format(len(rows))

        company = rows[0].find_all('td')[0].get_text().strip()
        print('Company:'+company_name)
        assert company == company_name,'Несоответствие названии компании "{0}"'.format(company)

        years = [th.get_text().strip() for th in rows[1].find_all('th')[1:]]
        years_count = len(years)
        assert years_count>1,'Мало колонок с годами "{0}"'.format(years_count)
        assert year_min in years[0],'Неверный начальный год "{0}"'.format(years[0])
        assert year_max in years[-1],'Неверный конечный год "{0}"'.format(years[-1])

        for row in rows[2:]:
            columns = row.find_all('td')
            title = [part.strip() for part in columns[0].get_text().replace('\n','').strip().split(',',5)]
            assert not len(title)>3,'Неверное строка параметра "{0}"'.format(title)

            name = title[0]

            unit = title[2] if len(title)>2 else title[1] if len(title)>1 else ''
            assert not unit or unit in units,'Не допустимое значение единицы измерения "{0}" в строке "{1}"'.format(quantity,name)
            assert other_currency not in unit,'Недопустимое использование "{0}":единица измерения "{1}" в строке "{2}"'.format(other_currency,unit,name)

            quantity = title[1] if len(title)>2 else ''
            assert not quantity or quantity in quantities,'Не допустимое значение количества "{0}" в строке "{1}"'.format(quantity,name)

            values = [column.get_text().strip() for column in columns[1:]]
            assert len(values)==years_count,'Число значений "{0}" не соответствует числу лет "{1}" для параметра "{2}"'.format(len(values),years_count,name)

            for i in range(0,years_count):
                data.append({
                    'company':company,
                    'name':name,
                    'unit':unit,
                    'quantity':quantity,
                    'year':years[i],
                    'value':values[i]
                })

    return data