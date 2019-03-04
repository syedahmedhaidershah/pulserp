module.exports = {
    login: [
        'SELECT * FROM `users` WHERE `username`="',
        '" AND `password`="',
        '";'
    ],
    getAllSubscriptionPackages: 'SELECT * FROM `packages`'
}
// { username: a, password: b}