const Mapper = require('./mapper');

class UserMapper {
    constructor() {
        this.tableName = 'users';
        this.fieldNames = {
             USERID: {api: 'userId', dbName: 'user_id', mandatory: true},
             USERNAME: {api: 'userName', dbName: 'user_name', mandatory: true},
             PASSWORD: {api: 'password', dbName: 'password', mandatory: true},
             EMAIL: {api: 'email', dbName: 'email', mandatory: true},
             WEIGHT: {api: 'weight', dbName: 'weight', mandatory: false},
             DOB: {api: 'dob', dbName: 'dob', mandatory: false}
        }
        this.mapper = new Mapper(this.tableName, this.fieldNames);
    }

    getJSONObject = (data) => this.mapper.getJSONObject(data)
}

module.exports = UserMapper;