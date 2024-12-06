import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})

export class CalendarComponent {}

