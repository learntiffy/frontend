import {
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @Output() close = new EventEmitter<boolean>();
  isBuffering = false;
  selectedFile!: File;
  maxFileSizeInMB = environment.fileSize;
  isFileLarge = false;
  comment = '';

  constructor(private userService: UserService) {}

  onFileSelect(event: any) {
    this.isBuffering = true;
    this.isFileLarge = false;
    const files = event.target.files;

    if (files?.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e: any) => {
        this.selectedFile = files[0];
        this.isFileLarge =
          this.selectedFile.size / 1000000 > this.maxFileSizeInMB;
        this.isBuffering = false;
      };
    }
  }

  addPost() {
    if (!this.isBuffering && !this.isFileLarge) {
      this.isBuffering = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const forum = JSON.stringify({ text: this.comment });
      formData.append('forum', forum);
      this.userService.addPost(formData).subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.userService.presentToast('Post saved');
            this.closeModal(true);
          }
        },
        error: (err) => {
          this.isBuffering = false;
          this.userService.presentToast(err.error);
        },
      });
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
