const FieldNames = {
    SID: {api: 'sid', dbName: 'sid', mandatory: true},
    NAME: {api: 'name', dbName: 'name', mandatory: true},
    ITEM: {api: 'item', dbName: 'item', mandatory: true},
    WITHREPS: {api: 'withReps', dbName: 'withreps', mandatory: true}
};
const TableName = 'exercise_metadata';
const ErrorPrefix = 'Database mapping error:';

getDBFieldValue = (valueObj, fieldName, mandatory) => {
    if (valueObj[fieldName] === undefined && mandatory) {
        throw Error(`${ErrorPrefix} mandatory field '${fieldName}' is undefined! Table '${TableName}'`);
    }
    return valueObj[fieldName];
}

module.exports = {
    getJSONObject: (row) => {
        var obj = {};
        if (row === undefined) {
            throw Error(`${ErrorPrefix} database object is not defined! Table ${TableName}`);
        }

        obj[FieldNames.SID.api] = getDBFieldValue(row, FieldNames.SID.dbName, FieldNames.SID.mandatory);
        obj[FieldNames.NAME.api] = getDBFieldValue(row, FieldNames.NAME.dbName, FieldNames.NAME.mandatory);
        obj[FieldNames.ITEM.api] = getDBFieldValue(row, FieldNames.ITEM.dbName, FieldNames.ITEM.mandatory);
        obj[FieldNames.WITHREPS.api] = getDBFieldValue(row, FieldNames.WITHREPS.dbName, FieldNames.WITHREPS.mandatory);

        return obj;
    }
};