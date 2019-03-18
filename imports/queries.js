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
        addItem: "INSERT INTO `items` (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)",
        getAll: 'SELECT * FROM `items` ORDER BY `item_id` DESC',
        deleteItem: 'DELETE FROM `items` WHERE `item_id`=?'
    },
}
// { username: a, password: b}