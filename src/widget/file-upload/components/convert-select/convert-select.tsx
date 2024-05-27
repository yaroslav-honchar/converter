import React, { useState } from "react"
import { SelectItem } from "primereact/selectitem"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { IConvertSelectProps } from "./convert-select.props"
import { convertSelectOptions } from "./convert-select.options"

export const ConvertSelect: React.FC<IConvertSelectProps> = ({
  uploadedFile,
  onConvertTargetChange,
}) => {
  const [convertTargetValue, setConvertTargetValue] = useState<SelectItem | null>(null)

  const onChangeHandle = (event: DropdownChangeEvent) => {
    setConvertTargetValue(event.value)
    onConvertTargetChange(uploadedFile, event.value)
  }

  return (
    <Dropdown
      value={convertTargetValue}
      options={convertSelectOptions}
      placeholder={"..."}
      onChange={onChangeHandle}
    />
  )
}
