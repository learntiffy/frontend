import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhotos } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  selectedImage?: string;
  images: GalleryPhotos = {photos: []};
  isLoading = true;
  constructor() {}

  ngOnInit() {}

  async onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    this.images = await Camera.pickImages({
      quality: 100,
      height: 10,
      width: 10,
      limit: 5,
      presentationStyle: 'fullscreen'
    });
    console.log(this.images)
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }
}
