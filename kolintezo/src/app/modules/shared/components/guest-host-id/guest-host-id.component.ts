import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-guest-host-id',
    templateUrl: './guest-host-id.component.html',
    styleUrls: ['./guest-host-id.component.css']
})
export class GuestHostIdComponent implements OnInit {

    @Input() values: { key: string, value: string}[];
    initValues: { key: string, value: string}[];
    @Input() label = 'NOT SET';
    @Input() required: boolean;
    @Input() model: string;
    formControl: FormControl;
    filterWord = '';

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {

    }


    get ok() {
        return this.formControl.valid;
    }

    get value() {
        return this.formControl.value;
    }


    ngOnInit(): void {
        const validators = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        if (!this.values) {
            this.values = [];
        }
        this.initValues = this.values;
        if (this.values.some( item => item.key === this.model)) {
            this.formControl = new FormControl(this.model, validators);
        } else {
            this.formControl = new FormControl(null, validators);
        }
    }

    public reset() {
        this.formControl.setValue(this.values[0].key);
        this.formControl.markAsUntouched();
    }

    filterResults() {
        this.values = [];
        this.initValues.forEach( (item) => {
            if (item.value.toLocaleLowerCase().indexOf(this.filterWord.toLocaleLowerCase()) !== -1) {
                this.values.push(item);
            }
        });
    }

    resetSearch() {
        this.filterWord = '';
        this.filterResults();
    }
}
