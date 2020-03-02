<?php

use \Firebase\JWT\JWT;

// class that validates jwt tokens
class TokenController {
    protected $token;
    protected $isLoggedId;
    protected $userData;
    protected $privateKey;
    protected $publicKey;
    //    protected $tokenExpireIn = 3600; // 1 hour
    protected $tokenExpireIn = 3600; // 10 seconds
    protected $refreshTokenExpireIn = 864000; // 10 days

    public function __construct() {

        $this->isLoggedId = false;
        $this->permissions = [];
        try {
            $this->privateKey = file_get_contents(__DIR__ . '/../config/private.key', true);
            $this->publicKey = file_get_contents(__DIR__ . '/../config/public.key', true);
        } catch (Exception $e) {
            throw new Error('No private and public key found in config directory -- public.key and private.key');
        }
    }

    public function validate($token) {
        $this->token = $token;
        $this->userData =  (array) JWT::decode($token, $this->publicKey, ['RS256']);
        $this->isLoggedId = true;
    }

    public function createTokensForUser($user, $props) {
        $now = time();
        return ['accessToken' => JWT::encode($this->createPayloadBase($user, $props, $now + $this->tokenExpireIn), $this->privateKey, 'RS256'), 'refreshToken' => JWT::encode($this->createPayloadBase($user, $props, $now + $this->refreshTokenExpireIn), $this->privateKey, 'RS256')];
    }

    private function createPayloadBase($user, $props, $expire) {
        return ['iss' => $user, 'exp' => $expire, 'userData' => $props];
    }

    public function getUserData() {
        return $this->userData['userData'];
    }

    public function isLoggedIn() {
        return $this->isLoggedId;
    }
}