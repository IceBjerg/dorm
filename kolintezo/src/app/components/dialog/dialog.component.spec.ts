import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Dialog} from '../../interfaces/dialog';
import {SharedModule} from '../../modules/shared/shared.module';
import {TranslateStore} from '@ngx-translate/core';
import {MatButton, MatButtonModule} from '@angular/material/button';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    const dialogdata: Dialog = {
        title: 'test',
        content: 'testtest',
        yesText: 'ok',
        noText: 'no'
    };

    let dialogRef: MatDialogRef<DialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [DialogComponent],
                imports: [MatDialogModule, SharedModule, MatButtonModule],
                providers: [
                    {
                        provide: TranslateStore,
                        usevalue: new TranslateStore()
                    },
                    {
                        provide: MatDialogRef,
                        useValue: {
                            close: res => {}
                        }
                    },
                    {
                        provide: MAT_DIALOG_DATA,
                        useValue: dialogdata
                    }]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    afterEach( () => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('the template should contain two buttons', () => {
        const closeSpy = spyOn(dialogRef, 'close');
        const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
        buttons.forEach( button => button.click());
        expect(closeSpy).toHaveBeenCalledTimes(2);
    });

    it('pressing cancel should call close with false', () => {
        const closeSpy = spyOn(dialogRef, 'close');
        let buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
        buttons = Array.prototype.slice.call(buttons);
        const cancelButton = buttons.find( (button) => button.innerText === 'no');
        cancelButton.click();
        expect(closeSpy).toHaveBeenCalledWith(false);
    });

    it('pressing ok should return with true', () => {
        const closeSpy = spyOn(dialogRef, 'close');
        let buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
        buttons = Array.prototype.slice.call(buttons);
        const okButton = buttons.find( (button) => button.innerText === 'ok');
        okButton.click();
        expect(closeSpy).toHaveBeenCalledWith(true);
    });
});
