import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './models/model/todo.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoService: TodoSignalsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set input property correctly', () => {
    component.projectName = 'Todo List Project';

    fixture.detectChanges();

    expect(component.projectName).toEqual('Todo List Project');
  });

  it('should emit using output property correctly', () => {
    component.projectName = 'Testing Angular Application';

    component.outputEvent.pipe(first()).subscribe({
      next: (event) => {
        expect(event).toBe('Testing Angular Application');
        component.handleEmitEvent(component.projectName);
      },
    });
  });

  it('should create new todo correctly and call service method', () => {
    const newTodo: Todo = {
      id: 99,
      title: 'Testing Todo title',
      description: 'Testing Todo description',
      done: false,
    };

    const spy = jest.spyOn(todoService, 'updateTodos');
    component.handleCreateTodo(newTodo);
    expect(spy).toHaveBeenCalledWith(newTodo);
    //expect(component.todoSignals()).toBe([newTodo]);
  });

  it('should not render paragraph if isRender is false', () => {
    const debugElement = fixture.debugElement;
    const element: HTMLElement = debugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  });

  it('should render paragraph if isREnder is true', () => {
    component.isRender = true;
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const paragraphDebugElement = debugElement.query(By.css('#render'));
    const element: HTMLElement = paragraphDebugElement.nativeElement;

    expect(element.textContent).toBe('Test Angular Application');
  });
});
