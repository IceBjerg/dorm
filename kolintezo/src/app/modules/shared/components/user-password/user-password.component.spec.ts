import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordComponent} from './user-password.component';
import {ConfigService} from '../../../../services/config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';

describe('UserPasswordComponent', () => {
    let component: UserPasswordComponent;
    let fixture: ComponentFixture<UserPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [UserPasswordComponent],
                imports: [HttpClientTestingModule, MatInputModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule, ReactiveFormsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(UserPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
