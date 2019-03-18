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
    },
    errorMessages: {
        inventory: {
            defInventoryError : 'Error adding item to inventory, please contact your administrator',
            getInventoryError: 'Error retreiving items from inventory',
            delInventoryError: 'Error adding item to inventory, please contact your administrator'
        },
        register: {
            registerDefErr: 'Could not register you in at the moment. Please try again in a while',
            invalidRegisterErr: 'The registeration data was incomplete. Contact support sevices'
        }
    },
    successMessages: {
        inventory: {
            itemAddSuccess: 'Your item has been added successfully'
        }
    }
}