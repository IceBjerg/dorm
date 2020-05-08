import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuTreeComponent} from './menu-tree.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MenuItemModel} from '../../../interfaces/menu.item.model';
import {TranslateStore} from '@ngx-translate/core';
import {
    Router
} from '@angular/router';
import {ChangeDetectorRef, Component, ElementRef} from '@angular/core';

describe('MenuTreeComponent', () => {
    let component: MenuTreeComponent;
    let fixture: ComponentFixture<MenuTreeComponent>;
    let router: RouterTestingModule;

    const model: MenuItemModel = {
        icon: 'a',
        isExpanded: false,
        path: 'test',
        translateId: 'asd',
        innerItems: []
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [MenuTreeComponent],
                imports: [
                    RouterTestingModule.withRoutes([{path: 'test', component: TestComponent}]),
                    SharedModule,
                    MatSidenavModule
                ],
                providers: [
                    MatSidenavContainer, MatSidenav, TranslateStore, ChangeDetectorRef,
                    {
                        provide: ElementRef,
                        useValue: new ElementRef(null)
                    }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuTreeComponent);
        component = fixture.componentInstance;
        component.isPhone = false;
        component.sidenavcontainer = TestBed.inject(MatSidenavContainer) as MatSidenavContainer;
        component.sidenavcontainer.updateContentMargins = () => {};
        component.leftPadding = 5;
        component.rightPadding = 20;
        component.model = model;
        router = TestBed.inject(Router);
        Object.defineProperty(router, 'url', {
            // only returns odd die sides
            get: () => '/test'
        });
        fixture.detectChanges();
    });

    it('should create', () => {

        expect(component).toBeTruthy();
    });

    it('after each refresh, the isSelected should run. ', () => {
        const mySpy = spyOn(component, 'isSelected');
        fixture.detectChanges();
        expect(mySpy).toHaveBeenCalled();
    });

    it('root item should be selected', () => {
        expect(component.isSelected()).toEqual(true);
    });

});

@Component(
    {
        template: ''
    }
)
export class TestComponent {}
