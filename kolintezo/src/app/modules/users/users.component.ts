import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigService} from '../../services/config.service';
import {definedFormControl, UserDataInput, UserDataInputTypes} from '../../interfaces/user-data-input';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {UserService} from '../../services/user.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {KolNotificationType, NoticeService} from '../../services/notice.service';
import {UserFullNameComponent} from '../shared/components/user-full-name/user-full-name.component';
import {UserEmailComponent} from '../shared/components/user-email/user-email.component';
import {UserGenderComponent} from '../shared/components/user-gender/user-gender.component';
import {UserNationalityComponent} from '../shared/components/user-nationality/user-nationality.component';
import {User} from '../../interfaces/user';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class UsersComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource<User>();
    // columnsToDisplay = ['checkbox', 'id', 'name', 'email'];
    columnsToDisplay = ['checkbox', 'id', 'name'];
    expandedElement: User | null;
    pageSizeOptions = [10, 20, 50, 100];

    // select
    selection = new SelectionModel<User>(true, []);

    private userDataInputs: { [key: string]: UserDataInput[] } = {};

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(public configService: ConfigService, private userService: UserService, private translate: TranslateService,
                private dialog: MatDialog, private noticeService: NoticeService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
            this.translatePaginator();
        });
        this.paginator.page.subscribe(() => {
            this.translatePaginator();
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.updateData(), 500);
    }

    async translatePaginator() {
        const allRows = this.dataSource.data.length;
        const allFilterRows = this.dataSource.filteredData.length;
        this.paginator._intl.itemsPerPageLabel = await this.translate.get('PAGINATOR.ITEMS').toPromise();
        this.paginator._intl.firstPageLabel = await this.translate.get('PAGINATOR.FIRST').toPromise();
        this.paginator._intl.lastPageLabel = await this.translate.get('PAGINATOR.LAST').toPromise();
        this.paginator._intl.nextPageLabel = await this.translate.get('PAGINATOR.NEXT').toPromise();
        this.paginator._intl.previousPageLabel = await this.translate.get('PAGINATOR.PREVIOUS').toPromise();
        const range = await this.translate.get('PAGINATOR.RANGE', {
            start: (this.paginator.pageIndex * this.paginator.pageSize) + 1,
            end: allFilterRows < (this.paginator.pageIndex + 1) * this.paginator.pageSize ? allFilterRows : (this.paginator.pageIndex + 1) * this.paginator.pageSize,
            length: allRows
        }).toPromise();
        this.paginator._intl.getRangeLabel = () => range;
        this.paginator._intl.changes.next();
    }

    async updateData() {
        this.dataSource.data = await this.userService.getAllUsers() as any[];
        this.selection.clear();
        this.dataSource.filter = '';
        this.translatePaginator();
    }


    getColumnName(column: string) {
        switch (column) {
            case 'id':
                return 'USER.NEPTUN';
            case 'name':
                return 'USER.NAME';
            case 'email':
                return 'USER.EMAIL';
            case 'gender':
                return 'USER.GENDER.GENDER';
            case 'nationality':
                return 'USER.NATIONALITY';
            default:
                return '?????????? NOT SET ??????';
        }
    }


    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.filteredData.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.filteredData.forEach(row => this.selection.select(row));
    }

    async saveExpanded(name: UserFullNameComponent, email: UserEmailComponent, gender: UserGenderComponent, nat: UserNationalityComponent, element: UserDataInput) {
        const res = {
            id: element.id,
            name: name.value,
            email: email.value,
            gender: gender.value,
            nationality: nat.value
        };
        try {
            await this.userService.updateUsers([res]);
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'USERS.SAVE.SUCC',
                    title: 'success'
                }
            });
            this.expandedElement = null;
            setTimeout(() => this.updateData(), 500);
        } catch (e) {
            this.noticeService.events.emit({
                type: KolNotificationType.SNACK_BAR,
                message: {
                    yesText: 'ACTIONS.HIDE',
                    content: 'USERS.SAVE.ERR',
                    title: 'error'
                }
            });
        }
    }

    deleteSelected() {
        const ids = [];
        for (const useer of this.selection.selected){
            ids.push(useer.id);
        }
        const ref = this.dialog.open(DialogComponent, {
            data: {
                title: 'USERS.DELETE.TITLE-MUL',
                yesText: 'ACTIONS.DELETE',
                noText: 'ACTIONS.CANCEL',
                content: 'USERS.DELETE.DESCRIPTION-MUL'
            }
        });
        ref.afterClosed().subscribe(async (res) => {
            if (res) {
                try {
                    await this.userService.deleteUsers(ids);
                    this.expandedElement = null;
                    this.noticeService.events.emit({
                        type: KolNotificationType.SNACK_BAR,
                        message: {
                            yesText: 'ACTIONS.HIDE',
                            content: 'USERS.DELETE.SUCC',
                            title: 'success'
                        }
                    });
                    setTimeout(() => this.updateData(), 500);
                } catch (e) {
                    this.noticeService.events.emit({
                        type: KolNotificationType.SNACK_BAR,
                        message: {
                            yesText: 'ACTIONS.HIDE',
                            content: 'USERS.DELETE.ERR',
                            title: 'error'
                        }
                    });
                }
            }
        });
    }

    deleteExpanded(element: User) {
        const ref = this.dialog.open(DialogComponent, {
            data: {
                title: 'USERS.DELETE.TITLE',
                yesText: 'ACTIONS.DELETE',
                noText: 'ACTIONS.CANCEL',
                content: 'USERS.DELETE.DESCRIPTION'
            }
        });
        ref.afterClosed().subscribe(async (res) => {
            if (res) {
                try {
                    await this.userService.deleteUsers([element.id]);
                    this.expandedElement = null;
                    this.noticeService.events.emit({
                        type: KolNotificationType.SNACK_BAR,
                        message: {
                            yesText: 'ACTIONS.HIDE',
                            content: 'USERS.DELETE.SUCC',
                            title: 'success'
                        }
                    });
                    setTimeout(() => this.updateData(), 500);
                } catch (e) {
                    this.noticeService.events.emit({
                        type: KolNotificationType.SNACK_BAR,
                        message: {
                            yesText: 'ACTIONS.HIDE',
                            content: 'USERS.DELETE.ERR',
                            title: 'error'
                        }
                    });
                }
            }
        });
    }

    applyFilter($event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.translatePaginator();
    }
}
