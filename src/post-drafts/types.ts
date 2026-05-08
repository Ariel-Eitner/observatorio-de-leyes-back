export type Platform = 'twitter';

export type TemplateId =
  | 'EJEMPLO'       // segmento con practicalExample
  | 'RESUMEN'       // artículo con plainLanguageExplanation
  | 'EFECTOS'       // artículo con practicalEffects
  | 'BASE';         // fallback: solo título + summary de la ley

export interface PostDraft {
  id:            string;
  createdAt:     string;
  platform:      Platform;
  postText:      string;
  commentText:   string;
  lawId:         string;
  lawTitle:      string;
  articleNumber: string;
  utmContent:    string;
  templateUsed:  TemplateId;
}

export interface GenerateResult {
  postText:      string;
  commentText:   string;
  lawId:         string;
  lawTitle:      string;
  articleNumber: string;
  utmContent:    string;
  templateUsed:  TemplateId;
}
