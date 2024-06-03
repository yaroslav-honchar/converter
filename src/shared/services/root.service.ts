import axios, { Axios } from "axios"
import { ServerRoot } from "@/_app/routes"
import https from "https"

export class RootService {
  http: Axios = axios.create({
    baseURL: ServerRoot,
    httpsAgent: new https.Agent(),
  })
}
