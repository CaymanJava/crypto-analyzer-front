import { FormControl } from "@angular/forms";

export class ArraySizeValidator {

  static valid(control: FormControl) {
    if (control.value == null || control.value.length == 0) {
      return {valid: true};
    }
    return null;
  }

}
