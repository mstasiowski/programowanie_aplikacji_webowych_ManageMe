import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

constructor(private ProjectService:ProjectService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    //pobieranie wartosci key z aktywnego url
    this.projectKey = this.activatedRoute.snapshot.paramMap.get('key');
    this.projects = this.ProjectService.getProjects();
    this.project = this.projects.find(x =>x.lsKeyName == this.projectKey)
  }

  projectKey:any;
  projects:Array<Project>=[];
  project:any = []

  setAsActive()
  {
    this.ProjectService.setAsActive(this.project.lsKeyName)
    
  }

}
