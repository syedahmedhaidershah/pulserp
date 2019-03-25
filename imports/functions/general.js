module.exports = {
    matchReqInt: (reqbody, interface) => {
        if (!(module.exports.isJson(reqbody))) {
            return false;
        }

        if (Object.keys(reqbody).sort().toString().toLowerCase() != Object.keys(interface).sort().toString().toLowerCase()) {
            return false;
        } else {
            return true;
        }
    },
    isJson: (obj) => {
        if ((typeof obj).toLowerCase() == 'object') {
            return true;
        } else {
            return false;
        }
    },
    isJsonStr: (str) => {
        let ret = false;
        try {
            JSON.parse(str);
            ret = true;
        } catch (exc) { }
        return ret;
    },
    generateSimpleQuery: (query, obj) => {

        const params = [];
        let queryStr = '';
        for (p in obj) {
            params.push(obj[p]);
        }
        if (query.length != (params.length + 1)) {
            return false;
        } else {
            let i = 0, len = params.length;
            for (; i < len; i++) {
                queryStr += query[i].concat(params[i]);
            }
            queryStr += query[i];
            return queryStr;
        }
    },
    mysqlQuery: (mysql, obj, query) => {
        // MOVING  CODE TO 'sandbox/inventory'

        const queryData = Object.keys(obj).concat(Object.values(obj));

        return mysql.format(query, queryData);
    },
    mysqlQueryAlt: (mysql, obj, query) => {
        const queryData = [];

        Object.keys(obj).forEach((k) => {
            queryData.push(k, obj[k]);
        });

        return mysql.format(query, queryData);
    },
    sortJson: (jsonObj) => {
        if (!(module.exports.isJson(jsonObj))) {
            return null;
        } else {
            const toRet = {};
            const keys = Object.keys(jsonObj).sort().map(k => {
                return k.toLowerCase();
            });
            keys.forEach(k => {
                toRet[k] = jsonObj[k];
            });
            return toRet;
        }
    }
}