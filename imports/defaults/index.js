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
            delInventoryError: 'Error adding item to inventory, please contact your administrator',
            itemNotFoundError: 'Error retreiving information for this item, please contact your administrator',
            updateItemError: 'Information for this item couldn\'t be updated, please contact your administrator'
        },
        register: {
            registerDefErr: 'Could not register you in at the moment. Please try again in a while',
            invalidRegisterErr: 'The registeration data was incomplete. Contact support sevices'
        },
        salesman:{
            add: 'Error saving salesman, please contact your administrator'
        }
    },
    successMessages: {
        inventory: {
            itemAddSuccess: 'Your item has been added successfully',
            updateItemSuccess: 'You have successfully updated your inventory'
        },
        salesman: {
            add: 'You have successfully added a salesman'
        }
    }
}