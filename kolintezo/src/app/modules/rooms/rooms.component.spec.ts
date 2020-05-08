import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomsComponent} from './rooms.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('RoomsComponent', () => {
    let component: RoomsComponent;
    let fixture: ComponentFixture<RoomsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomsComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), MatTableModule, MatDividerModule, MatCheckboxModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
