import { LocalDatabase } from './local-database';

export interface Collection {
  getAllDocuments(): Promise<any[]>;
  getDocumentById(id: string): Promise<any>;
  createDocument(newObj: any): Promise<void>;
  updateDocumentById(id: string, update: Partial<any>): Promise<void>;
  deleteDocumentById(id: string): Promise<void>;
}

export class DatabaseCollection implements Collection {
  private collectionName: string = '';

  constructor() {}

  private getDatabasePath(): string {
    return `${process.cwd()}/data/${this.collectionName}.db.json`;
  }

  getAllDocuments(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  getDocumentById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  createDocument(newObj: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateDocumentById(id: string, update: Partial<any>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteDocumentById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
