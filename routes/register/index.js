// const mongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const userRegisterInterface = require('../../imports/interfaces/register').user;
const generalf = require('../../imports/functions/general.js');
const defs = require('../../imports/defaults');
const registerationQueries = require('../../imports/queries.js').register;
const registerUserQuery = registerationQueries.user;
const registerInfoQuery = registerationQueries.information; 

const registerDefErr = 'Could not register you in at the moment. Please try again in a while';
const invalidregisterfErr = 'The registeration data was incomplete. Contact support sevices';

// let db = null;

module.exports = (router, mysqlObject) => {

    
    router.post('/register/user', (req, res) => {
        const query = req.body.user;
        const company = req.body.company;

        query.package = req.body.package;

        if (!(generalf.matchReqInt(query, userRegisterInterface))) {
            res.send(defs.setRetRes('err', registerDefErr));
        } else {
            query.password = md5(query.password);
            const registerGeneratedQuery = generalf.generateSimpleQuery(registerUserQuery, query);
            
            if (registerGeneratedQuery) {
                mysqlObject.query(
                    registerGeneratedQuery
                    , (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            res.send(defs.setRetRes('err', registerDefErr));
                        } else {
                            if(results.affectedRows == 0) {
                                res.send(defs.setRetRes('err', registerDefErr));
                            } else {
                                const companyInfo = {
                                    uid: results.insertId,
                                    data: JSON.stringify(company).replace(/\"/g,'\'')
                                }
                                const informationQuery = generalf.generateSimpleQuery(registerInfoQuery, companyInfo);

                                
                                mysqlObject.query(
                                    informationQuery,
                                    (error, results, fields) => {
                                        if (error) {
                                            console.log(error);
                                            res.send(defs.setRetRes('err', registerDefErr));
                                        } else {
                                            res.send(defs.setRetRes('def', 'Congratulations. You have been registered'));
                                        }
                                    }
                                )
                            }
                        }
                    });
            } else {
                res.send(defs.setRetRes('err', registerDefErr));
            }
        }
    });

}