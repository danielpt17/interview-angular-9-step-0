import {
  ChangeDetectionStrategy,
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
  selector: "app-hierarchy",
  templateUrl: "./hierarchy.component.html",
  styleUrls: ["./hierarchy.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HierarchyComponent implements OnInit, OnDestroy {
  @Input() hierarchy: string[] = null;
  @Input() showLoader: boolean;
  @Output() hierarchyItemSelected = new EventEmitter<ListItem>();
  subscriptions: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item: ListItem) {
    this.hierarchyItemSelected.emit(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
