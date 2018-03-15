import { Component } from '@angular/core';
import { NavController, ModalController, Modal, ToastController, PopoverController, Popover, ItemSliding } from 'ionic-angular';
import { AddIpPage } from '../add-ip/add-ip';
import { EditIpPage } from '../edit-ip/edit-ip';
import { PopoverContentPage } from '../popover/popover';
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
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    private toastCtrl: ToastController,
    private theInAppBrowser: InAppBrowser,
    public popoverCtrl: PopoverController,
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

  editAddress(item, index, slidingItem: ItemSliding) {
    console.log( item, index)
    this.navCtrl.push(EditIpPage, { ipData: item, index: index, dataList: this.dataList});
    slidingItem.close();
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

  selectOptions(myEvent, address) {
    let popover = this.popoverCtrl.create(PopoverContentPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
      if(popoverData == '1') {
        console.log('1');
        this.openIndex(address);
      }else if(popoverData == '2'){
        console.log('2');
        this.openSetup(address);
      }else{
        console.log('none');
      }
    })
  }

  openIndex(address) {
    this.theInAppBrowser.create("http://" + address, '_blank', this.options);
  }

  openSetup(address) {
    this.theInAppBrowser.create("http://" + address + "/list", '_blank', this.options);
  }

}
