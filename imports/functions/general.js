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
    }
}