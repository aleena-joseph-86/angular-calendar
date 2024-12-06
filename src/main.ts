import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// To solve the calendar popup not showing: https://stackoverflow.com/questions/71085782/primeng-calendar-wont-show-popup

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync()],
}).catch((err) => console.error(err));
