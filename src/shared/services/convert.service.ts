import { AxiosResponse } from "axios"

import { ServerRoutes } from "@/_app/routes"

import { RootService } from "./root.service"

class Convert extends RootService {
  async convert(data: FormData): Promise<AxiosResponse<Blob>> {
    return this.http.post<Blob>(ServerRoutes.converter, data, {
      responseType: "blob",
    })
  }
}

export const ConvertService = new Convert()
