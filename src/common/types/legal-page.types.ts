export interface LegalPageSection {
  id: string;
  title?: string;
  content: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalPageSection[];
}
