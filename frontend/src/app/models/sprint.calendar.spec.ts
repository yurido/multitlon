import {SprintCalendar} from './sprint.calendar';
import {isUndefined} from 'util';

describe('SprintCalendar', () => {
  it('should create an instance', () => {
    expect(new SprintCalendar()).toBeTruthy();
  });

  it('should deserialize an empty calendar', () => {
    const json = JSON.parse('{"sprintExercises": []}');
    const calendar = new SprintCalendar().deserialize(json);

    expect(calendar.getSprintExercises().length).toEqual(0);
  });

  it('should deserialize calendar without exercises', () => {
    // tslint:disable-next-line:max-line-length
    const json = JSON.parse('{"sprintExercises": [{"sprintDay": {"date": 1581289200000, "isWeekend": true, "total": 500}, "exercises":[]}]}');
    const calendar = new SprintCalendar().deserialize(json);

    expect(calendar.getSprintExercises().length).toEqual(1);
    expect(isUndefined(calendar.getSprintExercises()[0].getSprintDay() )).toBeFalsy();
    expect(calendar.getSprintExercises()[0].getExercises().length).toEqual(0);
  });
});
