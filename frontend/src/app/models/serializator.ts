import {isUndefined} from 'util';

export class Serializator {
  private childClassName: string;

  constructor(childName: string) {
    this.childClassName = childName;
  }

  public getObjectProperty(input: object, propertyName: string): any {
    if (!input.hasOwnProperty(propertyName) || isUndefined(input[propertyName])) {
      throw SyntaxError(`${this.childClassName} deserialization, property "${propertyName}" is undefined`);
    }
    return input[propertyName];
  }
}
