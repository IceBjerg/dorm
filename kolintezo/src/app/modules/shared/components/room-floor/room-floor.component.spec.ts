import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomFloorComponent} from './room-floor.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ConfigService} from '../../../../services/config.service';
import {ResponseHandlerService} from '../../../../services/response-handler.service';

describe('RoomFloorComponent', () => {
    let component: RoomFloorComponent;
    let fixture: ComponentFixture<RoomFloorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [RoomFloorComponent],
                imports: [HttpClientTestingModule, MatInputModule, ReactiveFormsModule, NoopAnimationsModule, TranslateModule.forRoot(), MatAutocompleteModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        const configService = TestBed.inject(ConfigService);
        spyOn(configService, 'getData').withArgs('formFieldAppearance').and.returnValue('outline');
        fixture = TestBed.createComponent(RoomFloorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('initialization with value', () => {
        const val = 15;
        component.model = val;
        fixture.detectChanges();
        expect(component.value).toEqual(val);
    });

    it('on error, service should be called for translateId', () => {
        const errorHandler = TestBed.inject(ResponseHandlerService);
        const spy = spyOn(errorHandler, 'getErrorMsg');
        fixture.detectChanges();
        component.formControl.setValue(15.05);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect(component.ok).toBeFalse();
    });
});
