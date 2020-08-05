import { SprintExercise } from './sprint.exercise';
import {SprintDay} from './sprint.day';

describe('SprintExercises', () => {
  it('should create an instance', () => {
    expect(new SprintExercise(new SprintDay(1234, false, 123))).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const sprintExercises = new SprintExercise(new SprintDay(1581289200000, false, 1566));
    expect(sprintExercises.getSprintDay() === undefined).toBeFalsy();
    expect(sprintExercises.getExercises() === undefined).toBeFalsy();
  });
});
