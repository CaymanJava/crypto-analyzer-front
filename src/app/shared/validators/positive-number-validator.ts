import { FormControl } from "@angular/forms";

export class PositiveNumberValidator {

  static valid(control: FormControl) {
    if (isNaN(control.value) || +control.value <= 0) {
      return {valid: true};
    }
    return null;
  }

}
