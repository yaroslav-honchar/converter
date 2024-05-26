import React, { useState } from "react"
import { SelectItem } from "primereact/selectitem"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { IConvertSelectProps } from "./convert-select.props"
import { convertSelectOptions } from "./convert-select.options"

export const ConvertSelect: React.FC<IConvertSelectProps> = ({
  uploadedFile,
  onConvertToChange,
}) => {
  const [convertTOValue, setConvertTOValue] = useState<SelectItem | null>(null)

  const onChangeHandle = (e: DropdownChangeEvent) => {
    setConvertTOValue(e.value)

    onConvertToChange({
      ...uploadedFile,
      convertTo: e.value as string,
    })
  }

  return (
    <Dropdown
      value={convertTOValue}
      options={convertSelectOptions}
      placeholder={"..."}
      onChange={onChangeHandle}
    />
  )
}
