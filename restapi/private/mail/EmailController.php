<?php


use Mailjet\Resources;

class EmailController {
    private $client = null;
    public function __construct() {
        $config = require_once __DIR__ . '/../config/EmailConfig.php';
        $this->client = new \Mailjet\Client('80e70476d84c90ff733496e7b3492b59',
            'dec0379b3edb4128657f6d00d4daf5ad',
            true, ['version' => 'v3.1']);
        $this->client->setTimeout(20);
        $this->client->setConnectionTimeout(20);
    }

    /**
     * @param $emails --> array that contains arrays with 2 keys: 'email' and 'token'
     * @return bool
     */
    public function newPw($emails, $frontednURL) {
        $bdy = [
            'Messages' => []
        ];
        foreach ($emails as $mail) {
            if (Parameters::hasAllRequired(['email', 'token'], $mail)) {
                $bdy['Messages'][] = ['From' => ['Email' => "noreply@kolintezo.hu", 'Name' => "Kolintéző"], 'To' => [['Email' => $mail['email'],]], 'Subject' => "Regisztráció / registration", 'HTMLPart' => "
                        <h1>Kolintéző regisztráció</h1> <br>
                        <h2>
                            A regisztráció befejezéséhez nyissa meg az alábbi linket, s adjon meg egy jelszót: 
                            <a href='". $frontednURL. "/new-pw/" . $mail['token'] . "' target=\"_blank\">LINK</a>
                        </h2><br>
                        <h3>link: ". $frontednURL. "/new-pw/" . $mail['token'] . "</h3>
                        <br/><br/>
                        
                        
                        <h1>Kolintéző registration</h1> <br>
                        <h2>
                            To complete your registration, click the link below and add a new password
                            <a href='". $frontednURL. "/new-pw/" . $mail['token'] . "' target=\"_blank\">LINK</a>
                        </h2><br>
                        <h3>link: ". $frontednURL. "/new-pw/" . $mail['token'] . "</h3>
                        ",];
            }
        }
        $response = $this->client->post(Resources::$Email, ['body' => $bdy]);
        return $response->success();
    }
}
