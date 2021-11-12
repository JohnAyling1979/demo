import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService: WebService) { }

  getList() {
    return this.webService.get('lists');
  }

  createList(title: string) {
    return this.webService.post('lists', { title });
  }

  getTasks(listId: string) {
    return this.webService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webService.post(`lists/${listId}/tasks`, { title });
  }
}
