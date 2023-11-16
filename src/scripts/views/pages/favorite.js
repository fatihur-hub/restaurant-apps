import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <section class="blogs" id="blogs">
    <div class="heading">
        <h2>Restaurant Favorite</h2>
        <div class="box-container-blogs" id="fav-resto" >
    </div>
    </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#fav-resto');
    if (restaurants.length === 0) {
      restaurantContainer.innerHTML = `
        Empty favorite Resto. Put one, by clicking heart button in the detail page.
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
