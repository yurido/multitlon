import {SprintCalendar} from './sprintCalendar';
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
    const json = JSON.parse('{"sprintExercises": [{"sprintDate": {"date": 1581289200000, "isWeekend": true}, "exercises":[]}]}');
    const calendar = new SprintCalendar().deserialize(json);

    expect(calendar.getSprintExercises().length).toEqual(1);
    expect(isUndefined(calendar.getSprintExercises()[0].getSprintDate())).toBeFalsy();
    expect(calendar.getSprintExercises()[0].getExercises().length).toEqual(0);
  });
});
