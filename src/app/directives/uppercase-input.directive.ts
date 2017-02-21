import { Directive, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({ 
  selector: '[ngModel][UppercaseInput]',
  providers: [NgModel],
  host: {
    '(ngModelChange)' : 'onInputChange($event)'
  }
})
export class UppercaseInputDirective{
  constructor(private model:NgModel){}

  onInputChange(event){
    this.model.valueAccessor.writeValue(event.toUpperCase());
  }
}
