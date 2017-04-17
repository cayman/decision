<?php
/**
 * Created by IntelliJ IDEA.
 * User: rustem
 * Date: 10.09.16
 * Time: 15:36
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->get('/api/terms', function (Request $request, Response $response, $args) {

    $name = $request->getQueryParams('name');

    $this->logger->info("Word name = $name");

    $term = $this->db->table('dict_tatrus')->where('name',$name)->get();
    $like = $this->db->table('dict_tatrus')->where('name','like',$name.'%')->get();

    $data = array('term'=>$term,'count'=>count($like),'like'=> $like);

    return $response->withJson($data);

});