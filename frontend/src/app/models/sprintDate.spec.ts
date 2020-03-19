import {SprintDate} from './sprintDate';

describe('SprintDate', () => {
  it('should deserialize an instance', () => {
    const json = JSON.parse('{"date": 1581289200000, "isWeekend": false}');
    const sprintDate = new SprintDate().deserialize(json);

    expect(sprintDate.getSprintDate()).toEqual(1581289200000);
    expect(sprintDate.getIsWeekend()).toBeFalsy();
  });

  it('should throw exception when deserialize', () => {
    const json = JSON.parse('{"blabla": "blabla", "malmla": 1}');
    expect(() => new SprintDate().deserialize(json)).toThrow(new SyntaxError('SprintDate deserialization, property "date" is undefined'));
  });

});
