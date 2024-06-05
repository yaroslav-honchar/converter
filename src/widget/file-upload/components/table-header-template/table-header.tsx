import React from "react"
import { TableHeaderProps } from "./table-header.props"
import { Button } from "primereact/button"
import { useTranslations } from "next-intl"
import cn from "classnames"

export const TableHeader: React.FC<TableHeaderProps> = ({
  isLoading,
  hasFiles,
  isSelectFilesLocked,
  onFileSelect,
  onFilesClear,
}) => {
  const t = useTranslations()
  const onFileSelectHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFileSelect(event)
  }

  const onFilesClearHandle = (): void => {
    onFilesClear()
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
          onChange={onFileSelectHandle}
          multiple={true}
        />
      </label>
      <Button
        disabled={!hasFiles}
        label={t("Common.convert")}
        type={"submit"}
        loading={isLoading}
      />
      <Button
        disabled={!hasFiles}
        className={"ml-auto"}
        label={t("Common.remove_all")}
        severity={"danger"}
        onClick={onFilesClearHandle}
      />
    </div>
  )
}
