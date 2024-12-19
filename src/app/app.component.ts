import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { CommonModule } from '@angular/common';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TodoCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private schoolService = inject(SchoolService);
  title = 'todo-list';
  public getStudents$ = this.schoolService.getStudents();
  public getTeachers$ = this.schoolService.getTeachers();
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(this.getStudents$, this.getTeachers$);

  ngOnInit(): void {
    this.getSchoolDatas();
    this.getStudents$.subscribe({
      next: (response) => {
        console.log('Students$: ', response);
      },
    });
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('Students: ', response[0]);
        console.log('Teachers: ', response[1]);
      },
    });
  }

  private getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
