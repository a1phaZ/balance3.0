import { Injectable }                                                             from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Plan }                                                                   from '../models/plan';
import { AuthenticationService }                                                  from './authentication.service';
import { Observable }                                                             from 'rxjs';
import firebase                                                                   from 'firebase/compat';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  planRef: AngularFirestoreCollection<Plan> = null;
  private dbPath = `/plan`;

  constructor(
    private db: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.planRef = db.collection(this.dbPath);
  }

  getAll(): Observable<DocumentSnapshot<Plan>> {
    return this.planRef.doc(`${this.auth.userId}`).get();
  }

  /**
   * Создание записи с custom id
   *
   * @param plan
   */
  create(plan: Plan): any {
    return this.planRef.doc(`${this.auth.userId}`).set({...plan});
  }

  update(data: any): Promise<void> {
    return this.planRef.doc(`${this.auth.userId}`).update(data);
  }

  delete(): Promise<void> {
    return this.planRef.doc(`${this.auth.userId}`).delete();
  }
}
