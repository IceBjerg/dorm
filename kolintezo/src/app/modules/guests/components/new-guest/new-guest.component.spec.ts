import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGuestComponent} from './new-guest.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {ConfigService} from '../../../../services/config.service';

describe('NewGuestComponent', () => {
    let component: NewGuestComponent;
    let fixture: ComponentFixture<NewGuestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [NewGuestComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), NoopAnimationsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(NewGuestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
