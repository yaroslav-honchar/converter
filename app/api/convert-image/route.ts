import { NextRequest } from "next/server"
// import { promises as fs } from "fs"
// import path from "path"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export async function POST(req: NextRequest) {
  console.log("POST /api/convert-image")
  try {
    const data = await req.json()
    console.log(data)
    // const file = data.get("file") as File
    // if (!file) {
    //   return Response.json({ error: "Error handling file upload" })
    // }

    // const buffer = await file.arrayBuffer()

    // await fs.writeFile(path.join(__dirname, "uploads", file.name), Buffer.from(buffer))

    return Response.json({ message: "File uploaded successfully" })
  } catch (error) {
    return Response.json({ error: "Error handling file upload" })
  }
}
