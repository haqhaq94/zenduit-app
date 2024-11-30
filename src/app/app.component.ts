import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubmissionsComponent } from "./submissions/submissions.component";
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SubmissionsComponent, HeaderNavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zenduit-app';
}
