import React from "react"
import { ItemTemplateOptions } from "primereact/fileupload"
import { IPUploadedFileInterface } from "@/shared/types"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"

export const ItemTemplate: React.FC = (inFile: object, props: ItemTemplateOptions) => {
  const file = inFile as IPUploadedFileInterface

  return (
    <div className="flex items-center gap-2 w-full">
      <p
        className={
          "text-start flex-grow h-fit w-full overflow-hidden whitespace-nowrap text-ellipsis"
        }
      >
        {file.name}
      </p>
      <Tag
        className={"whitespace-nowrap"}
        value={props.formatSize}
        severity="info"
      />
      <Button
        type="button"
        icon="pi pi-times"
        className="p-button-outlined p-button-rounded p-button-danger w-8 h-8 p-2"
        onClick={props.onRemove}
      />
    </div>
  )
}
