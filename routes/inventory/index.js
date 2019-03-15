const defs = require('../../imports/defaults');
const defInvErr = defs.errorMessages.inventory.defInventoryError;
const itemAddSuccess = defs.successMessages.inventory.itemAddSuccess;
const getItemErr = defs.errorMessages.inventory.getInventoryError;
const generalf = require('../../imports/functions/general');
const itemInterface = require('../../imports/interfaces/item');
const addItemToInventoryQuery = require('../../imports/queries').inventory.addItem;
const getAllItems = require('../../imports/queries').inventory.getAll;

module.exports = function (router, mysqlObject) {
    router.post('/get/inventory/item/all', (req, res) => {
        mysqlObject.query(getAllItems, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.send(defs.setRetRes('err', getItemErr));
            } else {
                res.send(defs.setRetRes('def', results));
            }
        });
    });

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

        query = generalf.sortJson(query);

        if (!(generalf.matchReqInt(query, itemInterface))) {
            res.send(defs.setRetRes('err', defInvErr));
        } else {
            const addItemQuery = generalf.generateSimpleQuery(addItemToInventoryQuery, query);

            if (addItemQuery) {
                mysqlObject.query(addItemQuery, (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        res.send(defs.setRetRes('err', defInvErr));
                    } else {
                        res.send(defs.setRetRes('def', itemAddSuccess));
                    }
                });
            } else {
                res.send(defs.setRetRes('err', defInvErr));
            }
        }


    });
}