import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-guest-guest-id',
    templateUrl: './guest-guest-id.component.html',
    styleUrls: ['./guest-guest-id.component.css']
})
export class GuestGuestIdComponent implements OnInit {

    @Input() model: string;
    @Input() required: boolean;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [];
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
