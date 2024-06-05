export interface TableHeaderProps {
  isLoading: boolean
  hasFiles: boolean
  isSelectFilesLocked: boolean
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
}
