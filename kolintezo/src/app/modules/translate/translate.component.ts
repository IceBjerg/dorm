import {Component, OnInit} from '@angular/core';
import {ErrorReportService} from '../../services/error-report.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

    data: {
        id: number,
        report_type: string,
        location: string
        issue: string;
        report_date: string;
    }[];
    isLoaded = false;

    constructor(private errorReportService: ErrorReportService, private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        setTimeout(
            () => {
                this.loadData();
            }, 500
        );
    }

    async loadData() {
        this.data = await this.errorReportService.getForeignText();
        this.isLoaded = true;
    }

    async translateText(id: number, value: string) {
        try {
            await this.errorReportService.translateError(id, value);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'TRANSLATE.TRANSLATE.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.loadData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'TRANSLATE.TRANSLATE.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
