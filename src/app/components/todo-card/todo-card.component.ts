import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from '../../services/todo-signals.service';
import { todoKeyLocalStorage } from '../../models/enum/todoKeyLocalStorage';
import { Todo } from '../../models/model/todo.model';
import { CustomUpperCasePipe } from '../../shared/pipes/CustomUpperCase.pipe';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CustomUpperCasePipe,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      todoKeyLocalStorage.TODO_LIST
    ) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.update((todos) => {
        const todoSelected = todos.find((todo) => todo.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage();
        return todos;
      });
    }
  }

  handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);
      if (index !== -1) {
        this.todosSignal.update((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
          return todos;
        });
      }
    }
  }
}
