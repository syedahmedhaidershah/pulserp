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
        addItem: "INSERT INTO `items` (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)",
        getAll: 'SELECT * FROM `items` ORDER BY `item_id` DESC',
        getAllConsumer: 'SELECT * FROM `items` WHERE `consumer`=1 ORDER BY `item_id` DESC',
        getOne: 'SELECT * FROM `items` WHERE `item_id`=?',
        deleteItem: 'DELETE FROM `items` WHERE `item_id`=?',
        updateItem: "UPDATE items SET ??=? , ??=?, ??=?, ??=?, ??=?, ??=?, ??=?  WHERE item_id = ?",
        updateItemQuantity: "UPDATE `items` SET `quantity`=? WHERE `item_id`=?",
        updateItemQuantityMinus: "UPDATE `items` SET quantity= quantity-? WHERE `item_id`=?" 
    },
    salesman: {
        addCustomer: "INSERT INTO customers (??,??,??,??) VALUES (?,?,?,?)",
        updateCustomer: "UPDATE customers SET ??=? , ??=?, ??=?, ??=? WHERE customer_id = ?",
        removeCustomer: "DELETE FROM customers WHERE customer_id=?",
        getOne: "SELECT * FROM `customers` WHERE `customer_id`=?",
        getAll: "SELECT * FROM `customers` ORDER BY `customer_id` DESC"
    },
    schemes: {
        updateDiscount: "UPDATE discount SET ??=? , ??=?  WHERE discount_id = ?",
        addDiscount: "INSERT INTO discount (??,??) VALUES (?,?)",
        removeDiscount: "DELETE FROM discount WHERE discount_id=?",
        getAll: "SELECT * FROM `discount` ORDER BY `discount_id` DESC"
    },
    consumerSales: {
        addConsumerSales: "INSERT INTO consumer_sales (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)",
        updateBalance: "UPDATE consumer_sales SET balance=balance - ?, deposit=? WHERE invoice_id = ?",
        getInProgressSales: "SELECT * FROM consumer_sales WHERE balance > 0",
        getCompletedSales: "SELECT * FROM consumer_sales WHERE balance = 0",
        getAllSales: "SELECT * FROM consumer_sales JOIN items ON consumer_sales.item_id = items.item_id ORDER BY invoice_id DESC LIMIT 50",
        getAllSalesInProgress: "SELECT * FROM consumer_sales JOIN items ON consumer_sales.item_id = items.item_id WHERE balance > 0 ORDER BY invoice_id DESC LIMIT 50"
    }
}
// { username: a, password: b}