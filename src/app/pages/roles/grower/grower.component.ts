import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ContractService } from '../../../services/contract/contract.service';

import { ContentService } from '../../../services/api/content/content.service';

@Component({
  selector: 'app-grower',
  templateUrl: './grower.component.html',
  styleUrls: ['./grower.component.css']
})
export class GrowerComponent implements OnInit {

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  contentAvailable = false;

  productionLots: Array <any>;
  contracts: Array <any>;
  growers:Array <any>;
  shippers:Array <any>;

  lastProductionlotId;
  arrivalTime;

  myForm: FormGroup;

  productionId = new FormControl("", Validators.required);
  product_type = new FormControl("", Validators.required);
  contract = new FormControl("", Validators.required);
  grower = new FormControl("", Validators.required);
  quantity = new FormControl("", Validators.required);


  constructor(private serviceContract: ContractService, fb: FormBuilder, private content: ContentService) {

    this.myForm = fb.group({

      productionId: this.productionId,
      product_type: this.product_type,
      contract: this.contract,
      grower: this.grower,
      quantity: this.quantity,

    });


    this.content.getPageContent('nodes/grower').subscribe(result => {
      this.contentAvailable = true;


      // // Get data for new contract
       this.productionLots = result.Production_lots;
       this.contracts = result.contracts;
      // this.growers = result.growers;
      // this.shippers = result.shippers;

            // Get all available contracts
            console.log(result);


      // Get the last contract available
      // Add 1 to the contract for a new contract
      this.lastProductionlotId = this.productionLots.slice(-1)[0].productionLotId +1;

      this.contentAvailable = true;

    }, err => {
      console.error(new Error('Error Getting Content'), err);
    });


  }

  ngOnInit(): void {
  }


  addAsset(event) {
    
    this.asset = {
      $class: "org.acme.shipping.perishable.Contract",
      "productionId": 'LOT_00' + this.lastProductionlotId, //Just use the last Production ID Available.
      "product_type": this.product_type.value,
      "contract": this.contract.value,
      "grower": 'resource:org.acme.shipping.perishable.Grower#grower@email.com',
      "quantity": this.quantity.value,
    };

    console.log("form group");
    console.log(event.value);

    this.myForm.setValue({

      "productionId": null,
      "product_type": null,
      "contract": null,
      "grower": null,
      "quantity": null,


    });

    return this.serviceContract.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({

          "productionId": null,
          "product_type": null,
          "contract": null,
          "grower": null,
          "quantity": null,

        });

        location.reload();
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }
  resetForm(): void {
    this.myForm.setValue({

      "productionId": null,
      "product_type": null,
      "contract": null,
      "grower": null,
      "quantity": null,

    });
  }

  setupTransaction() {
    this.content.setupTransaction().subscribe(result => {
     console.log(result);
     }, error => {
       console.log(error);
     })
   }


}
