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
    const iconSlider = document.getElementById('icon-slider');
    if (Capacitor.getPlatform() !== 'web') {
      imageSlider?.setAttribute('slides-per-view', '1');
      iconSlider?.setAttribute('slides-per-view', '3');
    }
  }

  swiperReady() {
    setTimeout(() => {
      this.setSlidesPerViewOnBreakpoint();
      this.swiperRef?.nativeElement.swiper.autoplay.start();
    }, 0);
  }

  private setSlidesPerViewOnBreakpoint() {
    const width = screen.width;
    let slidesPerView = 3;
    if (width > 796) {
      slidesPerView = 8;
    } else if (width > 640) {
      slidesPerView = 7;
    } else if (width > 576) {
      slidesPerView = 6;
    } else if (width > 480) {
      slidesPerView = 5;
    } else {
      slidesPerView = 3;
    }
    const iconSlider = document.getElementById('icon-slider');
    iconSlider?.setAttribute('slides-per-view', slidesPerView.toString());
  }

  onBreakpointChange(event: any) {
    console.log(event);
  }
}
