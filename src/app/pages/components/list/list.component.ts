import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ListItem } from "../../../common/models/list-item";
import { Subscription } from "rxjs";

@Component({
  selector: "zi-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() items: Array<ListItem> = [];
  @Input() selectedItem: ListItem;
  @Input() showLoader: boolean;
  @Input() headerText: string;
  @Output() itemSelected = new EventEmitter<ListItem>();
  subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item: ListItem) {
    this.itemSelected.emit(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
