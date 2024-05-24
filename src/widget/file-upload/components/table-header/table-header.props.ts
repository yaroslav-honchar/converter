export interface TableHeaderProps {
  hasFiles: boolean
  isSelectFilesLocked: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
  onConvert: () => void
}
