import {Component, OnDestroy, OnInit} from '@angular/core';



@Component({
  selector: 'zi-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

}
