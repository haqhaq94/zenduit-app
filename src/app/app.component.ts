import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubmissionsComponent } from "./submissions/submissions.component";
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { FilterViewComponent } from "./filter-view/filter-view.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderNavbarComponent, FilterViewComponent, ListViewComponent, SubmissionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ListViewComponent) listView: ListViewComponent;
  @ViewChild(SubmissionsComponent) submissionView: SubmissionsComponent;
  constructor(private cdr: ChangeDetectorRef) {};
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  title = 'zenduit-app';
  viewMode = 'map';
  selectedFrom: string | null = null;
  searchTerm: string | null = null;
  selectedStatus: string | null = null; 
  selectedDate: Date  = moment("1900-12-25").toDate(); 
  applyFilters(): void {
    let filteredData = this.dataSource.data;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(term)
        )
      );
    }
    if (this.selectedStatus !== null) {
      filteredData = filteredData.filter((row) => row.Status == this.selectedStatus?.toString());
    }
    if (this.selectedDate != null && this.selectedDate.getFullYear != undefined && this.selectedDate.getFullYear() != 1900) {
      filteredData = filteredData.filter((row) =>
        new Date(row.DueDate).toDateString() === this.selectedDate.toDateString()
      );
    }else if ( this.selectedDate != null &&  this.selectedDate.getFullYear == undefined){
      filteredData = filteredData.filter((row) =>
        new Date(row.DueDate).toDateString() === new Date(moment(this.selectedDate).toDate()).toDateString()
      );
    }

    if (this.selectedFrom) {
      filteredData = filteredData.filter((row) => row.From === this.selectedFrom);
    }

    this.filteredDataSource.data = filteredData;
  }


  searchChange(value:any) {
    this.searchTerm = value;
    this.applyFilters();
    this.renderMap();
    
  }
 
  statusChange(value:any) {
    this.selectedStatus = value;
    this.applyFilters();
    this.renderMap();
  }
  formChange(value:any) {
   this.selectedFrom = value;
   this.applyFilters();
   this.renderMap();
  }

  dateChange(value:any) {
    this.selectedDate = value;
    this.applyFilters();
    this.renderMap();
  }
  OnToggleView(param: any) {
    this.cdr.detectChanges();
    this.viewMode = param;
  }
  renderMap(){
    if ( this.viewMode == "map") this.submissionView.renderMap(this.submissionView.mapContainer.nativeElement.lastChild);
  }
}
export interface PeriodicElement {
  Task: string;
  Status: string;
  From: string;
  To: string;
  CustomerAddress : string;
  DueDate: string;
  position:number
  lat:number,
  lng:number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Task: 'Work Flow: Requires Location',
    Status: '1', // Low Risk
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    DueDate: '2024 Oct 6, 02:38 AM',
    position: 1,
    lat: 43.6707974, lng: -79.347015
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '1', 
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    DueDate: '2024 Oct 6, 01:40 PM',
    position: 2,
    lat: 43.653908, lng: -79.384293
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '2', // Uncomplete
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '4140 Parker Rd. Allentown, New Mexico 31134',
    DueDate: '2024 Oct 7, 01:14 AM',
    position: 3,
    lat:43.662301, lng: -79.329356
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '0', // Unassigned
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    DueDate: '2024 Oct 7, 01:14 AM',
    position: 4,
    lat: 43.662301, lng: -79.395293
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '0', // Unassigned
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '4517 Washington Ave. Manchester, Kentucky 39495',
    DueDate: '2024 Oct 7, 03:56 AM',
    position: 5,
    lat: 43.662301, lng: -79.953293
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '2', // Uncomplete
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '8502 Preston Rd. Inglewood, Maine 98380',
    DueDate: '2024 Oct 7, 04:20 PM',
    position: 6,
    lat: 43.662301, lng: -79.395293
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '2', // Uncomplete
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '8502 Preston Rd. Inglewood, Maine 98380',
    DueDate: '2024 Oct 8, 04:12 AM',
    position: 7,
    lat: 43.662301, lng: -79.293953
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '1', // Low Risk
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    DueDate: '2024 Oct 8, 04:37 AM',
    position: 8,
    lat: 43.662301, lng: -79.933952
  },
  {
    Task: 'Work Flow: Requires Location',
    Status: '1', // Low Risk
    From: 'zendu@zenduit.com',
    To: 'tracy@zenduit.com',
    CustomerAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    DueDate: '2024 Oct 9, 06:12 PM',
    position: 9,
    lat: 43.662301, lng: -79.523993
  },
];
