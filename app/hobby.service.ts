import {Injectable} from "@angular/core";
import {HOBBIES} from "./mock-hobbies";
import {Hobby} from "./hobby";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HobbyService {
  hobbies: FirebaseListObservable<any>;

  constructor(private af:AngularFire) {
    this.hobbies = af.database.list('hobbies');
  }

  // Returns a list of all hobbies for use in our list page.
  // For now, this is just mock data fetched from mock-hobbies.ts.
  // Later we'll hook this up to Firebase.
  // We use a promise because our data service will be asynchronous
  // later, so this saves some refactoring.
  getHobbies() {
    return this.hobbies;
    // return Observable.create(observer => {
    //   observer.next(HOBBIES);
    // });
  }

  // Returns a single hobby for use in our detail page
  // For now, we just use mock data and find the record in the array
  // Later, when we hook up Firebase, we'll do something more sophisticated.
  getHobby(id:string) {
    return this.af.database.object(`hobbies/${id}`);
  }
}