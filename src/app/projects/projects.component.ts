import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProjectService } from '../shared/projects.service';


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    constructor( public projectService: ProjectService) { }

    public loading: boolean = true

    ngOnInit(): void {
        this.projectService.getData().subscribe(() => this.loading = false);
    }

    onChange(prj_id: number, todo_id: number) {
        let todos = this.projectService.projects[prj_id - 1].todo_projects
        for(let todo of todos) {
            if (todo.id == todo_id) {
                todo.isCompleted = !todo.isCompleted;
                this.projectService.changeCheck(prj_id, todo_id, todo.isCompleted)  
                break;
            }
        }
    }


    // states = [
    //     {name: 'Arizona'},
    //     {name: 'California'},
    //     {name: 'Colorado'},
    //     {name: 'New York'},
    //     {name: 'Pennsylvania'},
    // ];

    // myFirstReactiveForm : FormGroup = new FormGroup({
    //     "text": new FormControl("", Validators.required),
    //     "project": new FormControl(this.states[3], Validators.required)
    // });
}
