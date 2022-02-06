import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'zi-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() maxResults: number;
  @Input() itemsPerPage: number;
  @Input('page') currentPage: number;

  rangeSize: number;
  curPage: number;
  pages: Array<number> = [];
  showPagination = true;
  showNextBtn: boolean;
  showPrevBtn: boolean;

  @Output() pageChanged = new EventEmitter<{page: number}>();

  constructor() {
    this.rangeSize = 9;
    this.curPage = this.currentPage || 1;
    this.pages = [];
  }

  ngOnChanges() {
    this.curPage = this.currentPage || 1;
    this.pages = this.range(this.maxResults);
    this.showNextPrevButton();
    this.showPagination = this.pageCount(this.maxResults) > 1;
  }

  goToPage(newPage) {
    this.curPage = newPage;
    this.pageChanged.emit({page: this.curPage});
    this.showNextPrevButton();
    this.pages = this.range(this.maxResults);
  }

  goToNextPage() {
    this.goToPage(this.curPage + 1);
  }

  goToPreviousPage() {
    if (this.curPage > 1) {
      this.curPage -= 1;
      this.pageChanged.emit({page: this.curPage});
    }
    this.showNextPrevButton();
    this.pages = this.range(this.maxResults);
  }

  public range(maxResults) {
    const ps = [];
    const currentPage = this.curPage;
    const maxPages = this.pageCount(maxResults);
    if (currentPage < 5) {
      const minPage = Math.min(9, maxPages);
      for (let i = 1; i <= minPage; i++) {
        ps.push(i);
      }
    } else if (currentPage < 4) {
      for (let i = currentPage - 4; i < currentPage - 4 + this.rangeSize; i++) {
        if (i > 0) {
          ps.push(i);
        }
      }
    } else if (4 <= currentPage) {
      for (let i = currentPage - 4; i < currentPage + 5; i++) {
        if (i > 0 && i <= maxPages) {
          ps.push(i);
        }
      }
    }
    return ps;
  }

  public pageCount(maxResults) {
      return Math.ceil(maxResults / this.itemsPerPage);
  }

  public showNextPrevButton() {
    this.showNextBtn = this.showNextPage();
    this.showPrevBtn = this.showPrevPage();
  }

  public showNextPage() {
    return this.curPage < this.pageCount(this.maxResults);
  }

  public showPrevPage() {
    return this.curPage > 1;
  }

}
