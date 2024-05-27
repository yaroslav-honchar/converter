export interface TableHeaderProps {
  downloadUrl: string | undefined
  hasFiles: boolean
  isSelectFilesLocked: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
  onConvert: () => void
}
