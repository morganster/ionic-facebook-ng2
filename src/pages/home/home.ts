import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   user: any;
   profile:any;
    posts:{};
  userReady: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
     let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = data;

      
        env.userReady = true;
    }, function(error){
    });
     let params = new Array(
    );

    Facebook.api("/me/posts?fields=id,story,name,picture", params)
      .then(function(posts) {
        env.posts = posts.data;
      });

  }
  


  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user is logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }


}
