import { Component } from '@angular/core';
import { ViewController, AlertController, NavParams, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover',
   templateUrl: 'popover.html'
})
export class PopoverContentPage {

  constructor(
    public viewCtrl: ViewController,
    public navParams:NavParams,
    public alertCtrl:AlertController,
    ){
    }

  close() {
    this.viewCtrl.dismiss();
  }

  select(item){
    this.viewCtrl.dismiss(item);
  }


}
