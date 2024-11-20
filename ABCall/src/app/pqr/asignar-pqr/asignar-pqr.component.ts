import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asignar-pqr',
  templateUrl: './asignar-pqr.component.html',
  styleUrl: './asignar-pqr.component.css'
})
export class AsignarPqrComponent {

  
  
   @Input() idPqr:number=0;
  
  assignIncident(){
      alert('incident assigned'+this.idPqr)
  }

}
