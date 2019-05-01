import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input-error',
  templateUrl: './form.input.error.component.html'
})
export class FormInputErrorComponent {
  @Input() control: FormControl;
}
