import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { IdentityComponent } from './identity/identity.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ValueComponent } from './value/value.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HomeComponent,
    TimelineComponent,
    ValueComponent,
    IdentityComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
