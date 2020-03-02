import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-kol-header',
  templateUrl: './kol-header.component.html',
  styleUrls: ['./kol-header.component.scss']
})
export class KolHeaderComponent {
  @Input() innerWidth: any;
  @Output() openSideBar = new EventEmitter();
  @Input() isLoggedIn = true;
  userMenus = [
    {
      label: 'Settings',
      icon: 'fas fa-cog',
      command: ($event) => {
        // todo:
      }
    },
    {
      label: 'Kijelentkezés',
      icon: 'fas fa-sign-out-alt',
      command: ($event) => {
        this.authService.logout();
      }
    },

  ];

  constructor(private authService: AuthService) {
  }

}
