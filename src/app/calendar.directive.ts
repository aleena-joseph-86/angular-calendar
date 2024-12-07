import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
  ApplicationRef,
  NgZone,
} from '@angular/core';
import { Calendar } from 'primeng/calendar';

const primeNgButtonClasses = 'p-button-text p-ripple p-button p-component';
const styles = `
  .toggle-wrapper {
      display: flex;
      align-items: center;
  }

  .toggle-wrapper button {
      letter-spacing: .03125rem;
      padding: 0.5rem;
  }

  .toggle-wrapper button:focus {
    box-shadow: none;
  }

  .toggle-wrapper button.selected {
    cursor: default;
    font-weight: 700;
    letter-spacing: 0;
  }

  .toggle-wrapper span {
      font-size: 1.25em;
      opacity: 0.7;
      padding: 0;
  }
`;

@Directive({
  selector: '[appCalendar]',
  standalone: true,
})
export class CalendarDirective implements OnInit, OnDestroy {
  stopListening: any;
  toggleWrapper: HTMLDivElement | null = null;
  buttons: HTMLButtonElement[] | null = null;

  constructor(
    private el: ElementRef,
    private calendar: Calendar,
    private rn: Renderer2,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.calendar.onShow.subscribe(() => {
      this.addToggleButtonToButtonBar();
    });
  }

  ngOnDestroy() {
    if (this.stopListening) {
      this.stopListening.forEach((fn: any) => fn());
    }

    this.toggleWrapper = null;
    this.buttons = null;
  }

  addToggleButtonToButtonBar() {
    if (!this.toggleWrapper) {
      const toggleWrapper = this.rn.createElement('div');
      const broadcast = this.rn.createElement('button');
      const standard = this.rn.createElement('button');
      const buttonSeparator = this.rn.createElement('span');
      const styleEl = this.rn.createElement('style');

      this.rn.appendChild(styleEl, this.rn.createText(styles));
      this.rn.appendChild(standard, this.rn.createText('Standard'));
      this.rn.appendChild(broadcast, this.rn.createText('Broadcast'));
      this.rn.appendChild(buttonSeparator, this.rn.createText('|'));
      this.rn.appendChild(toggleWrapper, styleEl);
      this.rn.appendChild(toggleWrapper, standard);
      this.rn.appendChild(toggleWrapper, buttonSeparator);
      this.rn.appendChild(toggleWrapper, broadcast);

      this.rn.addClass(toggleWrapper, 'toggle-wrapper');
      this.rn.setAttribute(standard, 'class', primeNgButtonClasses);
      this.rn.setAttribute(broadcast, 'class', primeNgButtonClasses);
      this.rn.setAttribute(buttonSeparator, 'class', 'p-button p-button-text');

      this.toggleWrapper = toggleWrapper;
      this.buttons = [standard, broadcast];
      this.stopListening = [
        this.rn.listen(standard, 'click', () => {
          this.calendar.showWeek = false;
          this.calendar.updateUI();
        }),
        this.rn.listen(broadcast, 'click', () => {
          this.calendar.showWeek = true;
          this.calendar.updateUI();
        }),
      ];
    }

    const buttonBar = this.el.nativeElement.querySelector(
      '.p-datepicker-buttonbar'
    );

    const lastButton = buttonBar.children[1];
    this.rn.insertBefore(buttonBar, this.toggleWrapper, lastButton);
  }
}
