import { Component, DoCheck, OnInit } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { Functionality } from 'src/app/models/functionality.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss']
})
export class FunctionalityListComponent implements OnInit,DoCheck {

constructor(private FunctionalityService: FunctionalityService, private ProjectService:ProjectService, private TaskService: TaskService) {}
  ngDoCheck(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.TaskService.verifyFuncStatus();

   
  }
  ngOnInit(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.TaskService.verifyFuncStatus();

    window.addEventListener('storage', (event) => {
      if (event.key === 'localStorageKey') {
        this.functionalities;
      }
    });
    
  }

  functionalities:Array<Functionality> =[];
  activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;
  

  deleteFunc(lsKeyName:any)
  {
    this.FunctionalityService.deleteFunctionality(lsKeyName);
    //
    this.TaskService.DeleteAllTaskForFunc(lsKeyName);
  }

 

}
