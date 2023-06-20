import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit{
  constructor(private TaskService :TaskService,  private activatedRoute: ActivatedRoute) {
  
  
  }
    ngOnInit(): void {
      this.tasks = this.TaskService.getTasks();
      this.taskKey = this.activatedRoute.snapshot.paramMap.get('key');
      this.task = this.tasks.find(x =>x.lsKeyName == this.taskKey)
      console.log(this.task);
    }
  
    tasks:Array<Task>=[];
    taskKey:any;
    task:any = []
}
