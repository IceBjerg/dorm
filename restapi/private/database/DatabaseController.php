<?php

use Medoo\Medoo;

class DatabaseController
{
    public $db = null;
    private $tables = [];

    public function __construct()
    {
        $config = require_once __DIR__ . '/../config/DbConfig.php';
        $this->db = new Medoo($config);
        $this->tables = require_once __DIR__ . '/../config/tables.php';
    }

    public function createNonExistingTables()
    {
        $createdTables = [];
        foreach ($this->tables['config'] as $k => $v){
             $this->db->create($k, $v);
             if ($this->tables['default'] && key_exists($k, $this->tables['default']) && !$this->db->select($k, '*')) {
                 foreach ($this->tables['default'][$k] as $key => $value) {
                     $this->db->insert($k, $this->tables['default'][$k]);
                 }
             }
        }
    }

    public function getAll($table, $column = '*') {
        return $this->db->select($table, $column);
    }

    public function tablePublic($table)
    {
        return in_array($table, $this->tables['public']);
    }

    public function addToTable($table, $data) {
        $this->db->insert($table, $data);
    }
    public function rowExists($table, $row) {
        return $this->db->has($table, $row);
    }

    public function getOne($table, $columns,  $where)
    {
        return $this->db->get($table, $columns, $where);
    }

    public function getUserPermissions($id) {
        $userPerms = $this->db->select('user_permissions', 'permission_id', [ 'user_id' => $id ]);
        return $userPerms;
    }

}