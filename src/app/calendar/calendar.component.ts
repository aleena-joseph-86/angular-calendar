import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CalendarDirective } from '../calendar.directive';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, CalendarDirective],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  
}
