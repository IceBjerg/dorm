import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportTypeComponent} from '../shared/components/report-type/report-type.component';
import {ReportLocComponent} from '../shared/components/report-loc/report-loc.component';
import {ReportTextComponent} from '../shared/components/report-text/report-text.component';
import {ReportNeedTranslateComponent} from '../shared/components/report-need-translate/report-need-translate.component';
import {ErrorReportService} from '../../services/error-report.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {ResponseHandlerService} from '../../services/response-handler.service';
import {MatTable} from '@angular/material/table';

export interface ErrorHistory {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-error-report',
    templateUrl: './error-report.component.html',
    styleUrls: ['./error-report.component.css']
})
export class ErrorReportComponent implements OnInit {

    @ViewChild('table', {static: false}) table: MatTable<ErrorHistory>;
    history: ErrorHistory[] = [];
    displayedColumns = ['report_date', 'report_type', 'location', 'status'];

    constructor(private errorReportService: ErrorReportService, private noticeService: NoticeService, private responseHandlerService: ResponseHandlerService) {
    }

    private static resetFields(type: ReportTypeComponent, loc: ReportLocComponent, text: ReportTextComponent, translate: ReportNeedTranslateComponent) {
        type.reset();
        loc.reset();
        text.reset();
        translate.reset();
    }

    ngOnInit(): void {
        this.updateHistory();
    }


    private async updateHistory() {
        try {
             this.history = await this.errorReportService.getErrorHistoryUser();
             if (this.table) {
                 this.table.renderRows();
             }
        } catch (e) {
        }
    }

    async addErrorReport(type: ReportTypeComponent, loc: ReportLocComponent, text: ReportTextComponent, translate: ReportNeedTranslateComponent) {
        const res = {
            type: type.value,
            location: loc.value,
            issue: text.value,
            needTranslate: translate.value
        };
        try {
            await this.errorReportService.addError(res);
            ErrorReportComponent.resetFields(type, loc, text, translate);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ERROR-REPORT.SEND.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.updateHistory();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'ERROR-REPORT.SEND.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }

    getReportType(type: string) {
        return this.responseHandlerService.getErrorReportTypes()[type];
    }

    getStatus(status: string) {
        switch (status) {
            case 'maintenance':
                return 'ERROR-REPORT.HANG.MAINTENANCE';
            case 'translate':
                return 'ERROR-REPORT.HANG.TRANSLATE';
            case 'solved':
                return 'ERROR-REPORT.HANG.SOLVED';
            default:
                return 'not set !!!!!!!!!!!!';
        }
    }
}
