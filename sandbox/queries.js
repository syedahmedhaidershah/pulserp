


//Items Queries

updateItem: "UPDATE items SET ??=? , ??=?, ??=?, ??=?, ??=?, ??=?  WHERE item_id = ?"

addItem: "INSERT INTO items (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)"


delItem: "DELETE FROM items WHERE item_id=?"


// Discount Queries

updateDiscount: "UPDATE discount SET ??=? , ??=?, ??=?  WHERE discount_id = ?"

addDiscount: "INSERT INTO discount (??,??,??) VALUES (?,?,?)"

removeDiscount: "DELETE FROM discount WHERE discount_id=?"

// Customer Queries

updateCustomer: "UPDATE customers SET ??=? , ??=?, ??=?, ??=? WHERE customer_id = ?"

addCustomer: "INSERT INTO customers (??,??,??,??) VALUES (?,?,?,?)"

removeCustomer: "DELETE FROM customers WHERE customer_id=?"

// Consumer Sales


updateBalance: "UPDATE consumer_sales SET balance=? WHERE invoice_id = ?"

addConsumerSales: "INSERT INTO consumer_sales (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)"

getInProgressSales: "SELECT * FROM consumer_sales WHERE balance > 0"

getCompletedSales:  "SELECT * FROM consumer_sales WHERE balance = 0"


// Rental Saless
updateBalance: "UPDATE rental_sales SET last_paid=?, return_date=? WHERE invoice_id = ?"

addConsumerSales: "INSERT INTO rental_sales (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)"

getInProgressRental: "SELECT * FROM rental_sales WHERE returned = 0"

getCompletedRental: "SELECT * FROM rental_sales WHERE balance = 1"
