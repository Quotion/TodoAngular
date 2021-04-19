import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators'
import { plainToClass } from 'class-transformer';

// export interface Todo {
//     id: number
//     text: string
//     isCompleted: boolean
//   } 
  
//   export interface Project {
//     id: number
//     title: string
//     todos: Todo[]
//   } 

export class Todo {
    id: number = 0;
    text: string = "";
    isCompleted: boolean = false;
    
    getText(){
        return this.text
    }

    getCompleted(){
        return this.isCompleted
    }

    setCompleted(value: boolean) {
        this.isCompleted = value
    }
}

export class Project {
    id: number = 0;
    title: string = "";

    todo_projects: Todo[] = [];

    getTitle(){
        return this.title
    }

    getTodos(){
        return this.todo_projects
    }
}
  
@Injectable({providedIn: 'root'})
export class ProjectService {

    constructor(private http: HttpClient) { }

    public projects: Project[] = [];

    getData() {
        const url = "https://quiet-lake-55143.herokuapp.com/v1/projects/";
        return this.http.get<Project[]>(url).pipe(delay(2000),
            tap(project => this.projects = project),
            map(response => plainToClass(Project, response as Object[]))
        );
    }
}
