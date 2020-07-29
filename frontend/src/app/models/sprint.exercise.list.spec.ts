import {SprintExerciseList} from './sprint.exercise.list';

describe('SprintCalendar', () => {
  it('should create an instance', () => {
    expect(new SprintExerciseList()).toBeTruthy();
  });

  it('should deserialize an empty calendar', () => {
    const json = JSON.parse('{"sprintExercises": []}');
    const calendar = new SprintExerciseList().deserialize(json);

    expect(calendar.getSprintExercises().length).toEqual(0);
  });

  it('should deserialize calendar without exercises', () => {
    // tslint:disable-next-line:max-line-length
    const json = JSON.parse('{"sprintExercises": [{"sprintDay": {"date": 1581289200000, "isWeekend": true, "total": 500}, "exercises":[]}]}');
    const calendar = new SprintExerciseList().deserialize(json);

    expect(calendar.getSprintExercises().length).toEqual(1);
    expect(calendar.getSprintExercises()[0].getExercises().length).toEqual(0);
  });
});
