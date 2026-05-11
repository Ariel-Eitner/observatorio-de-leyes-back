export type Platform = 'twitter' | 'linkedin';

export type TemplateId =
  | 'EJEMPLO'       // segmento con practicalExample
  | 'RESUMEN'       // artículo con plainLanguageExplanation
  | 'EFECTOS'       // artículo con practicalEffects
  | 'BASE'          // fallback: solo título + summary de la ley
  | 'LI_ARTICULO'   // linkedin: artículo completo con efectos
  | 'LI_EFECTOS'    // linkedin: lista de efectos prácticos
  | 'LI_BASE';      // linkedin: resumen de la ley

export interface PostDraft {
  id:            string;
  createdAt:     string;
  platform:      Platform;
  postText:      string;
  commentText:   string;
  hashtags:      string;
  lawId:         string;
  lawTitle:      string;
  articleNumber: string;
  utmContent:    string;
  templateUsed:  TemplateId;
}

export interface GenerateResult {
  postText:      string;
  commentText:   string;
  hashtags:      string;
  lawId:         string;
  lawTitle:      string;
  articleNumber: string;
  utmContent:    string;
  templateUsed:  TemplateId;
}
