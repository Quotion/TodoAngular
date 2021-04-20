import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators'
import { plainToClass, Type } from 'class-transformer';

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
    
    public getText(){
        return this.text
    }

    public getCompleted(){
        return this.isCompleted
    }

    public setCompleted(value: boolean) {
        this.isCompleted = value
    }
}

export class Project {
    id: number = 0;
    title: string = "";

    @Type(() => Todo)
    todo_projects: Todo[] = [];

    public getTitle(){
        return this.title;
    }

    public getTodo(id: number)  {
        return this.todo_projects[id];
    }
}
  
@Injectable({providedIn: 'root'})
export class ProjectService {

    constructor(private http: HttpClient) { }

    public projects: Project[] = [];

    // http://localhost:3000/v1/
    // https://quiet-lake-55143.herokuapp.com/v1/
    private url: string = "https://quiet-lake-55143.herokuapp.com/v1/"

    getData() {
        const term = "projects/";
        console.log(this.url + term)
        return this.http.get<Project[]>(this.url + term).pipe(delay(2000),
            tap(project => this.projects = project),
            map(response => plainToClass(Project, response as Object[]))
        );
    }

    changeCheck(prj_id: number, todo_id: number, isCompleted: boolean){
        const term = "projects/" + String(prj_id) + "/todo_projects/" + String(todo_id) 
        const body = {isCompleted: isCompleted}
        return this.http.patch(this.url + term, body).subscribe(
            (val) => {console.log("PATCH call successful value returned in body", val);},
            response => { console.log("PATCH call in error", response);},
            () => {console.log("The PATCH observable is now completed.");});
    }

    createTodo(prj_id: number, todo: string, new_project: string){
        const term = "todo_projects/";
        let body;
        if (new_project) {
            body = {project_id: 0, todo: todo, new_project: new_project};
        } else {
            body = {project_id: prj_id, todo: todo, new_project: ""};
        }
        console.log(body)
        return this.http.post(this.url + term, body).subscribe(
            (val) => {console.log("POST call successful value returned in body", val);},
            response => { console.log("POST call in error", response);},
            () => {console.log("The POST observable is now completed.");});
    }

}
