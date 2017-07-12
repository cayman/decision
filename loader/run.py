from configparser import SafeConfigParser
import string
import mysql.connector


config = SafeConfigParser()
config.read('config.ini')
print(config.sections())

xsl_config = config['dev.xsl']
db_config = config['dev.db']
print(xsl_config)

with open(xsl_config['file']) as file_object:
	html_string = file_object.read()
    
	soup = BeautifulSoup(html_string, 'lxml')
	table = soup.find_all('table')[0]
	data=[]

	rows = table.find_all('tr')
		
	company = rows[0].find_all('td')[0].get_text().strip()
	print('Company:'+company)	
		
	for row in rows[2:]:
		columns = row.find_all('td')			
		title = [part.strip() for part in columns[0].get_text().replace('\n','').strip().split(',',3)]
		
		data.append({
			'name':title[0],
			'quantity':title[1] if len(title)>2 else '',
			'unit':title[2] if len(title)>2 else title[1] if len(title)>1 else '',
			'title':title,
			'values':[col.get_text().strip() for col in columns[1:]]
			})

		
	conn = mysql.connector.connect(**db_config)
	cursor = conn.cursor()
	
	cursor.execute("""
			CREATE TABLE IF NOT EXISTS raw_indicator(
			name           CHAR(50)    NOT NULL,
			quantity	   CHAR(50),
			unit		   CHAR(50),
			category       CHAR(50)) ENGINE=InnoDB DEFAULT CHARSET=utf8""")

	cursor.execute("""
			CREATE TABLE IF NOT EXISTS raw_data(
			company        CHAR(50)    NOT NULL,
			period         CHAR(50)    NOT NULL,
			name           CHAR(50)    NOT NULL,		
			quantity	   CHAR(50),
			unit		   CHAR(50),
			value          CHAR(50)) ENGINE=InnoDB DEFAULT CHARSET=utf8""")
	
	for line in data:
		year=2000;
		cursor.execute("""SELECT name FROM raw_indicator 
			WHERE name=%s AND quantity=%s AND unit=%s """,(line['name'],line['quantity'],line['unit']))
			
		if(len(cursor.fetchall())==0):
			cursor.execute("""INSERT INTO raw_indicator
				VALUES (%s,%s,%s,%s)""",(line['name'],line['quantity'],line['unit'],''))
			print('Inserted indicator '+ line['name']+' ('+line['quantity']+','+line['unit']+')')

		for value in line['values']:
			cursor.execute("""INSERT INTO raw_data
				VALUES (%s,%s,%s,%s,%s,%s)""",(company,str(year),line['name'],line['quantity'],line['unit'],value))
			year +=1
		print('Inserted data for '+ line['name']+' ('+line['quantity']+','+line['unit']+')')
				
	conn.commit()
				
	cursor.execute("""SELECT * FROM raw_data""")
	
	for line in cursor.fetchall()[1:1000]:
		print(line)

	conn.close()
    
