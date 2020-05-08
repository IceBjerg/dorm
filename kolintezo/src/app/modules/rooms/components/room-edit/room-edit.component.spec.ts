import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomEditComponent} from './room-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SharedModule} from '../../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';

describe('RoomEditComponent', () => {
    let component: RoomEditComponent;
    let fixture: ComponentFixture<RoomEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomEditComponent],
              imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, MatCardModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
