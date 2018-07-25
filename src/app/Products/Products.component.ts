import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductsService } from './Products.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Products',
	templateUrl: './Products.component.html',
	styleUrls: ['./Products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          productId = new FormControl("", Validators.required);
        
  
      
          batch = new FormControl("", Validators.required);
        
  
      
          consumer = new FormControl("", Validators.required);
        
  
      
          quantity = new FormControl("", Validators.required);
        
  


  constructor(private serviceProducts:ProductsService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          productId:this.productId,
        
    
        
          batch:this.batch,
        
    
        
          consumer:this.consumer,
        
    
        
          quantity:this.quantity
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProducts.getAll()
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
      $class: "org.acme.shipping.perishable.Products",
      
        
          "productId":this.productId.value,
        
      
        
          "batch":this.batch.value,
        
      
        
          "consumer":this.consumer.value,
        
      
        
          "quantity":this.quantity.value
        
      
    };

    this.myForm.setValue({
      
        
          "productId":null,
        
      
        
          "batch":null,
        
      
        
          "consumer":null,
        
      
        
          "quantity":null
        
      
    });

    return this.serviceProducts.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "productId":null,
        
      
        
          "batch":null,
        
      
        
          "consumer":null,
        
      
        
          "quantity":null 
        
      
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
      $class: "org.acme.shipping.perishable.Products",
      
        
          
        
    
        
          
            "batch":this.batch.value,
          
        
    
        
          
            "consumer":this.consumer.value,
          
        
    
        
          
            "quantity":this.quantity.value
          
        
    
    };

    return this.serviceProducts.updateAsset(form.get("productId").value,this.asset)
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

    return this.serviceProducts.deleteAsset(this.currentId)
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

    return this.serviceProducts.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productId":null,
          
        
          
            "batch":null,
          
        
          
            "consumer":null,
          
        
          
            "quantity":null 
          
        
      };



      
        if(result.productId){
          
            formObject.productId = result.productId;
          
        }else{
          formObject.productId = null;
        }
      
        if(result.batch){
          
            formObject.batch = result.batch;
          
        }else{
          formObject.batch = null;
        }
      
        if(result.consumer){
          
            formObject.consumer = result.consumer;
          
        }else{
          formObject.consumer = null;
        }
      
        if(result.quantity){
          
            formObject.quantity = result.quantity;
          
        }else{
          formObject.quantity = null;
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
      
        
          "productId":null,
        
      
        
          "batch":null,
        
      
        
          "consumer":null,
        
      
        
          "quantity":null 
        
      
      });
  }

}
