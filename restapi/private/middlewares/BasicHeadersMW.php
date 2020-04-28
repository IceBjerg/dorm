<?php


use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class BasicHeadersMW {


    private $headers = [
        ['header_name' => 'Content-Type', 'header_value' => 'application/json'],
        ['header_name' => 'Access-Control-Allow-Origin', 'header_value' => '*'],
        ['header_name' => 'Access-Control-Allow-Headers', 'header_value' => 'X-Requested-With, Content-Type, Accept, Origin, Authorization'],
        ['header_name' => 'Access-Control-Allow-Methods', 'header_value' => 'GET, POST, PUT, DELETE, PATCH, OPTIONS']
    ];

    public function __invoke(Request $request, RequestHandler $handler): Response {
        $response = $handler->handle($request);
        foreach ($this->headers as $header) {
            $response = $response->withAddedHeader($header['header_name'], $header['header_value']);
        }
        return $response;
    }

}
