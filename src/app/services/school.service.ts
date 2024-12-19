import { Injectable, OnInit } from '@angular/core';
import { Observable, of, zip } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private students: Array<SchoolData> = [
    { name: 'Pedro', id: '1' },
    { name: 'Maria', id: '2' },
    { name: 'Gabriela', id: '3' },
  ];

  private teachers: Array<SchoolData> = [
    { name: 'Fernando', id: '1' },
    { name: 'Jorge', id: '2' },
    { name: 'Julia', id: '3' },
  ];

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }
}
