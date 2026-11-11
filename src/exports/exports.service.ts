import { Injectable } from "@nestjs/common";
import { CuposService } from "../cupos/cupos.service";
export type ExportType = "pdf" | "docx" | "text";
@Injectable()
export class ExportsService {
  constructor(private readonly cupos: CuposService) {}
  async getCount(userId: string) {
    const { descargas } = await this.cupos.resumen(userId);
    return {
      used: descargas.usado,
      limit: descargas.limite,
      remaining: descargas.restante,
    };
  }
  async record(userId: string, type: ExportType) {
    const result = await this.cupos.autorizar(userId, "exportacion", type);
    return { ...result, remaining: result.restante ?? (result.ok ? null : 0) };
  }
}
