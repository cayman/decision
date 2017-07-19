import string
from configparser import SafeConfigParser 
import parser
import glob, os

config = SafeConfigParser()
config.read('config.ini')

xsl_config = config['dev.xsl']
db_config = config['dev.db']

os.chdir(xsl_config['files'])
sectors={}
units = {}

for file in glob.glob("*/*.xls"):
    print('=>',file)    
    name = parser.parse_name(file)

    if name[parser.SECTOR] not in sectors:
        sectors[name[parser.SECTOR]] = {'companies':int(name[parser.SECTOR_COUNT]),'files':1}
    else:
        sectors[name[parser.SECTOR]]['files'] +=1
    
    #print(name)   
    data = parser.read_data(os.path.join(xsl_config['files'],file),
        name[parser.COMPANY_NAME],name[parser.CURRENCY],name[parser.YEAR_MIN],name[parser.YEAR_MAX])
        
    company = {'file':file,'sector':name[parser.SECTOR],'count':name[parser.SECTOR_COUNT],'data':data}



    for line in data:
            if line['name'] not in units:
                units[line['name']] = {line['unit']}
            else:
                units[line['name']].add(line['unit'])


for key,value in sectors.items(): 
    print(key,value)
    assert value['companies']*2==value['files'],'Неверное количество файлов {0} в каталоге сектора {1}'.format(value['files'],key)

for key,value in units.items():
    if len(value)>1 and list(value)[0]!='руб.' and list(value)[1]!='$':
        print(key,value)
        
                      

