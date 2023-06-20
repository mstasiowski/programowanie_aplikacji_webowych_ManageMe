import { Component } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority } from 'src/app/enums/priority';
import { Status } from 'src/app/enums/status';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {


constructor(private ProjectService:ProjectService, private FunctionalityService:FunctionalityService, private TaskService: TaskService) {}

functionalities:Array<Functionality> =[];
tasks:Array<Task> =[];


  ngOnInit(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.tasks = this.TaskService.getTasks();
    


    this.addTaskForm = new FormGroup(
      {
      taskName: new FormControl('' ,Validators.required)  ,
      taskDesc: new FormControl('' ,Validators.required),
      taskPriority: new FormControl('' ,Validators.required),
      taskStatus: new FormControl('' ,Validators.required),
      taskFuncName: new FormControl('' ,Validators.required),

      });
  }
  
    priorityLow= Priority.low;
    priorityMedium= Priority.medium;
    priorityHigh= Priority.high;

    statusToDo = Status.todo;
    statusDoing = Status.doing;
    statusDone = Status.done;

    activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;


  addTaskForm = new FormGroup(
    {
      taskName: new FormControl('' ,Validators.required)  ,
      taskDesc: new FormControl('' ,Validators.required),
      taskPriority: new FormControl('' ,Validators.required),
      taskStatus: new FormControl('' ,Validators.required),
      taskFuncName: new FormControl('' ,Validators.required),

    });
 

  createTask()
  {
    

    let taskName:string =this.addTaskForm.controls.taskName.value ?? '';
    let taskDesc: string = this.addTaskForm.controls.taskDesc.value ?? '';
    let taskPriority:string = this.addTaskForm.controls.taskPriority.value ?? '';
    let taskStatus:string = this.addTaskForm.controls.taskStatus.value ?? '';
    let taskFuncName:string = this.addTaskForm.controls.taskFuncName.value ?? '';

    if(taskFuncName == "")
    {
      alert("Musisz najpierw wybrać funkcjonalność aby dodać nowe zadanie ")
    }else
    {
      this.TaskService.addTask(taskName, taskDesc, taskPriority, taskStatus, taskFuncName)
    }


    // this.FunctionalityService.addFunctionality(funcName, funcDesc, funcPriority, funcStatus,this.activeProjectKey);
    
  }
}
