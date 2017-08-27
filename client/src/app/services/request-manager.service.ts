import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";

@Injectable()
export class RequestManagerService {

  private url_btc: string = "https://api.coindesk.com/v1/bpi/currentprice.json";
  private url_eth: string = "https://coinmarketcap-nexuist.rhcloud.com/api/eth";

  constructor(private http: Http) { }

  getBtcPrice() {
    return this.http.get(this.url_btc)
      .catch((err: Response) => {
        if (err.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(err));
      });
  }

  getEthPrice() {
    return this.http.get(this.url_eth)
      .catch((err: Response) => {
        if (err.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(err));
      });
  }

}
