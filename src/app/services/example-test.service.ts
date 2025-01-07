import { Observable, of } from 'rxjs';
import { TodoSignalsService } from './todo-signals.service';
import { Injectable } from '@angular/core';
import { Todo } from '../models/model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ExampleTestService {
  public testNameList: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Test01' },
    { id: 2, name: 'Test02' },
  ];
  constructor(private todoSignalsService: TodoSignalsService) {}

  getTestNamesList(): Observable<Array<{ id: number; name: string }>> {
    return of(this.testNameList);
  }

  handleCreateTodo(todo: Todo): Observable<Array<Todo> | null> {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      return of(this.todoSignalsService.todosState());
    }
    return of(null);
  }
}
