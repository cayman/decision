from application import db

class Link(db.Model):
    __tablename__ = 'fa_link'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    icon = db.Column(db.String(16))
    url = db.Column(db.String(128))
    search_url = db.Column(db.String(128))
    company_url = db.Column(db.String(128))
    instrument_url = db.Column(db.String(128))

    def __init__(self, id, name, icon, url, search_url, company_url, instrument_url):
        self.id = id
        self.name = name
        self.icon = icon
        self.url = url
        self.search_url = search_url
        self.company_url = company_url
        self.instrument_url = instrument_url

    def __repr__(self):
        return '<Link %r:%r>' % (self.id, self.name)
