import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../services/api/content/content.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private content: ContentService) { }

  ngOnInit() {
  }

  setupTransaction() {
   this.content.setupTransaction().subscribe(result => {
    console.log(result);
    location.reload();
    }, error => {
      console.log(error);
    })
  }

}
