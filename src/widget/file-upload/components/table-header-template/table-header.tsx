import React from "react"
import { TableHeaderProps } from "./table-header.props"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"
import cn from "classnames"

export const TableHeader: React.FC<TableHeaderProps> = ({
  isLoading,
  downloadUrl,
  hasFiles,
  isSelectFilesLocked,
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
      <label
        className={cn("p-button", {
          ["p-disabled"]: isSelectFilesLocked,
        })}
      >
        <span>{t("FileUpload.select_files")}</span>
        <input
          disabled={isSelectFilesLocked}
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
        loading={isLoading}
      />
      {downloadUrl && (
        <a
          className={"p-button font-bold"}
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      )}
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
