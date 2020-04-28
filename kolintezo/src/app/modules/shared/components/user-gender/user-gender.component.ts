import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-user-gender',
    templateUrl: './user-gender.component.html',
    styleUrls: ['./user-gender.component.css']
})
export class UserGenderComponent implements OnInit {
    @Input() required: boolean;
    public values = [
        {
            key: 'male',
            value: 'USER.GENDER.MALE'
        },
        {
            key: 'female',
            value: 'USER.GENDER.FEMALE'
        }
    ];
    @Input() model: string;
    public res: string;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {

    }

    get ok() {
        return !!this.res;
    }

    get value() {
        return this.res;
    }


    ngOnInit(): void {
        this.reset();
        if (this.model) {
            this.res = this.model;
        }
    }

    public reset() {
        this.res = this.values[0].key;
    }

}
