import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatToolbar,MatToolbarRow } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from 'ng-flex-layout';
@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports:[MatIcon,MatToolbar,MatListModule,MatToolbarRow,MatSidenavModule,FlexLayoutModule,
    MatFormFieldModule, MatButtonModule,FontAwesomeModule,MatNativeDateModule,MatInputModule ,MatDatepickerModule, CommonModule,MatSelectModule,FormsModule,
    ],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.css'
})
export class HeaderNavbarComponent  {

}
