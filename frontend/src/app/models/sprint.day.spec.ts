import {SprintDay} from './sprint.day';

describe('SprintDay', () => {
  it('should deserialize an instance', () => {
    const json = JSON.parse('{"date": 1581289200000, "isWeekend": false, "total": 1500}');
    const sprintDate = new SprintDay().deserialize(json);

    expect(sprintDate.getSprintDate()).toEqual(1581289200000);
    expect(sprintDate.getIsWeekend()).toBeFalsy();
  });

  it('should throw exception when deserialize', () => {
    const json = JSON.parse('{"blabla": "blabla", "malmla": 1}');
    expect(() => new SprintDay().deserialize(json)).toThrow(new SyntaxError('SprintDay deserialization, property "date" is undefined'));
  });

  it('should throw exception when deserialize not json object', () => {
    expect(() => new SprintDay().deserialize({'bla': 'blablanblawq wrgsfdg sd hgtery ewtr yewrt ygfdhdfsfda asfd asrgf asfd'}))
      .toThrow(new SyntaxError('SprintDay deserialization, property "date" is undefined'));
  });
});
