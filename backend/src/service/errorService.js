module.exports = {
    ErrorType: {
        SERVER: 'SERVER',
        DB: 'DB',
        DB_MAPPING: 'DB_MAPPING'
    },
    getErrorJSONObject: (errType, message) => {
        return {message: message, type: errType};
    }
};
