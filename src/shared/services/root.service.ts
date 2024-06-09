import axios, { Axios } from "axios"
import { ServerRoot } from "@/_app/routes"
import https from "https"
import { getApiDomainConfig } from "@/_app/configs"

export class RootService {
  API_SELF_DOMAIN = getApiDomainConfig()

  http: Axios = axios.create({
    baseURL: this.API_SELF_DOMAIN + ServerRoot,
    httpsAgent: new https.Agent(),
  })
}
