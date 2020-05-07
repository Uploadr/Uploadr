import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Image } from './image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesUrl: string = "api/images";
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
      private http: HttpClient
  ) { }

  /**
   * 
   * @param name Name of Image
   * @param user The current user (will probably have to find this using the component)
   * @param url (The url of the image)
   * @param tags (An array of tags for the immage)
   */
  
  uploadImage(name : string, user: string, url: string, tags : string[]){
    
    return this.http.post<Image>(
      this.imagesUrl, {name, user, url, tags} as Image, this.httpOptions);
  }
  
  /**
   * Returns an array of all uploaded images (use this to reset after searching)
   * 
   */
  async getImages() : Promise<Image[]>{
    let images: Image[] | void = await this.http.get<Image[]>(
      `${this.imagesUrl}`
    ).toPromise().catch(err => {});

    if(!images) images = [];

    return images;
  }
  /**
   * 
   * @param tags Tags to be searched
   */
  async searchImages(tags: string[]) : Promise<Image[]>{
    let images: Image[] | void = await this.http.get<Image[]>(
      `${this.imagesUrl}`
    ).toPromise().catch(err => {});

    if(!images) images = [];
    let result : Image[];
    images.forEach(function (value){ //For each image, check the tags and see if the searched tags are all in there
      if (this.arrayContainsArray(value.tags, tags)){
        result.push(value);
      }
    })
    return result;
  }

  arrayContainsArray (superset, subset){
    if (0 === subset.length){ //Empty array
      return false
    }
    return subset.every(function (value){ //Check every tag and see if they are in the array
      return (superset.indexOf(value) >= 0);
    })
  }

}
