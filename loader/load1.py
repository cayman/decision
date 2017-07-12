import string
import parser
dir = '/media/sf_cloud/Инвестиции/Export/Пищевая промышленность/'
file = '157_Красный Октябрь_U_1996_2016'
ext = '.xls'
part = file.split('_')

data = parser.read_data(dir+file+ext,part[1],part[2],part[3],part[4])
names = {}
units = []
for line in data[0:400]:
	print(('{name}: ' + ('{unit}' if line['unit'] else '') + ('({quantity})' if line['quantity'] else '')
           + ': {year} = {value}').format(**line))
	if line['name'] not in names:
		names[line['name']]='{0}{1}'.format(line['unit'],'('+line['quantity']+')' if line['quantity'] else '')
	if line['unit'] and line['unit'] not in units:
		units.append(line['unit'])

print('Параметры:')
for name,unit in names.items():
	print('{0}: {1}'.format(name,unit))
	
print('Единицы измерения:')
for unit in units:
		print('{0}'.format(unit))
