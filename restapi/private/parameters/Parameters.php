<?php


class Parameters {

    /**
     * @param $all - array: ['param1', 'param2', ... ]
     * @param $sent - array: ['param2', ... ]
     * @return bool - returns if the second parameter has all values of first array
     */
    public static function hasAllRequired($all, $sent){
        if (is_array($sent)) {
            foreach ($all as $param) {
                if (!key_exists($param, $sent)) {
                    return false;
                }
            }
        }
        return true;
    }

    public static function paramsOk($id, $name, $email, $gender, $nationality){
        return (strlen($id) > 5 && strlen($name) > 4 && filter_var($email, FILTER_VALIDATE_EMAIL));
    }
}
