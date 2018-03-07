import { Component } from '@angular/core';
import { NavController, ModalController, Modal, ToastController } from 'ionic-angular';
import { AddIpPage } from '../add-ip/add-ip';
import { EditIpPage } from '../edit-ip/edit-ip';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataList: any;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
  };
  url: string = 'https://ticket-angular5.herokuapp.com'
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    private toastCtrl: ToastController,
    private theInAppBrowser: InAppBrowser
  ) {
    this.dataList= [];
  }

  ionViewDidEnter() {
    this.storage.get('dateList').then(val => {
      if(val){
        this.dataList = val;
      }else{
        this.dataList = [];
      }
    });
  }

  addAddress() {
    let toast = this.toastCtrl.create({
      message: 'Created new item',
      duration: 2000,
      position: 'bottom'
    });

    let profileModal = this.modalCtrl.create(AddIpPage);
    profileModal.onDidDismiss(data => {
      if(!data){
        console.log('blank');
      }else{
        this.dataList.push(data.ipData);
        toast.present()
;        this.storage.set('dateList', this.dataList);
      }
    });
    profileModal.present();
  }

  editAddress(item, index) {
    console.log( item, index)
    this.navCtrl.push(EditIpPage, { ipData: item, index: index, dataList: this.dataList});
  }

  deleteAddress(event, index) {
    let toast = this.toastCtrl.create({
      message: 'Deleted a item',
      duration: 2000,
      position: 'bottom'
    });
    this.dataList.splice(index, 1);
    toast.present();
    this.storage.set('dateList', this.dataList);
    console.log(this.dataList);
  }

  openIndex(address) {
    this.theInAppBrowser.create("http://" + address + "/index", '_blank', this.options);

  }

  openStep(address) {
    this.theInAppBrowser.create("http://" + address + "/step", '_blank', this.options);
  }

}
