import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  cliente: Cliente | null = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0.00,
  };
  vIdCliente!: string;
  vErrorMsg: string = '';
  vErrorMostrar: boolean = false;

  funEliminar(f: NgForm) {
    if(confirm("Se va a eliminar el registro ( "+f.value.nombre+" "+f.value.apellido+", "+f.value.email+"). Desea continuar?")){
      //console.log(f.value);
      this.clienteService.funEliminarCliente(this.vIdCliente);
      this.router.navigate(['/']);
    }
  }

  funModificar(f: NgForm) {
    console.log('Data Json =>: ',f.value);  // JSON!!
    console.log('Form Valido? : ',f.valid);  // false
    if(!f.valid){
      this.vErrorMostrar = true;
      this.vErrorMsg = "Por favor llena el formulario correctamente. Error al registrar el formualario.";
      //alert('Error al registrar el formualrio.');
    }else{
      //Deshabilitamos errores msj.
      this.vErrorMostrar = false;
      //guardar
      f.value.id =  this.vIdCliente;
      //console.log(f.value);
      //console.log(this.vIdCliente);
      this.clienteService.funModificarCliente(f.value);
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
      //salvamos el ID
      this.vIdCliente = this.route.snapshot.params['id'];
      console.log('Id Cliente',this.vIdCliente);
      //Cargamos los datos en el ID
      this.clienteService.genCliente(this.vIdCliente).subscribe( cliente =>{
        this.cliente = cliente;
      });
  }



}
