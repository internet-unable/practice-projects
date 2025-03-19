"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { CHEVRON_SVG, VARNING_SVG } from "../utils/SVG";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isIcon?: boolean;
    isError?: boolean;
  }
>(({ className, children, isIcon = true, isError, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "font-ubuntu flex flex-1 items-center justify-between py-[20px] text-[20px] text-[#000305] font-medium transition-all text-left px-1 desktop:hover:text-[--color5] desktop:duration-0" +
          " [&[data-state=open]>svg]:rotate-180" +
          " [&[data-state=open]>div]:text-[--color5]" +
          " [&[data-state=open]>svg>path]:fill-[--color5]",
        className
      )}
      {...props}
    >
      <div className="transition-colors duration-2000 w-full">{children}</div>

      {isError && (
        <div className="mr-[10px]">
          <VARNING_SVG />
        </div>
      )}
      {isIcon && (
        <CHEVRON_SVG className="h-[10px] w-[18px] shrink-0 text-muted-foreground transition-color transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-1"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
