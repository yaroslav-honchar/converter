import React from "react"
import { TableHeaderProps } from "./table-header.props"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"

export const TableHeader: React.FC<TableHeaderProps> = ({
  hasFiles,
  onFileUpload,
  onFilesClear,
  onConvert,
}) => {
  const t = useTranslations()
  const onFileUploadHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(event)
  }

  const onFilesClearHandle = () => {
    onFilesClear()
  }

  const onConvertHandle = () => {
    onConvert()
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
      <Button
        disabled={!hasFiles}
        label={t("Common.convert")}
        onClick={onConvertHandle}
      />
      <Button
        disabled={!hasFiles}
        className={"ml-auto"}
        label={t("Common.remove-all")}
        severity={"danger"}
        onClick={onFilesClearHandle}
      />
    </div>
  )
}
