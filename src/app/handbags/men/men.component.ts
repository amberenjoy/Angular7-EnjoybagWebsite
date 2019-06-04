import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  name: string;
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    this.title.setTitle('Designer ' + this.name + ' for Men | Enjoybag HK');
  }

}
