const Mapper = require('./mapper');

class MetadataMapper {
    constructor(){
        this.tableName = 'exercise_metadata';
        this.fieldNames = {
             SID: {api: 'sid', dbName: 'sid', mandatory: true},
             NAME: {api: 'name', dbName: 'name', mandatory: true},
             ITEM: {api: 'item', dbName: 'item', mandatory: true},
             WITHREPS: {api: 'withReps', dbName: 'withreps', mandatory: true}
        }
        this.mapper = new Mapper(this.tableName, this.fieldNames);
    }

    getJSONObject = (data) => this.mapper.getJSONObject(data)
}
module.exports = MetadataMapper;