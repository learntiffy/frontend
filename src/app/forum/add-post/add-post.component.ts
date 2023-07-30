import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @Output() close = new EventEmitter<boolean>();
  @Output() imagePick = new EventEmitter<string>();
  selectedImage?: string;
  selectedFile!: File;
  isLoading = true;
  constructor() {}

  ngOnInit() {
    console.log('oninit');
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    console.log(files);

    if (files?.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.selectedFile = files[0];
      };
    }
  }

  closeModal(isSuccess = false): void {
    this.modal.dismiss();
    this.close.emit(isSuccess);
  }

  onWillDismiss(event: Event) {
    this.closeModal();
  }
}
