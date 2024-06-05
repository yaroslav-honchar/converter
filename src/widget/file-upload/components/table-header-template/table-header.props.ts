export interface TableHeaderProps {
  isLoading: boolean
  hasFiles: boolean
  isSelectFilesLocked: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
}
