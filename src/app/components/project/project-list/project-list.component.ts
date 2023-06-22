import { Component, DoCheck, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  
})
export class ProjectListComponent implements OnInit,DoCheck{

constructor(private ProjectService: ProjectService) {}
  ngDoCheck(): void {
  this.projects= this.ProjectService.getProjects();
    
  }
  ngOnInit(): void {
  this.projects= this.ProjectService.getProjects();
    
  }

projects:Array<Project> = [];

deleteProject(lsKeyName:any)
{
 this.ProjectService.deleteProject(lsKeyName);
}



}
