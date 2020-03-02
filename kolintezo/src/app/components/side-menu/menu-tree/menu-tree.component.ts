import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../../interfaces/menu.item';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {

  @Input() model: MenuItem;
  @Input() rootModel: MenuItem;
  @Input() leftPadding: any;

  constructor() { }

  ngOnInit(): void {

  }

  getPadding() {
      return parseInt(this.leftPadding as string, 10) + 10;
  }

  onMenuSelect() {
    this.resetSelected(this.rootModel);
    this.model.isSelected = true;
    // todo: routingoutlet
  }

  private resetSelected(model: MenuItem) {
    model.isSelected = false;
    for (const innerModel of model.innerItems) {
      this.resetSelected(innerModel);
    }
  }
}
