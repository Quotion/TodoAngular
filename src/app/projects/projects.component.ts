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
