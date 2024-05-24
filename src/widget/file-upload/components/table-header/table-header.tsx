import React from "react"
import { TableHeaderProps } from "./table-header.props"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"

export const TableHeader: React.FC<TableHeaderProps> = ({ onFileUpload }) => {
  const t = useTranslations()
  const onFileUploadHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(event)
  }

  return (
    <div className="flex justify-content-between gap-2">
      <label className={"p-button"}>
        <span>{t("FileUpload.select_files")}</span>
        <input
          type="file"
          className={"hidden"}
          onChange={onFileUploadHandle}
          multiple={true}
        />
      </label>
      <Button label={t("Common.convert")} />
    </div>
  )
}
