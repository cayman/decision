<?php
/**
 * Created by IntelliJ IDEA.
 * User: rustem
 * Date: 10.09.16
 * Time: 15:34
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->get('/api/taxonomy', function (Request $request, Response $response, $args) {

    $terms = $this->db->table('term_taxonomy')
        ->join('terms','terms.term_id','=','term_taxonomy.term_id')->get();

    $count = count($terms);

    $this->logger->info("Terms count = $count");

    $data = array('count'=>$count,'items'=> $terms);

    return $response->withJson($data);
});

$app->get('/api/posts', function (Request $request, Response $response, $args) {

    $taxonomyId = $request->getQueryParam('taxonomyId');
    $page = $request->getQueryParam('page',1);
    $perPage = $request->getQueryParam('count',20);

    $taxonomy = isset($taxonomyId) ? $this->db->table('term_taxonomy')
        ->join('terms', 'terms.term_id', '=', 'term_taxonomy.term_id')
        ->where('term_taxonomy.term_taxonomy_id', $taxonomyId)->first() : null;

    $query = $this->db->table('posts')
        ->when(isset($taxonomyId),function($query) use ($taxonomyId) {
            return $query->join('term_relationships', 'term_relationships.object_id', '=', 'posts.ID')
                ->where('term_relationships.term_taxonomy_id', $taxonomyId);
        })
        ->where('posts.post_type', 'post');

    $total = $query->count();

    $posts = $query->orderBy('ID', 'desc')->offset(($page-1)*$perPage)->limit($perPage)->get();


    $this->logger->info("Posts count = $total");

    $data = array('total'=>$total, 'perPage'=>$perPage, 'page'=> $page, 'taxonomy' => $taxonomy, 'items'=> $posts);

    return $response->withJson($data);
});



$app->get('/api/posts/{id}', function (Request $request, Response $response, $args) {

    $id = $request->getAttribute('id');

    $post = $this->db->table('posts')->find($id);

    $this->logger->info("Post id =  $id");

    return $response->withJson($post);

});