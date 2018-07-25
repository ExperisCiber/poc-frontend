import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ContractService } from '../../../services/contract/contract.service';

import { ContentService } from '../../../services/api/content/content.service';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  contentAvailable = false;

  contracts: Array <any>;
  growers:Array <any>;
  shippers:Array <any>;

  lastContractId;
  arrivalTime;

  myForm: FormGroup;

  contractId = new FormControl("", Validators.required);
  grower = new FormControl("", Validators.required);
  shipper = new FormControl("", Validators.required);
  importer = new FormControl("", Validators.required);
  arrivalDateTime = new FormControl("", Validators.required);
  unitPrice = new FormControl("", Validators.required);
  minTemperature = new FormControl("", Validators.required);
  maxTemperature = new FormControl("", Validators.required);
  minPenaltyFactor = new FormControl("", Validators.required);
  maxPenaltyFactor = new FormControl("", Validators.required);


  constructor(private serviceContract: ContractService, fb: FormBuilder, private content: ContentService) {

    this.myForm = fb.group({

      contractId: this.contractId,
      grower: this.grower,
      shipper: this.shipper,
      importer: this.importer,
      arrivalDateTime: this.arrivalDateTime,
      unitPrice: this.unitPrice,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      minPenaltyFactor: this.minPenaltyFactor,
      maxPenaltyFactor: this.maxPenaltyFactor

    });


    this.content.getPageContent('nodes/importer').subscribe(result => {
      this.contentAvailable = true;


      // Get data for new contract
      this.contracts = result.contracts;
      this.growers = result.growers;
      this.shippers = result.shippers;

            // Get all available contracts
            console.log(result);


      // Get the last contract available
      // Add 1 to the contract for a new contract
      this.lastContractId = this.contracts.slice(-1)[0].contractId +1;

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
      "contractId": 'CON_00' + this.lastContractId, //Just use the last Contract ID Available.
      "grower": 'resource:org.acme.shipping.perishable.Grower#' + this.grower.value,
      "shipper": 'resource:org.acme.shipping.perishable.Shipper#' +this.shipper.value,
      "importer": 'resource:org.acme.shipping.perishable.Importer#importer@email.com',
      "arrivalDateTime": this.arrivalDateTime.value,
      "unitPrice": this.unitPrice.value,
      "minTemperature": this.minTemperature.value,
      "maxTemperature": this.maxTemperature.value,
      "minPenaltyFactor": this.minPenaltyFactor.value,
      "maxPenaltyFactor": this.maxPenaltyFactor.value


    };
    console.log("form group");
    console.log(event.value);

    this.myForm.setValue({

      "contractId": null,
      "grower": null,
      "shipper": null,
      "importer": null,
      "arrivalDateTime": null,
      "unitPrice": null,
      "minTemperature": null,
      "maxTemperature": null,
      "minPenaltyFactor": null,
      "maxPenaltyFactor": null


    });

    return this.serviceContract.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({

          "contractId": null,
          "grower": null,
          "shipper": null,
          "importer": null,
          "arrivalDateTime": null,
          "unitPrice": null,
          "minTemperature": null,
          "maxTemperature": null,
          "minPenaltyFactor": null,
          "maxPenaltyFactor": null

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

  createContract(event) {
    
    this.asset = {
      $class: "org.acme.shipping.perishable.CreateContract",
      "contractId": 'CON_00' + this.lastContractId, //Just use the last Contract ID Available.
      "grower": 'resource:org.acme.shipping.perishable.Grower#' + this.grower.value,
      "shipper": 'resource:org.acme.shipping.perishable.Shipper#' +this.shipper.value,
      "importer": 'resource:org.acme.shipping.perishable.Importer#importer@email.com',
      "arrivalDateTime": this.arrivalDateTime.value,
      "unitPrice": this.unitPrice.value,
      "minTemperature": this.minTemperature.value,
      "maxTemperature": this.maxTemperature.value,
      "minPenaltyFactor": this.minPenaltyFactor.value,
      "maxPenaltyFactor": this.maxPenaltyFactor.value

    };
    console.log("form group");
    console.log(event.value);

    this.myForm.setValue({

      "contractId": null,
      "grower": null,
      "shipper": null,
      "importer": null,
      "arrivalDateTime": null,
      "unitPrice": null,
      "minTemperature": null,
      "maxTemperature": null,
      "minPenaltyFactor": null,
      "maxPenaltyFactor": null


    });

    return this.serviceContract.addContract(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({

          "contractId": null,
          "grower": null,
          "shipper": null,
          "importer": null,
          "arrivalDateTime": null,
          "unitPrice": null,
          "minTemperature": null,
          "maxTemperature": null,
          "minPenaltyFactor": null,
          "maxPenaltyFactor": null

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

      "contractId": null,
      "grower": null,
      "shipper": null,
      "importer": null,
      "arrivalDateTime": null,
      "unitPrice": null,
      "minTemperature": null,
      "maxTemperature": null,
      "minPenaltyFactor": null,
      "maxPenaltyFactor": null

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
