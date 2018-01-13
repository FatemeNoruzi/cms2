import {Component, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {DialogComponent} from '../dialog/dialog.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/toPromise';
import {NgModule} from '@angular/core';

// Date Picker
import {NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendarPersian} from 'ng2-datepicker-jalali/persian/ngb-calendar-persian';
import {NgbDatepickerI18nPersian} from 'ng2-datepicker-jalali/persian/ngb-datepicker-i18n-persian';

/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-chart' ,
templateUrl: './chart.component.html' ,
styleUrls: ['./chart.component.css'],

// Date Picker
providers: [
  {provide: NgbCalendar, useClass: NgbCalendarPersian},
  {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian}
]

})
export class ChartComponent {

  displayedColumns = ['date' , 'number'];
  dataSource: ExampleDataSource;
  exampleDatabase = new ExampleDatabase();
  
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40]}
  ];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator);
  }

}

  export interface UserData {
    date: number;
    number: string;
  }

  const data: UserData[] = [
    {date: 1, number: 'Hydrogen'},
    {date: 2, number: 'Helium'},
    {date: 3, number: 'Lithium'},
    {date: 4, number: 'Beryllium'},
    {date: 5, number: 'Boron'},
    {date: 6, number: 'Carbon'},
    {date: 7, number: 'Nitrogen'},
    {date: 8, number: 'Oxygen'},
    {date: 9, number: 'Fluorine'},
    {date: 10, number: 'Neon'},
    {date: 11, number: 'Sodium'},
    {date: 12, number: 'Magnesium'},
    {date: 13, number: 'Aluminum'},
    {date: 14, number: 'Silicon'},
    {date: 15, number: 'Phosphorus'},
    {date: 16, number: 'Sulfur'},
    {date: 17, number: 'Chlorine'},
    {date: 18, number: 'Argon'},
    {date: 19, number: 'Potassium'},
    {date: 20, number: 'Calcium'},
  ];

  /**
   * Data source to provide what data should be rendered in the table. The observable provided
   * in connect should emit exactly the data that should be rendered by the table. If the data is
   * altered, the observable should emit that new set of data on the stream. In our case here,
   * we return a stream that contains only one set of data that doesn't change.
   */

  export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return data; }

  }



  export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
      super();
    }
    renderedData: UserData[] = [];
    connect(): Observable<UserData[]> {
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._sort.sortChange,
        this._paginator.page
      ];

      return Observable.merge(...displayDataChanges).map(() => {
        const sortedData = this.getSortedData();
              const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
              this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
              return this.renderedData;
            });
    }

    disconnect() {}

    /** Returns a sorted copy of the database data. */
    getSortedData(): UserData[] {
      const dataS = this._exampleDatabase.data.slice();
      if (!this._sort.active || this._sort.direction === '') { return dataS; }

      return dataS.sort((a, b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';

        switch (this._sort.active) {
          case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
          case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  /** Returns a sorted copy of the database data. */
  // sortData(data: UserData[]): UserData[] {
  //   if (!this._sort.active || this._sort.direction === '') { return data; }

  //   return data.sort((a, b) => {
  //     let propertyA: number|string = '';
  //     let propertyB: number|string = '';

  //     switch (this._sort.active) {
  //       case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
  //       case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
  //       case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
  //       case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
  //     }

  //     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

  //     return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  //   });
  // }


