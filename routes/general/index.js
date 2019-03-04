const defs = require('../../imports/defaults');
const getPackagesQuery = require('../../imports/queries').getAllSubscriptionPackages;

module.exports = function (router, mysqlObject) {
    router.post('/get/packages/all', (req, res) => {
        mysqlObject.query(
            getPackagesQuery
            , (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.send(defs.errRes);
                } else {
                    res.send(defs.setRetRes('def', results));
                }
            });
    });
}