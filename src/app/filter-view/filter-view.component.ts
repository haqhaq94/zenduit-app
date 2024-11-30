import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from 'ng-flex-layout';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-filter-view',
  imports: [MatIcon, MatListModule, MatSidenavModule, FlexLayoutModule,
    MatFormFieldModule, MatButtonModule, FontAwesomeModule, MatNativeDateModule, MatInputModule, MatDatepickerModule, CommonModule, MatSelectModule, MatDatepicker, MatButtonToggleGroup, MatButtonToggle, FormsModule],
 templateUrl: './filter-view.component.html',
 providers: [
  provideMomentDateAdapter(MY_FORMATS),
],
  styleUrl: './filter-view.component.css'
})
export class FilterViewComponent implements AfterViewInit{
  readonly date = new FormControl(moment());
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  @Output() searchChange = new EventEmitter<any | null>(); 
  @Output() formChange = new EventEmitter<any | null>(); 
  @Output() statusChange = new EventEmitter<any | null>(); 
  @Output() dateChange = new EventEmitter<any | null>(); 
  @Output() toggleView = new EventEmitter<number | null>(); 
  viewMode = "map";
  selectedDate: any;
  searchTerm: any;
  selectedForm: any;
  selectedStatus: any;
  data: any;
  statusOptions = [
    { value: 3, label: 'Complete' },
    { value: 1, label: 'Low Risk' },
    { value: 2, label: 'Uncomplete' },
    { value: 0, label: 'Unassigned' },
  ];
  forms = ['denisgordiyenya@gmail.com', 'john.doe@gmail.com', 'alice.smith@gmail.com','zendu@zenduit.com'];
 
  ngAfterViewInit(): void {
   console.log("Asdf");
  }
    
  exportData() {
    console.log('Exporting data...');
    alert('Data exported successfully!');
  }
  emitEvent(event: MatButtonToggleChange) {
   
    this.toggleView.emit( event.value);
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm); 
  }
  onFormChange(): void {
    this.formChange.emit(this.selectedForm); 
  }
  onStatusChange(): void {
    this.statusChange.emit(this.selectedStatus); 
  }
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value; 
    this.dateChange.emit(this.selectedDate); 
  }
  
}
