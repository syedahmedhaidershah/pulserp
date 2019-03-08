const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');
const defs = require('./imports/defaults');
const mysql = require('mysql');
const dbConf = require('./imports/config/db').mysqlconn;

const mysqlObject = mysql.createConnection(dbConf);
mysqlObject.connect();

const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });

const app = express();
const prefPort = 9899;

router.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/api', router);

fs.readdir('./routes', (err, files) => {
    
    files.forEach(i => {
        require('./routes/'.concat(i))(router, mysqlObject);
    });
    router.get('*', (req, res) => {
        res.send(defs.defRes);
    });
    router.post('*', (req, res) => {
        res.send(defs.defRes);
    });
    
    try {
        app.listen(prefPort, () => {
            console.log(`API is live on ${prefPort}`);
        });
    } catch (exc) {
        const defPort = require('process').env.PORT;
        app.listen(defPort, () => {
            console.log(`API is live on ${defPort}`);
        });
    }
});


