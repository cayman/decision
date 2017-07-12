def create_tables(connection):

    cursor = connection.cursor()

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

    connection.commit()