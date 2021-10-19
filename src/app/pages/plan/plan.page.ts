import { Component, OnInit } from '@angular/core';
import { PlanService }       from '../../services/plan.service';
import { Plan }              from '../../models/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  plan: Plan = new Plan(0, 0);
  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.planService.getAll().subscribe(data => {
      if (!data.data()) {
        this.planService.create(this.plan);
        return;
      }

      this.plan = data.data();
      console.log(this.plan);
    });
  }

}
