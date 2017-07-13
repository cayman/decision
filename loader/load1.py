import string
import parser
dir = '/media/sf_cloud/Инвестиции/Export/'
file = 'Пищевая промышленность_6/157_Красный Октябрь_U_1996_2016.xls'

print('=>',file)    
name = parser.parse_name(file)

data = parser.read_data(dir+file,name[parser.COMPANY_NAME],name[parser.CURRENCY],name[parser.YEAR_MIN],name[parser.YEAR_MAX])
names = {}
units = []
for line in data:
#print(('{name}: ' + ('{unit}' if line['unit'] else '') + ('({quantity})' if line['quantity'] else '')
#           + ': {year} = {value}').format(**line))
	if line['name'] not in names:
		names[line['name']]='{0}{1}'.format(line['unit'],'('+line['quantity']+')' if line['quantity'] else '')
	if line['unit'] and line['unit'] not in units:
		units.append(line['unit'])

print('Параметры:')
for name,unit in names.items():
	if '(тыс.)' in unit:
		print('{0}: {1}'.format(name,unit))
	
print('Единицы измерения:')
for unit in units:
		print('{0}'.format(unit))
