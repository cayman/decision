#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from flask import Flask, jsonify, request
from flaskext.mysql import MySQL

import mysql.connector.pooling
import dto

app = Flask(__name__)

config = SafeConfigParser()
config.read('config.ini')
print(config.sections())

db_config = config['dev.db']

conn = mysql.connector.connect(pool_name = "mypool",
                      pool_size = 6, connection_timeout=1200,
                      **db_config)

@app.route('/')
def index():
    return "Hello, World!"
    
@app.route('/api/companies',methods=['GET'])    
def get_company_indicators():
	conn = mysql.connector.connect(pool_name="mypool")
	cursor = conn.cursor()
	cursor.execute('SELECT name,unit,period,value FROM raw_data')
	indicators=()
	for item in cursor.fetchall():
		if not item[0] in indicators:
			indicators[item[0]] = dto.Indicator(item[0],item[1])
		indicators[item[0]].add(item[2],item[3])

	#print(indicators)
	return jsonify({'items':[value.full() for key, value in indicators.items()]})


if __name__ == '__main__':
	app.run(debug=True)
