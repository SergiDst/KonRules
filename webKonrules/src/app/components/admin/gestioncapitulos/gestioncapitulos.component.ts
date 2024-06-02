import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CapituloService } from 'src/app/services/capitulo.service';

@Component({
  selector: 'app-gestioncapitulos',
  templateUrl: './gestioncapitulos.component.html',
  styleUrls: ['./gestioncapitulos.component.css']
})
export class GestioncapitulosComponent {
  capitulosList: any = [];

  constructor(private capituloService: CapituloService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {


  }
  ngOnInit() {
    this.getAllCapitulos();
  }


  getAllCapitulos() {
    this.capituloService.getAllCapitulosData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.capitulosList = data
      }
    );
  }

  verArticulos(idCapitulo: string) {
    localStorage.setItem('idCapitulo', idCapitulo);
    this.router.navigate(['/gestionarticulos']);
  }
}
