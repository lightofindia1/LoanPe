import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
//import { File } from '@ionic-native/file/ngx';
import {MyModalPage} from "../components/mymodal/mymodal.page";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


  constructor(  private imagePicker: ImagePicker, private camera: Camera,
    public actionSheetController: ActionSheetController,public modalController: ModalController
   // , private file: File    
     ) {}

  ngOnInit() {
  }

  pickImage(sourceType) {
    /**/
  }
 
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Photo',
      buttons: [{
        text: 'Pick From Gallery',
        icon: 'gallery',
        handler: () => {
          const options: ImagePickerOptions = {};
          this.imagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
          }, (err) => { });
        }
      }, {
        text: 'Take a Photo',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {};
            this.camera.getPicture(options).then((imageData) => {
              
            }, (err) => {
            // Handle error
            });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
  async uploadPhoto(){
    const modal = await this.modalController.create({
      component: MyModalPage
    });
    return await modal.present();
  }
}
