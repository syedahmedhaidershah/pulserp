const defs = require('../../imports/defaults');

const generalf = require('../../imports/functions/general');

const add = require('../../imports/queries').schemes.addDiscount;
const getAll = require('../../imports/queries').schemes.getAll;
const deleteSch = require('../../imports/queries').schemes.removeDiscount;

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

    router.post('/add/scheme', (req, res) => {
        const useQuery = generalf.mysqlQuery(mysqlObject, req.body, add);

        mysqlObject.query(
            useQuery,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def', 'You have successfully added a scheme'));
                }
            }
        )
    });

    router.post('/get/schemes/all', (req, res) => {
        const useQuery = generalf.mysqlQuery(mysqlObject, req.body, getAll);

        mysqlObject.query(
            useQuery,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def', results));
                }
            }
        )
    });


    router.post('/delete/schemes/', (req, res) => {
        
        const useQuery = mysqlObject.format(deleteSch, [req.body.discount_id]);

        mysqlObject.query(
            useQuery,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def', 'You have successfully deleted a scheme'));
                }
            }
        )
    });


    

}