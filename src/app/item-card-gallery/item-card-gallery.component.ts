import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dyb-item-card-gallery',
  templateUrl: './item-card-gallery.component.html',
  styleUrls: ['./item-card-gallery.component.css']
})
export class ItemCardGalleryComponent implements OnInit {

  public selectedImage: number;

  @Input() images: string[];

  @Output() selected: EventEmitter<number> = new EventEmitter();

  public displayedImages: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.images);
    this.scrubEmptyValues(this.images);
  }

  public selectImage(image: string, index: number) {
    const imageListIndex = this.images.indexOf(image);
    this.selectedImage = index;
    console.log("selected image",this.selectedImage);
    this.selected.emit(imageListIndex);
  }

  private scrubEmptyValues(images: string[]) {
    this.images.map((elem) => {
      if (elem !== undefined && elem !== null) {
        this.displayedImages.push(elem);
      }
    });
    this.selectedImage = 0;
    console.log("displayedImages from gallery", this.displayedImages);
  }

}
