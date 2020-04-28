export interface MenuItemModel {
  translateId: string;
  path: string;
  icon: string;
  innerItems: MenuItemModel[];
  isExpanded: boolean;
}
