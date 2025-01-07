export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
};

export type NavItemWithChildren = {
  items: NavItemWithChildren[];
} & NavItem;

export type MainNavItem = {
  items?: NavItemWithChildren[];
} & NavItem;
