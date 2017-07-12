def upload_data(connection, companies):

    cursor = connection.cursor()

    for company in companies:

        company


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

    connection.commit()