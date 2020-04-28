import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RotateService {
    private processes = 0;
    public emitter = new EventEmitter();


    constructor() {
    }

    public isRotating() {
        return this.processes > 0;
    }

    public processStarted() {
        const prevRotating = this.isRotating();
        this.processes++;
        this.emitEvents(prevRotating);
    }

    public processEnded() {
        const prevRotating = this.isRotating();
        if (this.isRotating()) {
            this.processes--;
        }
        this.emitEvents(prevRotating);
    }

    private emitEvents(prevRotating: boolean) {
        if (prevRotating !== this.isRotating()) {
            this.emitter.emit(this.isRotating());
        }
    }
}
