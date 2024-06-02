import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { GestionarticulosComponent } from './components/admin/gestionarticulos/gestionarticulos.component';
import { GestionsugerenciasComponent } from './components/admin/gestionsugerencias/gestionsugerencias.component';
import { GestioncapitulosComponent } from './components/admin/gestioncapitulos/gestioncapitulos.component';
import { VerArticulosComponent } from './components/ver-articulos/ver-articulos.component';
import { CapitulosComponent } from './components/capitulos/capitulos.component';
import { GestionejemplosComponent } from './components/admin/gestionejemplos/gestionejemplos.component';
import { ActualizacionesComponent } from './components/actualizaciones/actualizaciones.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'animal',component: AnimalComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: AppComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'inicio',component: InicioComponent},
  {path: 'articulos',component: VerArticulosComponent},
  {path: 'actualizaciones',component: ActualizacionesComponent},
  {path: 'capitulos',component: CapitulosComponent},
  {path: 'ejemplo',component: EjemploComponent},
  {path: 'inicioadmin',component: InicioadminComponent},
  {path: 'gestionarticulos',component: GestionarticulosComponent},
  {path: 'gestioncapitulos',component: GestioncapitulosComponent},
  {path: 'gestionejemplos',component: GestionejemplosComponent},
  {path: 'gestionsugerencias',component: GestionsugerenciasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
