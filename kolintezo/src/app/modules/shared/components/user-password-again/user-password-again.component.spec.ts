import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordAgainComponent} from './user-password-again.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfigService} from '../../../../services/config.service';

describe('UserPasswordAgainComponent', () => {
    let component: UserPasswordAgainComponent;
    let fixture: ComponentFixture<UserPasswordAgainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [UserPasswordAgainComponent],
                imports: [HttpClientTestingModule, MatInputModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule, ReactiveFormsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(UserPasswordAgainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
