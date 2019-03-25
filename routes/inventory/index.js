const defs = require('../../imports/defaults');

const generalf = require('../../imports/functions/general');

const itemAddSuccess = defs.successMessages.inventory.itemAddSuccess;
const updateItemSuccess = defs.successMessages.inventory.updateItemSuccess;

const defInvErr = defs.errorMessages.inventory.defInventoryError;
const defInvDelErr = defs.errorMessages.inventory.delInventoryError;
const getItemErr = defs.errorMessages.inventory.getInventoryError;
const itemNotFoundError = defs.errorMessages.inventory.itemNotFoundError;
const updateItemError = defs.errorMessages.inventory.updateItemError;

const itemInterface = require('../../imports/interfaces/item').add;
const delItemInterface = require('../../imports/interfaces/item').delete;

const addItemToInventoryQuery = require('../../imports/queries').inventory.addItem;
const getAllItemsQuery = require('../../imports/queries').inventory.getAll;
const getAllConsumerItemsQuery = require('../../imports/queries').inventory.getAllConsumer;
const getItemQuery = require('../../imports/queries').inventory.getOne;
const deleteItemQuery = require('../../imports/queries').inventory.deleteItem;
const updateItemQuery = require('../../imports/queries').inventory.updateItem;
const updateQuantityQuery = require('../../imports/queries').inventory.updateItemQuantity;

module.exports = function (router, mysqlObject) {
    router.post('/add/inventory/item', (req, res) => {
        let query = req.body;

        if (query.type === 'c') {
            query.consumer = 1;
            query.rental = 0;
        } else if (query.type === 'r') {
            query.consumer = 0;
            switch (query.rentDuration) {
                case 'd':
                    query.rental = 1;
                    break;
                case 'h':
                    query.rental = 2;
                    break;
                case 'm':
                    query.rental = 3;
                    break;
                default:
                    query.rental = 0;
                    break;
            }
            query.cost = query.rent;
            delete query.rent;
            delete query.rentDuration;
        } else {
            res.send(defs.setRetRes('err', defInvErr));
            return false;
        }
        delete query.type;

        // query = generalf.sortJson(query);

        if (!(generalf.matchReqInt(query, itemInterface))) {
            res.send(defs.setRetRes('err', defInvErr));
        } else {
            // MOVING  CODE TO 'sandbox/inventory'
            // let keys = [], values = [];
            // Object.keys(query).forEach((k) => {
            //     values.push(query[k]);
            //     keys.push(k);
            // });

            const queryData = Object.keys(query).concat(Object.values(query));

            const useQuery = mysqlObject.format(addItemToInventoryQuery, queryData);

            mysqlObject.query(useQuery, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.setRetRes('err', defInvErr));
                } else {
                    res.send(defs.setRetRes('def', itemAddSuccess));
                }
            });
        }
    });

    router.post('/get/inventory/item/all', (req, res) => {
        mysqlObject.query(getAllItemsQuery, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send(defs.setRetRes('err', getItemErr));
            } else {
                res.send(defs.setRetRes('def', results));
            }
        });
    });

    router.post('/get/inventory/items/consumer', (req, res) => {
        mysqlObject.query(getAllConsumerItemsQuery, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send(defs.setRetRes('err', getItemErr));
            } else {
                res.send(defs.setRetRes('def', results));
            }
        });
    });

    router.post('/get/inventory/item', (req, res) => {
        const getOneItemQuery = mysqlObject.format(getItemQuery, req.body.item_id)

        mysqlObject.query(getOneItemQuery, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send(defs.setRetRes('err', defInvDelErr));
            } else if (results.length == 0) {
                res.send(defs.setRetRes('err', itemNotFoundError));
            } else {
                res.send(defs.setRetRes('def', results));
            }
        });

    });


    router.post('/delete/inventory/item', (req, res) => {
        const query = req.body;

        if (!(generalf.matchReqInt(query, delItemInterface))) {
            res.send(defs.setRetRes('err', defInvDelErr));
        } else {
            const delItemQuery = mysqlObject.format(deleteItemQuery, query.item_id);

            mysqlObject.query(delItemQuery, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.setRetRes('err', defInvDelErr));
                } else {
                    res.send(defs.setRetRes('def', 'You have succesfully deleted the item from inventory'));
                }
            });
        }

    });

    router.post('/update/inventory/item/quantity', (req, res) => {
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;

        mysqlObject.query(
            mysqlObject.format(updateQuantityQuery, [quantity, itemId]),
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.setRetRes('err', updateItemError));
                } else if (results.affectedRows == 0) {
                    res.send(defs.setRetRes('err', updateItemError));
                } else {
                    res.send(defs.setRetRes('def', updateItemSuccess));
                }
            }
        )
    });

    router.post('/update/inventory/item', (req, res) => {
        const query = req.body.data;
        const itemId = req.body.injected.item_id;

        if (query.type === 'c') {
            query.consumer = 1;
            query.rental = 0;
        } else if (query.type === 'r') {
            query.consumer = 0;
            switch (query.rentDuration) {
                case 'd':
                    query.rental = 1;
                    break;
                case 'h':
                    query.rental = 2;
                    break;
                case 'm':
                    query.rental = 3;
                    break;
                default:
                    query.rental = 0;
                    break;
            }
            query.cost = query.rent;
            delete query.rent;
            delete query.rentDuration;
        } else {
            res.send(defs.setRetRes('err', defInvErr));
            return false;
        }
        delete query.type;

        const useQuery = generalf.mysqlQueryAlt(mysqlObject, query, updateItemQuery);
        const newQuery = mysqlObject.format(useQuery, itemId);

        mysqlObject.query(newQuery, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send(defs.setRetRes('err', updateItemError));
            } else if (results.affectedRows == 0) {
                res.send(defs.setRetRes('err', updateItemError));
            } else {
                res.send(defs.setRetRes('def', updateItemSuccess));
            }
        });
    });

}