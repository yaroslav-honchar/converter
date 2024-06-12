"use client"

import React from "react"
import { localeConfig, usePathname } from "@/_app/localization"
import { useLocale } from "use-intl"
import { LinkRoot } from "@/shared/components"
import cn from "classnames"

const options: string[] = localeConfig.locales

export const LangSwitcher: React.FC = () => {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <ul className={"flex gap-3 py-2 px-3 border-1 border-light rounded-4xl"}>
      {options.length &&
        options.map((option: string) => (
          <li key={option}>
            <LinkRoot
              className={cn(
                "p-button py-1 px-5 rounded-[1.25rem] border-none uppercase text-sm md:text-xl leading-6 hover:text-white",
                "after:w-full after:h-full after:absolute after:top-0 after:left-0 after:opacity-0 after:bg-blue-gradient hover:after:opacity-100 after:transition after:duration-300",
                {
                  "bg-blue-500": locale === option,
                },
              )}
              href={pathname}
              locale={option}
            >
              {option}
            </LinkRoot>
          </li>
        ))}
    </ul>
  )
}
