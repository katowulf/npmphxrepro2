import {Component, OnInit} from "@angular/core";
import {Hobby} from "./hobby";
import {RouteParams, Router} from "@angular/router-deprecated";
import {HobbyService} from "./hobby.service";
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  template: `
    <div class="detail">
      <form #form (submit)="saveData($event, form.value)">
      <h1>{{ (hobby | async)?.name }}</h1>
      
      <label>Name</label>
      <input value="{{ (hobby | async)?.name }}" placeholder="name">
      
      <!--<label>Description</label>-->
      <!--<input [(ngModel)]="hobby.description" placeholder="description">-->
      <!---->
      <!--<label>Count</label>-->
      <!--<input type="number" [(ngModel)]="hobby.count" placeholder="count">-->
      <!---->
      <!--<label>Units</label>-->
      <!--<input [(ngModel)]="hobby.units" placeholder="units">-->
      
      <p><button type="submit">Save</button></p>
      </form>
    </div>
    <pre>{{hobby | async | json}}</pre>
    <p><button (click)="goBack()">Back</button></p>
  `,
  styleUrls: ['app/hobby-detail.component.css']
})
export class HobbyDetailComponent implements OnInit {
  // Use dependency injection to grab our hobbies service and routing data
  constructor(private hobbyService:HobbyService,
              private routeParams:RouteParams,
              private router:Router) {}

  hobby: FirebaseObjectObservable<Hobby>;

  ngOnInit() {
    // fetch the hobby id from the URL paramater
    let id = this.routeParams.get('id');
    // fetch the hobby detail from our hobbies service
    this.hobby = this.hobbyService.getHobby(id);
    //.subscribe(hobby => {
    //  this.hobby = hobby;
    //});
  }

  goBack() {
    // A rudimentary way to get back to the list of hobbies.
    // We could use window.history.back(), but then our history of details viewed would be lost.
    this.router.navigate(['List']);
  }

  saveData(e, value) {
    console.log(e.target);
    //console.log(form);
    e.preventDefault();
    //this.hobby.update(/* parse fields into hash */);
  }
}