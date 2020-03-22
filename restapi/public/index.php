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

    $dbController = new DatabaseController();
    $tokenController = new TokenController();
    $restapiResponse = new DormResponse();

    $app = AppFactory::create();
    $app->setBasePath('/szakdoga/restapi/public'); // IMPORTANT!!
    $tmpDir = 'C:/xampp/tmp';

    // general

    $app->add(function (Request $request, $handler) use ($tokenController, $restapiResponse) {
        $token = $request->getHeader('Authorization');
        if ($token && $token[0]) { // Bearer <token_we_need>
            try {
                $token = explode(' ', $token[0])[1];
                $tokenController->validate($token);
            } catch (Exception $exception) {
                $restapiResponse->status = 401;
                $restapiResponse->error = $exception->getMessage();
            }
        }
        return $handler->handle($request);
    });


    $app->get('/test', function (Request $request, Response $response, $args) use ($dbController, $restapiResponse) {
        return $restapiResponse->answer($response);
    });

    $app->get('/init', function (Request $request, Response $response, $args) use ($dbController) {
        $dbController->createNonExistingTables();
        return $response;
    });

    // spec
    $app->options('/login', function (Request $request, Response $response, $args) use ($restapiResponse) {
        return $restapiResponse->answer($response);
    });

    $app->post('/login', function (Request $request, Response $response, $args) use ($dbController, $tokenController) {
        $dormRes = new DormResponse();
        $dormRes->status = 400;
        $rq = json_decode($request->getBody()->getContents(), true);
        if ($rq && key_exists('user', $rq) && key_exists('pw', $rq)) {
            if ($dbController->rowExists('users', ['id' => $rq['user']])) {
                $dbPw = $dbController->getOne('users', 'pw', ['id' => $rq['user']]);
                if (password_verify($rq['pw'], $dbPw)) {
                    $dormRes->status = 200;
                    $dormRes->message = $tokenController->createTokensForUser($rq['user'], ['name' => $dbController->getOne('users', 'name', ['id' => $rq['user']]), 'id' => $rq['user'], 'permissions' => $dbController->getUserPermissions($rq['user'])]);
                } else {
                    $dormRes->error = 'Wrong username and password combination';
                }
            } else {
                $dormRes->error = 'Wrong username and password combination';
            }
        } else {
            $dormRes->error = 'Missing parameters';
        }
        return $dormRes->answer($response);
    });

    $app->post('/registerStudent', function (Request $request, Response $response, $args) use ($restapiResponse, $dbController, $tokenController) {
        // permission to access this func:
        $perm = 1;
        //
        $rq = json_decode($request->getBody()->getContents(), true);
        if ($tokenController->isLoggedIn()) {
            $user = (array)$tokenController->getUserData();
            if (key_exists('permissions', $user) && in_array($perm, $user['permissions'])) {
                if ($rq && key_exists('id', $rq) && key_exists('name', $rq) && key_exists('email', $rq) && key_exists('pw', $rq)) {
                    if (!$dbController->rowExists('users', ['id' => $rq['id']])) {
                        $dbController->addToTable('users', ['id' => $rq['id'], 'name' => $rq['name'], 'email' => $rq['email'], 'pw' => password_hash($rq['pw'], PASSWORD_BCRYPT)]);
                        if (!$dbController->rowExists('users', ['id' => $rq['id']])) {
                            $restapiResponse->status = 400;
                            $restapiResponse->error = 'Something went wrong. Check user data. ';
                        }
                    } else {
                        $restapiResponse->status = 400;
                        $restapiResponse->error = 'User exists';
                    }
                } else {
                    $restapiResponse->status = 400;
                    $restapiResponse->error = 'Missing parameters';
                }
            } else {
                $restapiResponse->status = 400;
                $restapiResponse->error = 'Access denied! ';
            }
        }
        return $restapiResponse->answer($response);
    });

    $app->post('/registerStudents', function (Request $request, Response $response, $args) use ($tmpDir, $restapiResponse, $dbController, $tokenController) {
        // permission to access this func:
        $perm = 1;
        //
        if ($tokenController->isLoggedIn()) {
            $user = (array)$tokenController->getUserData();
            if (key_exists('permissions', $user) && in_array($perm, $user['permissions'])) {
                $uploadedFiles = $request->getUploadedFiles();
                if (key_exists('file', $uploadedFiles)) {
                    $uploadedFile = $uploadedFiles['file'];
                    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                        $filename = $tmpDir . DIRECTORY_SEPARATOR . 'users.xlsx';
                        $uploadedFile->moveTo($filename);
                        $reader = new Reader();
                        $reader->open($filename);
                        $isHeader = true;
                        $cntAdded = 0;
                        $cnt = 0;
                        foreach ($reader as $row) {
                            if (!$isHeader && count($row)) {
                                //                    0: neptun code
                                //                    1: name
                                //                    2: email
                                //                    3: pw
                                if (!$dbController->rowExists('users', ['id' => $row[0]])) {
                                    $dbController->addToTable('users', ['id' => $row[0], 'name' => $row[1], 'email' => $row[2], 'pw' => password_hash($row[3], PASSWORD_BCRYPT)]);
                                    if ($dbController->rowExists('users', ['id' => $row[0]])) {
                                        $cntAdded++;
                                    } else {
                                        $restapiResponse->warning .= $row[0] . ' ';
                                    }
                                } else {
                                    $restapiResponse->warning .= $row[0] . ' ';
                                }
                                $restapiResponse->message .= $row[0];
                                $cnt++;
                            } else {
                                $isHeader = false;
                            }
                        }

                        $reader->close();

                        $restapiResponse->message = $cntAdded . ' / ' . $cnt . ' users added successfully';
                    }
                }
            } else {
                $restapiResponse->status = 400;
                $restapiResponse->error = 'Access denied! ';
            }
        }
        if ($restapiResponse->warning) {
            $restapiResponse->warning = 'These accounts are not registered: ' . $restapiResponse->warning;
        }
        return $restapiResponse->answer($response);

    });

    $app->post('/addRoom', function (Request $request, Response $response, $args) use ($restapiResponse, $tokenController, $dbController) {
        $perm = 1;
        //
        if ($tokenController->isLoggedIn()) {
            $user = (array)$tokenController->getUserData();
            if (key_exists('permissions', $user) && in_array($perm, $user['permissions'])) {
                $uploadedFiles = $request->getUploadedFiles();
                if (key_exists('file', $uploadedFiles)) {
                    $uploadedFile = $uploadedFiles['file'];
                    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                        $filename = $tmpDir . DIRECTORY_SEPARATOR . 'users.xlsx';
                        $uploadedFile->moveTo($filename);
                        $reader = new Reader();
                        $reader->open($filename);
                        $isHeader = true;
                        $cntAdded = 0;
                        $cnt = 0;
                        foreach ($reader as $row) {
                            if (!$isHeader && count($row)) {
                                //                    0: neptun code
                                //                    1: name
                                //                    2: email
                                //                    3: pw
                                if (!$dbController->rowExists('users', ['id' => $row[0]])) {
                                    $dbController->addToTable('users', ['id' => $row[0], 'name' => $row[1], 'email' => $row[2], 'pw' => password_hash($row[3], PASSWORD_BCRYPT)]);
                                    if ($dbController->rowExists('users', ['id' => $row[0]])) {
                                        $cntAdded++;
                                    } else {
                                        $restapiResponse->warning .= $row[0] . ' ';
                                    }
                                } else {
                                    $restapiResponse->warning .= $row[0] . ' ';
                                }
                                $restapiResponse->message .= $row[0];
                                $cnt++;
                            } else {
                                $isHeader = false;
                            }
                        }

                        $reader->close();

                        $restapiResponse->message = $cntAdded . ' / ' . $cnt . ' users added successfully';
                    }
                }
            } else {
                $restapiResponse->status = 400;
                $restapiResponse->error = 'Access denied! ';
            }
        }
        if ($restapiResponse->warning) {
            $restapiResponse->warning = 'These accounts are not registered: ' . $restapiResponse->warning;
        }
        return $restapiResponse->answer($response);

    });

    $app->post('/groups', function (Request $request, Response $response, $args) use ($dbController) {
        $rq = json_decode($request->getBody()->getContents(), true);
        if ($rq && key_exists('name', $rq) && key_exists('description', $rq)) {
            $dbController->addToTable('groups', ['name' => $rq['name'], 'description' => $rq['description']]);
            $result = (new DormResponse())->getObject();
        } else {
            $result = (new DormResponse('', 'Missing parameters'))->getObject();
            $response = $response->withStatus(400);
        }
        $response->getBody()->write(json_encode($result));
        return $response;
    });

    $app->post('/groupPermissions', function (Request $request, Response $response, $args) use ($dbController) {
        $arr = json_decode($request->getBody()->getContents(), true);
        if (is_array($arr)) {
            $num = 0;
            foreach ($arr as $obj) {
                if ($obj && key_exists('group_id', $obj) && key_exists('permission_id', $obj) && $dbController->rowExists('groups', ['id' => $obj['group_id']]) && $dbController->rowExists('permissions', ['id' => $obj['permission_id']]) && !$dbController->rowExists('group_permissions', ['AND' => ['group_id' => $obj['group_id'], 'permission_id' => $obj['permission_id']]])) {
                    $dbController->addToTable('group_permissions', ['group_id' => $obj['group_id'], 'permission_id' => $obj['permission_id']]);
                    $num++;
                }
            }
            $result = (new DormResponse('Successfully inserted ' . $num . ' rows', ''))->getObject();
        } else {
            $result = (new DormResponse('', 'Missing parameters'))->getObject();
            $response = $response->withStatus(400);
        }
        $response->getBody()->write(json_encode($result));
        return $response;
    });


    $app->run();
}
catch (Exception $e) {
    echo $e->getMessage();
}
