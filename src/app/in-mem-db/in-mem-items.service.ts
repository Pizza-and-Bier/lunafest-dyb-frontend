import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";

import { Observable }  from 'rxjs/Observable';
import { of }          from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

export class InMemItemsService implements InMemoryDbService {

  createDb(reqInfo?: RequestInfo) {
    let items = [
      {
        id: 2,
        name: "A cat tree",
        estimatedValue: 50,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category: "Cats",
        openingBid: {
          createdBy: 0,
          createdAt: 0,
          item: 1,
          amount: 35
        },
        currentBid: {
            createdBy: 1,
            createdAt: 12,
            item: 2,
            amount: 80
        },
        images: [
            {
                id: 1,
                source: "https://thumb7.shutterstock.com/display_pic_with_logo/137002/600979397/stock-photo-cute-funny-cat-and-tree-in-room-600979397.jpg"
            }
        ]
      },
      {
        id: 3,
        name: "Dog Bed",
        estimatedValue: 20,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category: "Dogs",
        openingBid: {
          createdBy: 0,
          createdAt: 0,
          item: 1,
          amount: 15
        },
        currentBid: {
            createdBy: 3,
            createdAt: 12,
            item: 2,
            amount: 50
        },
        images: [
            {
                id: 1,
                source: "https://thumb7.shutterstock.com/display_pic_with_logo/839950/289492334/stock-photo-french-bulldog-dog-having-a-sleeping-and-relaxing-a-siesta-in-living-room-with-doggy-teddy-bear-289492334.jpg"
            }
        ]
      },
    ];

    let userItems = [
      {
        id: 2,
        name: "Cat tree",
        estimatedValue: 50,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category: "Cats",
        openingBid: {
          createdBy: 0,
          createdAt: 0,
          item: 1,
          amount: 35
        },
        currentBid: {
            createdBy: 1,
            createdAt: 12,
            item: 2,
            amount: 80
        },
        images: [
            {
                id: 1,
                source: "https://thumb7.shutterstock.com/display_pic_with_logo/137002/600979397/stock-photo-cute-funny-cat-and-tree-in-room-600979397.jpg"
            }
        ]
      },
      {
        id: 3,
        name: "Dog Bed",
        estimatedValue: 20,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category: "Dogs",
        openingBid: {
          createdBy: 0,
          createdAt: 0,
          item: 1,
          amount: 15
        },
        currentBid: {
            createdBy: 3,
            createdAt: 12,
            item: 2,
            amount: 50
        },
        images: [
            {
                id: 1,
                source: "https://thumb7.shutterstock.com/display_pic_with_logo/839950/289492334/stock-photo-french-bulldog-dog-having-a-sleeping-and-relaxing-a-siesta-in-living-room-with-doggy-teddy-bear-289492334.jpg"
            }
        ]
      },
    ];
    let db = {items, userItems};

    return of(db).delay(10);
  }
  constructor() { }

}
