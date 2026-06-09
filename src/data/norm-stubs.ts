// ─────────────────────────────────────────────────────────────────────────────
//  STUBS de normas referenciadas pero NO cargadas en detalle.
//  Permiten que las referencias inline (texto oficial y explicaciones) sean
//  clickeables y muestren el NOMBRE completo + link al texto oficial, sin cargar
//  todo el articulado.
//
//  FUENTE DE VERDAD: tabla `norm_stubs` en la BD (NormsDbService.listStubs()).
//  LawsService la hidrata al arrancar y la expone en el registry; el front la
//  consume desde ahí (ya no hay espejo hardcodeado en el código).
//
//  Este archivo conserva solo el tipo, compartido por el servicio de BD y
//  LawsService.
// ─────────────────────────────────────────────────────────────────────────────

export interface NormStub {
  number: string; // con punto, p. ej. "17.285"
  name: string; // nombre completo (sin sigla)
  infolegId?: string; // id interno de InfoLeg, si se conoce (link directo)
}
