import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomAssignComponent} from './room-assign.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('RoomAssignComponent', () => {
    let component: RoomAssignComponent;
    let fixture: ComponentFixture<RoomAssignComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomAssignComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), MatTableModule, MatDialogModule, MatDividerModule, MatCheckboxModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomAssignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
