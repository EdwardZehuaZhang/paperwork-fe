"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const FALLBACK_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "INR",
  "KRW",
  "MXN",
  "NZD",
  "NOK",
  "SEK",
  "SGD",
  "TRY",
  "ZAR",
  "BRL",
  "PLN",
  "DKK",
];

function getCurrencyCodes(): string[] {
  try {
    const intlAny = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
    if (typeof intlAny.supportedValuesOf === "function") {
      const codes = intlAny.supportedValuesOf("currency");
      if (Array.isArray(codes) && codes.length > 0) {
        return codes;
      }
    }
  } catch {
    // ignore
  }

  return FALLBACK_CURRENCIES;
}

export function CurrencySelect({
  value,
  onValueChange,
  disabled,
  placeholder = "Select a currency",
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const currencyCodes = React.useMemo(() => getCurrencyCodes(), []);
  const displayValue = value && value.length > 0 ? value : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("justify-between", className)}
        >
          <span className={cn(!value ? "text-muted-foreground" : undefined)}>{displayValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencyCodes.map((code) => (
                <CommandItem
                  key={code}
                  value={code}
                  onSelect={() => {
                    onValueChange(code);
                    setOpen(false);
                  }}
                >
                  {code}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
