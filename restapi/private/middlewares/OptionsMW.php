<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class OptionsMW {


    public function __invoke(Request $request, RequestHandler $handler): Response {
        if ($request->getMethod() === 'OPTIONS'){
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write((new DormResponse())->getResponse());
            return $response;
        } else {
            return $handler->handle($request);
        }

    }
}
