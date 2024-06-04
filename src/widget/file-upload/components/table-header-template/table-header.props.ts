export interface TableHeaderProps {
  isLoading: boolean
  downloadUrls: string[]
  hasFiles: boolean
  isSelectFilesLocked: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
}
