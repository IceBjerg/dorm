import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: ['./theme-switch.component.css']
})
export class ThemeSwitchComponent implements OnInit {
    theme = 'dark';
    themes = [
        'dark',
        'light'
    ];

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit(): void {
        const tmptheme = localStorage.getItem('theme');
        if (this.themes.includes(tmptheme)) {
            this.theme = tmptheme;
        }
        this.setTheme();
    }

    setTheme() {
        this.document.body.classList.remove(...this.themes);
        this.document.body.classList.add(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    switchTheme() {
        switch (this.theme) {
            case 'dark':
                this.theme = 'light';
                break;
            case 'light':
            default:
                this.theme = 'dark';
        }
        this.setTheme();
    }
}
