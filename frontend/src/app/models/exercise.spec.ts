import {Exercise} from './exercise';

describe('Excercise', () => {
  it('should create an instance', () => {
    expect(new Exercise()).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const json = JSON.parse('{"id": 1, "sid": "SHOULDERS", "date": 1581289200000, "reps": [], "rawPoints": 1500, "totalPoints": 1320, "time": 0}');
    const exercise = new Exercise().deserialize(json);

    expect(exercise.getSid()).toEqual('SHOULDERS');
    expect(exercise.getRawPoints()).toEqual(1500);
  });
});
