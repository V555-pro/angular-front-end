import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OrderService } from './order.service';
import { AgGridModule } from 'ag-grid-angular';

import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgGridModule.withComponents([])
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
