const defs = require('../../imports/defaults');

const generalf = require('../../imports/functions/general');

const add = require('../../imports/queries').consumerSales.addConsumerSales;
const getAll = require('../../imports/queries').consumerSales.getAllSales;
const getInProgressSales = require('../../imports/queries').consumerSales.getInProgressSales;
const getAllInProgressSales = require('../../imports/queries').consumerSales.getAllSalesInProgress;
const updateInvStock = require('../../imports/queries').inventory.updateItemQuantityMinus;
const updateBalance = require('../../imports/queries').consumerSales.updateBalance;

module.exports = function (router, mysqlObject) {
    // router.post('/add/salesman', (req, res) => {

    //     const useQuery = generalf.mysqlQuery(mysqlObject, req.body, addSalesmanQuery);

    //     mysqlObject.query(
    //         useQuery,
    //         (error, results, fields) => {
    //             if (error) {
    //                 console.log(error);
    //                 res.send(defs.setRetRes('err', addError));
    //             } else {
    //                 res.send(defs.setRetRes('def', addSuccess));
    //             }
    //         }
    //     )
    // });

    router.post('/get/sales/all', (req, res) => {
        mysqlObject.query(getAll,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def',results));
                }
            });
    });

    router.post('/add/sales/consumer', (req, res) => {
        const arr = req.body.data;

        arr.forEach((s, i) => {

            s['date_time'] = `CURRENT_TIMESTAMP`;
            
            const useQuery = generalf.mysqlQuery(mysqlObject, s, add).replace(/\'(CURRENT_TIMESTAMP)\'/g, 'CURRENT_TIMESTAMP');
            const useQuery2 = mysqlObject.format(updateInvStock, [s.quantity, s.item_id]);

            mysqlObject.query(
                useQuery,
                (error, results, fields) => {
                    if (error) {
                        console.log(error);
                    } else {
                        mysqlObject.query(
                            useQuery2,
                            (error, results, fields) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                }
                            }
                        )
                    }
                }
            )
        });
        res.send(defs.setRetRes('def', 'You have successfully made a sale'));
    });

    router.post('/get/sales/inprogress', (req, res) => {
        mysqlObject.query(getInProgressSales,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def', results));
                }
            });
    });

    // //////////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    router.post('/inprogress/payout', (req, res) => {
        const newTotal = req.body.total;
        delete req.body.total;

        const values = Object.values(req.body);
        values[2] = values[1];
        values[1] = newTotal;
        
        const useQuery = mysqlObject.format(updateBalance, values);

        mysqlObject.query(useQuery, (error,r, f) => {
            if (error) {
                console.log(error);
                res.send(defs.errRes);
            } else {
                res.send(defs.setRetRes('def', 'You have successfully updated the sale'));
            }
        });
    });

    router.post('/get/sales/inprogress/all', (req, res) => {
        mysqlObject.query(getAllInProgressSales, (error, r, f) => {
            if (error) {
                console.log(error);
                res.send(defs.errRes);
            } else {
                res.send(defs.setRetRes('def', r));
            }
        });
    })

    
}