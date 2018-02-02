import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
import { AuthService } from '../firebase-services/auth.service';
import { UserService } from '../firebase-services/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  //Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: Observable<Item[]>;

  constructor(private itemListService: ItemListService, private auth: AuthService, private user: UserService) { }

  ngOnInit() {
    this.initItems();
  }

  public toggleDescription(index: number): void {
    this.itemList[index].showDescription = !this.itemList[index].showDescription;
  }

  private initItems(): void {
    console.log('getitems');
    this.itemList = this.itemListService.initConnection();
    
    // this is how to retrieve a user's items
    this.auth.uniqueID().then((uid) => {
        this.user.following(uid).subscribe((items) => {
            console.log(items);
        });
    });
  }

}
