import { TestBed } from '@angular/core/testing';

import { ExampleTestService } from './example-test.service';
import { TodoSignalsService } from './todo-signals.service';
import { Todo } from '../models/model/todo.model';
import { Serializer } from '@angular/compiler';

describe('ExampleTestService', () => {
  let service: ExampleTestService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct list', () => {
    service.getTestNamesList().subscribe({
      next: (list) => {
        expect(list).toEqual([
          { id: 1, name: 'Test01' },
          { id: 2, name: 'Test02' },
        ]);
      },
    });
  });

  it('should return correct todo list', () => {
    jest.spyOn(todoService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description for Test',
      done: true,
    };
    service.handleCreateTodo(newTodo).subscribe({
      next: (response) => {
        expect(response).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      },
    });
  });
});
