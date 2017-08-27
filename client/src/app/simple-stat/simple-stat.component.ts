import { Component, OnInit, Input } from '@angular/core';
import { RequestManagerService } from "../services/request-manager.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";

@Component({
  selector: 'app-simple-stat',
  templateUrl: './simple-stat.component.html',
  styleUrls: ['./simple-stat.component.css']
})
export class SimpleStatComponent implements OnInit {

  cards = [];

  constructor(private service: RequestManagerService) { }

  ngOnInit() {
    this.bitcoin();
    this.ethereum();
    setInterval(() => {
      this.bitcoin();
      this.ethereum();
    }, 5000);
  }

  

  bitcoin() {
    this.service.getBtcPrice().subscribe(
      res => {
        let data = res.json();

        let exists = false;
        let card = this.cards.forEach(card => {
          if (!exists && card.title == data.chartName) {
            card.price = data.bpi.EUR.rate_float.toString();
            card.lastUpdate = data.time.updatedISO
            exists = true;
          }
        })

        if (!exists) {
          this.cards.push({
            title: data.chartName,
            price: data.bpi.EUR.rate_float.toString(),// + data.bpi.EUR.symbol,
            lastUpdate: data.time.updatedISO
          });
        }

      }, (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log("Bitcoin not found...");
        }
      }
    );
  }

  ethereum() {

    this.service.getEthPrice().subscribe(
      res => {
        let data = res.json();

        let exists = false;
        let card = this.cards.forEach(card => {
          if (!exists && card.title == data.name) {
            card.price = data.price.eur;
            card.lastUpdate = new Date(data.timestamp * 1000)
            exists = true;
          }
        });

        if (!exists) {
          this.cards.push({
            title: data.name,
            price: data.price.eur,
            lastUpdate: new Date(data.timestamp * 1000)
          });
        }
        
      }, (err: AppError) => {
        if (err instanceof NotFoundError) {
          console.log("Bitcoin not found...");
        }
      }
    )
  }

}
