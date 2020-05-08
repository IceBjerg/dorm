import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KeysComponent} from './keys.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigService} from '../../services/config.service';
import {MatDialogModule} from '@angular/material/dialog';

describe('KeysComponent', () => {
    let component: KeysComponent;
    let fixture: ComponentFixture<KeysComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [KeysComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), NoopAnimationsModule, MatDialogModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(KeysComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
