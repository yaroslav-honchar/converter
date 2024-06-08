import { RootService } from "./root.service"
import { AxiosRequestConfig, AxiosResponse } from "axios"
// import { ServerRoutes } from "@/_app/routes"

class TelegramAccount extends RootService {
  async sendArchive(data: FormData, config?: AxiosRequestConfig<FormData>): Promise<AxiosResponse> {
    return this.http.post("http://localhost:3000/api/telegram/send-archive", data, config)
    //   return this.http.post(ServerRoutes.telegramSendArchive, data, config)
  }
}

export const TelegramAccountService = new TelegramAccount()
