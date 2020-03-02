export interface MenuItem {
  displayName: string;
  path: string;
  icon: string;
  innerItems: MenuItem[];
  isExpanded: boolean;
  isSelected: boolean;
}
