import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/request/Address';
import { Response } from '../models/response/Response';
import { Item } from '../models/Item';
import { ItemType } from '../models/ItemType';
import { Feedback } from '../models/request/Feedback';

const host = environment.api_url + 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isHomePageVisited = false;
  title = new EventEmitter<string>();
  checkoutMap = new Map<string, Item[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  public initCheckoutMap() {
    this.checkoutMap = new Map<string, Item[]>([
      [ItemType.SABJI, []],
      [ItemType.DAL, []],
      [ItemType.RICE, []],
      [ItemType.ROTI, []],
      [ItemType.SPECIAL, []],
    ]);
  }

  public setHeaderTitle(title: string): void {
    this.title.emit(title);
  }

  public getUser(): Observable<Response> {
    return this.http.get<Response>(`${host}/getUser`);
  }

  public getAddress(): Observable<Response> {
    return this.http.get<Response>(`${host}/getAddress`);
  }

  public getAddressById(addressId: string): Observable<Response> {
    return this.http.get<Response>(`${host}/getAddress/` + addressId);
  }

  public getArea(): Observable<Response> {
    return this.http.get<Response>(`${host}/getArea`);
  }

  public getSubArea(areaId: string): Observable<Response> {
    return this.http.get<Response>(`${host}/getSubArea?areaId=${areaId}`);
  }

  public saveAddress(address: Address): Observable<Response> {
    return this.http.post<Response>(`${host}/saveAddress`, {
      address: address,
    });
  }

  public deleteAddress(addressId: string): Observable<Response> {
    return this.http.delete<Response>(`${host}/deleteAddress/` + addressId);
  }

  public getMenu(): Observable<Response> {
    return this.http.get<Response>(`${host}/getMenuDay?menuDay=ALL`);
  }

  public placeOrder(order: any): Observable<Response> {
    return this.http.post<Response>(`${host}/checkout`, { order: order });
  }

  public getOrders(): Observable<Response> {
    return this.http.get<Response>(`${host}/getOrders`);
  }

  public submitFeedback(feedback: Feedback): Observable<Response> {
    return this.http.post<Response>(`${host}/feedback`, { feedback: feedback });
  }

  public addPost(formData: FormData): Observable<Response> {
    return this.http.post<Response>(`${host}/forum/posts/add`, formData);
  }

  public getPosts(): Observable<Response> {
    return this.http.get<Response>(`${host}/forum/posts`);
  }

  async presentToast(msg: string, duration: number = 3000, route: string = '') {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: 'bottom',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();

    if (route !== '') {
      await toast.onDidDismiss().then(() => {
        this.router.navigate(['./', route]);
      });
    }
  }
}
