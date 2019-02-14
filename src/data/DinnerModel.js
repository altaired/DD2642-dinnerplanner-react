//DinnerModel Object constructor
class Observable {
	constructor() {
		this._observers = [];
	}

	addObserver(observer) {
		console.log('Added observer: ' + observer);
		this._observers.push(observer);
	}

	notifyObservers(changeDetails) {
		this._observers.forEach(observer => observer.update(changeDetails));
	}

	removeObserver(observer) {
		this._observers.filter(d => d != observer);
	}

}

class DinnerModel extends Observable {

	constructor() {
		super();
		this.numberOfGuests = 1;
		this.menu = [];
		this.currentDish = -1;
		this.currentDishData;
	}

	setCurrentDish(id) {
		if (this.currentDish != id) {
			this.currentDish = id;
			this.notifyObservers({
				type: 'update',
				var: 'CurrentDish'
			});
		}
	}

	getCurrentDish() {
		if (this.currentDish != -1) {
			if (this.currentDishData && this.currentDish == this.currentDishData.id) {
				console.log('data is stored');
				return new Promise((resolve, reject) => {
					if (this.currentDishData) {
						resolve(this.currentDishData);
					} else {
						reject('We have a problem');
					}

				});
			} else {
				return this.getDish(this.currentDish).then(dish => {
					this.currentDishData = dish;
					return dish;
				});
			}

		} else {
			return new Promise((resolve, reject) => {
				resolve(null);
			})
		}
	}

	//TODO Lab 1 implement the data structure that will hold number of guest
	// and selected dishes for the dinner menu

	setNumberOfGuests(num) {
		if (num >= 0) this.numberOfGuests = num;
		this.notifyObservers({
			type: 'update',
			var: 'numberOfGuests'
		});
	}

	getNumberOfGuests() {
		return this.numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	getSelectedDish(type) {
		var theDish = menu.find(dish => dish.type = type);
		return theDish;
	}

	//Returns all the dishes on the menu.
	getFullMenu() {
		return this.menu;
	}

	//Returns all ingredients for all the dishes on the menu.
	getAllIngredients() {
		return this.menu
			.flatMap(dish => dish.extendedIngredients);
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice() {
		return this.menu
			.flatMap(dish => dish.extendedIngredients)
			.reduce((acc, val) => acc + val.amount * this.numberOfGuests, 0);
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	addDishToMenu(dish) {
		this.menu.push(dish);
		this.notifyObservers({
			type: 'new',
			var: 'menu'
		});
	}

	//Removes dish from menu
	removeDishFromMenu(id) {
		var index = this.menu.findIndex(dish => dish.id == id);
		if (index != -1) this.menu.splice(index, 1);
		this.notifyObservers({
			type: 'remove',
			var: 'menu'
		});
	}


	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	getAllDishes(type, filter) {
		const items = 50;
		return fetch(
				`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type="${type}"&query="${filter}"&number=${items}`, {
					headers: {
						'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
					}
				}).then(response => response.json())
			.then(data => data.results)
	}

	//function that returns a dish of specific ID
	getDish(id) {
		return fetch(
			`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`, {
				headers: {
					'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
				}
			}).then(response => response.json())
	}
}