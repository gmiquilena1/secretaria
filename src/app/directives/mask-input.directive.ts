import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[MaskInput]',
  providers: [NgModel],
  host: {
    '(keyup)' : 'onInputChange($event.target.value)',    
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class MaskInputDirective {
  
 @Input('MaskInput') mask: string;
 @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

  constructor(private model:NgModel) { }

  onInputChange(event,backspace){
    
    //this.model.valueAccessor.writeValue(event.toUpperCase());

    let result = "";    

    //para limitar el tamaño de la cadena
    if(event.length>this.mask.length){
      event = event.substring(0, event.length - 1);
      //console.log("6)"+event.toUpperCase());       
      this.ngModelChange.emit(event.toUpperCase());      
      return;
    }
    //console.log("1)"+result);
    for(var i=0;i<event.length;i++){                  

      if(this.isCaraterEspecial(this.mask.charAt(i)) && !this.isCaraterEspecial(event.charAt(i))){
        result+=this.mask.charAt(i);
        //console.log("2)"+result);      
      }

      if(this.isLetra(this.mask.charAt(i)) && !this.isLetra(event.charAt(i)))
        break;
      
      if(this.isNumero(this.mask.charAt(i)) && !this.isNumero(event.charAt(i)))
        break;
      
      result+=event.charAt(i);
      //console.log("3)"+result);            
    }

    if(event.length<this.mask.length && this.isCaraterEspecial(this.mask.charAt(i)) && !backspace){
      result+=this.mask.charAt(i);
      //console.log("4)"+result);            
    }      

    if(backspace){
      result=this.borrarUltimoEspecial(result);
      //console.log("5)"+result);                        
    }     
    
    this.ngModelChange.emit(result.toUpperCase());              

  }

  private isCaraterEspecial(caracter):boolean{

    if(caracter==="-" || caracter==="(" || caracter===")" || caracter===" "){
     return true;
    }

    return false;
  }

  private isLetra(caracter):boolean{

    if(/[A-Z,a-z]/.test(caracter)){
     return true;
    }

    return false;
  }

  private isNumero(caracter):boolean{

    if(/[0-9]/.test(caracter)){
     return true;
    }

    return false;
  }

  private borrarUltimoEspecial(cadena:string):string{
    
    if(!this.isCaraterEspecial(cadena.charAt(cadena.length-1)))
      return cadena;
    
    cadena=cadena.substring(0, cadena.length - 1);
    
    return this.borrarUltimoEspecial(cadena);
  }

}
