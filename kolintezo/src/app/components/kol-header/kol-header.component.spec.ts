import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KolHeaderComponent} from './kol-header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../modules/shared/shared.module';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {EventEmitter} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {RotateService} from '../../services/rotate.service';
import {UserService} from '../../services/user.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MenuTreeComponent} from './menu-tree/menu-tree.component';
import {ThemeSwitchComponent} from '../theme-switch/theme-switch.component';
import {MatToolbarModule} from '@angular/material/toolbar';

export class MockedAuthService {
    public isAuth = false;
    public expireToken = new EventEmitter();

    isLoggedIn() {
        return this.isAuth;
    }
}

export class MockedUserService {
    public emitter = new EventEmitter();
}

describe('KolHeaderComponent', () => {
    let component: KolHeaderComponent;
    let fixture: ComponentFixture<KolHeaderComponent>;
    let translator: TranslateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [KolHeaderComponent, MenuTreeComponent, ThemeSwitchComponent],
                imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, MatMenuModule, MatSelectModule, BrowserAnimationsModule,
                    MatSidenavModule, MatToolbarModule],
                providers: [
                    TranslateStore,
                    {
                        provide: AuthService,
                        useValue: new MockedAuthService()
                    },
                    {
                        provide: UserService,
                        useValue: new MockedUserService()
                    }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KolHeaderComponent);
        component = fixture.componentInstance;
        component.menu = {
            icon: 'a',
            isExpanded: false,
            path: 'test',
            translateId: 'asd',
            innerItems: []
        };
        translator = TestBed.inject(TranslateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have at least 2 languages', () => {
        // const select = fixture.debugElement.nativeElement.querySelectorAll('mat-select');
        const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
        trigger.click();
        fixture.detectChanges();
        // select the first option (use queryAll if you want to chose an option)
        const matOption = fixture.debugElement.queryAll(By.css('.mat-option'));
        expect(matOption.length).toBeGreaterThanOrEqual(2);
    });

    it('change language works', () => {
        const translateSpy = spyOn(translator, 'use');
        const lang = 'hu';
        component.changeLang({value: lang});
        const nextLang = component.languages.findIndex(l => l === lang);
        expect(translateSpy).toHaveBeenCalledWith(component.languages[nextLang]);
        expect(component.lang).toEqual(component.languages[nextLang]);
    });

    it('indicator should rotate if service indicates that', () => {
        const rotator = TestBed.inject(RotateService);
        const indicator = fixture.debugElement.query(By.css('.fa-sync'));
        expect(indicator.classes.rotate).toEqual(undefined);
        rotator.processStarted();
        expect(indicator.classes.rotate).toEqual(true);
        rotator.processStarted();
        expect(indicator.classes.rotate).toEqual(true);
        rotator.processEnded();
        expect(indicator.classes.rotate).toEqual(true);
        rotator.processEnded();
        expect(indicator.classes.rotate).toEqual(undefined);
    });

    it('should refresh menu tree, if user changes', () => {
        const spy = spyOn(component, 'reloadMenu');
        const userService = TestBed.inject(UserService);
        userService.emitter.emit(true);
        expect(spy).toHaveBeenCalled();
    });
});
