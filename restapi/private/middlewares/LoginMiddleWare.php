<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class LoginMiddleWare {

    private $depends = [];

    public function __construct($tokenController) {
        $this->depends['token'] = $tokenController;
    }

    public function __invoke(Request $request, RequestHandler $handler): Response {
        $token = $request->getHeader('Authorization');
        if ($token && $token[0]) { // Bearer <token_we_need>
            $token = explode(' ', $token[0])[1];
            try {
                $this->depends['token']->validate($token);
            } catch (Exception $exception) {
            }
        }
        if ($this->depends['token']->isLoggedIn()){
            return $handler->handle($request);
        } else {
            $response = new \Slim\Psr7\Response();
            $dormRes = new DormResponse('', 'not_authorized', '');
            $response = $response->withStatus(401);
            $response->getBody()->write($dormRes->getResponse());
            return $response;
        }
    }

}
