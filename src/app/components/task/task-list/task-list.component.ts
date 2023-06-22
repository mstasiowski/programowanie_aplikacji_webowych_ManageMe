import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Functionality } from 'src/app/models/functionality.model';
import { ProjectService } from 'src/app/services/project.service';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit,OnChanges,DoCheck {

constructor(private ProjectService:ProjectService, private FunctionalityService:FunctionalityService, private TaskService:TaskService) {
  
  
}
  ngDoCheck(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.tasks = this.TaskService.getTasks();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.tasks = this.TaskService.getTasks();
    // console.log(this.TaskService.getTasksByFuncName("functionality2"));

    // console.log(`Aktywny projekt:${this.activeProjectKey}`)
    // console.log(`nazwa projektu z tasków:${this.tasks[0].projectKeyName}`)
    window.addEventListener('storage', (event) => {
      if (event.key === 'localStorageKey') {
        this.tasks;
      }
    });


  }

  functionalities:Array<Functionality> =[];
  tasks:Array<Task> =[];
  activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;


  deleteTask(lsKeyName:any)
  {
    this.TaskService.deleteTask(lsKeyName);
  }

  changeTaskStatus(lsKeyName:any, name:any, description:any, priority:any, status:any, funcName:any)
  {
    this.TaskService.changeTaskStatus(lsKeyName, name, description, priority, status, funcName);
  }

}
