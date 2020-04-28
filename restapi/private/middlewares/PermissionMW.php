<?php


use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;

class PermissionMW {
    private $permsToAccess = [];
    private $dbController = null;
    private $tokenController = null;
    private $userPerms = [];

    public function __construct($permsToAccess, $dbController, $tokenController) {
        $this->permsToAccess = $permsToAccess;
        $this->dbController = $dbController;
        $this->tokenController = $tokenController;
//        echo json_encode($tokenController->isLoggedIn());
    }


    private function initUserPerms() {
        $this->userPerms = $this->dbController->getUserPermissions($this->tokenController->getUser());
    }

    private function hasRight() {
        if (isset($this->permsToAccess['and'])) {
            foreach ($this->permsToAccess['and'] as $perm) {
                if (!in_array($perm, $this->userPerms)) {
                    return false;
                }
            }
            return true;
        } else if (isset($this->permsToAccess['or'])) {
            foreach ($this->permsToAccess['or'] as $perm) {
                if (in_array($perm, $this->userPerms)) {
                    return true;
                }
            }
        } else {
            return false;
        }
        return false;
    }


    public function __invoke(Request $request, RequestHandler $handler): Response {
        $this->initUserPerms();

        $ret = $this->hasRight();

        if ($ret) {
            return $handler->handle($request);
        } else {
            $response = new \Slim\Psr7\Response();
            $dormRes = new DormResponse('', 'access_denied', '');
            $response = $response->withStatus(403);
            $response->getBody()->write($dormRes->getResponse());
            return $response;
        }
    }
}
