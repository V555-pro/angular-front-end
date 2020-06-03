import { Component } from '@angular/core';
import { Order, OrderService } from './order.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  orders: Order[];
  errorMessage: string;
  isLoading: boolean = true;

  rowData: any;

  gridOptions = {
    domLayout: 'autoHeight',
    defaultColDef: {
      resizable: true,
    },
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    pagination: true
  };

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService
      .getOrders()
      .subscribe(
        orders => {
          this.orders = [];
          orders.map((order) => {
            if(order.deleted == "No" && order.status !== "cancelled") {
              this.orders.push(order);
            }
          });
          this.rowData = this.orders;
          this.isLoading = false;
        },
        error => this.errorMessage = <any>error
      );
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', width: 80 },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Customer', field: 'customer' },
    { headerName: 'Address1', field: 'address1' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Postcode', field: 'postcode', width: 100 },
    { headerName: 'Amount', field: 'amount', width: 100 },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Deleted', field: 'deleted', width: 100 },
    { headerName: 'Last_modified', field: 'last_modified' },
  ];

  getContextMenuItems = (params) => {
    
    let result;

    if (params.column.colId) {
      result = [
        {
          name: 'Cancel the Order',
          shortcut: 'Alt + C',
          action: () => {
            console.log('Cancelling the order');
            console.log(this);
            this.orderService.cancelOrder(params.node.data).subscribe(
              (res) => {
                this.orders = this.orders.filter((order) => {
                  return order.id != params.node.data.id
                });
                this.rowData = this.orders;
              }
            );            
          },
        },
      ];
    } else {
      result = [
        'copy',
        'copyWithHeaders',
        'paste',
      ];
    }

    return result;
  }
}
