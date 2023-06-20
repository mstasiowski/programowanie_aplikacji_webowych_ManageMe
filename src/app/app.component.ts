import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';
import { FunctionalityService } from './services/functionality.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  constructor(private ProjectService: ProjectService, private FunctionalityService: FunctionalityService, private TaskService: TaskService) {
    
    
  }
  ngOnInit(): void {
    this.ProjectService.createDefaultProject();
    this.FunctionalityService.createDefaultFunc();
    this.TaskService.createDefaultTask();
  }
  title = 'programowanie_aplikacji_webowych';
}
