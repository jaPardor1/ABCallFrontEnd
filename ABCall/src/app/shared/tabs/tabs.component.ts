import { Component, ComponentRef, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { RadicarPQRClienteComponent } from '../../pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { ListadoPqrComponent } from '../../pqr/listado-pqr/listado-pqr.component';
import { ArticleListComponent } from '../../knwoledgebase/article-list/article-list.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  activeTabIndex: number = 0; // Índice de la pestaña activa

  // Arreglo de pestañas dinámicas
  tabs: any[] = [
    { title: 'RADICAR PQR', component: RadicarPQRClienteComponent },
    { title: 'HISTORIAL INCIDENTES', component: ListadoPqrComponent },
    { title: 'BASE DE CONOCIMIENTO', component: ArticleListComponent },
  ];


   
  activeComponentRef?: ComponentRef<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  ngOnInit() {
    this.activateTab(this.activeTabIndex); // Cargar la primera pestaña
  }

  activateTab(index: number) {
    if (index === this.activeTabIndex) {
      return; // Evitar recrear la misma pestaña
    }

    this.activeTabIndex = index;

    // Limpiar la vista anterior antes de cargar una nueva
    this.viewContainer.clear();

    // Cargar el nuevo componente
    const tab = this.tabs[index];
    const componentRef = this.viewContainer.createComponent(tab.component, {
      injector: this.createInjector(true),
    });

    // Guardar referencia del componente activo (opcional, para manejar eventos o limpiar)
    this.activeComponentRef = componentRef;
  }

  createInjector(data: any): Injector {
    return Injector.create({
      providers: [
        {
          provide: 'tabData',
          useValue: data,
        },
      ],
    });
  }

  ngOnDestroy() {
    // Limpiar la referencia del componente activo al destruir el TabsComponent
    if (this.activeComponentRef) {
      this.activeComponentRef.destroy();
    }
  }


}
