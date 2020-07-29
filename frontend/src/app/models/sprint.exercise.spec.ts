import { SprintExercise } from './sprint.exercise';

describe('SprintExercises', () => {
  it('should create an instance', () => {
    expect(new SprintExercise()).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const json = JSON.parse('{"sprintDay": {"date": 1581289200000, "isWeekend": false, "total": 1566}, "exercises":[]}');
    const sprintExercises = new SprintExercise().deserialize(json);

    expect(sprintExercises.getSprintDay() === undefined).toBeFalsy();
    expect(sprintExercises.getExercises() === undefined).toBeFalsy();
  });
});
