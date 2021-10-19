export class Plan {
  income: PlanElement[];
  consumption: PlanElement[];
  constructor(income, consumption) {
  }
}

interface PlanElement {
  name: string;
  sum: number;
  date: number;
}
