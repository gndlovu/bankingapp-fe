import { Component, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../shared/validators/form-fields.validator';

@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null">{{ errorMessage }}</div>`
})
export class ControlMessagesComponent {
    @Input() control: AbstractControl | null = new FormControl();

    get errorMessage() {
        for (let propertyName in this.control?.errors) {
            if (this.control?.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}
