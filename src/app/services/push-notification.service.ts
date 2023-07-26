import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  token = '';

  public initPush() {
    console.log('initPush', Capacitor.getPlatform());
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log('permission not granted for push noti');
      }
    });

    PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
      this.token = token.value;
    });

    PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  }

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
    // alert('notificationList :' + notificationList)
  }
  

  sendNoti() {
    return this.http.post('https://fcm.googleapis.com/fcm/send', {
      'to':this.token,
      'data': {
        'title': 'Order #43',
        'body': 'There’s a new pickup order in line!',
        'image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMjKrE_LLPCrrbAej7Pnp6UTSODc9VYCoWLA&usqp=CAU',
        'sound': 'default' 
    }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'key':'BPXY3cwrPAAWJLuv7vlSIdErU11U0WCDhSKC93xeshSREsKhoUSCcN2ZxRC-De__NTwKuWn0I4VjBBtLfKFL0Uw'
      }
    })
  }
}
