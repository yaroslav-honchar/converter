import { ISelectedFile } from "../types"

export const createSelectedFiles = (
  selectedFiles: ISelectedFile[],
  files: File[],
): ISelectedFile[] => {
  const newSelectedFiles: ISelectedFile[] = []

  for (let index = 0; index < files.length; index++) {
    const newFile = files[index]

    const hasSameSelectedFile = selectedFiles.some((selectedFile: ISelectedFile): boolean => {
      const { name: selectedFileName, size: selectedFileSize } = selectedFile.file

      return selectedFileName === newFile.name && selectedFileSize === newFile.size
    })
    if (hasSameSelectedFile) {
      continue
    }

    const newSelectedFile: ISelectedFile = {
      file: newFile,
      convertTarget: null,
    }

    newSelectedFiles.push(newSelectedFile)
  }

  return newSelectedFiles
}
