export interface ShoppingList {
  items: any[];
  date: number; // timestamp
}

export interface ShoppingListItem {
  name: string;
  done: boolean;
  date: number; // timestamp
}
