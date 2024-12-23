import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { CommonModule } from '@angular/common';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, Observable, of, switchMap, zip } from 'rxjs';

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
  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleDatas = from([
    {
      name: 'Marcos',
      age: 20,
      jobDescription: 'Teacher',
    },
    {
      name: 'Maria',
      age: 25,
      jobDescription: 'Software Engineer',
    },
    {
      name: 'João',
      age: 27,
      jobDescription: 'UX Designer',
    },
  ]);
  private studentUserId = '2';
  ngOnInit(): void {
    this.handleFindStudentById();
    this.getPeopleByJobDescription('Software Engineer');
    this.getMultipliedAges();
    this.getPeopleJobDescription();
    this.getSchoolDatas();
    this.getStudents$.subscribe({
      next: (response) => {
        console.log('====================');
        console.log('Students$: ', response);
      },
    });
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('====================');
        console.log('Students: ', response[0]);
        console.log('Teachers: ', response[1]);
      },
    });
  }

  public getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * 2)).subscribe({
      next: (response) => {
        console.log('====================');
        console.log('Multiplied Age: ', response);
      },
    });
  }

  public getPeopleJobDescription(): void {
    this.peopleDatas.pipe(map((people) => people.jobDescription)).subscribe({
      next: (response) => {
        console.log('====================');
        console.log('Job Description: ', response);
      },
    });
  }

  public getPeopleByJobDescription(value: string): void {
    this.peopleDatas
      .pipe(
        filter((people) => people.jobDescription === value),
        map((people) => people.name)
      )
      .subscribe({
        next: (response) => {
          console.log('====================');
          console.log(
            `${response} is the Person with the Job Description: ${value}`
          );
        },
      });
  }

  private getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }

  private handleFindStudentById():void {
    this.getStudentsDatas().pipe(
      switchMap((students) => this.findStudentById(students, this.studentUserId))
    ).subscribe({
      next: (response) => {
        console.log("Retorno estudante filtrado: ", response)
      }
    })
  }

  private findStudentById(students: Array<SchoolData>, userId: string): Observable<(SchoolData | undefined)[]> {
    return of([students.find(student => student.id === userId)])
  }
}
