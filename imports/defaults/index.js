module.exports = {
    defRes: {
        error: false,
        message: 200
    },
    errRes: {
        error: true,
        message: 'An unhandled exception occured, please contact your administrator.'
    },
    setRetRes: (type, msg) => {
        let thisRes = module.exports.defRes;
        if (type == 'err') {
            thisRes = module.exports.errRes;
        }
        thisRes.message = msg;
        return thisRes;
    }
}