module.exports = {
    login: [
        'SELECT * FROM `users` WHERE `username`="',
        '" AND `password`="',
        '";'
    ]
}
// { username: a, password: b}