import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiGatewayService } from './../api-gateway/api-gateway.service';
import { Observable } from 'rxjs';

@Injectable()
export class ContentService {

  constructor(private apiService: ApiGatewayService) {}

  //Set-up all standard transactions
  setupTransaction() {
    return this.apiService.postSetupTransaction('content/setup', ' ').map(res => res.json()).catch(err => Observable.throw(err)); 
  }

  /**
   *  Get the Page Content
   */
  getPageContent(page: string): Observable<any> {
    return this.apiService.getPageContent(page).map(res => res.json()).catch(err => Observable.throw(err));
  }


}
