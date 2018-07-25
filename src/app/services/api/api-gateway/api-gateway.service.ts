import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';

// import { AppSettings } from '../../app-settings.service';
import { environment } from '../../../../environments/environment';
// import { SessionstorageService } from '../../../services/storage/sessionstorage.service';

@Injectable()
export class ApiGatewayService {

  // Define the headers
  private _headers: any;

  constructor(
    private http: Http,
    // private session: SessionstorageService
  ) { }
  /**
   * createAuthorizationHeader
   */
  private createAuthorizationHeader() {
    this._headers = new Headers();
    this.addToHeader('Content-Type', 'application/json');
    // this.addToHeader('Authorization', this.session.get('auth'));
    return;
  }

  /**
   * addToHeader
   */
  private addToHeader(key: string, value: string) {
    this._headers.append(key, value);
  }

  /**
   * Generate the Endpoint URL
   */
  private getURl(endpoint: string): string {
    return environment.apiGatewayEndpoint + environment.apiGatewayVersion + '/' + endpoint;
  }

  /**
   * Perform a GET-request
   */
  public get(endpoint: string): Observable<Response> {
    this.createAuthorizationHeader();
    const url = this.getURl(endpoint);
    return this.http.get(url, { headers: this._headers, withCredentials: false });
  }
  /**
   * Perform a POST-request
   */
  public post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = { withCredentials: true };
    const url = this.getURl(endpoint);
    return this.http.post(url, body, options);
  }

    /**
   * Perform a Transaction post for the setup
   */
  public postSetupTransaction( endpoint: string, body: any, options?: RequestOptionsArgs): Observable<any> {
  this.createAuthorizationHeader();
    options = {  withCredentials: false };
    const url = this.getURl(endpoint);
    console.log(url, options);
    return this.http.post('http://localhost:3000/api/setup', body);
  }

//   /**
//    * Perform a GET-request for Static Content
//    */
//   public getStaticContent(): Observable<Response> {
//     this.createAuthorizationHeader();
//     const url = this.getURl('content/static-content');
//     return this.http.get(url, { headers: this._headers, withCredentials: false });
//   }

  /**
   * Perform a GET-request for Page Content
   */
  public getContent(page: string): Observable<Response> {
    this.createAuthorizationHeader();
    const url = this.getURl('content/' + page);
    return this.http.get(url, { headers: this._headers, withCredentials: false });
  }

  /**
   * Perform a GET-request for Page Content
   */
  public getPageContent(page: string): Observable<Response> {
    this.createAuthorizationHeader();
    const url = this.getURl('content/' + page);
    return this.http.get(url, { headers: this._headers, withCredentials: false });
  }

//   /**
//    * Perform a GET-request for Page Content
//    */
//   public getEndpoints() {
//     this.createAuthorizationHeader();
//     const url = this.getURl('content/nodes/endpoints');
//     const endpoints = this.http.get(url, { headers: this._headers, withCredentials: false });
//     return endpoints;
//   }

//   /**
//   * Perform a GET-request for the Search Results
//   */
//   public getSearchResultsContent(page: string): Observable<Response> {
//     this.createAuthorizationHeader();
//     const url = this.getURl('forms/' + page);
//     return this.http.get(url, { headers: this._headers, withCredentials: false });
//   }
}
