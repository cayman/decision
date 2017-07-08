from bs4 import BeautifulSoup
import string
import sqlite3
import mysql.connector

with open('/media/sf_downloads/Export.xls') as file_object:
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

		
	#conn = sqlite3.connect('company_'+company+'.sqlite')
	conn = mysql.connector.connect(user='u2262s8598_fa', password='',
                              host='mysql1.justhost.ru',
                              database='u2262s8598_fa')
	cursor = conn.cursor()

	cursor.execute("""
			CREATE TABLE IF NOT EXISTS raw_data(
			company        CHAR(50)    NOT NULL,
			period         CHAR(50)    NOT NULL,
			name           CHAR(50)    NOT NULL,		
			quantity	   CHAR(50),
			unit		   CHAR(50),
			value          CHAR(50))""")
	
	for line in data:
		year=2000;
		for value in line['values']:
			cursor.execute("""INSERT INTO raw_data
				VALUES (?,?,?,?,?,?)""",(company,str(year),line['name'],line['quantity'],line['unit'],value))
			year +=1
				
	conn.commit()
				
	cursor.execute("""SELECT * FROM raw_data""")
	
	for line in cursor.fetchall()[1:1000]:
		print(line)

	conn.close()
    
