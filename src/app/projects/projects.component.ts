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
    public showHide: boolean = false

    myFirstReactiveForm : FormGroup = new FormGroup({
        "text": new FormControl("", Validators.required),
        "project": new FormControl("", Validators.required),
        "new_project": new FormControl("", Validators.required)
    });

    ngOnInit(): void {
        this.projectService.getData().subscribe(() => this.loading = false);
        this.myFirstReactiveForm.get('project')?.valueChanges.subscribe(value => { 
            console.log(value)
            if (value == 0) {
                this.showHide = true;
            } else {
                this.showHide = false;
            }
        });
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

    onSubmit() {
        this.projectService.createTodo(this.myFirstReactiveForm.value['project'], 
                                       this.myFirstReactiveForm.value['text'], 
                                       this.myFirstReactiveForm.value['new_project'])
    }


    isExists(input: string): boolean {
        const control = this.myFirstReactiveForm.controls[input];
        const result = control.invalid && control.touched;
        return result;
    }

    onCreateProject() {
        
    }

    goToModal(){
        window.location.replace('/#demo-modal');
    }

    onClick(){
        window.location.replace('/');
    }
}
