
<?php
// Routes

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//$app->get('/', function (Request $request, Response $response, $args) {
//    $this->logger->info("Start page");
//    // Render index view
//    return $this->renderer->render($response, 'index.phtml', $args);
//});


$app->get('/api/', function (Request $request, Response $response, $args) {
    $data = array('name'=>'api','message'=>"Hello!");
    return $response->withJson($data);
});


// Set up posts
require __DIR__ . '/post/routes.php';

// Set up terms
require __DIR__ . '/term/routes.php';
