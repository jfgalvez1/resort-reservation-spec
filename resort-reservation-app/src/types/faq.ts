export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[];
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
}

export type FAQCategory = 
  | 'general'
  | 'reservations'
  | 'amenities'
  | 'policies'
  | 'billing'
  | 'cancellation'
  | 'check-in'
  | 'check-out'
  | 'accessibility'
  | 'transportation';

export interface FAQSection {
  id: string;
  title: string;
  description?: string;
  category: FAQCategory;
  entries: FAQEntry[];
  order: number;
}

export interface FAQSearchResult {
  entry: FAQEntry;
  relevanceScore: number;
  matchedTerms: string[];
}
