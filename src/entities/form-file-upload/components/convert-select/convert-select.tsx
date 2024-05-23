import React, { useState } from "react"
import { SelectItem } from "primereact/selectitem"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { IConvertSelectProps } from "./convert-select.props"

const convertOptions: SelectItem[] = [
  {
    label: "PNG",
    value: "png",
  },
  {
    label: "JPEG",
    value: "jpeg",
  },
  {
    label: "WEBP",
    value: "webp",
  },
]

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
      options={convertOptions}
      placeholder={"..."}
      onChange={onChangeHandle}
    />
  )
}
