def upload_data(connection, code, data):

    cursor = connection.cursor()


    'company,name':name,
    'unit':unit,
    'quantity':quantity,
    'year':years[i],
    'value':values[i]


        for line in data:
            year=2000;
            cursor.execute("""SELECT name FROM raw_indicator
                    WHERE name=%s AND quantity=%s AND unit=%s """,(line['name'],line['quantity'],line['unit']))

            if(len(cursor.fetchall())==0):
                cursor.execute("""INSERT INTO raw_indicator
                        VALUES (%s,%s,%s,%s)""",(line['name'],line['quantity'],line['unit'],''))
                print('Inserted indicator '+ line['name']+' ('+line['quantity']+','+line['unit']+')')

            for key,value in line['values'].items():
                cursor.execute("""INSERT INTO raw_data
                        VALUES (%s,%s,%s,%s,%s,%s)""",(code,line['name'],line['unit'],line['quantity'],value))
                year +=1

            print('Inserted data for '+ line['name']+' ('+line['quantity']+','+line['unit']+')')

    connection.commit()