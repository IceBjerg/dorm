import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserGenderComponent} from './user-gender.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {ConfigService} from '../../../../services/config.service';

describe('UserGenderComponent', () => {
    let component: UserGenderComponent;
    let fixture: ComponentFixture<UserGenderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [UserGenderComponent],
                imports: [HttpClientTestingModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule, ReactiveFormsModule, MatSelectModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(UserGenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
