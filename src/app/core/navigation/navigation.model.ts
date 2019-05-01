export interface MenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string;       // Possible values: link/dropDown/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: ChildItem[]; // Dropdown items
  badges?: Badge[];
  active?: boolean;
}

export interface ChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: ChildItem[];
  active?: boolean;
}

export interface Badge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

export interface SidebarState {
  sideNavOpen?: boolean;
  childNavOpen?: boolean;
}
