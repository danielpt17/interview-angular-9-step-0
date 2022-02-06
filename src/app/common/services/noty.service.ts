import {Injectable} from '@angular/core';
import { Message } from '../models/message.model';
import {Subject} from 'rxjs';

@Injectable()
export class NotyService {
  /**
   * An Observable from type Subject. Gets invoked when "postMessage" is used.
   * @returns Object from type "Message"
   * **/
  messageAdded = new Subject<Message>();
  private messages: Message[] = [];

  /**
   * Post a new message, responsible for storing the message and inform all the components subscribing to this change
   * @param message {Message}
   * **/
  postMessage(message: Message) {
    this.storeMessage(message);
    return this.messageAdded.next(message);
  }

  /**
   * Store message in messages array
   * Limits the messages array to the last 20 messages.
   * @param message {Message} accept a message object from type Message
   * */
  storeMessage(message: Message) {
    this.messages.push(message);
    this.messages = this.messages.slice(-20); // FIXME - maybe should move to a config??
  }

  /**
   * Get all the stored messages
   * @returns A copy of all the current stored messages array {Message[]}
   * */
  getMessages() {
    return this.messages.slice();
  }

}
