import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ResponseHandlerService {

    constructor() {
    }

    private readonly errorReportTypes = {
        door_handle: 'ERROR-REPORT.DOOR-HANDLE',
        sink: 'ERROR-REPORT.SINK',
        bulb: 'ERROR-REPORT.BULB',
        other: 'ERROR-REPORT.OTHER'
    };

    private readonly responses = {
        user_exists: 'ERRORS.USER-EXISTS',
        bad_user_data: 'ERRORS.USER-DATA',
        try_later: 'ERRORS.TRY-LATER',
        bad_params: 'ERRORS.TAKEN',



        unknown_error: 'ERRORS.UNKNOWN'
    };

    public getErrorReportTypes() {
        return this.errorReportTypes;
    }

    public getMessage(response: string) {
        if (this.responses.hasOwnProperty(response)) {
            return this.responses[response];
        }
        return this.responses.unknown_error;
    }

    public getErrorMsg(formControl: FormControl) {
        if (formControl.errors.required) {
            return 'ERRORS.REQ';
        }
        if (formControl.errors.equals) {
            return 'ERRORS.NOT-EQ';
        }
        if (formControl.errors.minlength) {
            return 'ERRORS.SHORT';
        }
        if (formControl.errors.lowercase) {
            return 'ERRORS.LOWC';
        }
        if (formControl.errors.uppercase) {
            return 'ERRORS.UPPERC';
        }
        if (formControl.errors.number) {
            return 'ERRORS.NUM';
        }
        if (formControl.errors.email) {
            return 'ERRORS.FORMAT';
        }
        if (formControl.errors.neptun) {
            return 'ERRORS.NEPTUN';
        }
        if (formControl.errors.onlynumber) {
            return 'ERRORS.ONLY-NUMBER';
        }
        if (formControl.errors.roomid) {
            return 'ERRORS.ROOM-ID';
        }
        if (formControl.errors.maxlength) {
            return 'ERRORS.LARGE';
        }
        return 'ERRORS.UNKNOWN';
    }
}
