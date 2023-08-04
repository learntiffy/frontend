import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Feedback } from 'src/app/models/request/Feedback';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @Output() close = new EventEmitter<void>();
  @Input() isModalOpen!: boolean;
  @Input() orderId!: string;
  rating = 5;
  comment = '';

  constructor(private userService: UserService) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  confirm() {
    this.submitFeedback();
  }

  closeModal() {
    this.modal.dismiss(this.comment, 'confirm');
    this.close.emit();
  }

  submitFeedback() {
    const feedback = new Feedback(this.orderId, this.rating, this.comment);
    console.log(feedback);
    this.userService.submitFeedback(feedback).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.userService.presentToast('Feedback submitted !!');
          this.closeModal();
        }
      },
      error: (err) => {
        this.userService.presentToast(err.error);
      },
    });
  }

  onWillDismiss(event: Event) {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }
}
