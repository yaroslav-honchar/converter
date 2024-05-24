import React from "react"
import { TableHeaderProps } from "./table-header.props"
import { Button } from "primereact/button"

export const TableHeader: React.FC<TableHeaderProps> = ({ onFileUpload }) => {
  const onFileUploadHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(event)
  }

  return (
    <div className="flex justify-content-between gap-2">
      <label className={"p-button"}>
        <span>Upload files</span>
        <input
          type="file"
          className={"hidden"}
          onChange={onFileUploadHandle}
          multiple={true}
        />
      </label>
      <Button label={"Convert"} />
    </div>
  )
}
