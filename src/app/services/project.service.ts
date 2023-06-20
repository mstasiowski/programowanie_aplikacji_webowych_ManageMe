import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {
    
   }


addProject(name: string, description: string, isActive:boolean,lsKey?:string)
{
  let newProject: Project = {

    lsKeyName: undefined,
    name: undefined,
    description: undefined,
    isActive: false
  
  };

  
   
  
  let projName = "project"
  let projNum = 1;
  let NameStorage = {};
    let keys = Object.keys(localStorage);
    let i = keys.length;
    
    // for(let j = 0;j<keys.length;j++)
    // {
    //   console.log(parseInt(keys[j].slice(7)));
    //   projNum= i+1;
    // }

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      if (key.startsWith(projName)) {
        const num = parseInt(key.slice(projName.length));
        if (!isNaN(num) && num >= projNum) {
          projNum = num + 1;
        }
      }
    }
  
  
    if(lsKey != undefined)
    {
      newProject.lsKeyName = lsKey
    }else
    {
      newProject.lsKeyName = projName+projNum;
    }

  newProject.name = name;
  newProject.description = description;
  newProject.isActive= isActive;

  
  let newProject_serialized = JSON.stringify(newProject);

  localStorage.setItem(newProject.lsKeyName,newProject_serialized);

  let getInfo = JSON.parse(localStorage.getItem(newProject.lsKeyName) || "");

  // console.log(getInfo);
  // console.log(`Wartosc lsKey: ${lsKey}`);

}

getProjects()
{
  if(localStorage.length == 0)
  {
    return []
  }

  // const projects: Array<Project> =[];
  // let keys = Object.keys(localStorage);
  // let i = keys.length

  // for(let j=0;j<i; j++)
  // {
  //   let lsProjects = JSON.parse(localStorage.getItem(keys[j])||"");
  //   projects.push(lsProjects)
  // }

  // return projects;

  const projects: Array<Project> =[];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  for(let j=0;j<i;j++)
  {
    const key = keys[j];
    if(key.startsWith("project"))
    {
      let lsProjects = JSON.parse(localStorage.getItem(key)|| "")
      projects.push(lsProjects);
    }

  }

  
  return projects;


}

deleteProject(lsKeyName: string)
{
  //Usuwanie projektu
  // let projects:Array<Project>=this.getProjects();
  // let keys = Object.keys(localStorage);
  // let i = keys.length
  
  // for(let j=0;j<i; j++)
  // {
  //  if(lsKeyName == projects[j].lsKeyName)
  //  {
  //   localStorage.removeItem(lsKeyName);
  //  }
  // }
  localStorage.removeItem(this.getProjectLsKeyName(lsKeyName));

//Usuwanie funkcjonalnosci

//Usuwanie zadan

}

editProject(lsKeyName:any, name:string, description:string)
{
  this.deleteProject(lsKeyName);

  let projects:Array<Project> = this.getProjects();
 
 
  let index = projects.indexOf(lsKeyName);
  // let spliceValue = projects.splice(index,1);

 this.addProject(name,description,false,lsKeyName);

//  for(let z=0;z<projects.length;z++)
//  {
//   console.log(`jak wygląda teraz tablica ${projects[z]}`);
//  }

// console.log(`lsKey: ${lsKeyName}`);
// console.log(`nazwa: ${name}`);
// console.log(`opis: ${description}`)

}

getProjectLsKeyName(lsKeyName: string)
{
  let projects:Array<Project>=this.getProjects();
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

getProjectArrayInfo()
{
  let projects = this.getProjects();

  if(projects.length== 0)
  {
    console.log("pusta tablica")
  }

  for(let i =0;i<projects.length;i++)
  {
    console.log(projects[i])
  }
}

getProjectByKey(key:string)
{
 
  const projects: Array<Project> =this.getProjects();
  let project: Array<Project> =[];
  let keys = Object.keys(localStorage);
  let i = keys.length

  for(let j=0;j<i; j++)
  {
    let lsProjects = JSON.parse(localStorage.getItem(keys[j])||"");

    if(lsProjects.lsKeyName == key)
    {
      project = lsProjects;
    }
    
  }

  // console.log(project);
  return project;
}

//Ustawia isActive na true dla podanego key a reszcie zmienia na false
setAsActive(key:string)
{

  const projects: Array<Project> = this.getProjects();
  let keys = Object.keys(localStorage);
  let i = keys.length;

  for (let j = 0; j < i; j++) {
    let lsProjects = JSON.parse(localStorage.getItem(keys[j]) || "");

    if(keys[j].startsWith("project"))
    {
    if (lsProjects.lsKeyName == key) {
      lsProjects.isActive = true;
      localStorage.setItem(keys[j], JSON.stringify(lsProjects));
    } else {
      lsProjects.isActive = false;
      localStorage.setItem(keys[j], JSON.stringify(lsProjects));
    }

  }


  }
}

getActiveProject()
{
  const projects:Array<Project> = this.getProjects();

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].isActive === true) {
      return projects[i];
    }
  }

  return null;
  
}


createDefaultProject()
{
  localStorage.clear();

  const projects: Project[] = [
    {
      lsKeyName: 'project1',
      name: 'Project 1',
      description: 'opis Project 1',
      isActive: false
    },
    {
      lsKeyName: 'project2',
      name: 'Project 2',
      description: 'opis Project 2',
      isActive: false
    },
    {
      lsKeyName: 'project3',
      name: 'Project 3',
      description: 'opis Project 3',
      isActive: false
    }
  ];

  projects.forEach((project:any) => {
    const project_serialized = JSON.stringify(project);
    localStorage.setItem(project.lsKeyName, project_serialized);
  });
}

}
