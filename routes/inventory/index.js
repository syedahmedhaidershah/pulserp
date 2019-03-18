const defs = require('../../imports/defaults');
const defInvErr = defs.errorMessages.inventory.defInventoryError;
const defInvDelErr = defs.errorMessages.inventory.delInventoryError;
const itemAddSuccess = defs.successMessages.inventory.itemAddSuccess;
const getItemErr = defs.errorMessages.inventory.getInventoryError;
const generalf = require('../../imports/functions/general');
const itemInterface = require('../../imports/interfaces/item').add;
const delItemInterface = require('../../imports/interfaces/item').delete;
const addItemToInventoryQuery = require('../../imports/queries').inventory.addItem;
const getAllItemsQuery = require('../../imports/queries').inventory.getAll;
const deleteItemQuery = require('../../imports/queries').inventory.deleteItem;

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
            let keys = [], values = [];
            Object.keys(query).forEach((k) => {
                values.push(query[k]);
                keys.push(k);
            });

            const queryData = keys.concat(values);

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


    router.post('/delete/inventory/item', (req, res) => {
        const query = req.body;

        if (!(generalf.matchReqInt(query, delItemInterface))) {
            res.send(defs.setRetRes('err', defInvDelErr));
        } else {
            const delItemQuery = mysqlObject.format(deleteItemQuery, query.item_id)

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

}