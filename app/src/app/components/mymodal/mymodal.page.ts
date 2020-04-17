import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'mymodal-page',
  templateUrl: './mymodal.page.html'
})
export class MyModalPage {

    constructor(private modalCtrl:ModalController) { }


}