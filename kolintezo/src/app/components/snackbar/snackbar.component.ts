import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material/snack-bar';
import {Dialog} from '../../interfaces/dialog';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Dialog, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    dismiss() {
        this.snackBar.dismiss();
    }

}
