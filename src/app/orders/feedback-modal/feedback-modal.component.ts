import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
})
export class FeedbackModalComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @Output() close = new EventEmitter<void>();
  @Input() isModalOpen!: boolean;
  rating = 5;
  message: string = 'Rate the food:';

  comment!: string;

  constructor() {}

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }

  confirm() {
    this.modal.dismiss(this.comment, 'confirm');
    this.close.emit();
  }

  onWillDismiss(event: Event) {
    this.modal.dismiss(null, 'cancel');
    this.close.emit();
  }
}
