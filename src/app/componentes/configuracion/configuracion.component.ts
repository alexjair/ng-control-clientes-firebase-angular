import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { Configuracion } from 'src/app/interfaces/configuracion';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  constructor(
    private router: Router,
    private configuracionService: ConfiguracionService
  ) { }

  permitirRegistro: boolean = false;

  funGuardarConfiguracion(){
    let configuracion = {
      permitirRegistro : this.permitirRegistro
    };
    console.log(configuracion);

    this.configuracionService.sfunModificarconfiguracion(configuracion);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.configuracionService.sfunGetConfiguracion().subscribe(
      (resp : Configuracion | undefined) =>{
        this.permitirRegistro = resp!.permitirRegistro;
        console.log('permitirRegistro:',this.permitirRegistro);

      }
    )
  }

}
