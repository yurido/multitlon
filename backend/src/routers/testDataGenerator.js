const Router = require('express-promise-router');
const router = new Router();
const moment = require('moment');
const db = require('../db/db');
const errorService = require('../service/errorService');
const UsersMapper = require('../db/mapper/usersMapper');
const usersMapper = new UsersMapper();
const DaysOffMapper = require('../db/mapper/daysOffMapper');
const daysOffMapper = new DaysOffMapper();
const DATE_FORMAT = 'YYYY-MM-DD';

router.use((req, res, next) => {
  console.log('Router: TestDataGenerator');
  next();
});

// Generates test data for developing. Should not be included in Prod
router.get('/', async(req, res) => {

    try {
        // add new user
        const USERNAME = 'yuryd';
        var data = await db.getUserByUsername(USERNAME);

        if (data === undefined) {
            console.log(`user '${USERNAME}' is not found`);
            data = await db.createUser(USERNAME, 'password', 'u.dorofeev@gmail.com');
            console.log(`TEST user '${USERNAME}' with id ${data.user_id} is created!`);
        }
        // user mapping
        const user = usersMapper.getJSONObject(data);
        // console.log('user %s', user);

        // add days off
        // the whole month!
        const dateFrom = moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format(DATE_FORMAT);
        const dateTo = moment(new Date(new Date().getFullYear(), new Date().getMonth()+1, 0)).format(DATE_FORMAT);

        // console.log(`dateFrom=${dateFrom} - dateTo=${dateTo}`);
        data = await db.findDaysOff(user.userId, dateFrom, dateTo);
        if (data === undefined) {
            // add
            var daysOff = [];
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 2)).format(DATE_FORMAT) );
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 3)).format(DATE_FORMAT) );
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 8)).format(DATE_FORMAT) );
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 12)).format(DATE_FORMAT) );
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 22)).format(DATE_FORMAT) );
            daysOff.push( moment(new Date(new Date().getFullYear(), new Date().getMonth(), 23)).format(DATE_FORMAT) );

            await db.addDaysOff(user.userId, daysOff);
            console.log('6 days-off are added to db');
        }
        const daysOffJson = data.map( day => daysOffMapper.getJSONObject(day) );
        console.log('days-off:', daysOffJson);

        // add exercises

        res.json({status: 200, message: 'TEST data is added to DB'});
    } catch (err) {
        console.error(err);
        res.status(500).json(errorService.getErrorJSONObject(errorService.ErrorType.DB, err.toString()));
    }
});

module.exports = router;