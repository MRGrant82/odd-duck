// Constructor function for creating a Product object
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Global variable for the Product object
var products = [
  new Product('Bag', 'img/bag.jpg'),
  new Product('Banana', 'img/banana.jpg'),
  new Product('Bathroom', 'img/bathroom.jpg'),
  new Product('Boots', 'img/boots.jpg'),
  new Product('Breakfast', 'img/breakfast.jpg'),
  new Product('Bubblegum', 'img/bubblegum.jpg'),
  new Product('Chair', 'img/chair.jpg'),
  new Product('Cthulhu', 'img/cthulhu.jpg'),
  new Product('Dog Duck', 'img/dog-duck.jpg'),
  new Product('Dragon', 'img/dragon.jpg'),
  new Product('Pen', 'img/pen.jpg'),
  new Product('Pet Sweep', 'img/pet-sweep.jpg'),
  new Product('Scissors', 'img/scissors.jpg'),
  new Product('Shark', 'img/shark.jpg'),
  new Product('Sweep', 'img/sweep.png'),
  new Product('Tauntaun', 'img/tauntaun.jpg'),
  new Product('Unicorn', 'img/unicorn.jpg'),
  new Product('Water Can', 'img/water-can.jpg'),
  new Product('Wine Glass', 'img/wine-glass.jpg')
];

// Display 3 unique products from the products array.
function displayProducts() {
  var uniqueProducts = generateUniqueProducts();
  var img1 = document.getElementById('product1');
  var img2 = document.getElementById('product2');
  var img3 = document.getElementById('product3');
  img1.src = uniqueProducts[0].imagePath;
  img2.src = uniqueProducts[1].imagePath;
  img3.src = uniqueProducts[2].imagePath;
  uniqueProducts[0].timesShown++;
  uniqueProducts[1].timesShown++;
  uniqueProducts[2].timesShown++;
}

// Generate 3 unique products from the products array.
function generateUniqueProducts() {
  var uniqueProducts = [];
  while (uniqueProducts.length < 3) {
    var product = products[Math.floor(Math.random() * products.length)];
    if (!uniqueProducts.includes(product)) {
      uniqueProducts.push(product);
    }
  }
  return uniqueProducts;
}

// Checks if all products have been shown to the user at least once. If the timesShown property of each product object is > 0.
function isVotingComplete() {
  for (var i = 0; i < products.length; i++) {
    if (products[i].timesShown === 0) {
      return false;
    }
  }
  return true;
}
function handleProductClick(event) {
  var target = event.target;
  if (target.tagName === 'IMG') {
    var src = target.src;
    for (var i = 0; i < products.length; i++) {
      if (products[i].imagePath === src) {
        products[i].timesClicked++;
        break;
      }
    }
    if (isVotingComplete()) {
      productsDiv.removeEventListener('click', handleProductClick);
      displayResults();
    } else {
      displayProducts();
    }
  }
}

var productsDiv = document.getElementById('products');
productsDiv.addEventListener('click', handleProductClick);

var viewResultsButton = document.getElementById('viewResults');
viewResultsButton.addEventListener('click', function() {
  displayResults();
});

displayProducts();
function displayResults() {
  var resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var result = document.createElement('p');
    result.innerHTML = product.name + ' had ' + product.timesClicked + ' votes, and was seen ' + product.timesShown + ' times.';
    resultsDiv.appendChild(result);
  }
}
