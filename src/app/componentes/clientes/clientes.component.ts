import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  constructor(
    private clienteService: ClienteService,
    private renderer: Renderer2
  ) { }

  vErrorModalMostrar: boolean = false;
  vErrorModalmsg: string = '';
  @ViewChild("clienteForm") clienteForm!: NgForm;
  @ViewChild("botonCerrarModal") botonCerrarModal!: ElementRef;

  clientes: Cliente[] = [];
  //cliente?: Cliente;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0.00,
  };

  funCerrarModal(){
    console.log("funCerrarModal() : Se cerro el Modal");
    //Cierra el boton modal
    this.renderer.selectRootElement(this.botonCerrarModal.nativeElement).click();
    //Limpia las eqtiquetas del HTML del Form
    this.clienteForm.resetForm();
    this.vErrorModalMostrar = false;
    this.vErrorModalmsg = "";
  }

  funAgregar(f: NgForm) {
    console.log('Data Json =>: ',f.value);  // JSON!!
    console.log('Form Valido? : ',f.valid);  // false
    if(!f.valid){
      this.vErrorModalMostrar = true;
      this.vErrorModalmsg = "Por favor llena el formulario correctamente. Error al registrar el formualario.";
      //alert('Error al registrar el formualrio.');
    }else{
      //Deshabilitamos errores msj.
      this.vErrorModalMostrar = false;
      //agregar el registro.
      this.clienteService.funAgregarCliente(f.value);
      //cerar modal
      this.funCerrarModal();
    }
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    this.clientes.forEach( cliente=>{
      saldoTotal += cliente.saldo!;
    })
    return saldoTotal;
  }

  ngOnInit(): void {
    console.log('vErrorModalMostrar: ',this.vErrorModalMostrar);
    console.log('vErrorModalmsg: ',this.vErrorModalmsg);
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

}
