import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

@Component({
    selector: 'app-report-type',
    templateUrl: './report-type.component.html',
    styleUrls: ['./report-type.component.css']
})
export class ReportTypeComponent implements OnInit {
    public values: { [key: string]: string};

    @Input() required: boolean;
    @Input() model: string;
    @Input() disabled = false;
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
        this.values = this.responseHandler.getErrorReportTypes();
        this.reset();
        if (this.model) {
            this.res = this.model;
        }
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    public reset() {
        this.res = this.getKeys(this.values)[0];
    }
}
