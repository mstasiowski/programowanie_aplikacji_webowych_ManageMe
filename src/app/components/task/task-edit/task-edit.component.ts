import { Component, OnInit } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority } from 'src/app/enums/priority';
import { Status } from 'src/app/enums/status';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit{

  constructor(private ProjectService:ProjectService, private FunctionalityService:FunctionalityService, private TaskService: TaskService ,private activatedRoute:ActivatedRoute) {}

  functionalities:Array<Functionality> =[];
  tasks:Array<Task> =[];

  taskKey:any;
  task:any = []


  ngOnInit(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.tasks = this.TaskService.getTasks();

    this.taskKey = this.activatedRoute.snapshot.paramMap.get('key');
    this.task = this.tasks.find(x =>x.lsKeyName == this.taskKey);


    this.editTaskForm = new FormGroup(
      {
        taskName: new FormControl(this.task.name,Validators.required)  ,
        taskDesc: new FormControl(this.task.description,Validators.required),
        taskPriority: new FormControl(this.task.priority,Validators.required),
        taskStatus: new FormControl(this.task.status,Validators.required),
        taskFuncName: new FormControl(this.task.funcName,Validators.required),
    
      });
    
  }


  priorityLow= Priority.low;
  priorityMedium= Priority.medium;
  priorityHigh= Priority.high;

  statusToDo = Status.todo;
  statusDoing = Status.doing;
  statusDone = Status.done;

  activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;


editTaskForm = new FormGroup(
  {
    taskName: new FormControl('' ,Validators.required)  ,
    taskDesc: new FormControl('' ,Validators.required),
    taskPriority: new FormControl('' ,Validators.required),
    taskStatus: new FormControl('' ,Validators.required),
    taskFuncName: new FormControl('' ,Validators.required),

  });


editTask()
{
  
  let lsKeyName:string =this.task.lsKeyName;
  let taskName:string =this.editTaskForm.controls.taskName.value ?? '';
  let taskDesc: string = this.editTaskForm.controls.taskDesc.value ?? '';
  let taskPriority:string = this.editTaskForm.controls.taskPriority.value ?? '';
  let taskStatus:string = this.editTaskForm.controls.taskStatus.value ?? '';
  let taskFuncName:string = this.editTaskForm.controls.taskFuncName.value ?? '';

  if(taskFuncName == "")
  {
    alert("Musisz najpierw wybrać funkcjonalność aby edytować zadanie ")
  }else
  {
    
    this.TaskService.editTask(lsKeyName, taskName, taskDesc, taskPriority, taskStatus, taskFuncName);
  }

  
}


}
