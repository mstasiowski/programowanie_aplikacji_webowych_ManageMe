import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { FunctionalityListComponent } from './components/functionality/functionality-list/functionality-list.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { FunctionalityAddComponent } from './components/functionality/functionality-add/functionality-add.component';
import { FunctionalityEditComponent } from './components/functionality/functionality-edit/functionality-edit.component';
import { FunctionalityDetailsComponent } from './components/functionality/functionality-details/functionality-details.component';
import { TaskAddComponent } from './components/task/task-add/task-add.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';

const routes: Routes = [
  { path:'', redirectTo: "nav", pathMatch:"full"},
  { path:'nav', component:NavigationComponent },
  { path:'projects', component:ProjectListComponent },
  { path:'projects/add', component:ProjectAddComponent },
  { path:'projects/edit/:key', component:ProjectEditComponent },
  { path:'projects/details/:key', component:ProjectDetailsComponent },
  { path:'functionalities', component:FunctionalityListComponent},
  { path:'func/add', component:FunctionalityAddComponent },
  { path:'func/edit/:key', component:FunctionalityEditComponent},
  { path:'func/details/:key', component:FunctionalityDetailsComponent },
  { path:'tasks', component:TaskListComponent },
  { path:'task/add', component:TaskAddComponent },
  { path:'task/edit/:key', component:TaskEditComponent},
  { path:'task/details/:key', component:TaskDetailsComponent },
  { path:'**', component:PageErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
