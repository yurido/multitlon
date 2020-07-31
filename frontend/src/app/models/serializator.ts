
export class Serializator {
  private childClassName: string;

  constructor(childName: string) {
    this.childClassName = childName;
  }

  public getObjectProperty(input: object, propertyName: string): any {
    // @ts-ignore
    if (!input.hasOwnProperty(propertyName) || input[propertyName] === undefined || input[propertyName] === null) {
      const message = `${this.childClassName} deserialization, property "${propertyName}" is undefined`;
      throw new SyntaxError(message);
    }
    // @ts-ignore
    return input[propertyName];
  }
}
