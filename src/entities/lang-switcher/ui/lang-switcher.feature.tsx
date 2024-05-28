"use client"

import React, { useState } from "react"
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton"
import { localeConfig, usePathname, useRouter } from "@/_app/localization"
import { useLocale } from "use-intl"

const options: string[] = localeConfig.locales

export const LangSwitcher: React.FC = () => {
  const locale = useLocale()
  const [value, setValue] = useState<string>(locale)
  const pathname = usePathname()
  const router = useRouter()

  const onChangeHandle = (event: SelectButtonChangeEvent) => {
    setValue(event.value)
    router.replace(pathname, { locale: event.value })
  }

  return (
    <SelectButton
      value={value}
      onChange={onChangeHandle}
      options={options}
    />
  )
}
