<?php

use \Firebase\JWT\JWT;

// class that validates jwt tokens
class TokenController {
    protected $token;
    protected $isLoggedIn;
    protected $privateKey;
    protected $publicKey;
    protected $user;
    protected $tokenExpireIn = 60 * 60 ; // 1 hour
    protected $refreshTokenExpireIn = 864000; // 10 days

    public function __construct() {

        $this->isLoggedIn = false;
        try {
            $this->privateKey = file_get_contents(__DIR__ . '/../config/private.key', true);
            $this->publicKey = file_get_contents(__DIR__ . '/../config/public.key', true);
        } catch (Exception $e) {
            throw new Error('No private and public key found in config directory -- public.key and private.key');
        }
    }

    public function validate($token) {
        $this->token = $token;
        $payload = null;
        try{
            $payload = JWT::decode($token, $this->publicKey, ['RS256']);
            $payload = json_decode(json_encode($payload), true);
            $this->user = $payload['iss'];
            $this->isLoggedIn = true;
        } catch (Exception $exception) {
            $this->isLoggedIn = false;
        }
        return $payload;
    }

    public function createTokensForUser($user) {
        $now = time();
        return [
            'accessToken' => JWT::encode($this->createPayloadBase($user, $now + $this->tokenExpireIn), $this->privateKey, 'RS256'),
            'refreshToken' => JWT::encode($this->createPayloadBase($user, $now + $this->refreshTokenExpireIn), $this->privateKey, 'RS256')
        ];
    }

    private function createPayloadBase($user, $expire) {
        return [
            'iss' => $user,
            'exp' => $expire
        ];
    }

    public function isLoggedIn() {
        return $this->isLoggedIn;
    }

    public function getUser() {
        return $this->user;
    }

    public function createAccessToken($payload) {
        $now = time();
        $payload['exp'] = $now + $this->tokenExpireIn;
        return [
            'accessToken' => JWT::encode($payload, $this->privateKey, 'RS256')
        ];

    }
}
