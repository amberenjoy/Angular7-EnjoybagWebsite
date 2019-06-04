import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  line: string;
  constructor(private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.line = params['line'];
    });
    this.title.setTitle('Designer special collections: ' + this.line + ' | Enjoybag HK');
  }

}
