import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ServicioService } from '../servicio.service';
import { FormGroup, FormControl, Validators } from  '@angular/forms'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent implements OnInit {
  jsnClientes:any = []
  selectedCliente:any
  tiposIdentificacion:any
  Ciudades:any
  actualizar:boolean
  form: FormGroup
  numeroIdentificacion
  constructor( public servicio : ServicioService ) { 

  }

  ngOnInit() {
    this.form = new FormGroup({
      numeroIdentificacion: new FormControl(null,Validators.required ),
      tipoIdentificacion:new FormControl(null,Validators.required),
      nombre: new FormControl(),
      apellido: new FormControl(),
      edad:new FormControl(null,[Validators.required ]),
      ciudad: new FormControl()
    })
    this.tiposIdentificacion = [
      {tipo: 'cc'}
      ,{ tipo:'ni' }
    ]
    this.Ciudades= [
      {ciudad: 'Bogota' }
      ,{ciudad:'Santander'}
      ,{ciudad:'Mexico'}
      ,{ciudad:'Buenos Aires'} 
    ]
    this.form.get("tipoIdentificacion").setValue( this.tiposIdentificacion[0].tipo )
    this.form.get("ciudad").setValue( this.Ciudades[0].ciudad )
    this.servicio.leerClientes().subscribe(data  => {
      this.jsnClientes = data as []
    })
  }

  registrarCliente(){
    if (this.actualizar){
      return
    }
    let datos  = this.form.value
    if( parseInt(datos.edad) <0) {
      alert("Edad incorrecta")
      return
    } 
      this.servicio.crearCliente(
        datos.numeroIdentificacion,
        datos.tipoIdentificacion,
        datos.nombre,
        datos.apellido,
        datos.edad,
        datos.ciudad
       ).subscribe(respuesta =>{      
         alert('Cliente creado')           
          this.form.reset()
          this.servicio.leerClientes().subscribe(data  => {
            this.jsnClientes = data as []
          })
        },error => {
          
          if (error.error.error.code === "ConditionalCheckFailedException"){
            alert('Cliente ya existe')
            this.form.reset()
          }else {
            alert(error)
          }
        }  )
  }
 
  eliminarCliente(numeroIdentificacion:string, tipoIdentificacion:string){
    this.actualizar=false
    this.servicio.eliminarCliente(numeroIdentificacion, tipoIdentificacion)
    .subscribe(data=> {
      alert('Cliente Eliminado')  
      this.form.reset()
      this.servicio.leerClientes().subscribe(data  => {
        this.jsnClientes = data as []
      })
    })
  }

  buscarEdad(){
    this.actualizar=false
    this.form.reset()
    let edad = prompt("Digite la edad a buscar", "0");
    if (edad){
      this.servicio.buscarEdad( parseInt(edad) )
      .subscribe(data => {
        this.jsnClientes = data as []
      })
    }
  }

  actualizarCliente(
    numeroIdentificacion:string
    ,tipoIdentificacion:string
    ,nombre:string
    ,apellido:string
    ,edad:number
    ,ciudad:string
    ){
      if(edad <0) {
        alert("Edad incorrecta")
        return
      } 
      this.form.get("numeroIdentificacion").setValue(numeroIdentificacion)
      this.form.get("numeroIdentificacion").disable()
      this.form.get("tipoIdentificacion").setValue(tipoIdentificacion)
      this.form.get("tipoIdentificacion").disable()
      this.form.get("nombre").setValue(nombre)
      this.form.get("apellido").setValue(apellido)
      this.form.get("edad").setValue(edad)
      this.form.get("ciudad").setValue(ciudad)  
      this.actualizar = true
  }

  guardarActualizacion(){
    let datos  = this.form.getRawValue()
    this.servicio.actualizarCliente(        
      datos.numeroIdentificacion,
      datos.tipoIdentificacion,
      datos.nombre,
      datos.apellido,
      datos.edad,
      datos.ciudad)
      .subscribe(data => {
        alert('Cliente actualizado')
        this.form.reset()
      this.actualizar = false
      this.servicio.leerClientes().subscribe(data  => {
        
        this.jsnClientes = data as []
      })
    })
  }

}
