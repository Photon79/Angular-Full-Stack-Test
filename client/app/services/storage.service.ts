import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() { }

  save(data: any): void {
    Object.keys(data).forEach(key => localStorage.setItem(`test1-${key}`, JSON.stringify(data[key])));
  }

  load(key: string): any {
    return JSON.parse(localStorage.getItem(`test1-${key}`));
  }

  delete(key: string): void {
    localStorage.removeItem(`test1-${key}`);
  }

  clear(): void {
    localStorage.clear();
  }
}
