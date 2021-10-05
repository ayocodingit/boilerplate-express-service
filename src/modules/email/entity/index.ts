export namespace Email {
  export interface Payload {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
  }
}
