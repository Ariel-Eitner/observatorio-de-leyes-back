import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { RedactorSearchService } from "./redactor-search.service";

@Controller("redactor-search")
@Throttle({ global: { ttl: 60_000, limit: 40 } })
export class RedactorSearchController {
  constructor(private readonly service: RedactorSearchService) {}
  private lawId(value: string) {
    if (typeof value !== "string" || !value || value.length > 160)
      throw new BadRequestException("Seleccioná una norma.");
    return value;
  }
  private offset(value: string) {
    return Math.min(10_000, Math.max(0, Number.parseInt(value, 10) || 0));
  }
  private query(value: string) {
    if (typeof value !== "string")
      throw new BadRequestException("Ingresá una sola búsqueda.");
    return value.slice(0, 120);
  }
  @Get("norms")
  norms(@Query("q") q = "", @Query("offset") offset = "0") {
    return this.service.norms(this.query(q), this.offset(offset));
  }
  @Get("norms/:id")
  norm(@Param("id") id: string) {
    return this.service.norm(this.lawId(id));
  }
  @Get("tokens")
  tokens() {
    return this.service.tokens();
  }
  @Get("articles")
  articles(
    @Query("lawId") lawId: string,
    @Query("q") q = "",
    @Query("offset") offset = "0",
  ) {
    return this.service.articles(
      this.lawId(lawId),
      this.query(q),
      this.offset(offset),
    );
  }
  @Get("articles/:id")
  article(@Param("id") id: string, @Query("lawId") lawId: string) {
    return this.service.article(id, this.lawId(lawId));
  }
}
