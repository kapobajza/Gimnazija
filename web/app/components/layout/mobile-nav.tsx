import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { MainNavItem } from "@/types/nav";

import SiteLogo from "./site-logo";

type MobileNavProps = {
  mainNavItems?: MainNavItem[];
  triggerIcon?: string;
};

export function MobileNav({
  mainNavItems,
  triggerIcon = "default",
}: MobileNavProps) {
  const location = useLocation();
  const segment = location.pathname;
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    to: string,
  ) => {
    event.preventDefault();
    setIsOpen(false);
    void navigate(to);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {triggerIcon === "default" && (
        <SheetTrigger asChild>
          <button className="group flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:border-transparent hover:bg-primary focus:border-transparent focus:bg-primary dark:border-transparent dark:bg-white/[.15] dark:hover:bg-primary lg:ml-5 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z"></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </SheetTrigger>
      )}

      {triggerIcon === "style-2" && (
        <SheetTrigger asChild>
          <button className="group ml-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors lg:ml-5 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-6 w-6 fill-foreground transition-colors group-hover:fill-primary-200 group-focus:fill-primary-200 dark:fill-white group-hover:dark:fill-primary group-focus:dark:fill-primary"
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </SheetTrigger>
      )}
      <SheetContent side="left" className="w-full pl-1 pr-0 sm:max-w-full">
        <div className="px-7">
          <Link
            to="/"
            className="mr-12 block shrink-0"
            onClick={(event) => {
              onLinkClick(event, "/");
            }}
          >
            <SiteLogo className="w-[100px]" />
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion
              type="multiple"
              defaultValue={
                mainNavItems
                  ? mainNavItems.map((item) => item.title)
                  : undefined
              }
              className="w-full"
            >
              {mainNavItems?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.items ? (
                    <AccordionItem value={item.title}>
                      <AccordionTrigger className="text-sm">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2">
                          {item.items.map((subItem, index) =>
                            subItem.href ? (
                              <MobileLink
                                key={index}
                                href={String(subItem.href)}
                                segment={String(segment)}
                                onClick={(event) => {
                                  onLinkClick(event, String(subItem.href));
                                }}
                                disabled={subItem.disabled}
                              >
                                {subItem.title}
                              </MobileLink>
                            ) : (
                              <div
                                key={index}
                                className="text-muted-foreground transition-colors"
                              >
                                {item.title}
                              </div>
                            ),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    item.href && (
                      <div>
                        <Link
                          to={item.href}
                          className="block border-b py-4 text-sm transition-colors hover:text-primary-50 focus:text-primary-50 dark:hover:text-primary dark:focus:text-primary"
                          onClick={(event) => {
                            onLinkClick(event, String(item.href));
                          }}
                        >
                          {item.title}
                        </Link>
                      </div>
                    )
                  )}
                </React.Fragment>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

type MobileLinkProps = {
  href: string;
  disabled?: boolean;
  segment: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.PropsWithChildren;

function MobileLink({
  children,
  href,
  disabled,
  segment,
  onClick,
}: MobileLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "transition-colors hover:text-primary",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60",
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
