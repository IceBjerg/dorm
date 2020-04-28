import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-report-text',
    templateUrl: './report-text.component.html',
    styleUrls: ['./report-text.component.css']
})
export class ReportTextComponent implements OnInit {

    @Input() model: string;
    @Input() required: boolean;
    @Input() disabled = false;
    @Input() rows = 5;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [

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
