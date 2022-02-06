import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotyService} from '../../services/noty.service';
import {Message} from '../../models/message.model';
import {MessageType} from '../../models/message-type';
import {Subscription} from 'rxjs';


@Component({
  selector: 'zi-noty',
  templateUrl: './noty.component.html',
  styleUrls: ['./noty.component.scss']
})
export class NotyComponent implements OnInit, OnDestroy {
  private classesMap;
  message: Message;
  subscription: Subscription;
  timeout;

  constructor(private notyService: NotyService) {}

  ngOnInit() {
    this.initClassMapObj();

    this.subscription = this.notyService.messageAdded
      .subscribe(
        (message: Message) => {
          this.message = message;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.deleteMessage();
          }, message.delay);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Setup the "classesMap" object to store all message properties (Style Class, Image source)
   * Invoked on the Init of the noty.component.ts
   */
  initClassMapObj() {
    this.classesMap = {};
    this.classesMap[MessageType.DEFAULT] = {styleClass: 'default', imageSrc: ''};
    this.classesMap[MessageType.ERROR] = {styleClass: 'error', imageSrc: '/assets/images/noty/exit_in_circle.png'};
    this.classesMap[MessageType.INFO] = {styleClass: 'info', imageSrc: '/assets/images/noty/info_notification_in_circle.png'};
    this.classesMap[MessageType.WARNING] = {styleClass: 'warning', imageSrc: '/assets/images/noty/exclamation_in_circle.png'};
    this.classesMap[MessageType.SUCCESS] = {styleClass: 'success', imageSrc: '/assets/images/noty/success_in_circle.png'};
  }

  /**
   * Extract the message's properties to build the relevant message (Class, Image source).
   * Invoked for every creation of a message on the noty.component.html
   * @param type {MessageType} The type of the message (ERROR, SUCCESS, INFO, WARNING, DEFAULT)
   * @returns Message properties from classes map object {object}
   */
  getMessageProperties(type: MessageType) {
    return this.classesMap[type] || this.classesMap[MessageType.DEFAULT];
  }

  /**
   * Deletes the current message.
   */
  deleteMessage() {
    delete this.message;
  }

}
