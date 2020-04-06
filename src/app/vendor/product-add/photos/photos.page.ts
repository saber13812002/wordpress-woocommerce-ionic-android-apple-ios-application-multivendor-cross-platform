import { Component, OnInit } from '@angular/core';
import { Settings } from './../../../data/settings';
import { LoadingController, NavController, ActionSheetController  } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from './../../../data/vendor';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Headers } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Config } from './../../../config';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
	
  uploadingImageSpinner: boolean = false;
  photos: any;
  imageresult: any;
  imageIndex: any = 0;
  res: any;

  constructor(public api: ApiService, public actionSheetController: ActionSheetController, public config: Config, public vendor: Vendor, public settings: Settings, public loadingController: LoadingController, public navCtrl: NavController, public router: Router, private transfer: FileTransfer, private imagePicker: ImagePicker, private crop: Crop) { }

  ngOnInit() {
  }

    picker(){
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

      this.uploadingImageSpinner = true;

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

        this.uploadingImageSpinner = false;
        this.imageresult = JSON.parse(data.response);
        this.vendor.product.images[this.imageIndex] = {};
        this.vendor.product.images[this.imageIndex].src = this.imageresult.url;
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
          this.vendor.product.images.splice(index, 1);
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

      this.uploadingImageSpinner = true;

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

        this.uploadingImageSpinner = false;
        this.imageresult = JSON.parse(data.response);
        this.vendor.product.images[index].src = this.imageresult.url;
         // success
       }, (err) => {
         //this.functions.showAlert("error", err);
      })
  }

  publish(){
    this.vendor.product.status = 'publish';
    this.submit();
  }

  draft(){
    this.vendor.product.status = 'draft';
    this.submit();
  }

  submit(){
    this.vendor.product.vendor = this.settings.customer.id;

    this.api.wcpost('products', this.vendor.product).subscribe(res => {

        //DOKAN AND WCFM Plugin
        this.res = res;
        this.api.postItem('update-vendor-product', {id: this.res.id}).subscribe(res => {
          console.log(res);
          }, err => {
            console.log(err);
        });
        //DOKAN AND WCFM Plugin

        this.vendor.product = {};
        this.vendor.product.categories = [];
        this.vendor.product.images = [];
        this.vendor.product.dimensions = {};
        this.navCtrl.navigateBack('tabs/account');

    }, err => {
        console.log(err);
    });
  }


}
