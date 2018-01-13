import {Component, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {DialogComponent} from '../dialog/dialog.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';

/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-paging' ,
templateUrl: './paging.component.html' ,
styleUrls: ['./paging.component.css']
})
export class PagingComponent {
    @Input() page: number; // the current page
    @Input() count: number; // how many total items there are in all pages
    @Input() perPage: number; // how many items we want to show per page
    @Input() pagesToShow: number; // how many pages between next/prev
    @Input() loading: boolean;
    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
    foods = [
        {value: '5', viewValue: '5'},
        {value: '10', viewValue: '10'},
        {value: '20', viewValue: '20'}
      ];
      getMin(): number {
        return ((this.perPage * this.page) - this.perPage) + 1;
      }
    
      getMax(): number {
        let max = this.perPage * this.page;
        if (max > this.count) {
          max = this.count;
        }
        return max;
      }
    
      onPage(n: number): void {
        this.goPage.emit(n);
      }
    
      onPrev(): void {
        this.goPrev.emit(true);
      }
    
      onNext(next: boolean): void {
        this.goNext.emit(next);
      }
    
      totalPages(): number {
        return Math.ceil(this.count / this.perPage) || 0;
      }
    
      lastPage(): boolean {
        return this.perPage * this.page > this.count;
      }
    
      getPages(): number[] {
        const c = Math.ceil(this.count / this.perPage);
        const p = this.page || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
          if (pages.length < pagesToShow) {
            if (Math.min.apply(null, pages) > 1) {
              pages.push(Math.min.apply(null, pages) - 1);
            }
          }
          if (pages.length < pagesToShow) {
            if (Math.max.apply(null, pages) < c) {
              pages.push(Math.max.apply(null, pages) + 1);
            }
          }
        }
        pages.sort((a, b) => a - b);
        return pages;
      }
    }

