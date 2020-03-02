<?php
return [
    'public' => [
        'permissions',
        'groups'
    ],
    'config' => [
        'permissions' => [
            'id' => [
                'INT',
                'NOT NULL',
                'AUTO_INCREMENT',
                'PRIMARY KEY'
            ],
            'description' => [
                'VARCHAR(255)',
                'NOT NULL'
            ],
        ],
        'rooms' => [
            'id' => [
                'VARCHAR(20)',
                'NOT NULL',
                'PRIMARY KEY'
            ],
            'building' => [
                'VARCHAR(50)'
            ],
            'floor' => [
                'INT'
            ],
            'name' => [
                'VARCHAR(255)',
                'NOT NULL'
            ],
            'capacity' => [
                'INT',
                'NOT NULL'
            ]
        ],
        'users' => [
            'id' => [
                'VARCHAR(20)',
                'NOT NULL',
                'PRIMARY KEY'
            ],
            'name' => [
                'VARCHAR(255)',
                'NOT NULL'
            ],
            'email' => [
                'VARCHAR(255)',
                'NOT NULL',
                'UNIQUE'
            ],
            'pw' => [
                'VARCHAR(255)',
                'NOT NULL'
            ],
            'room_id' => [
                'VARCHAR(255)'
            ],
            'valid_until' => [
                'TIMESTAMP'
            ],
            'FOREIGN KEY (<room_id>) REFERENCES rooms(<id>)',
        ],
        /*'groups' => [
            'id' => [
                'INT',
                'NOT NULL',
                'AUTO_INCREMENT',
                'PRIMARY KEY'
            ],
            'name' => [
                'VARCHAR(50)',
                'NOT NULL',
                'UNIQUE'
            ],
            'description' => [
                'VARCHAR(255)',
                'NOT NULL'
            ],
        ],
        'group_permissions' => [
            'group_id' => [
                'INT',
                'NOT NULL',
            ],
            'permission_id' => [
                'INT',
                'NOT NULL',
            ],
            'FOREIGN KEY (<group_id>) REFERENCES groups(<id>)',
            'FOREIGN KEY (<permission_id>) REFERENCES permissions(<id>)',
            'PRIMARY KEY(<group_id>, <permission_id>)'
        ], */
        'user_permissions' => [
            'user_id' => [
                'VARCHAR(20)',
                'NOT NULL',
            ],
            'permission_id' => [
                'INT',
                'NOT NULL',
            ],
            'FOREIGN KEY (<user_id>) REFERENCES users(<id>)',
            'FOREIGN KEY (<permission_id>) REFERENCES permissions(<id>)',
            'PRIMARY KEY(<user_id>, <permission_id>)'
        ],
    ],
    'default' => [
        'permissions' => [
            'description' => 'User management',
        ],
        'users' => [
            'id' => 'admin',
            'name' => 'Admin',
            'email' => 'none',
            'pw' => password_hash('admin', PASSWORD_BCRYPT)
        ],
        'user_permissions' => [
            'user_id' => 'admin',
            'permission_id' => 1
        ]
    ]
];