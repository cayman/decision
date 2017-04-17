<?php
/**
 * Created by IntelliJ IDEA.
 * User: rustem
 * Date: 19.09.16
 * Time: 2:51
 */
require __DIR__ . '/vendor/autoload.php';

$envFile = __DIR__. ('production' == getenv('APP_ENV') ? '/.env': '/../../.env');
if (file_exists($envFile)) {
    (new Dotenv\Dotenv(dirname($envFile)))->load();
}


session_start();

// Instantiate the app
$settings = require __DIR__ . '/src/settings.php';

$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/src/dependencies.php';
// Register middleware
require __DIR__ . '/src/middleware.php';
// Register routes
require __DIR__ . '/src/routes.php';

$app->run();