import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare const Swal: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        console.log(this.productList);
      });
  }

  showDetails(item: any): void {
    Swal.fire({
      title: item.title,
      text: item.description,
      imageUrl: item.image,
      imageHeight: 120,
      imageAlt: item.title,
      html: `
        <p><strong>Precio:</strong> $${item.price}</p>
        <p><strong>Calificación:</strong> ${item.rating.rate}</p>
        <p><strong>Stock:</strong> ${item.rating.count}</p>
        <p>${item.description}</p>
      `,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'Cerrar'
    });
  }
}