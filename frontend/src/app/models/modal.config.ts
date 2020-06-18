export class ModalConfig {
  private id: string;
  private text: string;
  private canceButtonText: string;
  private acceptButtonText: string;
  public isAccepted: boolean;

  constructor(id: string, text: string, canceButtonText: string, acceptButtonText: string) {
    this.id = id;
    this.text = text;
    this.canceButtonText = canceButtonText;
    this.acceptButtonText = acceptButtonText;
  }

  public getId(): string {
    return this.id;
  }

  public getText(): string {
    return this.text;
  }

  public getCanceButtonText(): string {
    return this.canceButtonText;
  }

  public getAcceptButtonText(): string {
    return this.acceptButtonText;
  }

}
