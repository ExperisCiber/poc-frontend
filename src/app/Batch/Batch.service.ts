import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Batch } from '../org.acme.shipping.perishable';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class BatchService {

	
		private NAMESPACE: string = 'Batch';
	



    constructor(private dataService: DataService<Batch>) {
    };

    public getAll(): Observable<Batch[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Batch> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Batch> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Batch> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Batch> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
