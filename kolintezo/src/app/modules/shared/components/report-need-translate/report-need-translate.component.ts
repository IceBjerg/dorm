import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-report-need-translate',
    templateUrl: './report-need-translate.component.html',
    styleUrls: ['./report-need-translate.component.css']
})
export class ReportNeedTranslateComponent implements OnInit {
    public values = [
        {
            key: null,
            value: ''
        },
        {
            key: true,
            value: 'ERROR-REPORT.NEED-TRANSLATE'
        },
        {
            key: false,
            value: 'ERROR-REPORT.NOT-NEED-TRANSLATE'
        },
    ];

    @Input() required: boolean;
    @Input() model: boolean;
    fC: FormControl;

    constructor(public configService: ConfigService, public responseHandler: ResponseHandlerService) {

    }


    get ok() {
        return this.fC.valid;
    }

    get value() {
        return this.fC.value;
    }


    ngOnInit(): void {
        const valids = this.required ? [ Validators.required ] : [];
        this.fC = new FormControl(this.model, valids);
    }

    public reset() {
        this.fC.setValue(null);
        this.fC.markAsUntouched();
    }

}
