import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  @Input() product: Product | null = null;
  form: FormGroup;
  categories = this.productService.getCategories();
  imageString: string | null = null;

  fileControl = new FormControl(null);

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private productService: ProductsService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
      availability: [null, Validators.required],
      category: [null, Validators.required],
    })
  }

  ngOnInit() {

    if (this.product) {
      this.form.setValue({
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        availability: this.product.availability,
        category: this.product.category,
      })
      this.imageString = this.product.image;
    }
  }

  close() {
    return this.modalCtrl.dismiss({
      user: null,
    });
  }

  save() {
    const product: Product = {
      name: this.form.value.name,
      price: this.form.value.price,
      category: this.form.value.category,
      availability: this.form.value.availability,
      image: this.imageString as string,
    }

    if (this.product) {
      product.id = this.product.id
    }
    return this.modalCtrl.dismiss({
      product: product,
      mode: this.product ? 'edit' : 'add'
    });
  }

  selectFile($event: any) {
    const selectedFile = $event?.target?.files[0];
    if (selectedFile) {
      this.form.get('image')?.setValue(selectedFile);
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(selectedFile);
    }

  }

  _handleReaderLoaded(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    this.imageString = btoa(binaryString);
  }


  clearImage(): void {
    this.form.get('image')?.setValue(null);
    this.fileControl.setValue(null);
  }
}
