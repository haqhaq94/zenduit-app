import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import * as _moment from 'moment';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {default as _rollupMoment, Moment} from 'moment';
import { FormControl} from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule  } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from 'ng-flex-layout';
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
  selector: 'app-submissions',
  standalone: true,
  imports:[MatIcon,MatListModule,MatSidenavModule,FlexLayoutModule,
    MatFormFieldModule, MatButtonModule,FontAwesomeModule,MatNativeDateModule,MatInputModule ,MatDatepickerModule, CommonModule,MatSelectModule,MatDatepicker,MatButtonToggleGroup, MatButtonToggle,FormsModule,
    ],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css',
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsComponent implements AfterViewInit {
  readonly date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  private map?: H.Map;
  faicon = faCircle;
  @ViewChild('mapContainer', { static: false }) mapContainer !: ElementRef; 
  viewMode = 'map'; 
  platform: any; 
  svg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2281_9719)">
<circle cx="24" cy="20" r="20" fill="#2188D9"/>
<circle cx="24" cy="20" r="19" stroke="white" stroke-width="2"/>
</g>
<path d="M16.9688 32H31.0312C32.1944 32 33.1406 31.0538 33.1406 29.8906V15.0312H28.2188C27.0556 15.0312 26.1094 14.085 26.1094 12.9219V8H16.9688C15.8056 8 14.8594 8.94622 14.8594 10.1094V29.8906C14.8594 31.0538 15.8056 32 16.9688 32ZM19.0781 19.2969C19.0781 18.9082 19.3926 18.5938 19.7812 18.5938H28.2188C28.6074 18.5938 28.9219 18.9082 28.9219 19.2969V26.3281C28.9219 26.7168 28.6074 27.0312 28.2188 27.0312H19.7812C19.3926 27.0312 19.0781 26.7168 19.0781 26.3281V19.2969Z" fill="white"/>
<path d="M20.4844 20H27.5156V25.625H20.4844V20Z" fill="white"/>
<path d="M28.2188 13.6249H32.7286L27.5156 8.41187V12.9218C27.5156 13.3097 27.8308 13.6249 28.2188 13.6249Z" fill="white"/>
<defs>
<filter id="filter0_d_2281_9719" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2281_9719"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2281_9719" result="shape"/>
</filter>
</defs>
</svg>
`;
    icon = new H.map.Icon(this.svg, {
      anchor: { x: 24, y: 58 } // x: center horizontally, y: slightly below the bottom tip of the marker
  });
  forms = ['denisgordiyenya@gmail.com', 'john.doe@gmail.com', 'alice.smith@gmail.com','alice.smith@gmail.com'];
  statuses = ['Uncomplete', 'Complete', 'Needs Review'];
  markers: { lat: number; lng: number; title: string }[] = [
    { lat: 43.6707974, lng: -79.347015, title: 'Marker 1' },
    { lat: 43.653908, lng: -79.384293, title: 'Marker 2' },
    { lat: 43.662301, lng: -79.329356, title: 'Marker 3' },
    { lat: 43.662301, lng: -79.395293, title: 'Marker 4' },
    { lat: 43.663213 , lng: -79.387359, title: 'Marker 5' },
    
  ];
  selectedForm: string | null = null;
  searchTerm: string | null = null;
  selectedStatus: string | null = null; 
  
  selectedDate: Date | null = null;
  submissions = [
    {
      title: 'Work Flow: Requires Location',
      from: 'denisgordiyenya@gmail.com',
      to: 'denisgordiyenya@gmail.com',
      dueDate:  '2024-12-09',
      status: {key:'Uncomplete', value:'Uncomplete'},
      coordinates: {  lat: 43.6707974, lng: -79.347015 }
    },
    {
      title: 'Work Flow: Requires Location',
      from: 'john.doe@gmail.com',
      to: 'jane.doe@gmail.com',
      dueDate:  '2024-12-08',
      status: {key:'Complete', value:'Complete'},
      coordinates: { lat: 43.653908, lng: -79.384293}
    },
    {
      title: 'Work Flow: Requires Location',
      from: 'alice.smith@gmail.com',
      to: 'bob.smith@gmail.com',
      dueDate:  '2024-12-07',
      status: {key:'Uncomplete', value:'Uncomplete'},
      coordinates: { lat:43.662301, lng: -79.329356 }
    },
    {
      title: 'Work Flow: Requires Location',
      from: 'alice.smith@gmail.com',
      to: 'bob.smith@gmail.com',
      dueDate: '2024-12-06',
      status: {key:'needreview', value:'Needs Review'},
      coordinates: {  lat: 43.662301, lng: -79.395293 }
    }
  ];
  
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    
    if (!this.map && this.mapContainer ) {
      this.renderMap(this.mapContainer .nativeElement.lastChild);
    }
  }
  onFilterChange() {
    if (this.viewMode === 'map') {
      this.renderMap(this.mapContainer .nativeElement.lastChild);
    }
  }
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value; 
  }
  get filteredSubmissions() {
    return this.submissions.filter((submission) => {
      const matchesForm = !this.selectedForm || submission.from === this.selectedForm;
      const matchesStatus = !this.selectedStatus || submission.status.value === this.selectedStatus;
      let matchesDate = true; 
      if (this.selectedDate) {
        const selectedDate = new Date(this.selectedDate).toDateString();
        const submissionDate = new Date(submission.dueDate).toDateString();
        matchesDate = selectedDate === submissionDate; // Compare the dates
      }


      const matchesSearchTerm = !this.searchTerm || 
      submission.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      submission.from.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      submission.to.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      submission.status.value.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesForm && matchesStatus && matchesDate && matchesSearchTerm;
      
    });
  }
  addMarkers(map : any): void {
   
    this.filteredSubmissions.forEach((markerData) => {
      const marker = new H.map.Marker({ lat: markerData.coordinates.lat, lng: markerData.coordinates.lng });
      marker.setIcon(this.icon);
      map.addObject(marker);
    });
  }
  toggleView(event: MatButtonToggleChange) {
    this.cdr.detectChanges();
    console.log('Selected value:', event.value);
    if ( event.value  == "map"){
      this.renderMap(this.mapContainer .nativeElement.lastChild);
    }
    
  }
  exportData() {
    console.log('Exporting data...');
    alert('Data exported successfully!');
  }
  renderMap(container: HTMLElement){
    setTimeout(() => {
      const platform = new H.service.Platform({
        apikey: '7dtFWhJg14FLwTVo_eg5dy15SGkxMZgLGcNTSLPhsIo'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        container,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat:43.662301, lng: -79.329356},
          zoom: 13,
        },
      );
      
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
     
      H.ui.UI.createDefault(map, layers);
       this.map = map;
      onResize(container, () => {
        map.getViewPort().resize();
      }); 
    this.addMarkers(this.map);
     
    }, 1000);
  
  }
}
