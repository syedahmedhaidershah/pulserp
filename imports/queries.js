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
    }
}
// { username: a, password: b}