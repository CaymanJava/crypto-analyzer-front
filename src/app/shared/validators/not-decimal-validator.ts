import { FormControl } from "@angular/forms";

export class NotDecimalValidator {

  static valid(control: FormControl) {
    if (isNaN(control.value) || +control.value % 1 != 0) {
      return {valid: true};
    }
    return null;
  }

}
