export class UploadedFile {
  file: File
  _convertTo: string | null
  fileBase64: string

  constructor(file: File, options?: IUploadedFileOptions) {
    this.file = file
    this._convertTo = null
    this.fileBase64 = ""

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.fileBase64 = event.target?.result as string

      options?.onBaseReady()
    }
  }

  get convertTo() {
    return this._convertTo
  }

  set convertTo(value: string | null) {
    this._convertTo = value
  }
}

interface IUploadedFileOptions {
  onBaseReady: () => void
}
