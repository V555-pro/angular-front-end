import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Order {
  id: Number,
  date: String,
  customer: String,
  address1: String,
  city: String,
  postcode: String,
  country: String,
  amount: String,
  status: String,
  deleted: String,
  last_modified: String,
}

const API_URL: string = 'http://localhost:8000';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  getOrders(): Observable<Order[]> {
    return this.http.get(API_URL + '/orders',
      new RequestOptions({})
    )
      .map(res => res.json());
  }

  cancelOrder(order): Observable<Order> {
    return this.http.post(API_URL + '/movies', order,
      new RequestOptions({})
    ).map(res => res.json());
  }

}
