import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs";
import "rxjs/add/operator/take";

@Injectable()
export class BaseImageService {
    constructor (private storage: AngularFireStorage) { }

    /**
     * @author Anthony Pizzimenti
     * @desc Stores an image and returns the file download url.
     * @param {File} image  Image to be uploaded.
     * @returns {Observable<string>}
     */
    public store (image: File): Observable<string> {
        let path = "images/" + image.name;
        return this.storage.upload(path, image).downloadURL();
    }
}
