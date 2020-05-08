import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterPageComponent} from './register-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RegisterPageComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), SharedModule, MatDialogModule, FormsModule, NoopAnimationsModule, MatCardModule, MatDividerModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
