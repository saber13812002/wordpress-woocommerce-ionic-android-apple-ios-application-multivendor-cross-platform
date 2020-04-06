import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { Data } from './../../data';
import { Settings } from './../../data/settings';
import { Product } from './../../data/product';
import { md5 } from './md5';
import { ReviewPage } from './../../review/review.page';
import { AlertController } from '@ionic/angular';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Headers } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Config } from './../../config';

@Component({
  selector: 'app-edit-variation',
  templateUrl: './edit-variation.page.html',
  styleUrls: ['./edit-variation.page.scss'],
})
export class EditVariationPage implements OnInit {

	product: any;
    filter: any = {};
    categories: any = [];
    usedVariationAttributes: any = [];
    options: any = {};
    id: any;
    variations: any = [];
    relatedProducts: any = [];
    upsellProducts: any = [];
    crossSellProducts: any = [];
    reviews: any = [];
    cart: any = {};
    status: any;
    disableButton: boolean = false;
    uploadingImage: boolean = false;
    photos: any;
    imageresult: any;
    imageIndex: any = 0;

  constructor(public actionSheetController: ActionSheetController, public modalCtrl: ModalController, public api: ApiService, public data: Data, public productData: Product, public settings: Settings, public router: Router, public loadingController: LoadingController, public navCtrl: NavController, public alertController: AlertController, public route: ActivatedRoute, public config: Config, private transfer: FileTransfer, private imagePicker: ImagePicker, private crop: Crop) {
        this.filter.page = 1;
        this.filter.status = 'publish';
    }

    async getProduct() {
        await this.api.getItem('products/' + this.id).subscribe(res => {
            this.product = res;
            this.handleProduct();
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        /*this.product = this.productData.variationProduct;
        console.log(this.product);
        

        if(this.product.images){
            if (this.product.images.length == 0) {
                this.product.images = {};
            } else this.imageIndex = this.product.images.length;
        }

        if (this.product.id) this.handleProduct();
        else */this.getProduct();
    }
    handleProduct() {
        for (let item in this.product.categories) {
            this.categories[item] = this.product.categories[item].id.toString();
        }
        this.usedVariationAttributes = this.product.attributes.filter(function(attribute) {
            return attribute.variation == true
        });
        this.options.product_id = this.product.id;
        /*if ((this.product.type == 'variable') && this.product.variations.length) this.getVariationProducts();
        this.getRelatedProducts();
        this.getUpsellProducts();
        this.getCrossSellProducts();
        this.getReviews();*/
    }
    /*async getVariationProducts() {
        await this.api.getItem('products/' + this.product.id + '/variations').subscribe(res => {
            this.variations = res;
        }, err => {});
    }
    async getRelatedProducts() {
        if (this.product.related_ids != 0) {
            var filter = [];
            for (let item in this.product.related_ids) filter['include[' + item + ']'] = this.product.related_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.relatedProducts = res;
            }, err => {});
        }
    }
    async getUpsellProducts() {
        if (this.product.upsell_ids != 0) {
            var filter = [];
            for (let item in this.product.upsell_ids) filter['include[' + item + ']'] = this.product.upsell_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.upsellProducts = res;
            }, err => {});
        }
    }
    async getCrossSellProducts() {
        if (this.product.cross_sell_ids != 0) {
            var filter = [];
            for (let item in this.product.cross_sell_ids) filter['include[' + item + ']'] = this.product.cross_sell_ids[item];
            await this.api.getItem('products', filter).subscribe(res => {
                this.crossSellProducts = res;
            }, err => {});
        }
    }
    async getReviews() {
        await this.api.getItem('products/' + this.product.id + '/reviews').subscribe(res => {
            this.reviews = res;
            for (let item in this.reviews) {
                this.reviews[item].avatar = md5(this.reviews[item].email);
            }
        }, err => {});
    }
    goToProduct(product) {
        this.productData.vendorProduct = product;
        var endIndex = this.router.url.lastIndexOf('/');
        var path = this.router.url.substring(0, endIndex);
        this.navCtrl.navigateForward(path + '/' + product.id);
    }*/
    async presentAlert(header, message) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }

    OnDestroy() {
        this.productData.variationProduct = {};
    }
    
    async saveProduct() {
        this.disableButton = true;
        this.product.categories = [];
        for (let id in this.categories) {
            this.product.categories[id] = {
                id: parseInt(this.categories[id])
            };
        }
        if (this.product.images.length) this.product.images[0].position = 0;
        if (this.product.type == 'external') this.product.manage_stock = false;
        await this.api.put('products/' + this.id, this.product).subscribe(res => {
            this.product = res;
            this.navCtrl.navigateBack('/tabs/account/vendor-products/edit-product/' + this.productData.product.id);
        }, err => {
            console.log(err);
        });
    }

    picker(){
        console.log('hello');
        let options= {
          maximumImagesCount: 1,
        }
        this.photos = new Array<string>();
        this.imagePicker.getPictures(options)
        .then((results) => {
          this.reduceImages(results).then((results) => this.handleUpload(results));

        }, (err) => { console.log(err) });
      }


      handleUpload(results){
          this.upload();
      }

      reduceImages(selected_pictures: any) : any{
        return selected_pictures.reduce((promise:any, item:any) => {
          return promise.then((result) => {
            return this.crop.crop(item, {quality: 75, targetHeight: 100, targetWidth: 100})
            .then(cropped_image => this.photos = cropped_image);

          });
        }, Promise.resolve());
      }

     
      upload() {

          this.uploadingImage = true;

          const fileTransfer: FileTransferObject = this.transfer.create();

          var headers = new Headers();
              headers.append('Content-Type', 'multipart/form-data');

          let options: FileUploadOptions = {
             fileKey: 'file',
             fileName: 'name.jpg',
             headers: { headers }
          }

          fileTransfer.upload( this.photos, this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp_upload_image', options)
           .then((data) => {

            this.uploadingImage = false;
            this.imageresult = JSON.parse(data.response);
            this.product.images[this.imageIndex] = {};
            this.product.images[this.imageIndex].src = this.imageresult.url;
            this.imageIndex = this.imageIndex + 1;
             // success
           }, (err) => {
             //this.functions.showAlert("error", err);
          })
      }

      async replaceImage(index){
          const actionSheet = await this.actionSheetController.create({
          header: 'Albums',
          buttons: [{
            text: 'Delete Image',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.product.images.splice(index, 1);
              this.imageIndex = this.imageIndex - 1;
            }
          }, {
            text: 'Edit Image',
            icon: 'create',
            handler: () => {
              let options= {
                maximumImagesCount: 1,
              }
              this.photos = new Array<string>();
              this.imagePicker.getPictures(options)
              .then((results) => {
                this.reduceImages(results).then((results) => this.replaceUpload(index));

              }, (err) => {
              //this.functions.showAlert("error", err);
              });
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();

      }

      replaceUpload(index) {

          this.uploadingImage = true;

          const fileTransfer: FileTransferObject = this.transfer.create();

          var headers = new Headers();
              headers.append('Content-Type', 'multipart/form-data');

          let options: FileUploadOptions = {
             fileKey: 'file',
             fileName: 'name.jpg',
             headers: { headers }
          }

          fileTransfer.upload( this.photos, this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp_upload_image', options)
           .then((data) => {

            this.uploadingImage = false;
            this.imageresult = JSON.parse(data.response);
            this.product.images[index].src = this.imageresult.url;
             // success
           }, (err) => {
             //this.functions.showAlert("error", err);
          })
      }
    }