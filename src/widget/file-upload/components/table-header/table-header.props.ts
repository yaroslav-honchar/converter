export interface TableHeaderProps {
  hasFiles: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesClear: () => void
  onConvert: () => void
}
