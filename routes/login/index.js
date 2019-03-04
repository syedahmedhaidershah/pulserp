// const mongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const loginInterface = require('../../imports/interfaces/login');
const generalf = require('../../imports/functions/general.js');
const defs = require('../../imports/defaults');
const loginQuery = require('../../imports/queries.js').login;

const loginDefErr = 'Could not log you in at the moment. Please try again in a while';
const invalidLoginfErr = 'The credentials provided are incorrect';

// let db = null;

module.exports = (router, mysqlObject) => {

    // mongoClient.connect(dbConf.url, { useNewUrlParser: true }, (err, dbObj) => {
    //     if (err) return console.log(err);

    //     db = dbObj.db('pulserp');
    // });

    router.post('/login', (req, res) => {
        if (!(generalf.matchReqInt(req.body, loginInterface))) {
            res.send(defs.setRetRes('err', loginDefErr));
        } else {
            // db.collection('users').findOne(query, (err, obj) => {
            //     if(err) {
            //         res.send(defs.setRetRes('err', loginDefErr));
            //         console.log(err);
            //     } else if (obj) {
            //         res.send(defs.setRetRes('def', obj));
            //     } else {
            //         res.send(defs.setRetRes('err', invalidLoginfErr));                    
            //     }
            // });
            const query = req.body;
            query.password = md5(query.password);
            const loginGeneratedQuery = generalf.generateSimpleQuery(loginQuery, query);
            mysqlObject.query(
                loginGeneratedQuery
                , (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        res.send(defs.setRetRes('err', loginDefErr));
                    } else {
                        if (results.length > 0) {
                            res.send(defs.setRetRes('def', results));
                        } else {
                            res.send(defs.setRetRes('err', invalidLoginfErr));
                        }
                    }
                });
        }
    });

}