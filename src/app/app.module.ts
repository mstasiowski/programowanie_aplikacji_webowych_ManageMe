import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { FunctionalityAddComponent } from './components/functionality/functionality-add/functionality-add.component';
import { FunctionalityDetailsComponent } from './components/functionality/functionality-details/functionality-details.component';
import { FunctionalityEditComponent } from './components/functionality/functionality-edit/functionality-edit.component';
import { FunctionalityListComponent } from './components/functionality/functionality-list/functionality-list.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { TaskAddComponent } from './components/task/task-add/task-add.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent,
    ProjectEditComponent,
    ProjectDetailsComponent,
    FunctionalityAddComponent,
    FunctionalityDetailsComponent,
    FunctionalityEditComponent,
    FunctionalityListComponent,
    ProjectListComponent,
    TaskAddComponent,
    TaskDetailsComponent,
    TaskEditComponent,
    TaskListComponent,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
