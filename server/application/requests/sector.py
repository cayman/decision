from flask import jsonify, request
from application import app, db

from application.models.sector import Sector

from application.dto.sector import SectorDTO
from application.dto.company import CompanyDTO, CompanyLinkDTO



@app.route('/api/sectors',methods=['GET'])
def get_sectors():
    #sql
    _sectors  = Sector.query.all()
    sectors =  SectorDTO.create_list(_sectors)
    return jsonify([sector.json() for sector in sectors])

