import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PermissionsComponent} from './permissions.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';

describe('PermissionsComponent', () => {
    let component: PermissionsComponent;
    let fixture: ComponentFixture<PermissionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [PermissionsComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), MatTableModule ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
