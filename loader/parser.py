import string
from bs4 import BeautifulSoup
import os.path

SECTOR = 'sector'
SECTOR_COUNT = 'sector_count'
COMPANY_ID = 'id'
COMPANY_NAME = 'company'
CURRENCY = 'currency'
YEAR_MIN = 'year_min'
YEAR_MAX = 'year_max'

dir_pattern = (SECTOR,SECTOR_COUNT)
file_pattern = (COMPANY_ID,COMPANY_NAME,CURRENCY,YEAR_MIN,YEAR_MAX)

allow_years = range(1996,2018)
allow_units = {'R':['руб.','руб./т.','руб./кВт/ч.','руб./кВт', 'шт.','%','ед.','куб. м.','т.','Гкал','кВт/ч','кВт','чел.'],
               'U':['$','$/т.','$/кВт/ч.','$/кВт','шт.','%','ед.','куб. м.','т.','Гкал','кВт/ч','кВт','чел.']}
allow_quantities  = ['тыс.','млн.','млрд.'] #,
allow_rows_count = 118



def check_company(company):
    assert company and len(company)>2,'Неверное название компании "{0}"'.format(company)
    return company

def check_currency(currency):
    assert currency in allow_units,'Недопустимый код валюты "{0}"'.format(currency)
    return currency

def check_years(year_min,year_max):
    assert year_min.isdigit(),'Неверный начальный год "{0}"'.format(year_min)
    assert int(year_min) in allow_years,'Недопустимое значение начального года "{0}"'.format(year_min)

    assert year_max.isdigit(),'Неверный конечный год "{0}"'.format(year_max)
    assert int(year_max) in allow_years,'Недопустимое значение конечного года "{0}"'.format(year_max)
    assert int(year_min) < int(year_max),'Начальный год "{0}" больше конечного "{1}"'.format(year_min,year_max)
    return int(year_max)-int(year_min)+1

# Парсинг имени файла (Строительство/44331_Галс-Девелопмент_R_2003_2016.xls)
def parse_name(path):

    paths = os.path.split(path)
    assert paths[1],'Неверный путь файла "{0}"'.format(paths[1])

    file_name, file_extension = os.path.splitext(paths[1])

    assert file_name and len(file_name)>3,'Неверное название файла "{0}"'.format(path)

    name_parts = file_name.split('_')
    assert len(name_parts)==len(file_pattern),'Неверное количество частей в файле "{0}", необходимо {1}'.format(file_name,len(file_pattern))

    if paths[0]:
        sector_parts = paths[0].split('_')
        assert len(sector_parts)==len(dir_pattern),'Неверное количество частей в директории "{0}", необходимо {1}'.format(paths[0],len(dir_pattern))
    else:
        sector_parts = None

    data = {
        COMPANY_ID: name_parts[file_pattern.index(COMPANY_ID)],
        COMPANY_NAME: name_parts[file_pattern.index(COMPANY_NAME)],
        CURRENCY: name_parts[file_pattern.index(CURRENCY)],
        YEAR_MIN: name_parts[file_pattern.index(YEAR_MIN)],
        YEAR_MAX: name_parts[file_pattern.index(YEAR_MAX)],
        SECTOR: sector_parts[dir_pattern.index(SECTOR)] if sector_parts else '',
        SECTOR_COUNT: sector_parts[dir_pattern.index(SECTOR_COUNT)] if sector_parts else ''
        }

    if paths[0]:
        sector_parts = paths[0].split('_')
        assert len(sector_parts)==len(dir_pattern),'Неверное количество частей в директории "{0}", необходимо {1}'.format(paths[0],len(dir_pattern))



    print('>  ', data)

    assert data[COMPANY_ID].isdigit(),'Неверный идентификатор компании "{0}"'.format(data[COMPANY_ID])
    check_company(data[COMPANY_NAME])
    check_currency(data[CURRENCY])
    check_years(data[YEAR_MIN],data[YEAR_MAX])
    return data



# Парсинг содержимого файла
def read_data(file,company_name,currency,year_min,year_max):
    print('{0}:{1},{2}-{3}'.format(company_name,currency,year_min,year_max))
    data=[]

    check_company(company_name)
    check_currency(currency)
    years_count = check_years(year_min,year_max)
    print(year_min,'-',year_max,'за',years_count,'лет')

    with open(file) as file_object:
        html_string = file_object.read()

        soup = BeautifulSoup(html_string, 'lxml')
        table = soup.find_all('table')[0]

        rows = table.find_all('tr')
        assert len(rows)==allow_rows_count,'Неверное количество строк в таблице "{0}"'.format(len(rows))

        company = rows[0].find_all('td')[0].get_text().strip()
        print('Company:'+company_name)
        assert company == company_name,'Несоответствие названии компании "{0}" параметру'.format(company)

        years = [th.get_text().strip() for th in rows[1].find_all('th')[1:]]

        if len(years) > years_count:
            assert len(years) == years_count,'Неверное количество колонок с годами "{0}",должно быть "{1}" c {2} по {3}'.format(len(years),years_count,year_min,year_max)
        elif len(years) < years_count:
            print('Неверное количество колонок с годами "{0}",должно быть "{1}" c {2} по {3}'.format(len(years),years_count,year_min,year_max))
            years_count = len(years)

        assert str(year_min) in years[0],'Неверный начальный год "{0}"'.format(years[0])
        assert str(year_max) in years[-1],'Неверный конечный год "{0}"'.format(years[-1])

        for row in rows[2:]:
            columns = row.find_all('td')
            title = [part.strip() for part in columns[0].get_text().replace('\n','').strip().split(',',5)]
            assert not len(title)>3,'Неверное строка параметра "{0}"'.format(title)

            name = title[0]

            unit = title[2] if len(title)>2 else title[1] if len(title)>1 else ''
            assert not unit or unit in allow_units[currency],'Не допустимое значение единицы измерения "{0}" в строке "{1}"'.format(unit,name)

            quantity = title[1] if len(title)>2 else ''
            assert not quantity or quantity in allow_quantities,'Не допустимое значение количества "{0}" в строке "{1}"'.format(quantity,name)
            assert unit if quantity else True,'Отсутсвуте единица измерения "{0}" при существующем количестве "{1}" в строке "{2}"'.format(unit,quantity,name)

            values = [column.get_text().strip() for column in columns[1:]]
            assert len(values)==years_count,'Число значений "{0}" не соответствует числу лет "{1}" в строке "{2}"'.format(len(values),years_count,name)

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
