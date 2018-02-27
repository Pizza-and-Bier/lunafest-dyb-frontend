import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dyb-item-card-gallery',
  templateUrl: './item-card-gallery.component.html',
  styleUrls: ['./item-card-gallery.component.css']
})
export class ItemCardGalleryComponent implements OnInit {

  @Input() selectedImage: number = 0;

  @Input() images: string[];

  @Output() selected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.images);
  }

  public selectImage(index: number) {
    console.log(index);
    this.selectedImage = index;
    this.selected.emit(index);
  }

}
