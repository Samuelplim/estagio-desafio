import { Injectable } from "@nestjs/common";
import { JsonObject } from "@prisma/client/runtime/library";

@Injectable()
export class AppService {
  getHealth() {
    return { status: "Aplicação funcionando" };
  }
}
