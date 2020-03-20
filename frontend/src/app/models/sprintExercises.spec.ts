import { SprintExercises } from './sprintExercises';
import {isUndefined} from 'util';

describe('SprintExercises', () => {
  it('should create an instance', () => {
    expect(new SprintExercises()).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const json = JSON.parse('{"sprintDate": {"date": 1581289200000, "isWeekend": false}, "exercises":[{"id": "SHOULDERS", "name": "Shouldres", "date": 1581289200000, "reps": 15, "weight": 150, "rawPoints": 1500, "totalPoints": 1320, "distance": 0, "time": 0}]}');
    const sprintExercises = new SprintExercises().deserialize(json);

    expect(isUndefined(sprintExercises.getSprintDate())).toBeFalsy();
    expect(isUndefined(sprintExercises.getExercises())).toBeFalsy();
  });
});