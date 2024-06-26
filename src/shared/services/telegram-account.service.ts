import { AxiosRequestConfig, AxiosResponse } from "axios"

import { ServerRoutes } from "@/_app/routes"

import { RootService } from "./root.service"

class TelegramAccount extends RootService {
  async sendArchive(data: FormData, config?: AxiosRequestConfig<FormData>): Promise<AxiosResponse> {
    return this.http.post(ServerRoutes.telegramSendArchive, data, config)
  }
}

export const TelegramAccountService = new TelegramAccount()
