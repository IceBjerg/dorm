<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class BodyParamsMW {

    private $depends = [];

    public function __construct($keys) {
        $this->depends['required_keys'] = $keys;
    }

    public function __invoke(Request $request, RequestHandler $handler): Response {
        $keys = json_decode($request->getBody()->getContents(), true);
        // echo json_encode($this->depends['required_keys']);
        if (Parameters::hasAllRequired($this->depends['required_keys'], $keys)){
            return $handler->handle($request);
        } else {
            $response = new \Slim\Psr7\Response();
            $response = $response->withStatus(400);
            $response->getBody()->write((new DormResponse('', 'bad_params', ''))->getResponse());
            return $response;
        }

    }
}
