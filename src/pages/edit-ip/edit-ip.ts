import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-edit-ip',
  templateUrl: 'edit-ip.html',
})
export class EditIpPage {

  ipData: any;
  index: number;
  dataList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.ipData = this.navParams.get('ipData');
    this.index = this.navParams.get('index');
    this.dataList = this.navParams.get('dataList');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditIpPage');
  }

  close() {
      this.navCtrl.pop();
  }

  save() {
    let toast = this.toastCtrl.create({
      message: 'Updated this item',
      duration: 2000,
      position: 'bottom'
    });
    this.dataList.splice(this.index, 1);
    this.dataList.push(this.ipData);
    this.storage.set('dateList', this.dataList);
    toast.present();
    console.log(this.dataList);
    this.navCtrl.pop();
  }

}
