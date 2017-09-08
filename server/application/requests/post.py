#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import jsonify, request
from application import app, db

from application.requests.utils import get_args, ok,created, accepted, assertion_error, server_error, bad_request_error, not_found_error
from application.models.company import Company
from application.models.post import Post
from application.dto.post import PostDTO



#COMPANY_LINKS-------------------

@app.route('/api/posts',methods=['GET'])
def get_posts():
    sector_ids = get_args('sector')
    company_ids = get_args('company')
    app.logger.debug('sectorIds = %r',sector_ids)
    user_ids = get_args('user')
    app.logger.debug('userIds = %r',user_ids)
    try:
        #sql
        filters = [Post.user_id.in_(user_ids)] if user_ids else []
        if company_ids:
            filters.append(Post.company_id.in_(company_ids))
        if sector_ids:
            filters.append(Company.id.in_(sector_ids))
        if sector_ids:
            filters.append(Company.sector_id.in_(sector_ids))
            _posts =  Post.query.join(Company) \
                .filter(*filters) \
                .order_by(Post.company_id).all()
        else:
            _posts =  Post.query.filter(*filters) \
                .order_by(Post.company_id).all()

        #dto
        posts = PostDTO.create_list(_posts)

        return ok(posts)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)



@app.route('/api/posts',methods=['POST'])
def create_post():
    post = PostDTO(json=request.get_json())
    app.logger.debug(post)
    try:
        assert not post.id,'wrong post.id'

        #sql
        app.logger.debug('start create model')
        _post = post.model()
        app.logger.debug('prepared model %r',_post)
        db.session.add(_post)
        db.session.commit()

        app.logger.debug('created id %r',_post.id)

        _post = Post.query.get(_post.id)

        #dto
        post = PostDTO(_post)
        app.logger.debug(post)
        return created(post)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)

@app.route('/api/posts/<int:post_id>',methods=['POST'])
def update_posts(post_id):
    post = PostDTO(json=request.get_json())
    app.logger.debug(post)
    try:
        assert post_id==post.id,'wrong post_id'

        #sql
        db.session.update(post.model())
        db.session.commit()

        _post = Post.query.get(post.id)

        #dto
        post = PostDTO(_post)
        app.logger.debug(post)
        return accepted(post)

    except AssertionError as e:
        app.logger.info(e)
        return assertion_error(e)

    except Exception as e:
        app.logger.error(e)
        return server_error(e)
