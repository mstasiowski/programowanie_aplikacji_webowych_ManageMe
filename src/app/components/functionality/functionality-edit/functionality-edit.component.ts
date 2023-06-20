import { Component } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ProjectService } from 'src/app/services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority } from 'src/app/enums/priority';
import { Status } from 'src/app/enums/status';
import { Functionality } from 'src/app/models/functionality.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-functionality-edit',
  templateUrl: './functionality-edit.component.html',
  styleUrls: ['./functionality-edit.component.scss']
})
export class FunctionalityEditComponent {

  constructor(private FunctionalityService: FunctionalityService, private ProjectService: ProjectService, private activatedRoute: ActivatedRoute) {
  }

  funcKey:any;
  functionalities:Array<Functionality> = [];
  func:any = []


  ngOnInit(): void {

    this.funcKey = this.activatedRoute.snapshot.paramMap.get('key');
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.func = this.functionalities.find(x =>x.lsKeyName == this.funcKey)
  
    this.editFunctionalityForm = new FormGroup(
      {
      funcName: new FormControl(this.func.name ,Validators.required)  ,
      funcDesc: new FormControl(this.func.description,Validators.required),
      funcPriority: new FormControl(this.func.priority,Validators.required),
      funcStatus: new FormControl(this.func.status ,Validators.required),

      });
  }
  
    priorityLow= Priority.low;
    priorityMedium= Priority.medium;
    priorityHigh= Priority.high;

    statusToDo = Status.todo;
    statusDoing = Status.doing;
    statusDone = Status.done;

    activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;


  editFunctionalityForm = new FormGroup(
    {
      funcName: new FormControl('' ,Validators.required)  ,
      funcDesc: new FormControl('' ,Validators.required),
      funcPriority: new FormControl('' ,Validators.required),
      funcStatus: new FormControl('' ,Validators.required),
    });


  editFunctionality()
  {
    let lsKeyName:string =this.func.lsKeyName;
    let funcName:string =this.editFunctionalityForm.controls.funcName.value ?? '';
    let funcDesc: string = this.editFunctionalityForm.controls.funcDesc.value ?? '';
    let funcPriority: string = this.editFunctionalityForm.controls.funcPriority.value ?? '';
    let funcStatus: string = this.editFunctionalityForm.controls.funcStatus.value ?? '';

    this.FunctionalityService.editFunc(funcName,funcDesc,funcPriority,funcStatus,this.activeProjectKey,lsKeyName);

  }
}
