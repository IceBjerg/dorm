import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {regexpValidator} from '../../../../helpers/validators.help';
import {isString} from 'util';

@Component({
    selector: 'app-room-capacity',
    templateUrl: './room-capacity.component.html',
    styleUrls: ['./room-capacity.component.css']
})
export class RoomCapacityComponent implements OnInit {

    @Input() model = 0;
    @Input() required: boolean;
    public formControl: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {
    }

    ngOnInit(): void {
        const validators = [
            regexpValidator(/^[0-9]*$/, 'onlynumber'),
        ];
        if (this.required) {
            validators.push(Validators.required);
        }
        this.formControl = new FormControl(+this.model,
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
        this.formControl.setValue(0);
        this.formControl.markAsUntouched();
    }

}
