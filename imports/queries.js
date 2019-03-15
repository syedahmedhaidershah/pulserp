module.exports = {
    login: [
        'SELECT * FROM `users` WHERE `username`="',
        '" AND `password`="',
        '";'
    ],
    getAllSubscriptionPackages: 'SELECT * FROM `packages`',
    register: {
        user: [
            'INSERT INTO `users` (`username`,`password`,`firstname`,`lastname`,`email`,`phone`,`package`) VALUES ("',
            '","',
            '","',
            '","',
            '","',
            '","',
            '",',
            ')'
        ],
        information: [
            'INSERT INTO `information` (`uid`,`data`) VALUES (',
            ',"',
            '")'
        ]
    },
    inventory: {
        addItem: [
            'INSERT INTO `items` (`consumer`,`cost`,`empty`,`name`,`quantity`,`rental`) VALUES (',
            ',',
            ',',
            ',"',
            '",',
            ',',
            ')'
        ],
        getAll: 'SELECT * FROM `items`'
    },
}
// { username: a, password: b}