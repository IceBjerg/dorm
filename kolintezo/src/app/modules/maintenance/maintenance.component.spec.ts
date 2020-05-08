import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MaintenanceComponent} from './maintenance.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigService} from '../../services/config.service';

describe('MaintenanceComponent', () => {
    let component: MaintenanceComponent;
    let fixture: ComponentFixture<MaintenanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [MaintenanceComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(MaintenanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
