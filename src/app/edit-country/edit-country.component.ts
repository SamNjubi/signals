import 'zone.js/dist/zone';
import {
  Component,
  computed,
  effect,
  Input,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'edit-country-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Button count</h1>
    <div class="container d-flex">
      <div id="increment-count">
        <button class="btn btn-outline-primary" (click)="process('increment')">
          +
        </button>
      </div>
      <div id="total-count" class="mx-3 align-self-center">{{buttonCount()}}</div>
      <div id="decrement-count">
        <button class="btn btn-outline-warning" (click)="process('decrement')">
          -
        </button>
      </div>
    </div>
  `,
})
export class EditCountryComponent {
  @Input() childPopulation: Signal<number> = signal(0);
  @Input() buttonCount = signal(0);

  countFormControl = new FormControl<number>(0);

  process(value: string): void {
    if (value === 'increment') {
      this.buttonCount.set(this.buttonCount() + 1)
    } else {
      this.buttonCount.set(this.buttonCount() - 1)
    }
  }
}
