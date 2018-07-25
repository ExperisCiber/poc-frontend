import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { ApiGatewayService } from '../api/api-gateway/api-gateway.service';
import { Observable } from 'rxjs/Observable';
import { Contract } from '../../org.acme.shipping.perishable';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ContractService {

	
    private NAMESPACE: string = 'Contract';
    private createContract: string = 'CreateContract';
	
    constructor(private dataService: DataService<Contract>, private ApiService: ApiGatewayService) {
    };

    /*New Functions */
      /**
   *  Get the Page Content
   */
    getContent(page: string): Observable<any> {
    return this.ApiService.getContent(page).map(res => res.json()).catch(err => Observable.throw(err));
  }


    /*contract functions */
    public getAll(): Observable<Contract[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Contract> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Contract> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Contract> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Contract> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    /*transaction functions */
    public addContract(itemToAdd: any): Observable<Contract> {
      return this.dataService.add(this.createContract, itemToAdd);
    }

}
