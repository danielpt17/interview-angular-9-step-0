import {MessageType} from './message-type';

export class Message {
  constructor(public type: MessageType, public content: string, public delay: number = 15000, public time: number = Date.now(), public id?: number) {}
}
