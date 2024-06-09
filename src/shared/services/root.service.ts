import axios, { Axios } from "axios"
import { ServerRoot } from "@/_app/routes"
import https from "https"

export class RootService {
  API_SELF_DOMAIN = process.env.NEXT_PUBLIC_API_SELF_DOMAIN

  http: Axios = axios.create({
    baseURL: this.API_SELF_DOMAIN + ServerRoot,
    httpsAgent: new https.Agent(),
  })
}
