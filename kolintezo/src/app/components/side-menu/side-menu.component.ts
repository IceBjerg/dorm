import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../interfaces/menu.item';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Input() innerWidth;
  @Input() appendTo: any;
  isOpenedSideMenu: boolean;

  // menu

  menu: MenuItem;



  constructor(
  ) { }

  ngOnInit(): void {
    this.initMenus();
    this.isOpenedSideMenu = false;
  }

  private initMenus() {
    this.menu = {
      displayName: '',
      isExpanded: true,
      path: '',
      isSelected: false,
      innerItems: [
        {
          displayName: 'Főoldal',
          isExpanded: true,
          path: '/',
          isSelected: false,
          icon: '',
          innerItems: []
        },
        {
          displayName: 'Felhasználók',
          isExpanded: true,
          path: '/',
          isSelected: false,
          icon: '',
          innerItems: []
        },
        {
          displayName: 'Container2',
          isExpanded: true,
          path: '/',
          isSelected: false,
          icon: '',
          innerItems: [
            {
              displayName: 'con',
              isExpanded: true,
              path: '/',
              isSelected: false,
              icon: '',
              innerItems: []
            },
          ]
        },
      ],
      icon: ''
    }
  }

  public openSideBar(value: any) {
    this.isOpenedSideMenu = true;
  }


}
