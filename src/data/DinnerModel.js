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

const BASE_URL = "google.com";
const httpOptions = {
  headers: { "X-Mashape-Key": "YOUR_API_KEY" }
};

class DinnerModel extends Observable {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this._currentDish = -1;
    this._menu = [];
    this.getNumberOfGuests();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  getFullMenu() {
    var ble = {id:1,title:"Kalle",extendedIngredients:[{amount:4}]};
    this._menu = [ble];
		return this._menu;
	}

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }


  addDishToMenu(dish) {
		this.menu.push(dish);
		this.notifyObservers({
			type: 'new',
			var: 'menu'
		});
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
  

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
	getAllDishes(type, filter) {
    if (type == undefined) type = 'main course';
    if (filter == undefined) filter = '';
		const items = 50;
		return fetch(
      `http://sunset.nada.kth.se:8080/iprog/group/50/recipes/search?type="${type}"&query="${filter}"`, { //`http://sunset.nada.kth.se:8080/iprog/group/50/recipes/search?type="${type}"&query="${filter}"`
					headers: { 
						'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
					}
				}) .then(this.processResponse).catch(this.handleError);/*.then(response => response.json())
			.then(data => data.results)*/
	}

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  handleError(error) {
    if (error.json) {
      error.json().then(error => {
        console.error("getAllDishes() API Error:", error.message || error);
      });
    } else {
      console.error("getAllDishes() API Error:", error.message || error);
    }
  }

}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;

