import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalComponent } from './components/animal/animal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../app/authentication/login/login.component';
import { SignupComponent } from '../app/authentication/signup/signup.component';
import { AuthenticationService } from './services/authentication.service';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';
import { InicioadminComponent } from './components/admin/inicioadmin/inicioadmin.component';
import { GestionarticulosComponent } from './components/admin/gestionarticulos/gestionarticulos.component';
import { GestionsugerenciasComponent } from './components/admin/gestionsugerencias/gestionsugerencias.component';
import { GestioncapitulosComponent } from './components/admin/gestioncapitulos/gestioncapitulos.component';
import { CapitulosComponent } from './components/capitulos/capitulos.component';
import { GestionejemplosComponent } from './components/admin/gestionejemplos/gestionejemplos.component';
import { ActualizacionesComponent } from './components/actualizaciones/actualizaciones.component';
import { ArticulosComponent } from './components/articulos/articulos.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    InicioComponent,
    EjemploComponent,
    InicioadminComponent,
    GestionarticulosComponent,
    GestionsugerenciasComponent,
    GestioncapitulosComponent,
    CapitulosComponent,
    GestionejemplosComponent,
    ActualizacionesComponent,
    ArticulosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
