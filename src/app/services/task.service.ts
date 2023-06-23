import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { FunctionalityService } from './functionality.service';
import { Status } from 'src/app/enums/status';
import { Priority } from '../enums/priority';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private FunctionalityService:FunctionalityService) { }


  addTask(name: string, description: string, priority:string, status:string, funcName:string, lsKey?:string)
  {
    let newTask: Task = {
  
      lsKeyName: undefined,
      name: undefined,
      description: undefined,
      priority: undefined,
      status: undefined,
      funcName: undefined,
      funcKeyName: undefined,
      projectKeyName: undefined
      
    
    };
  
    
     
    
    let taskName = "task"
    let taskNum = 1;
    
      let keys = Object.keys(localStorage);
      let i = keys.length;
      
     
  
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (key.startsWith(taskName)) {
          const num = parseInt(key.slice(taskName.length));
          if (!isNaN(num) && num >= taskNum) {
            taskNum = num + 1;
          }
        }
      }
    
    
      if(lsKey != undefined)
      {
        newTask.lsKeyName = lsKey
      }else
      {
        newTask.lsKeyName = taskName + taskNum;
      }
  
    newTask.name = name;
    newTask.description = description;
    newTask.priority = priority;
    newTask.status = status;
    newTask.funcName =funcName;
    newTask.funcKeyName=this.FunctionalityService.getFuncByFuncName(funcName)?.lsKeyName;
    newTask.projectKeyName=this.FunctionalityService.getFuncByFuncName(funcName)?.projectKey;
    
  
    
    let newTask_serialized = JSON.stringify(newTask);
  
    localStorage.setItem(newTask.lsKeyName,newTask_serialized);
  
    

  }


  getTasks()
  {
    if(localStorage.length == 0)
  {
    return []
  }

  

  const tasks: Array<Task> =[];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  for(let j=0;j<i;j++)
  {
    const key = keys[j];
    if(key.startsWith("task"))
    {
      let lsTasks = JSON.parse(localStorage.getItem(key)|| "")
      tasks.push(lsTasks);
    }

  }

  return tasks;

}

getTaskLsKeyName(lsKeyName: string)
{
  let tasks:Array<Task>=this.getTasks();
  let keys = Object.keys(localStorage);
  let i = keys.length

  
  for(let j=0;j<i; j++)
  {
   if(lsKeyName == tasks[j].lsKeyName)
   {
    return lsKeyName;
   }
  
  
  }

  return '';

}


deleteTask(lsKeyName: string)
{
  localStorage.removeItem(this.getTaskLsKeyName(lsKeyName));
}

editTask(lsKeyName:string, name:string, description:string, priority:string, status:string, funcName:string)
{
  this.deleteTask(lsKeyName);

  let tasks:Array<Task> = this.getTasks();
 
  this.addTask(name, description, priority, status, funcName,lsKeyName);

}

changeTaskStatus(lsKeyName:string, name:string, description:string, priority:string, status:string, funcName:string)
{
  let newStatus="";

  if(status =="todo")
  {
    newStatus =Status.doing;
    this.editTask(lsKeyName,name,description,priority,newStatus,funcName);

  }else if(status =="doing")
  {
    newStatus =Status.done;
    this.editTask(lsKeyName,name,description,priority,newStatus,funcName);

  }else if(status =="done")
  {
    alert("Już zostało wykonane!!");
  }else
  {
    alert("Change Status error");
  }

}

verifyFuncStatus()
{

  const functionalities = this.FunctionalityService.getFunctionalities();

  for (let i = 0; i < functionalities.length; i++) {
    const functionality:any = functionalities[i];
    const tasks = this.getTasksByFuncName(functionality.lsKeyName);

    if(tasks.length === 0)
    {
      continue;
    }

    let allTasksDone = true;
    let allTasksTodo = true;

    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      if (task.status !== Status.done) {
        allTasksDone = false;
      }
      if (task.status !== Status.todo) {
        allTasksTodo = false;
      }
    }

    if (allTasksDone) {
      functionality.status = Status.done;
    } else if (allTasksTodo) {
      functionality.status = Status.todo;
    } else {
      functionality.status = Status.doing;
    }

    localStorage.setItem(functionality.lsKeyName, JSON.stringify(functionality));
  }


}

getTasksByFuncName(funcKeyName:string)
{

  const tasks: Task[] = [];
  const keys = Object.keys(localStorage);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key.startsWith("task")) {
      const task: Task = JSON.parse(localStorage.getItem(key) || "");
      if (task.funcKeyName === funcKeyName) {
        tasks.push(task);
      }
    }
  }

  return tasks;


}

createDefaultTask()
{
  const tasks: Task[] = [
    {
    lsKeyName:"task1",
    name:"zadanie 1",
    description:"opis zadania 1",
    priority: Priority.high,
    status: Status.todo,
    funcName:"Funkcjonalnosc 1",
    funcKeyName:"functionality1",
    projectKeyName:"project1"
    },
    {
      lsKeyName:"task2",
      name:"zadanie 2",
      description:"opis zadania 1",
      priority: Priority.medium,
      status: Status.doing,
      funcName:"Funkcjonalnosc 1",
      funcKeyName:"functionality1",
      projectKeyName:"project1"
      },
      {
        lsKeyName:"task3",
        name:"zadanie 3",
        description:"opis zadania 3",
        priority: Priority.low,
        status: Status.done,
        funcName:"Funkcjonalnosc 3",
        funcKeyName:"functionality3",
        projectKeyName:"project2"
        },
    
   
  ];

  tasks.forEach((task:any) => {
    const task_serialized = JSON.stringify(task);
    localStorage.setItem(task.lsKeyName, task_serialized);
  });

}


DeleteAllTaskForFunc(funcLsKeyName:string)
{
  let tasks:Array<Task> = this.getTasksByFuncName(funcLsKeyName);

  tasks.forEach(t => {
    let task:any = t.lsKeyName;
    this.deleteTask(task)
    console.log(task);
  });

}

}
