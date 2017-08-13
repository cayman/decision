import string
from configparser import SafeConfigParser 
import parser
import glob, os
import mysql.connector

config = SafeConfigParser()
config.read('config.ini')

xsl_config = config['dev.xsl']
db_config = config['dev.db']

os.chdir(xsl_config['files'])
sectors={}
sector_id = 0
companies = []
indicators_index = []
indicators = {}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()
    
file_num = 0
for file in glob.glob("*/*.xls")[0:4]:
    file_num +=1
    print('=>',file)    
    name = parser.parse_name(file)

    if name[parser.SECTOR] not in sectors:
        sector_id += 1
        sectore = { 'id':sector_id, 'name':name[parser.SECTOR] ,'companies':int(name[parser.SECTOR_COUNT]),'files':1};
        sectors[name[parser.SECTOR]] = sectore
        cursor.execute("""INSERT INTO fa_sector
            VALUES (%s,%s)""",(sector_id,name[parser.SECTOR]))
    else:
        sectore = sectors[name[parser.SECTOR]]
        sectore['files'] +=1
    
    #print(name)   
    data = parser.read_data(os.path.join(xsl_config['files'],file),
        name[parser.COMPANY_NAME],name[parser.CURRENCY],name[parser.YEAR_MIN],name[parser.YEAR_MAX])
        
    company = {'file':file,'id':name[parser.COMPANY_ID],'name':name[parser.COMPANY_NAME], 
        'sector_id': sectore['id'], 'sector_name':sectore['name'],'count':name[parser.SECTOR_COUNT],'data':data}
     
    if company['name'] not in companies:
        companies.append(company['name']) 
        cursor.execute("""INSERT INTO fa_company
            VALUES (%s,%s,%s)""",(company['id'],company['name'],sectore['id']))   
           
    indicator_id=0    
    for line in data:
        if line['name'] not in indicators:
            indicator_id += 1
            indicator = ({'id':indicator_id, 'name':line['name'],'units':[line['unit']],'quantities':[line['quantity']]})
            indicators[line['name']] = indicator
            indicators_index.append(indicator)
        else:
            indicator = indicators[line['name']];
            if line['unit'] not in indicator['units']:
               indicator['units'].append(line['unit'])
            if line['quantity'] not in indicator['quantities']:
               indicator['quantities'].append(line['quantity'])
            
        if line['value']:
            cursor.execute("""INSERT INTO fa_value
                VALUES (%s,%s,%s,%s,%s)""",(company['id'],indicator['id'],
                1 if name[parser.CURRENCY] == 'R' else 2,
                line['year'],line['value']))         

for indicator in indicators_index: 
    
    assert len(indicator['quantities'])==1,'Неверное количество quantities'.format(indicator['quantities']) 
        
    assert len(indicator['units'])>0 and len(indicator['units'])<=2,'Неверное количество units'.format(indicator['units']) 
    
    unit1 = indicator['units'][0];
    unit2 = indicator['units'][1] if len(indicator['units'])>1 else '';
    quantity = indicator['quantities'][0];
    
    cursor.execute("""INSERT INTO fa_indicator
            VALUES (%s,%s,%s,%s,%s)""",(indicator['id'],indicator['name'],
            unit1 if len(unit1)>0 else None,
            unit2 if len(unit2)>0 else None, 
            quantity if len(quantity)>0 else None))

#for sector_name,sector in sectors.items(): 
#    print(sector_name,sector)
#    assert sector['companies']*2==sector['files'],'Неверное количество файлов {0} в каталоге сектора {1}'.format(sector['files'],sector_name)

           
    

#for key,value in units.items():
    #if len(value)>1 and list(value)[0]!='руб.' and list(value)[1]!='$':
#        print(key,value)
        


            
conn.commit()
