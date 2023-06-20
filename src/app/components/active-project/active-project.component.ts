import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-active-project',
  templateUrl: './active-project.component.html',
  styleUrls: ['./active-project.component.scss']
})
export class ActiveProjectComponent implements OnInit{


constructor(private ProjectService:ProjectService) {}


ngOnInit(): void {
    this.getActiveProject();
  }

  activeProjectName: string | undefined = "";
  activeProjectDesc: string | undefined = "";



getActiveProject()
{
  let activeProject = this.ProjectService.getActiveProject();
  if(activeProject)
  {
    this.activeProjectName = activeProject.name;
    this.activeProjectDesc = activeProject.description;

  }
}

}
