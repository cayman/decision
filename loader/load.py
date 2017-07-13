import string
import parser
import glob, os

root = '/media/sf_cloud/Инвестиции/Export'
ext = '.xls'
os.chdir(root)
sectors={}

for file in glob.glob("*/*.xls"):
    print('=>',file)    
    name = parser.parse_name(file)

    if name[parser.SECTOR] not in sectors:
        sectors[name[parser.SECTOR]] = {'count':int(name[parser.SECTOR_COUNT]),'items':1}
    else:
        sectors[name[parser.SECTOR]]['items'] +=1
    
    print(name)   
    data = parser.read_data(os.path.join(root,file),
        name[parser.COMPANY_NAME],name[parser.CURRENCY],name[parser.YEAR_MIN],name[parser.YEAR_MAX])
        
    company = {'file':file,'sector':name[parser.SECTOR],'count':name[parser.SECTOR_COUNT],'data':data}    
        
    #for line in data[0:1]:
    #    print(line)

for key,value in sectors.items(): 
    print(key,value)
    assert value['count']*2==value['items'],'Неверное количество файлов {0} в каталоге сектора {1}'.format(value['items'],key)
