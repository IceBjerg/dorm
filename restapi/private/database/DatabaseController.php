<?php


class DatabaseController {
    public $conn = null;

    public function __construct() {
        $config = require_once __DIR__ . '/../config/DbConfig.php';
        $dns = 'mysql:dbname=' . $config['dbname'] . ';host=' . $config['host'] . ';port=' . $config['port'];
        $this->conn = new PDO($dns, $config['username'], $config['password']);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function isGoodUserPw($user, $pw) {
        $user = strtolower($user);
        try {
            $stm = $this->conn->prepare('
                select pw 
                from users 
                where id like ?');
            $stm->execute([$user]);
            $dbpw = $stm->fetchAll(PDO::FETCH_COLUMN, 0);
            if (count($dbpw) === 1) {
                $dbpw = $dbpw[0];
                return password_verify($pw, $dbpw);
            }
        } catch (Exception $e) {

        }
        return false;
    }

    public function getUserData($user) {
        $stm = $this->conn->prepare('
                select users.id, users.name, users.email, users.nationality, users.gender, rooms.name as room_name
                from users left join rooms on users.room_id = rooms.id
                where users.id like ?');
        $stm->execute([$user]);
        $userData = $stm->fetchAll(PDO::FETCH_ASSOC);
        if (count($userData) === 1) {
            $userData = $userData[0];
            $userData['permissions'] = $this->getUserPermissions($user);
            return $userData;
        }
        return [];
    }

    public function getUserPermissions($user) {
        $ret = [];
        $stm = $this->conn->prepare('
                select permission_id
                from user_permissions
                where user_id like ?');
        $stm->execute([$user]);
        $userPermissions = $stm->fetchAll(PDO::FETCH_COLUMN, 0);
        foreach ($userPermissions as $perm) {
            array_push($ret, intval($perm));
        }
        return $ret;
    }

    public function registerStudent($id, $name, $email, $gender, $nationality) {
        try {
            $stm = $this->conn->prepare('
                insert into users (id, name, email, gender, nationality)
                values (?, ?, ?, ?, ?)');
            $stm->execute([$id, $name, $email, $gender, $nationality]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function addPwChanger($id, $token) {
        $stm = $this->conn->prepare('
                        insert into newpw (user_id, token)
                        values (?, ?)');
        $stm->execute([$id, $token]);
    }

    public function getOwnRoom($user) {
        $stm = $this->conn->prepare('
                select rooms.*
                from users left join rooms on users.room_id = rooms.id
                where users.id like ?');
        $stm->execute([$user]);
        $roomData = $stm->fetch(PDO::FETCH_ASSOC);
        $room_id = $roomData['id'];
        if ($room_id) {
            $stm = $this->conn->prepare('
                select name
                from users
                where room_id like ?');
            $stm->execute([$room_id]);
            $names = $stm->fetchAll(PDO::FETCH_COLUMN, 0);
            $roomData['residents'] = $names;
            return $roomData;
        }
        return null;
    }

    public function getUserByToken($token) {
        $stm = $this->conn->prepare('
                select user_id
                from newpw
                where token like ?');
        $stm->execute([$token]);
        return $stm->fetch(PDO::FETCH_ASSOC)['user_id'];
    }

    public function changePassword($user, $pw) {
        $stm = $this->conn->prepare('
                update users 
                set pw=?
                where id=?');
        $stm->execute([password_hash($pw, PASSWORD_DEFAULT), $user]);
    }

    public function deleteToken($token) {
        $stm = $this->conn->prepare('
                delete from newpw
                where token = ?');
        $stm->execute([$token]);
    }

    public function deleteUser($user) {
        $stm = $this->conn->prepare('
                delete from users
                where id = ?');
        $stm->execute([$user]);
    }

    public function getAllUsers() {
        $stm = $this->conn->prepare('
                select id, name, email, gender, nationality from users');
        $stm->execute();
        $userDatas = $stm->fetchAll(PDO::FETCH_ASSOC);
        return $userDatas;
    }

    public function updateUsers($userArr) {
        $isok = true;
        if (!is_array($userArr))
            return false;
        $this->conn->beginTransaction();
        $stm = $this->conn->prepare('
                                                update users
                                                set name=?, email=?, gender=?, nationality=?
                                                where id = ?');
        foreach ($userArr as $us) {
            if (Parameters::hasAllRequired(['name', 'id', 'email', 'gender', 'nationality'], $us)) {
                try {
                    $stm->execute([$us['name'], $us['email'], $us['gender'], $us['nationality'], $us['id']]);
                    $isok = $isok && $stm->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }

        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function deleteUsers($userArr) {
        if (!is_array($userArr))
            return false;
        $isOK = true;
        $this->conn->beginTransaction();

        $stmDeleteUser = $this->conn->prepare('
                                                DELETE FROM users
                                                WHERE id = ?');
        $stmNewPw = $this->conn->prepare('
                                                DELETE FROM newpw
                                                WHERE user_id = ?');
        $stmPermissions = $this->conn->prepare('
                                                DELETE FROM user_permissions
                                                WHERE user_permissions.user_id = ?');
        foreach ($userArr as $us) {
            try {
                $stmNewPw->execute([$us]);
            } catch (Exception $exception) {
            }

            try {
                $stmPermissions->execute([$us]);
            } catch (Exception $exception) {
            }

            // delete the user
            try {
                $stmDeleteUser->execute([$us]);
                $isOK = $isOK && $stmDeleteUser->rowCount() > 0;
            } catch (Exception $exception) {
                $isOK = false;
            }
        }

        if ($isOK) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isOK;
    }


    public function registerStudents($bodyArr, $emailClient, $frontednURL) {
        $isok = true;
        $this->conn->beginTransaction();
        try {
            $stm = $this->conn->prepare('
                insert into users (id, name, email, gender, nationality, users.pw)
                values (?, ?, ?, ?, ?, \'\')');
            $emailToSend = [];
            foreach ($bodyArr as $row) {
                $stm->execute([$row['id'], $row['name'], $row['email'], $row['gender'], $row['nationality']]);
                $isok = $stm->rowCount() > 0 && $isok;
                $token = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 32);
                $this->addPwChanger($row['id'], $token);
                $emailToSend[] = ['email' => $row['email'], 'token' => $token];
            }
            $emailClient->newPw($emailToSend, $frontednURL);
        } catch (Exception $e) {
            $isok = false;
        }
        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function getAllRooms() {
        $stm = $this->conn->prepare('
                select id, building, floor, name, capacity from rooms');
        $stm->execute();
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getRoom($room) {
        $stm = $this->conn->prepare('
                select id, building, floor, name, capacity from rooms where id = ?');
        $stm->execute([$room]);
        return $stm->fetch(PDO::FETCH_ASSOC);
    }

    public function updateRooms($rooms) {
        if (!is_array($rooms))
            return false;

        $isok = true;
        $this->conn->beginTransaction();

        $stmUpdateRoom = $this->conn->prepare('
                                                UPDATE rooms 
                                                SET name=?, building = ?, floor=?, capacity=? 
                                                WHERE id = ?');
        foreach ($rooms as $room) {
            if (Parameters::hasAllRequired(['name', 'id', 'building', 'floor', 'capacity'], $room)) {
                try {
                    $stmUpdateRoom->execute([$room['name'], $room['building'], $room['floor'], $room['capacity'], $room['id']]);
                    $isok = $isok && $stmUpdateRoom->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function addRooms($rooms) {
        if (!is_array($rooms))
            return false;
        $isok = true;
        $this->conn->beginTransaction();
        $stmUpdateRoom = $this->conn->prepare('
                                                INSERT INTO rooms (id, name, building, floor, capacity)
                                                VALUES (?, ?, ?, ?, ?)');
        foreach ($rooms as $room) {
            if (Parameters::hasAllRequired(['name', 'id', 'building', 'floor', 'capacity'], $room)) {
                try {
                    $stmUpdateRoom->execute([$room['id'], $room['name'], $room['building'], $room['floor'], $room['capacity']]);
                    $isok = $isok && $stmUpdateRoom->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function deleteRooms($rooms) {
        if (!is_array($rooms))
            return false;
        $isok = true;
        $this->conn->beginTransaction();
        $stmUpdateRoom = $this->conn->prepare('
                                                DELETE FROM rooms 
                                                WHERE id = ?');
        foreach ($rooms as $room) {
            try {
                $stmUpdateRoom->execute([$room]);
                $isok = $isok && ($stmUpdateRoom->rowCount() > 0);
            } catch (Exception $exception) {
                $isok = false;
            }
        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function getUserWithRooms() {
        $stm = $this->conn->prepare('
                select id as user_id, room_id
                from users 
                where room_id IS NOT NULL');
        $stm->execute([]);
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateUserRooms($body) {
        if (!is_array($body))
            return false;
        $isok = true;
        $this->conn->beginTransaction();
        $stmAddUpdateRoom = $this->conn->prepare('
                                                UPDATE users 
                                                SET room_id = ? 
                                                WHERE id = ? ');
        foreach ($body['updated'] as $row) {
            if (Parameters::hasAllRequired(['user_id', 'room_id'], $row)) {
                try {
                    $stmAddUpdateRoom->execute([$row['room_id'], $row['user_id']]);
                    $isok = $isok && $stmAddUpdateRoom->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }

        foreach ($body['deleted'] as $row) {
            if (Parameters::hasAllRequired(['user_id'], $row)) {
                try {
                    $stmAddUpdateRoom->execute([null, $row['user_id']]);
                    $isok = $isok && $stmAddUpdateRoom->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function getPermissions() {
        $ret = [];
        $stm = $this->conn->prepare('
                select id
                from permissions');
        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_COLUMN, 0);
        foreach ($tmp as $perm) {
            $ret[] = intval($perm);
        }
        return $ret;
    }

    public function getAllUserPermissions() {
        $stm = $this->conn->prepare('
                select name, id, email, IFNULL(permissions, \'\') as permissions from users left join
                    (select user_id as uid, GROUP_CONCAT(permission_id) as permissions
                    from user_permissions
                    group by user_id ) as other 
                        on other.uid = users.id');
        $stm->execute([]);
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updatePermissions($body) {
        if (!is_array($body))
            return false;
        $isok = true;
        $this->conn->beginTransaction();

        $stmDelete = $this->conn->prepare('
                                                DELETE FROM user_permissions
                                                WHERE user_id = ? and permission_id = ? ');
        foreach ($body['delete'] as $row) {
            if (Parameters::hasAllRequired(['user', 'permission'], $row)) {
                try {
                    $stmDelete->execute([$row['user'], $row['permission']]);
                    $isok = $isok && $stmDelete->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }


        $stmInsert = $this->conn->prepare('
                                                INSERT INTO user_permissions (user_id, permission_id)
                                                VALUES (?, ?)');
        foreach ($body['add'] as $row) {
            if (Parameters::hasAllRequired(['user', 'permission'], $row)) {
                try {
                    $stmInsert->execute([$row['user'], $row['permission']]);
                    $isok = $isok && $stmInsert->rowCount() > 0;
                } catch (Exception $exception) {
                    $isok = false;
                }
            } else {
                $isok = false;
            }
        }

        if ($isok) {
            $this->conn->commit();
        } else {
            $this->conn->rollBack();
        }
        return $isok;
    }

    public function addErrorReport($body, $user) {
        try {
            $stm = $this->conn->prepare('INSERT INTO error_reports ( reporter, report_type, location, issue, translate_needed) values (?, ?, ?, ?, ?)');
            $stm->execute([$user, $body['type'], $body['location'], $body['issue'], $body['needTranslate']]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function getForeignText() {
        $stm = $this->conn->prepare('   
                                                SELECT error_reports.id, error_reports.report_type, error_reports.location, error_reports.issue, error_reports.report_date 
                                                FROM error_reports 
                                                WHERE error_reports.translate_needed <> 0 and error_reports.translated_by is null
                                                ORDER BY report_date');

        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function translateErrorReport($body, $user) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE error_reports 
                                                SET error_reports.translated_by = ?, error_reports.translated_text = ?, error_reports.translate_time = now() 
                                                WHERE id = ? and error_reports.translated_by is null');
            $stm->execute([$user, $body['text'], $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getMaintenanceWork() {
        $stm = $this->conn->prepare('
                                                SELECT * FROM ((
                                                        SELECT error_reports.id, error_reports.report_type, error_reports.location, error_reports.issue as issue, error_reports.report_date 
                                                        FROM error_reports 
                                                        WHERE error_reports.translate_needed = 0 and error_reports.solved_by is null)
                                                    union 
                                                        (SELECT error_reports.id, error_reports.report_type, error_reports.location, error_reports.translated_text as issue, error_reports.report_date 
                                                        FROM error_reports 
                                                        WHERE error_reports.translate_needed <> 0 and 
                                                              error_reports.translated_by is not null and 
                                                              error_reports.solved_by is null)) as tmp
                                                ORDER BY report_date');
        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function maintenanceDone($body, $user) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE error_reports 
                                                SET error_reports.solved_by = ?, error_reports.solved_time = now() 
                                                WHERE id = ? and error_reports.solved_by is null');
            $stm->execute([$user, $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getErrorHistoryOfUser($getUser) {
        $stm = $this->conn->prepare('   
                                                SELECT error_reports.report_type, error_reports.location, error_reports.report_date, 
                                                       IF(error_reports.solved_by is not null, \'solved\', 
                                                           IF(error_reports.translate_needed = 0 or error_reports.translated_by is not null, \'maintenance\', \'translate\'
                                                               )) as status
                                                FROM error_reports 
                                                WHERE error_reports.reporter like ?
                                                ORDER BY report_date DESC LIMIT 5');

        $stm->execute([$getUser]);
        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllNeptuns() {
        $stm = $this->conn->prepare('   
                                                SELECT users.id from users');

        $stm->execute([]);
        return $stm->fetchAll(PDO::FETCH_COLUMN, 0);
    }

    public function addGuest($reporter, $body) {
        try {
            $stm = $this->conn->prepare('
                                                INSERT INTO guests (guests.reporter, guests.host_id, guests.guest_id, guests.guest_name) 
                                                VALUES (?, ?, ?, ?)');
            $stm->execute([$reporter, $body['host'], $body['guest_id'], $body['guest_name']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getActiveGuests() {
        $stm = $this->conn->prepare('   
                                                SELECT guests.id, users.name as host, guests.guest_name, guests.guest_id, guests.start, guests.reporter from guests JOIN users on guests.host_id = users.id 
                                                WHERE end is null ORDER BY start');
        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function guestLeft($ender, $body) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE guests SET end = now(), guests.ended_by = ? WHERE guests.id = ?');
            $stm->execute([$ender, $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getHistGuests() {
        $stm = $this->conn->prepare('   
                                                SELECT guests.id, users.name as host, guests.guest_name, guests.guest_id, guests.start, guests.reporter, guests.end, guests.ended_by from guests JOIN users on guests.host_id = users.id 
                                                WHERE end is not null and end > now() - 60*60*24*61 ORDER BY end desc');
        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function addEvent($organizer, $body) {
        try {
            $userStm = $this->conn->prepare('SELECT * from users WHERE id = ?');
            $userStm->execute([$organizer]);
            $organizerData = $userStm->fetch(PDO::FETCH_ASSOC);

            $stm = $this->conn->prepare('
                                                INSERT INTO events 
                                                    (events.event_organizer_name, events.event_organizer_neptun, events.event_organizer_email, 
                                                     events.event_organizer_tel, events.event_name, events.participant_num, events.event_time, 
                                                     events.event_location, events.event_description, events.participants_dorm, events.participants_out)
                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stm->execute([$organizerData['name'], $organizerData['id'], $organizerData['email'], $body['tel'], $body['name'], $body['num'], $body['date'],
                $body['location'], $body['description'], $body['partic_dorm'], $body['partic_out']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getOwnEvents($user) {
        $stm = $this->conn->prepare('   
                                                SELECT * from events where events.event_organizer_neptun = ? ORDER BY id desc');
        $stm->execute([$user]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function getAllEvents() {
        $stm = $this->conn->prepare('   
                                                SELECT * from events ORDER BY id desc');
        $stm->execute();
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['id'] = intval($tmp[$i]['id']);
        }
        return $tmp;
    }

    public function updateEventAsOV($body) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE events SET events.approved_ov = ? WHERE id = ?');
            $stm->execute([$body['status'] ? 'OK' : 'NO', $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function updateEventAsHOK($body) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE events SET events.approved_hok = ? WHERE id = ?');
            $stm->execute([$body['status'] ? 'OK' : 'NO', $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function hasPerm($user, $permNum){
        return in_array($permNum, $this->getUserPermissions($user));
    }

    public function getKeyData() {
        $stm = $this->conn->prepare(' SELECT le.last_id as id, le.key_id, re.user, re.start_time, re.accepted_by, re.end_time, re.ended_by FROM (
                                                    SELECT l.id as key_id, r.last_id from dorm_keys as l left join 
                                                        (SELECT dorm_key_usage.key_id, MAX(dorm_key_usage.id) as last_id
                                                        FROM dorm_key_usage
                                                        GROUP BY dorm_key_usage.key_id) as r 
                                                    on l.id = r.key_id) as le left join dorm_key_usage as re on le.last_id = re.id'
        );
        $stm->execute();
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['key_id'] = $tmp[$i]['key_id'] !== null ? intval($tmp[$i]['key_id']) : null;
            $tmp[$i]['id'] = $tmp[$i]['id'] !== null ? intval($tmp[$i]['id']) : null;
        }
        return $tmp;
    }

    public function receivedKey($user, $body) {
        try {
            $stm = $this->conn->prepare('
                                                UPDATE dorm_key_usage SET dorm_key_usage.end_time = now(), dorm_key_usage.ended_by = ? 
                                                WHERE dorm_key_usage.id = ? and dorm_key_usage.end_time is null');
            $stm->execute([$user, $body['id']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function keyTaken($user, $body) {
        try {
            foreach ($this->getKeyData() as $row){
                if ($row['key_id'] === $body['key']) {
                    if ($row['end_time'] === null && $row['start_time'] !== null) {
                        return false;
                    }
                }
            }
            $stm = $this->conn->prepare('
                                                INSERT INTO dorm_key_usage 
                                                    (dorm_key_usage.key_id, dorm_key_usage.accepted_by, dorm_key_usage.user) VALUES 
                                                    (?, ?, ?)');
            $stm->execute([$body['key'], $user, $body['takenBy']]);
            return $stm->rowCount() > 0;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getKeyDataHist() {
        $stm = $this->conn->prepare(' SELECT id, key_id, user, start_time, accepted_by, end_time, ended_by 
                                                FROM dorm_key_usage WHERE dorm_key_usage.end_time is not null and 
                                                                               dorm_key_usage.end_time > now() - 60*60*24*365
                                                ORDER BY end_time DESC');
        $stm->execute([]);
        $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($tmp); $i++) {
            $tmp[$i]['key_id'] = $tmp[$i]['key_id'] !== null ? intval($tmp[$i]['key_id']) : null;
            $tmp[$i]['id'] = $tmp[$i]['id'] !== null ? intval($tmp[$i]['id']) : null;
        }
        return $tmp;
    }

}
