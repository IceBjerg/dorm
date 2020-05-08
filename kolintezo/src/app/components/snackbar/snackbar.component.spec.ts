import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackbarComponent} from './snackbar.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateStore} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Dialog} from '../../interfaces/dialog';

describe('SnackbarComponent', () => {
    let component: SnackbarComponent;
    let fixture: ComponentFixture<SnackbarComponent>;
    const snackData: Dialog = {
        title: 'test',
        content: 'testtest',
        yesText: 'ok',
        noText: 'no'
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [SnackbarComponent],
                imports: [SharedModule, MatSnackBarModule],
                providers: [
                    {
                        provide: TranslateStore,
                        usevalue: new TranslateStore()
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: res => {
                            }
                        }
                    },
                    {
                        provide: MAT_SNACK_BAR_DATA,
                        useValue: snackData
                    }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('the template should contain one button', () => {
        const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
        expect(buttons.length).toEqual(1);
    });

    it('pressing the button should dismiss the snackbar', () => {
        const snackRef = TestBed.inject(MatSnackBar);
        const closeSpy = spyOn(snackRef, 'dismiss');
        const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
        buttons.forEach( button => button.click());
        expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not print anything if title is not "success" nor "error"', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
                declarations: [SnackbarComponent],
                imports: [SharedModule, MatSnackBarModule],
                providers: [
                    {
                        provide: TranslateStore,
                        usevalue: new TranslateStore()
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: res => {
                            }
                        }
                    },
                    {
                        provide: MAT_SNACK_BAR_DATA,
                        useValue: {
                            title: 'test',
                            content: 'testtest',
                            yesText: 'ok',
                            noText: 'no'
                        }
                    }
                ]
            })
            .compileComponents();
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        //
        const buttons = fixture.debugElement.nativeElement.querySelector('div');
        expect(buttons.children.length).toEqual(3);
    });

    it('should print icon if title is "error"', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
                declarations: [SnackbarComponent],
                imports: [SharedModule, MatSnackBarModule],
                providers: [
                    {
                        provide: TranslateStore,
                        usevalue: new TranslateStore()
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: res => {
                            }
                        }
                    },
                    {
                        provide: MAT_SNACK_BAR_DATA,
                        useValue: {
                            title: 'error',
                            content: 'testtest',
                            yesText: 'ok',
                            noText: 'no'
                        }
                    }
                ]
            })
            .compileComponents();
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        //
        const buttons = fixture.debugElement.nativeElement.querySelector('div');
        expect(buttons.children.length).toEqual(4);
    });

    it('should print icon if title is "success"', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
                declarations: [SnackbarComponent],
                imports: [SharedModule, MatSnackBarModule],
                providers: [
                    {
                        provide: TranslateStore,
                        usevalue: new TranslateStore()
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: res => {
                            }
                        }
                    },
                    {
                        provide: MAT_SNACK_BAR_DATA,
                        useValue: {
                            title: 'success',
                            content: 'testtest',
                            yesText: 'ok',
                            noText: 'no'
                        }
                    }
                ]
            })
            .compileComponents();
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        //
        const buttons = fixture.debugElement.nativeElement.querySelector('div');
        expect(buttons.children.length).toEqual(4);
    });
});
