import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [UsersComponent],
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule,
                    TranslateModule.forRoot(),
                    MatDialogModule,
                    MatPaginatorModule,
                    MatFormFieldModule,
                    MatAutocompleteModule,
                    MatTableModule,
                    FormsModule,
                    MatDividerModule,
                    MatInputModule,
                    NoopAnimationsModule,
                    MatCheckboxModule
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
