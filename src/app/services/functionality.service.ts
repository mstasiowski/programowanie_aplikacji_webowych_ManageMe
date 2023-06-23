import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Functionality } from '../models/functionality.model';
import { Status } from '../enums/status';
import { Priority } from '../enums/priority';

@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {

  constructor(private ProjectService:ProjectService) { }


  addFunctionality(name:string, description:string, priority:string, status:string, projectKey:string, ownerKey?:string, lsKeyName?:string)
  {
    let newFunctionality: Functionality ={
      lsKeyName:undefined,
      name:undefined,
      description:undefined,
      priority: undefined,
      status: undefined,
      projectKey: undefined,
      ownerKey: undefined
    };

    let funcName = "functionality";
    let funcNum = 1;

    let keys = Object.keys(localStorage);
    let i = keys.length;

    // for(let j = 0;j<keys.length;j++)
    // {
    //   funcNum= i+1;
    // }

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      if (key.startsWith(funcName)) {
        const num = parseInt(key.slice(funcName.length));
        if (!isNaN(num) && num >= funcNum) {
          funcNum = num + 1;
        }
      }
    }
  
  
    if(lsKeyName != undefined)
    {
      newFunctionality.lsKeyName = lsKeyName
    }else
    {
      newFunctionality.lsKeyName = funcName + funcNum;
    }

  newFunctionality.name = name;
  newFunctionality.description = description;
  newFunctionality.priority= priority;
  newFunctionality.status = status;
  newFunctionality.projectKey = projectKey;
  if(ownerKey !=undefined)
  {
    newFunctionality.ownerKey = ownerKey;
  }else
  {
    newFunctionality.ownerKey = "Admin";
  }


  
  let newFunctionality_serialized = JSON.stringify(newFunctionality);

  localStorage.setItem(newFunctionality.lsKeyName,newFunctionality_serialized);

  // let getInfo = JSON.parse(localStorage.getItem(newFunctionality.lsKeyName) || "");
  }

  getFunctionalities()
  {
    if(localStorage.length == 0)
  {
    return []
  }

  

  const functionalities: Array<Functionality> =[];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  for(let j=0;j<i;j++)
  {
    const key = keys[j];
    if(key.startsWith("functionality"))
    {
      let lsFunctionalities = JSON.parse(localStorage.getItem(key)|| "")
      functionalities.push(lsFunctionalities);
    }

  }

  return functionalities;

}

getFuncByLsKeyName(lsKeyName: string)
{
  let projects:Array<Functionality>=this.getFunctionalities();
  let keys = Object.keys(localStorage);
  let i = keys.length

  
  for(let j=0;j<i; j++)
  {
   if(lsKeyName == projects[j].lsKeyName)
   {
    return lsKeyName;
   }
  
  
  }

  return '';

}


getFuncByFuncName(name:string)
{


  const keys = Object.keys(localStorage);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key.startsWith("functionality")) {
      const functionality: Functionality = JSON.parse(localStorage.getItem(key) || "");
      if (functionality.name === name) {
        return functionality;
      }
    }
  }

  return null;



}


editFunc(name:string, description:string, priority:string, status:string, projectKey:any, lsKeyName:string)
{
  this.deleteFunctionality(lsKeyName);

  let functionalities:Array<Functionality> = this.getFunctionalities();
 
  this.addFunctionality(name, description, priority, status, projectKey,"Admin",lsKeyName);



}



deleteFunctionality(lsKeyName: string)
{
  
  localStorage.removeItem(this.getFuncByLsKeyName(lsKeyName));
  
}


createDefaultFunc()
{
  const functionalities: Functionality[] = [

  {
    lsKeyName: 'functionality1',
    name: 'Funkcjonalnosc 1',
    description: 'opis funkcji 1',
    priority: Priority.low,
    status: Status.doing,
    projectKey: 'project1',
    ownerKey: 'Admin'
  },
  {
    lsKeyName: 'functionality2',
    name: 'Funkcjonalnosc 2',
    description: 'opis funkcji 2',
    priority: Priority.medium,
    status: Status.todo,
    projectKey: 'project1',
    ownerKey: 'Admin'
  },
  {
    lsKeyName: 'functionality3',
    name: 'Funkcjonalnosc 3',
    description: 'opis funkcji 3',
    priority: Priority.high,
    status: Status.done,
    projectKey: 'project2',
    ownerKey: 'Admin'
  }
];

functionalities.forEach((functionality:any) => {
  const functionality_serialized = JSON.stringify(functionality);
  localStorage.setItem(functionality.lsKeyName, functionality_serialized);
});


}




}
