const defs = require('../../imports/defaults');

const generalf = require('../../imports/functions/general');

const addSalesmanQuery = require('../../imports/queries').salesman.addCustomer;
const getAllSalesmanQuery = require('../../imports/queries').salesman.getAll;

const addError = require('../../imports/defaults').errorMessages.salesman.add;

const addSuccess = require('../../imports/defaults').successMessages.salesman.add;

module.exports = function (router, mysqlObject) {
    router.post('/add/salesman', (req, res) => {

        const useQuery = generalf.mysqlQuery(mysqlObject, req.body, addSalesmanQuery);

        mysqlObject.query(
            useQuery,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.setRetRes('err', addError));
                } else {
                    res.send(defs.setRetRes('def', addSuccess));
                }
            }
        )
    });

    router.post('/get/salesman/all', (req, res) => {
        mysqlObject.query(
            getAllSalesmanQuery,
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.setRetRes('err', addError));
                } else {
                    res.send(defs.setRetRes('def', results));
                }
            }
        )
    });
}