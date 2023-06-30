import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UploadComponent } from "./components/upload/upload.component";
import { DocumentsComponent } from "./components/documents/documents.component";
import { ReportComponent } from "./components/report/report.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: 'documents', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
