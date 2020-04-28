<?php

use Psr\Http\Message\ResponseInterface as Response;

class DormResponse {
    public $message;
    public $error;
    public $warning;
    public $status;

    public function __construct($message = '', $error = '', $warning = '', $status = 200) {
        $this->message = $message;
        $this->error = $error;
        $this->warning = $warning;
        $this->status = $status;
  }

    public function getObject() {
        return ['msg' => $this->message, 'err' => $this->error, 'warn' => $this->warning];
    }

    public function getResponse() {
        return json_encode($this->getObject());
    }

    public function answer(Response $response) {
        $response = $response->withStatus($this->status);
        $response->getBody()->write($this->getResponse());
        return $response;
    }
}
