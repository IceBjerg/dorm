import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {regexpValidator} from '../../../../helpers/validators.help';

@Component({
    selector: 'app-user-neptun',
    templateUrl: './user-neptun.component.html',
    styleUrls: ['./user-neptun.component.css']
})
export class UserNeptunComponent implements OnInit {

    @Input() model: string;
    @Input() required: boolean;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [
            Validators.minLength(6),
            regexpValidator(/^[0-9a-zA-Z]*$/, 'neptun'),
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
}
