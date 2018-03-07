import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-ip',
  templateUrl: 'add-ip.html',
})
export class AddIpPage {

  ipData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    this.ipData = { address: '', device: '' }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIpPage');
  }

  add() {

    let toast1 = this.toastCtrl.create({
      message: 'Please input IP Address',
      duration: 2000,
      position: 'center'
    });

    let toast2 = this.toastCtrl.create({
      message: 'Please input Device Name',
      duration: 2000,
      position: 'center'
    });

    if(this.ipData.address == '' || this.ipData.address == undefined){
      toast1.present();
    } else if (this.ipData.device == '' || this.ipData.device == undefined ){
      toast2.present();
    }else{
      console.log(this.ipData);
      this.viewCtrl.dismiss({ ipData: this.ipData });
    }
  }

  close() {

    this.viewCtrl.dismiss();
  }

}
