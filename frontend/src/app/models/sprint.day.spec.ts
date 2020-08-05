import {SprintDay} from './sprint.day';

describe('SprintDay', () => {
  it('should deserialize an instance', () => {
    const sprintDate = new SprintDay(1581289200000, false, 1500);
    expect(sprintDate.getSDate()).toEqual(1581289200000);
    expect(sprintDate.getIsDayOff()).toBeFalsy();
  });
});
