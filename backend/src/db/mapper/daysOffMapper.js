const Mapper = require('./mapper');

class DaysOffMapper {
    constructor(){
        this.tableName = 'days_off';
        this.fieldNames = {
             USERID: {api: 'userId', dbName: 'user_id', mandatory: true},
             DAYOFF: {api: 'dayOff', dbName: 'day_off', mandatory: true}
        }
        this.mapper = new Mapper(this.tableName, this.fieldNames);
    }

    getJSONObject = data => {
        var obj = this.mapper.getJSONObject(data);
        obj.dayOff = new Date(obj.dayOff).getTime();
        return obj;
    }
}
module.exports = DaysOffMapper;