export const getTime = (): string => {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, "00")
  const minutes = date.getMinutes().toString().padStart(2, "00")
  const seconds = date.getSeconds().toString().padStart(2, "00")

  return `${hours}:${minutes}:${seconds}`
}
