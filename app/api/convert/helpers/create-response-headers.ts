/**
 * Creates response headers for the archive download.
 *
 * @param {string} archiveName - The name of the archive.
 * @returns {Record<string, string>} - The response headers.
 */
export const createResponseHeaders = (archiveName: string): Record<string, string> => ({
  "Content-Type": "application/zip",
  "Content-Disposition": `attachment; filename="${archiveName}"`,
})
