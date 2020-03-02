import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KolHeaderComponent } from './components/kol-header/kol-header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, CardModule, InputTextModule, ListboxModule, MenuModule, OverlayPanelModule, ProgressSpinnerModule} from 'primeng';
import {FormsModule} from '@angular/forms';
import { MenuTreeComponent } from './components/side-menu/menu-tree/menu-tree.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    KolHeaderComponent,
    SideMenuComponent,
    MenuTreeComponent,
    LoginComponent,
    ContentWrapperComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FontAwesomeModule,
    SidebarModule,
    BrowserAnimationsModule,
    ListboxModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
