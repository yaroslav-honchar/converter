import axios, { Axios } from "axios"
import https from "https"

import { getApiDomainConfig } from "@/_app/configs"
import { ServerRoot } from "@/_app/routes"

export class RootService {
  API_SELF_DOMAIN = getApiDomainConfig()

  http: Axios = axios.create({
    baseURL: this.API_SELF_DOMAIN + ServerRoot,
    httpsAgent: new https.Agent(),
  })

  constructor() {
    this.http.interceptors.request.use((config) => {
      console.log(config)
      return config
    })
  }
}
