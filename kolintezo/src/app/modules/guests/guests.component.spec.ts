import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GuestsComponent} from './guests.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigService} from '../../services/config.service';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';

describe('GuestsComponent', () => {
    let component: GuestsComponent;
    let fixture: ComponentFixture<GuestsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [GuestsComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), NoopAnimationsModule, MatTableModule, MatDividerModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(GuestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
