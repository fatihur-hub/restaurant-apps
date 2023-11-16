const assert = require('assert');

Feature('Favorite Resto');

// Perintah berjalan sebelum tiap metode tes dijalankan
Before(({ I }) => {
  // root URL : http:localhost:9000
  I.amOnPage('/#/favorite');
});

const emptyFavoriteRestoText = 'Empty favorite Resto';

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('#fav-resto');
  I.see(emptyFavoriteRestoText, '#fav-resto');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(emptyFavoriteRestoText, '#fav-resto');

  // URL: /
  I.amOnPage('/');
  I.seeElement('#restaurant-list a');
  const firstRestoCard = locate('.read-more').first();
  const firstRestoCardTitle = await I.grabTextFrom(firstRestoCard);
  I.click(firstRestoCard);

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('#restaurant-list');
  const likedCardTitle = await I.grabTextFrom('.read-more');
  assert.strictEqual(firstRestoCardTitle, likedCardTitle); // membandingkan
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('#restaurant-list');
  const likedCardTitle = await I.grabTextFrom('.read-more');
  I.click(likedCardTitle);

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('#fav-resto');
  I.dontSeeElement('#restaurant-list');
  I.dontSeeElement('.read-more');
});
