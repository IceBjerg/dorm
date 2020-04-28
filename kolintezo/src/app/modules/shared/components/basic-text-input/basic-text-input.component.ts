import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-basic-text-input',
    templateUrl: './basic-text-input.component.html',
    styleUrls: ['./basic-text-input.component.css']
})
export class BasicTextInputComponent implements OnInit {

    @Input() label = '!!!!!!!NOT SET!!!!!!!!!!!!!!!! ';
    @Input() placeholder = '!!!!!!!NOT SET!!!!!!!!!!!!!!!! ';
    @Input() maxLength = 255;
    @Input() model: string;
    @Input() required: boolean;
    @Input() disabled = false;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [
            Validators.maxLength(this.maxLength)
        ];
        if (this.required) {
            validators.push(Validators.required);
        }
        this.formControl = new FormControl({
                value: this.model,
                disabled: this.disabled
            },
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
