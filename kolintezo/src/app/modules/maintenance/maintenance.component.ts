import {Component, OnInit} from '@angular/core';
import {ErrorReportService} from '../../services/error-report.service';
import {KolNotificationType, NoticeService} from '../../services/notice.service';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

    data: {
        id: number,
        report_type: string,
        location: string,
        issue: string,
        report_date: string
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
        this.data = await this.errorReportService.getMaintenanceWork();
        this.isLoaded = true;
    }

    async maintenanceDone(id: number) {
        try {
            await this.errorReportService.maintenanceDone(id);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'MAINTENANCE.SEND.SUCC',
                    yesText: 'ACTIONS.HIDE',
                    title: 'success'
                }
            });
            this.loadData();
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    content: 'MAINTENANCE.SEND.ERR',
                    yesText: 'ACTIONS.HIDE',
                    title: 'error'
                }
            });
        }
    }
}
