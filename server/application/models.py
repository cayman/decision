from application import db

class Sector(db.Model):
    __tablename__ = 'fa_sector'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return '<Sector %r:%r>' % (self.id,self.name)

class Company(db.Model):
    __tablename__ = 'fa_company'

    id = db.Column(db.Integer, primary_key=True)
    hidden = db.Column(db.Integer)
    foreign = db.Column(db.Integer)
    name = db.Column(db.String(256))
    sector_id = db.Column(db.Integer, db.ForeignKey('fa_sector.id'))
    sector = db.relationship('Sector', lazy='joined')

    links = db.relationship('CompanyLink', lazy='joined')

    def __init__(self, id, name, sector):
        self.id = id
        self.name = name
        self.sector = sector

    def __repr__(self):
        return '<Company %r:%r>' % (self.id,self.name)

class CompanyLink(db.Model):
    __tablename__ = 'fa_company_link'

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('fa_link.id'), primary_key=True)
    link = db.relationship('Link',lazy='joined')
    id = db.Column(db.Integer)

    def __init__(self, company_id, link_id, id):
        self.company_id = company_id
        self.link_id = link_id
        self.id = id

    def __repr__(self):
        return '<CompanyLink %r:%r = %r>' % (self.company_id, self.link_id, self.id)


class Link(db.Model):
    __tablename__ = 'fa_link'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    icon = db.Column(db.String(16))
    url = db.Column(db.String(128))
    company_url = db.Column(db.String(128))
    search_url = db.Column(db.String(128))
    instrument_url = db.Column(db.String(128))

    def __init__(self, id, name, url, company_url):
        self.id = id
        self.name = name
        self.url = url
        self.company_url = company_url

    def __repr__(self):
        return '<Link %r:%r>' % (self.id, self.name)

class Value(db.Model):
    __tablename__ = 'fa_value'

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'), primary_key=True)
    company = db.relationship('Company',lazy='joined')
    year = db.Column(db.Integer, primary_key=True)
    currency = db.Column(db.Integer, primary_key=True)
    indicator_id = db.Column(db.Integer, db.ForeignKey('fa_indicator.id'), primary_key=True)
    indicator = db.relationship('Indicator',lazy='joined')
    value = db.Column(db.String(32))

    def __init__(self, company, year, currency, indicator, value):
        self.company = company
        self.year = year
        self.currency = currency
        self.indicator = indicator
        self.value = value

    def __repr__(self):
        return '<Year%r:%r for %r >' % (self.year, self.value, self.indicator)


class Indicator(db.Model):
    __tablename__ = 'fa_indicator'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    unit = db.Column(db.String(16))
    unit2 = db.Column(db.String(16))
    quantity = db.Column(db.String(8))


    def __init__(self, id, name, unit, unit2, quantity):
        self.id = id
        self.name = name
        self.unit = unit
        self.unit2 = unit2
        self.quantity = quantity

    def __repr__(self):
        return '<Indicator %r:%r>' % (self.id,self.name)


class InstrumentType(db.Model):
    __tablename__ = 'fa_instrument_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    short = db.Column(db.String(8))

    def __repr__(self):
        return '<InstrumentType %r:%r >' % (self.id, self.name)

class Instrument(db.Model):
    __tablename__ = 'fa_instrument'
    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('fa_instrument_type.id'))
    type = db.relationship('InstrumentType',lazy='joined')

    company_id = db.Column(db.Integer, db.ForeignKey('fa_company.id'))
    code = db.Column(db.String(8))

    links = db.relationship('InstrumentLink', lazy='joined')

    def __init__(self, type, company_id, code):
        self.type = type
        self.company_id = company_id
        self.code = code

    def __repr__(self):
        return '<Instrument %r:%r for %r>' % (self.type_id,self.code, self.company_id)


class InstrumentLink(db.Model):
    __tablename__ = 'fa_instrument_link'

    instrument_id = db.Column(db.Integer, db.ForeignKey('fa_instrument.id'), primary_key=True)

    link_id = db.Column(db.Integer, db.ForeignKey('fa_link.id'), primary_key=True)
    link = db.relationship('Link',lazy='joined')
    id = db.Column(db.Integer)

    def __init__(self, instrument_id, link, id):
        self.instrument_id = instrument_id
        self.link = link
        self.id = id

    def __repr__(self):
        return '<InstrumentLink %r:%r>' % (self.company.id, self.id)