import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KolHeaderComponent } from './components/kol-header/kol-header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuTreeComponent } from './components/kol-header/menu-tree/menu-tree.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { AppRoutingModule } from './app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        KolHeaderComponent,
        MenuTreeComponent,
        ThemeSwitchComponent,
        DialogComponent,
        SnackbarComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatDialogModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        MatSnackBarModule,
        MatSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
