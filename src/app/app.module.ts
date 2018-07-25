import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { ProductionLotComponent } from './ProductionLot/ProductionLot.component';
import { ContractComponent } from './Contract/Contract.component';
import { BatchComponent } from './Batch/Batch.component';
import { ProductsComponent } from './Products/Products.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContentService } from './services/api/content/content.service';
import { ConsumerComponent } from './pages/roles/consumer/consumer.component';
import { GrowerComponent } from './pages/roles/grower/grower.component';
import { ApiGatewayService } from './services/api/api-gateway/api-gateway.service';
import { ImporterComponent } from './pages/roles/importer/importer.component';
import { ContractService } from './services/contract/contract.service';

/* Packages */
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    ProductionLotComponent,
		ContractComponent,
		BatchComponent,
    ProductsComponent,
    NavigationComponent,
    ConsumerComponent,
    ImporterComponent,
    GrowerComponent,
		
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    Configuration,
    DataService,
    ContentService,
    ApiGatewayService,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
