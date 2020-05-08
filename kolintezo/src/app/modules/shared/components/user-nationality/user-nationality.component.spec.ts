import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserNationalityComponent} from './user-nationality.component';
import {ConfigService} from '../../../../services/config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';

describe('UserNationalityComponent', () => {
    let component: UserNationalityComponent;
    let fixture: ComponentFixture<UserNationalityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [UserNationalityComponent],
                imports: [HttpClientTestingModule, MatInputModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule, ReactiveFormsModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(UserNationalityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
