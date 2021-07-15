const assert = require('assert');

class Mapper {
    constructor(tableName, fieldNames) {
        this.tableName = tableName;
        this.errorPrefix = 'Database mapping error:';
        this.fieldNames = fieldNames;
    }

    getDBFieldValue = (valueObj, fieldName, mandatory) => {
        if (mandatory) {
            assert(valueObj[fieldName] !== undefined, `${this.errorPrefix} mandatory field '${fieldName}' is undefined! Table '${this.tableName}'`);
        }
        return (valueObj[fieldName] === undefined ? null: valueObj[fieldName]);
    }

    getJSONObject = (data) => {
        assert(data!== undefined, `${this.errorPrefix} database object is not defined! Table ${this.tableName}`);

        var obj = {};
        Object.entries(this.fieldNames).forEach( ([key, fieldObj]) => {
            // console.log(`key: ${key}, api: ${fieldObj['api']}, dbName: ${fieldObj['dbName']}, mandatory: ${fieldObj['mandatory']}`);
            obj[fieldObj['api']] = this.getDBFieldValue(data, fieldObj['dbName'], fieldObj['mandatory']);
        });
        return obj;
    }
}
module.exports = Mapper;