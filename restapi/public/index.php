<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Aspera\Spreadsheet\XLSX\Reader;

try {
    require_once __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../private/DormResponse.php';
    require_once __DIR__ . '/../private/database/DatabaseController.php';
    require_once __DIR__ . '/../private/token/TokenController.php';
    require_once __DIR__ . '/../private/parameters/Parameters.php';
    require_once __DIR__ . '/../private/mail/EmailController.php';
    // middlewares
    require_once __DIR__ . '/../private/middlewares/LoginMiddleWare.php';
    require_once __DIR__ . '/../private/middlewares/BasicHeadersMW.php';
    require_once __DIR__ . '/../private/middlewares/OptionsMW.php';
    require_once __DIR__ . '/../private/middlewares/BodyParamsMW.php';
    require_once __DIR__ . '/../private/middlewares/PermissionMW.php';

    $slimConfig = require __DIR__ . '/../private/config/SlimConfig.php';

    $dbController = new DatabaseController();
    $tokenController = new TokenController();
    $restapiResponse = new DormResponse();
    $emailClient = new EmailController();

    $app = AppFactory::create();
    $app->setBasePath($slimConfig['basePath']); // IMPORTANT!!
    $tmpDir = $slimConfig['tmpdir'];

    $app->add(new OptionsMW())->add(new BasicHeadersMW());

    $app->post('/login', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if ($dbController->isGoodUserPw($body['user'], $body['pw'])) {
            $restapiResponse->message = $tokenController->createTokensForUser($body['user']);
        } else {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'login_failed';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['user', 'pw']));

    $app->post('/refreshToken', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        $payload = $tokenController->validate($body['token']);

        if (is_array($payload)) {
            $restapiResponse->message = $tokenController->createAccessToken($payload);
        } else {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'refresh_token_fail';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['token']));

    $app->get('/userData', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getUserData($tokenController->getUser());
        return $restapiResponse->answer($response);
    })->add(new LoginMiddleWare($tokenController));


    $app->get('/getAllUsers', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getAllUsers();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [1]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/updateUsers', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->updateUsers($body['users'])) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['users']))->add(new PermissionMW(['and' => [1]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/myRoom', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = ['room' => $dbController->getOwnRoom($tokenController->getUser())];
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [0]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/addPw', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        $user = $dbController->getUserByToken($body['token']);
        if ($user) {
            $dbController->changePassword($user, $body['pw']);
            $dbController->deleteToken($body['token']);
        } else {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'user_not_exists';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['token', 'pw']));


    $app->post('/registerStudent', function (Request $request, Response $response, $args) use ($emailClient, $restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (Parameters::paramsOk($body['id'], $body['name'], $body['email'], $body['gender'], $body['nationality'])) {
            // send mail
            if (!$dbController->registerStudents([$body], $emailClient, $body['url'])) {
                $restapiResponse->status = 400;
                $restapiResponse->error = 'cannot_reg';
            }
        } else {
            // on error
            $restapiResponse->status = 400;
            $restapiResponse->error = 'bad_params';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['url', 'id', 'name', 'email', 'gender', 'nationality']))->add(new PermissionMW(['and' => [1]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/registerStudents', function (Request $request, Response $response, $args) use ($tmpDir, $emailClient, $restapiResponse, $dbController, $tokenController) {
        $uploadedFiles = $request->getUploadedFiles();
        $parsedBody = $request->getParsedBody();
        if (key_exists('file', $uploadedFiles) &&key_exists('url', $parsedBody)) {
            $uploadedFile = $uploadedFiles['file'];
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = $tmpDir . DIRECTORY_SEPARATOR . 'users.xlsx';
                $uploadedFile->moveTo($filename);
                $options = ['SkipEmptyCells' => true];
                $reader = new Reader($options);
                $reader->open($filename);
                $usersToRegister = [];
                $reader->next();
                while ($row = $reader->next()) {
                    if (count($row) === 5) {
                        //                    0: neptun code
                        //                    1: name
                        //                    2: email
                        //                    3: gender
                        //                    4: nationality
                        $usersToRegister[] = ['id' => $row[0], 'name' => $row[1], 'email' => $row[2], 'gender' => $row[3], 'nationality' => $row[4],];
                    }
                }
                $reader->close();
                if (count($usersToRegister) === 0 || !$dbController->registerStudents($usersToRegister, $emailClient, $parsedBody['url'])) {
                    $restapiResponse->status = 400;
                    $restapiResponse->error = 'cannot_reg';
                }
            } else {
                $restapiResponse->status = 400;
                $restapiResponse->error = 'bad_file';
            }
        } else {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'bad_params';
        }
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [1]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->put('/deleteUsers', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->deleteUsers($body['users'])) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_deleted';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['users']))->add(new PermissionMW(['and' => [1]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getAllRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getAllRooms();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [2]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/getRoom', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        $restapiResponse->message = $dbController->getRoom($body['room']);
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['room']))->add(new PermissionMW(['and' => [2]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/updateRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->updateRooms($body['rooms'])) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['rooms']))->add(new PermissionMW(['and' => [2]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->put('/addRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->addRooms($body['rooms'])) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['rooms']))->add(new PermissionMW(['and' => [2]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->put('/deleteRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->deleteRooms($body['rooms'])) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['rooms']))->add(new PermissionMW(['and' => [2]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getUserWithRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getUserWithRooms();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [3]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/updateUserRooms', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->updateUserRooms($body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['deleted', 'updated']))->add(new PermissionMW(['and' => [3]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getAllPermissions', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = ['permissions' => $dbController->getPermissions(), 'userPermissions' => $dbController->getAllUserPermissions()];
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [4]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/updatePermissions', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->updatePermissions($body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['add', 'delete']))->add(new PermissionMW(['and' => [4]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/addErrorReport', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->addErrorReport($body, $tokenController->getUser())) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['type', 'location', 'issue', 'needTranslate']))->add(new PermissionMW(['and' => [0]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getForeignText', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getForeignText();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [5]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/translateErrorReport', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->translateErrorReport($body, $tokenController->getUser())) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['id', 'text']))->add(new PermissionMW(['and' => [5]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getMaintenanceWork', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getMaintenanceWork();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [6]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/maintenanceDone', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->maintenanceDone($body, $tokenController->getUser())) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['id']))->add(new PermissionMW(['and' => [6]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getErrorHistoryUser', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getErrorHistoryOfUser($tokenController->getUser());
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [0]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getAllNeptuns', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getAllNeptuns();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/addGuest', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->addGuest($tokenController->getUser(), $body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['host', 'guest_name', 'guest_id']))->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getActiveGuests', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getActiveGuests();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/guestLeft', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->guestLeft($tokenController->getUser(), $body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['id']))->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getHistGuests', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getHistGuests();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/addEvent', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->addEvent($tokenController->getUser(), $body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['name', 'num', 'date', 'location', 'tel', 'description', 'partic_dorm', 'partic_out']))->add(new PermissionMW(['and' => [0]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->GET('/getOwnEvents', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getOwnEvents($tokenController->getUser());
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [0]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getAllEvents', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getAllEvents();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['or' => [8, 9, 10]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/updateEventApproval', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!($dbController->hasPerm($tokenController->getUser(), 9) && $dbController->updateEventAsOV($body)) && !($dbController->hasPerm($tokenController->getUser(), 10) && $dbController->updateEventAsHOK($body))) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['status', 'id']))->add(new PermissionMW(['or' => [9, 10]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));

    $app->get('/getKeyData', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getKeyData();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/keyReceived', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->receivedKey($tokenController->getUser(), $body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['id']))->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->post('/keyTaken', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $body = json_decode($request->getBody()->getContents(), true);
        if (!$dbController->keyTaken($tokenController->getUser(), $body)) {
            $restapiResponse->status = 400;
            $restapiResponse->error = 'zero_updated';
        }
        return $restapiResponse->answer($response);
    })->add(new BodyParamsMW(['key', 'takenBy']))->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));


    $app->get('/getKeyDataHist', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        $restapiResponse->message = $dbController->getKeyDataHist();
        return $restapiResponse->answer($response);
    })->add(new PermissionMW(['and' => [7]], $dbController, $tokenController))->add(new LoginMiddleWare($tokenController));



    $app->run();
} catch (Exception $e) {
    echo $e->getMessage();
}
