from flask import jsonify, request
from application import app, db

from application.dto.link import LinkDTO
from application.models.link import  Link


@app.route('/api/links',methods=['GET'])
def get_links():
    #sql
    _links  = Link.query.all()
    #dto
    links  = LinkDTO.create_list(_links)

    return jsonify([link.json() for link in links])

@app.route('/api/links',methods=['POST'])
def create_links():

    link = LinkDTO(json=request.get_json())
    print(link)
    assert link.id>0,'wrong link.id'

    #sql
    db.session.add(link.model())
    db.session.commit()

    _link = Link.query.get(link.id)

    #dto
    link = LinkDTO(_link)

    return jsonify(link.json())

@app.route('/api/links/<int:link_id>',methods=['POST'])
def update_links(link_id):

    link = LinkDTO(json=request.get_json())
    print(link)
    assert link_id==link.id,'wrong link_id'

    #sql
    db.session.update(link.model())
    db.session.commit()

    _link = Link.query.get(link.id)

    #dto
    link = LinkDTO(_link)

    return jsonify(link.json())

