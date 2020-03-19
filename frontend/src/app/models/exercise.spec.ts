import {Exercise} from './exercise';

describe('Excercise', () => {
  it('should create an instance', () => {
    expect(new Exercise()).toBeTruthy();
  });

  it('should deserialize an instance', () => {
    const json = JSON.parse('{"id": "SHOULDERS", "name": "Shouldres", "date": 1581289200000, "reps": 15, "weight": 150, "rawPoints": 1500, "totalPoints": 1320, "distance": 0, "time": 0}');
    const exercise = new Exercise().deserialize(json);

    expect(exercise.getId()).toEqual('SHOULDERS');
    expect(exercise.getRawPoints()).toEqual(1500);
  });
});
