import { Component, OnInit } from '@angular/core';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-functionality-details',
  templateUrl: './functionality-details.component.html',
  styleUrls: ['./functionality-details.component.scss']
})
export class FunctionalityDetailsComponent implements OnInit{

constructor(private FunctionalityService :FunctionalityService,private ProjectService:ProjectService,private TaskService:TaskService,  private activatedRoute: ActivatedRoute) {
  
  
}
  ngOnInit(): void {
    this.functionalities = this.FunctionalityService.getFunctionalities();
    this.funcKey = this.activatedRoute.snapshot.paramMap.get('key');
    this.functionality = this.functionalities.find(x =>x.lsKeyName == this.funcKey)

    this.tasks = this.TaskService.getTasks();
    
  }

  functionalities:Array<Functionality>=[];
  funcKey:any;
  functionality:any = [];

  activeProjectKey = this.ProjectService.getActiveProject()?.lsKeyName;
  tasks:Array<Task>=[];
}
