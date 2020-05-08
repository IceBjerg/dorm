import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TranslateComponent} from './translate.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('TranslateComponent', () => {
    let component: TranslateComponent;
    let fixture: ComponentFixture<TranslateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [TranslateComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TranslateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
