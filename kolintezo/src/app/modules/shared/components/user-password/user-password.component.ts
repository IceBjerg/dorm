import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {regexpValidator} from '../../../../helpers/validators.help';

@Component({
    selector: 'app-user-password',
    templateUrl: './user-password.component.html',
    styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

    @Input() model: string;
    @Input() required: boolean;
    public formControl: FormControl;
    @Output() valueChange = new EventEmitter();

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [
            Validators.minLength(8),
            regexpValidator(/([a-z])+/, 'lowercase'),
            regexpValidator(/([A-Z])+/, 'uppercase'),
            regexpValidator(/([0-9])+/, 'number'),
        ];
        if (this.required) {
            validators.push(Validators.required);
        }
        this.formControl = new FormControl(this.model,
            validators
        );
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

    modelChng() {
        if (this.ok) {
            this.valueChange.emit(true)
        }
    }
}
