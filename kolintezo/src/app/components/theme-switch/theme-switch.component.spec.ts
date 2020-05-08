import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeSwitchComponent} from './theme-switch.component';
import {SharedModule} from '../../modules/shared/shared.module';

describe('ThemeSwitchComponent', () => {
    let component: ThemeSwitchComponent;
    let fixture: ComponentFixture<ThemeSwitchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ThemeSwitchComponent],
                imports: [SharedModule]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach( () => {
        localStorage.clear();
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('default theme should be dark', () => {
        expect(component.theme).toEqual('dark');
    });

    it('pressing button once', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(component.theme).toEqual('light');
    });

    it('pressing button twice', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        button.click();
        expect(component.theme).toEqual('dark');
    });


    it('init theme from localStorage', () => {
        component.switchTheme();
        fixture.destroy();
        //
        fixture = TestBed.createComponent(ThemeSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.theme).toEqual('light');
    });

});
