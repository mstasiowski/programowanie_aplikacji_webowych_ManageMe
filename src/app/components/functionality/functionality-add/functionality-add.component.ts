import { Component } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Priority } from 'src/app/enums/priority';
import { Status } from 'src/app/enums/status';


@Component({
  selector: 'app-functionality-add',
  templateUrl: './functionality-add.component.html',
  styleUrls: ['./functionality-add.component.scss']
})
export class FunctionalityAddComponent {

  
  constructor(private FunctionalityService: FunctionalityService, private ProjectService: ProjectService) {
  }
  ngOnInit(): void {
  
    this.addFunctionalityForm = new FormGroup(
      {
      funcName: new FormControl('' ,Validators.required)  ,
      funcDesc: new FormControl('' ,Validators.required),
      funcPriority: new FormControl('' ,Validators.required),
      funcStatus: new FormControl('' ,Validators.required),

      });
  }
  
    priorityLow= Priority.low;
    priorityMedium= Priority.medium;
    priorityHigh= Priority.high;

    statusToDo = Status.todo;
    statusDoing = Status.doing;
    statusDone = Status.done;

    activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;


  addFunctionalityForm = new FormGroup(
    {
      funcName: new FormControl('' ,Validators.required)  ,
      funcDesc: new FormControl('' ,Validators.required),
      funcPriority: new FormControl('' ,Validators.required),
      funcStatus: new FormControl('' ,Validators.required),
    });
 

  createFunctionality()
  {

    if(this.activeProjectKey == null)
    {
      return alert("Najpierw musisz wybrać projekt!")
    }

    let funcName:string =this.addFunctionalityForm.controls.funcName.value ?? '';
    let funcDesc: string = this.addFunctionalityForm.controls.funcDesc.value ?? '';
    let funcPriority:string = this.addFunctionalityForm.controls.funcPriority.value ?? '';
    let funcStatus:string = this.addFunctionalityForm.controls.funcStatus.value ?? '';

    this.FunctionalityService.addFunctionality(funcName, funcDesc, funcPriority, funcStatus,this.activeProjectKey);
    console.log(funcPriority);
  }
}
