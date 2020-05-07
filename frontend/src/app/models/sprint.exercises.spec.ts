import { SprintExercises } from './sprint.exercises';
import {isUndefined} from 'util';

describe('SprintExercises', () => {
  it('should create an instance', () => {
    expect(new SprintExercises()).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const json = JSON.parse('{"sprintDay": {"date": 1581289200000, "isWeekend": false, "total": 1566}, "exercises":[]}');
    const sprintExercises = new SprintExercises().deserialize(json);

    expect(isUndefined(sprintExercises.getSprintDay())).toBeFalsy();
    expect(isUndefined(sprintExercises.getExercises())).toBeFalsy();
  });
});
