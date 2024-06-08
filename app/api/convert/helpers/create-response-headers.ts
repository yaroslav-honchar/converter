export const createResponseHeaders = (archiveName: string): Record<string, string> => ({
  "Content-Type": "application/zip",
  "Content-Disposition": `attachment; filename="${archiveName}"`,
})
