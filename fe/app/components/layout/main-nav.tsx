import * as React from 'react';
import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { MainNavItem } from '@/types/nav';
import { Link } from '@remix-run/react';

type MainNavProps = {
  items?: MainNavItem[];
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 px-3 py-1.5 leading-none no-underline outline-none transition-colors hover:text-primary focus:text-primary',
              className,
            )}
            {...props}
          >
            <div className="text-sm leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

export default function MainNav({ items }: MainNavProps) {
  return (
    <>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {items?.map((item) => {
            let MenuItemComponent: React.ReactNode | null = null;

            if (item.items) {
              MenuItemComponent = <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>;
            } else if (item.href) {
              MenuItemComponent = (
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link to={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              );
            }

            return (
              <NavigationMenuItem key={item.title}>
                {MenuItemComponent}
                {item.items ? (
                  <NavigationMenuContent>
                    <ul className="flex w-[220px] flex-col p-4">
                      {item.items.map((subItem) => (
                        <ListItem key={subItem.title} href={subItem.href} title={subItem.title} />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                ) : null}
              </NavigationMenuItem>
            );
          })}
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
