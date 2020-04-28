import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {regexpValidator} from '../../../../helpers/validators.help';

@Component({
    selector: 'app-room-floor',
    templateUrl: './room-floor.component.html',
    styleUrls: ['./room-floor.component.css']
})
export class RoomFloorComponent implements OnInit {

    @Input() model: number;
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
        this.formControl.setValue('');
        this.formControl.markAsUntouched();
    }
}
