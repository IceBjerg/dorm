import {EventEmitter, Injectable} from '@angular/core';
import {Dialog} from '../interfaces/dialog';

@Injectable({
    providedIn: 'root'
})
export class NoticeService {

    public events = new EventEmitter<KolNotification>();

    constructor() {
    }


}


export interface KolNotification {
    type: KolNotificationType;
    message: Dialog;
}

export enum KolNotificationType {
    SNACK_BAR,
    DIALOG
}
