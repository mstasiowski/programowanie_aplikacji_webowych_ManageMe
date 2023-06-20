import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {


  constructor(private ProjectService: ProjectService, private activatedRoute: ActivatedRoute) {
  }

  projectKey:any;
  projects:Array<Project> = [];
  project:any = []

  ngOnInit(): void {
  
    this.projectKey = this.activatedRoute.snapshot.paramMap.get('key');
    this.projects = this.ProjectService.getProjects();
    this.project = this.projects.find(x =>x.lsKeyName == this.projectKey)

    this.editProjectForm = new FormGroup(
      {
      projectName: new FormControl(this.project.name,Validators.required) ,
      projectDesc: new FormControl(this.project.description,Validators.required),
      });

 
  }
  
  editProjectForm = new FormGroup(
    {
    projectName: new FormControl('' ,Validators.required) ,
    projectDesc: new FormControl('' ,Validators.required),
    });
 
    lsKey:string = '';


  editProject()
  {
    let lsKeyName:string =this.ProjectService.getProjectLsKeyName(this.project.lsKeyName);
    let projectName:string =this.editProjectForm.controls.projectName.value ?? '';
    let projectDesc: string = this.editProjectForm.controls.projectDesc.value ?? '';
    

    this.ProjectService.editProject(lsKeyName,projectName,projectDesc);
  }


}
