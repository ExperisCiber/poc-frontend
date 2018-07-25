import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductionLotService } from './ProductionLot.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ProductionLot',
	templateUrl: './ProductionLot.component.html',
	styleUrls: ['./ProductionLot.component.css'],
  providers: [ProductionLotService]
})
export class ProductionLotComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          grower = new FormControl("", Validators.required);
        
  
      
          importer = new FormControl("", Validators.required);
        
  
      
          productionLotId = new FormControl("", Validators.required);
        
  
      
          productType = new FormControl("", Validators.required);
        
  
      
          expirationDate = new FormControl("", Validators.required);
        
  
      
          shipmentStatus = new FormControl("", Validators.required);
        
  
      
          quantity = new FormControl("", Validators.required);
        
  
      
          certificateGranted = new FormControl("", Validators.required);
        
  
      
          clearanceGranted = new FormControl("", Validators.required);
        
  
      
          temperatureReadings = new FormControl("", Validators.required);
        
  
      
          contract = new FormControl("", Validators.required);
        
  


  constructor(private serviceProductionLot:ProductionLotService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          grower:this.grower,
        
    
        
          importer:this.importer,
        
    
        
          productionLotId:this.productionLotId,
        
    
        
          productType:this.productType,
        
    
        
          expirationDate:this.expirationDate,
        
    
        
          shipmentStatus:this.shipmentStatus,
        
    
        
          quantity:this.quantity,
        
    
        
          certificateGranted:this.certificateGranted,
        
    
        
          clearanceGranted:this.clearanceGranted,
        
    
        
          temperatureReadings:this.temperatureReadings,
        
    
        
          contract:this.contract
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProductionLot.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.shipping.perishable.ProductionLot",
      
        
          "grower":this.grower.value,
        
      
        
          "importer":this.importer.value,
        
      
        
          "productionLotId":this.productionLotId.value,
        
      
        
          "productType":this.productType.value,
        
      
        
          "expirationDate":this.expirationDate.value,
        
      
        
          "shipmentStatus":this.shipmentStatus.value,
        
      
        
          "quantity":this.quantity.value,
        
      
        
          "certificateGranted":this.certificateGranted.value,
        
      
        
          "clearanceGranted":this.clearanceGranted.value,
        
      
        
          "temperatureReadings":this.temperatureReadings.value,
        
      
        
          "contract":this.contract.value
        
      
    };

    this.myForm.setValue({
      
        
          "grower":null,
        
      
        
          "importer":null,
        
      
        
          "productionLotId":null,
        
      
        
          "productType":null,
        
      
        
          "expirationDate":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "quantity":null,
        
      
        
          "certificateGranted":null,
        
      
        
          "clearanceGranted":null,
        
      
        
          "temperatureReadings":null,
        
      
        
          "contract":null
        
      
    });

    return this.serviceProductionLot.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "grower":null,
        
      
        
          "importer":null,
        
      
        
          "productionLotId":null,
        
      
        
          "productType":null,
        
      
        
          "expirationDate":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "quantity":null,
        
      
        
          "certificateGranted":null,
        
      
        
          "clearanceGranted":null,
        
      
        
          "temperatureReadings":null,
        
      
        
          "contract":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.shipping.perishable.ProductionLot",
      
        
          
            "grower":this.grower.value,
          
        
    
        
          
            "importer":this.importer.value,
          
        
    
        
          
        
    
        
          
            "productType":this.productType.value,
          
        
    
        
          
            "expirationDate":this.expirationDate.value,
          
        
    
        
          
            "shipmentStatus":this.shipmentStatus.value,
          
        
    
        
          
            "quantity":this.quantity.value,
          
        
    
        
          
            "certificateGranted":this.certificateGranted.value,
          
        
    
        
          
            "clearanceGranted":this.clearanceGranted.value,
          
        
    
        
          
            "temperatureReadings":this.temperatureReadings.value,
          
        
    
        
          
            "contract":this.contract.value
          
        
    
    };

    return this.serviceProductionLot.updateAsset(form.get("productionLotId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProductionLot.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceProductionLot.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "grower":null,
          
        
          
            "importer":null,
          
        
          
            "productionLotId":null,
          
        
          
            "productType":null,
          
        
          
            "expirationDate":null,
          
        
          
            "shipmentStatus":null,
          
        
          
            "quantity":null,
          
        
          
            "certificateGranted":null,
          
        
          
            "clearanceGranted":null,
          
        
          
            "temperatureReadings":null,
          
        
          
            "contract":null 
          
        
      };



      
        if(result.grower){
          
            formObject.grower = result.grower;
          
        }else{
          formObject.grower = null;
        }
      
        if(result.importer){
          
            formObject.importer = result.importer;
          
        }else{
          formObject.importer = null;
        }
      
        if(result.productionLotId){
          
            formObject.productionLotId = result.productionLotId;
          
        }else{
          formObject.productionLotId = null;
        }
      
        if(result.productType){
          
            formObject.productType = result.productType;
          
        }else{
          formObject.productType = null;
        }
      
        if(result.expirationDate){
          
            formObject.expirationDate = result.expirationDate;
          
        }else{
          formObject.expirationDate = null;
        }
      
        if(result.shipmentStatus){
          
            formObject.shipmentStatus = result.shipmentStatus;
          
        }else{
          formObject.shipmentStatus = null;
        }
      
        if(result.quantity){
          
            formObject.quantity = result.quantity;
          
        }else{
          formObject.quantity = null;
        }
      
        if(result.certificateGranted){
          
            formObject.certificateGranted = result.certificateGranted;
          
        }else{
          formObject.certificateGranted = null;
        }
      
        if(result.clearanceGranted){
          
            formObject.clearanceGranted = result.clearanceGranted;
          
        }else{
          formObject.clearanceGranted = null;
        }
      
        if(result.temperatureReadings){
          
            formObject.temperatureReadings = result.temperatureReadings;
          
        }else{
          formObject.temperatureReadings = null;
        }
      
        if(result.contract){
          
            formObject.contract = result.contract;
          
        }else{
          formObject.contract = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "grower":null,
        
      
        
          "importer":null,
        
      
        
          "productionLotId":null,
        
      
        
          "productType":null,
        
      
        
          "expirationDate":null,
        
      
        
          "shipmentStatus":null,
        
      
        
          "quantity":null,
        
      
        
          "certificateGranted":null,
        
      
        
          "clearanceGranted":null,
        
      
        
          "temperatureReadings":null,
        
      
        
          "contract":null 
        
      
      });
  }

}
