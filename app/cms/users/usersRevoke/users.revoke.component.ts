import {Component, ElementRef, ViewChild, Inject} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MdPaginator, MdSort, MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UsersRevokeSearchComponent} from './dialogComponent/usersRevokeSearch/users.revoke.search.component';
import {NgModule} from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/toPromise';

/**
 * @title Feature-rich data table
 */
@Component ({
selector: 'app-users' ,
templateUrl: './users.revoke.component.html' ,
styleUrls: ['./users.revoke.component.css']
})
  
export class UsersRevokeComponent {

    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ]; 
         displayedColumns = ['select', 'id', 'name', 'weight', 'symbol', 'action'];
exampleDatabase = new ExampleDatabase();
selection = new SelectionModel<number>(true, []);
dataSource: ExampleDataSource | null;

@ViewChild(MdSort) sort: MdSort;
@ViewChild(MdPaginator) paginator: MdPaginator;
constructor(public dialog: MdDialog) {}
startDate: string;
endDate: string;
title: string;
code: number;
type: string;

openSearchDialog(): void {
    const dialogRef = this.dialog.open(UsersRevokeSearchComponent, {
    width: '350px',
    data: { startDate: this.startDate, endDate: this.endDate, title: this.title, code: this.code, type: this.type  }
    });

    dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    });
}
ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator);
}
    isAllSelected(): boolean {


    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; } else {
    return this.selection.selected.length === this.exampleDatabase.data.length;

}
}

masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
    this.selection.clear();
    }else {
    this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
}
}

export interface UserData {
id: number;
name: string;
weight: number;
symbol: string;
}

const data: UserData[] = [
{id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
{id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
{id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
{id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
{id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
{id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
{id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
{id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
{id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
{id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
{id: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
{id: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
{id: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
{id: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
{id: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
{id: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
{id: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
{id: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
{id: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
{id: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

export class ExampleDatabase {
/** Stream that emits whenever the data has been modified. */
dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
get data(): UserData[] { return data; }
}

/** An example database that the data source uses to retrieve data for the table. */

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort,  private _paginator: MdPaginator) {
    super();
}
renderedData: UserData[] = [];
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<UserData[]> {
    const displayDataChanges = [
    this._exampleDatabase.dataChange,
    this._sort.sortChange,
    this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
    // return this.getSortedData();
    const sortedData = this.getSortedData();

    // Grab the page's slice of the filtered sorted data.
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
    return this.renderedData;
    });
}

disconnect() {}

/** Returns a sorted copy of the database data. */
getSortedData(): UserData[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
    let propertyA: number|string = '';
    let propertyB: number|string = '';

    switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'progress': [propertyA, propertyB] = [a.weight, b.weight]; break;
        case 'color': [propertyA, propertyB] = [a.symbol, b.symbol]; break;
    }

    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
}
}

