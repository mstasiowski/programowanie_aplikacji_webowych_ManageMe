import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss',],
  
})
export class ProjectAddComponent implements OnInit{

  
  constructor(private ProjectService: ProjectService) {
  }
  ngOnInit(): void {
  
    this.addProjectForm = new FormGroup(
      {
      projectName: new FormControl('' ,Validators.required) ,
      projectDesc: new FormControl('' ,Validators.required),
      });
  }
  
  addProjectForm = new FormGroup(
    {
    projectName: new FormControl('' ,Validators.required) ,
    projectDesc: new FormControl('' ,Validators.required),
    });
 

  createProject()
  {
    let projectName:string =this.addProjectForm.controls.projectName.value ?? '';
    let projectDesc: string = this.addProjectForm.controls.projectDesc.value ?? '';
    let projectIsActive:  boolean = false; 

    this.ProjectService.addProject(projectName,projectDesc,projectIsActive);
  }
}
