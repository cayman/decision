Packages

pip install flask
pip install flask_sqlalchemy


apt-get install python-mysql.connector
or
apt-get install python3-mysql.connector


https://pypi.python.org/pypi/Flask
https://pypi.python.org/pypi/Flask-SQLAlchemy
https://pypi.python.org/pypi/Flask-Assets


sudo gedit /etc/environment
export FDB_HOST=localhost
export FDB_DATABASE=database
export FDB_USER=user
export FDB_PASSWORD=password

CP=>Управление СУБД MySQL
add host xx.xxx.175.18


Виртуальное окружение
sudo pip install virtualenv
virtualenv venv



На хостинге по ssh
wget https://bootstrap.pypa.io/ez_setup.py
python ez_setup.py --user
~/.local/bin/easy_install --user flask
~/.local/bin/easy_install --user configparser

~/.local/bin/easy_install --user SQLAlchemy==1.1.14
~/.local/bin/easy_install --user mysql-connector-python
Installed .local/lib/python2.6/site-packages/mysql_connector_python-8.0.6-py2.6-linux-x86_64.egg

~/.local/bin/easy_install --user Flask-SQLAlchemy
Installed .local/lib/python2.6/site-packages/Flask_SQLAlchemy-2.3.2-py2.6.egg


Библиотеки установятся здесь
/.local/lib/python2.6/site-packages/
