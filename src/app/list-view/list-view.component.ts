import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-list-view',
  imports: [MatTableModule,MatPaginator,MatCheckboxModule,CommonModule,MatIcon],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['checkbox', 'Task', 'Status', 'From', 'To','Customer Address','Due Date'];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() filteredDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filteredDataSource.paginator = this.paginator;
  }
  selection = new SelectionModel<any>(true, []);
  
  getStatusClass(status: number): string {
    const num = Number(status);
    switch (num) {
      case 1: return 'lowrisk';
      case 2: return 'uncomplete';
      case 3: return 'complete';
      default: return 'unassigned';
    }
  }

  getStatusLabel(status: number): string {
    const num = Number(status);
    switch (num) {
      case 1: return 'Low Risk';
      case 2: return 'Uncomplete';
      case 3: return 'complete';
      case 0: return 'Unassigned';
      default: return '';
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  formatDueDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(date).toLocaleString('en-US', options);
  }
}

