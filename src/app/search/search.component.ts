import { Component, OnInit } from '@angular/core';
import { Image } from '../image';
import { ImageService } from '../image.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    imageList: Promise<Image[]>;
    imageResults: Image[] = [];
    showResults = false;
    name: string;
    tag: string;
    tags: string[] = [];
    tagSearch = true;

    constructor(private imageService: ImageService) { }

    async appendCollection(collection: Promise<Image[]>) {
        (await collection).forEach(async element => {
            this.imageResults.push(await element);
        })
    }

    searchImages() {
        this.imageResults = [];
        this.imageService.searchImages(this.tags).then((images: Image[]) => {
            this.imageResults = images;
        });
        this.tags = [];
    }

    ngOnInit(): void {
        this.imageList = this.imageService.getImages();
    }

    addTag() {
        if (this.tag != "") {
            this.tags.push(this.tag);
            this.tag = "";
        }
    }

    searchTitle() {
        this.imageResults = [];
        this.imageService.getImages().then((images: Image[]) => {
            let name : string = this.name.toLowerCase();
            
            this.imageResults = images.filter(image => image.name.toLowerCase().includes(name));

            this.showResults = true;
            this.name = "";
        });
    }

}
