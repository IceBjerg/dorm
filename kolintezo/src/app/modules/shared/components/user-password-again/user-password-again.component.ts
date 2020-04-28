import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {equalsValidator, regexpValidator} from '../../../../helpers/validators.help';
import {UserPasswordComponent} from '../user-password/user-password.component';

@Component({
    selector: 'app-user-password-again',
    templateUrl: './user-password-again.component.html',
    styleUrls: ['./user-password-again.component.css']
})
export class UserPasswordAgainComponent implements OnInit {
    @Input() model: string;
    @Input() required: boolean;
    @Input() otherPw: UserPasswordComponent;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [
            equalsValidator(this.otherPw, 'equals')
        ];
        if (this.required) {
            validators.push(Validators.required);
        }
        this.formControl = new FormControl(this.model,
            validators
        );
    }

    runValidation() {
        this.formControl.updateValueAndValidity();
    }

    get value() {
        return this.formControl.value;
    }

    get ok() {
        return this.formControl.valid;
    }

    public reset() {
        this.formControl.setValue('');
        this.formControl.markAsUntouched();
    }
}
