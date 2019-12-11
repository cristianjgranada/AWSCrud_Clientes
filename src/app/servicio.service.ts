import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url:string
  headers:HttpHeaders
  constructor(private http: HttpClient ) { 
    this.url = 'https://ef60tspt79.execute-api.us-east-2.amazonaws.com/prueba/clientes'
    this.headers = new HttpHeaders()
  }

  leerClientes(){
    return this.http.get( this.url )
  }

  buscarEdad(  edad : number  ){
    return this.http.get(this.url+  '?edad=' + edad )
  }

  crearCliente( numeroIdentificacion:number, 
              tipoIdentificacion: string, 
              nombres: string, 
              apellidos: string, 
              edad: number,
              ciudad:string ){
                let headers = new HttpHeaders({
                  'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'} );
              let options = { headers: headers };
                return this.http.post(this.url, {
                  numeroidentificacion: numeroIdentificacion,
                  tipoidentificacion : tipoIdentificacion,
                  nombres,
                  apellidos,
                  edad,
                  ciudad
                },  options ) 
              }
      
  eliminarCliente (numeroIdentificacion:string, tipoIdentificacion:string){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    let options = { headers: headers };
    
    return this.http.delete(this.url + '?numeroidentificacion=' + numeroIdentificacion + '&tipoidentificacion=' + tipoIdentificacion
    , options)

  }

  actualizarCliente(
    numeroIdentificacion:string, 
    tipoIdentificacion: string, 
    nombres: string, 
    apellidos: string, 
    edad: number,
    ciudad:string
  ){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'} );
    let options = { headers: headers };
    return this.http.put(this.url , {
      numeroidentificacion : numeroIdentificacion
      ,tipoidentificacion : tipoIdentificacion
      ,nombres
      ,apellidos
      ,edad
      ,ciudad
    },options)
  }

}
