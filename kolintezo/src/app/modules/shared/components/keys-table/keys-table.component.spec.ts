import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KeysTableComponent} from './keys-table.component';
import {MatTableModule} from '@angular/material/table';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('KeysTableComponent', () => {
    let component: KeysTableComponent;
    let fixture: ComponentFixture<KeysTableComponent>;
    const data = [
        {
            id: NaN,
            key_id: NaN,
            user: '',
            start_time: '',
            accepted_by: '',
            end_time: '',
            ended_by: '',
        },
        {
            id: NaN,
            key_id: NaN,
            user: '',
            start_time: '',
            accepted_by: '',
            end_time: '',
            ended_by: '',
        },
        {
            id: NaN,
            key_id: NaN,
            user: '',
            start_time: '',
            accepted_by: '',
            end_time: '',
            ended_by: '',
        },
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [KeysTableComponent],
                imports: [MatTableModule, TranslateModule.forRoot(), NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KeysTableComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('by default it should display 4 columns', () => {
        fixture.detectChanges();
        expect(component.displayedColumns.length).toBe(4);
    });

    it('in edit mode, it should display 3 columns', () => {
        component.isEditMode = true;
        fixture.detectChanges();
        expect(component.displayedColumns.length).toBe(3);
    });

    it('should display the correct amount of cells', () => {
        component.data = data;
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td');
        expect(cells.length).toBe((component.displayedColumns.length + 1) * data.length);
    });
});
