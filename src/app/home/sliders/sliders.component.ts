import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class SlidersComponent implements OnInit {
  @ViewChild('imageSlider')
  swiperRef: ElementRef | undefined;
  swiper!: Swiper;

  constructor() {}

  ngOnInit(): void {
    const imageSlider = document.getElementById('image-slider');
    if (Capacitor.getPlatform() !== 'web') {
      imageSlider?.setAttribute('slides-per-view', '1');
    }
  }

  swiperReady() {
    setTimeout(() => {
      this.swiperRef?.nativeElement.swiper.autoplay.start();
      this.setSlidesPerViewOnBreakpoint();
    }, 0);
  }

  private setSlidesPerViewOnBreakpoint() {
    const width = screen.width;
    let imageSlidesPerView = 1;
    const imageSlider = document.getElementById('image-slider');

    if (width > 1080) imageSlidesPerView = 3;
    else if (width > 796) imageSlidesPerView = 2;

    imageSlider?.setAttribute('slides-per-view', imageSlidesPerView.toString());
  }

}
