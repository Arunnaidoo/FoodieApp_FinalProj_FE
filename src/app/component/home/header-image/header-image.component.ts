import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.css']
})
export class HeaderImageComponent implements OnInit {
  imageUrl!: string;
  isFetchingImage: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onViewCategory(){
    this.router.navigate(['menu-page']);
  }

}
