import { RootService } from "./root.service"
import { AxiosResponse } from "axios"
import { ServerRoutes } from "@/_app/routes"

class Convert extends RootService {
  async convert(data: FormData): Promise<AxiosResponse<Blob>> {
    return this.http.post<Blob>(ServerRoutes.converter, data)
  }
}

export const ConvertService = new Convert()
