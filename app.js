// Constructor function for creating a Product object
function Product(id, name, imagePath) {
  this.id = id;
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Global variable for the Product object
var products = [
  new Product(1, 'Bag', 'img/bag.jpg'),
  new Product(2, 'Banana', 'img/banana.jpg'),
  new Product(3, 'Bathroom', 'img/bathroom.jpg'),
  new Product(4, 'Boots', 'img/boots.jpg'),
  new Product(5, 'Breakfast', 'img/breakfast.jpg'),
  new Product(6, 'Bubblegum', 'img/bubblegum.jpg'),
  new Product(7, 'Chair', 'img/chair.jpg'),
  new Product(8, 'Cthulhu', 'img/cthulhu.jpg'),
  new Product(9, 'Dog Duck', 'img/dog-duck.jpg'),
  new Product(10, 'Dragon', 'img/dragon.jpg'),
  new Product(11, 'Pen', 'img/pen.jpg'),
  new Product(12, 'Pet Sweep', 'img/pet-sweep.jpg'),
  new Product(13, 'Scissors', 'img/scissors.jpg'),
  new Product(14, 'Shark', 'img/shark.jpg'),
  new Product(15, 'Sweep', 'img/sweep.png'),
  new Product(16, 'Tauntaun', 'img/tauntaun.jpg'),
  new Product(17, 'Unicorn', 'img/unicorn.jpg'),
  new Product(18, 'Water Can', 'img/water-can.jpg'),
  new Product(19, 'Wine Glass', 'img/wine-glass.jpg')
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
  img1.setAttribute('data-product-id', uniqueProducts[0].id);
  img2.setAttribute('data-product-id', uniqueProducts[1].id);
  img3.setAttribute('data-product-id', uniqueProducts[2].id);
  uniqueProducts[0].timesShown++;
  uniqueProducts[1].timesShown++;
  uniqueProducts[2].timesShown++;
}

// Array to keep track of previously displayed products
var previouslyDisplayedProducts = [];

// Generate 3 unique products from the products array
function generateUniqueProducts() {
  var uniqueProducts = [];
  
  // Get the pool of products that have not been displayed in the previous set
  var pool = getPoolOfProducts();
  
  // Loop until we have 3 unique products
  while (uniqueProducts.length < 3) {
    // Get a random product from the pool
    var randomProduct = getRandomProductFromPool(pool);
    
    // If the product is not already in the uniqueProducts array, add it
    if (!uniqueProducts.includes(randomProduct)) {
      uniqueProducts.push(randomProduct);
    }
  }
  
  // Keep track of the displayed products in the previouslyDisplayedProducts array
  previouslyDisplayedProducts = uniqueProducts;
  
  // Return the array of unique products
  return uniqueProducts;
}

// Helper function to get the pool of products that have not been displayed in the previous set
function getPoolOfProducts() {
  return products.filter(function(product) {
    return !previouslyDisplayedProducts.includes(product);
  });
}

// Helper function to get a random product from the pool
function getRandomProductFromPool(pool) {
  var randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

// Checks if all products have been shown to the user at least once.
function isVotingComplete() {
  for (var i = 0; i < products.length; i++) {
    if (products[i].timesShown === 0) {
      return false;
    }
  }
  return true;
}

// Handles the click event on an image and increments the timesClicked property of the corresponding Product object.
// If all Product objects have been displayed at least once and the user has voted on 25 products, removes the click event listener from the productsDiv and displays the results.
// Otherwise, displays 3 new Product objects.
var clickCounter = 0;
function handleProductClick(event) {
  clickCounter++;

  var target = event.target;
  var productId = target.getAttribute('data-product-id');
  if (productId) {
    productId = parseInt(productId, 10);
    var product = products.find(function(p) {
      return p.id === productId;
    });
    product.timesClicked++;
  }

  if (isVotingComplete() && clickCounter === 25) {
    productsDiv.removeEventListener('click', handleProductClick);
    displayResults();
  } else {
    displayProducts();
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

  var voteData = [];
  var viewData = [];
  var labels = [];

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    labels.push(product.name);
    voteData.push(product.timesClicked);
    viewData.push(product.timesShown);
  }

  var canvas = document.createElement('canvas');
  canvas.id = 'chart';
  resultsDiv.appendChild(canvas);

  var context = canvas.getContext('2d');
  var chart = new Chart(context, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votes',
        data: voteData,
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // change to orange color
        borderColor: 'rgba(255, 159, 64, 1)', // change to orange color
        borderWidth: 1
      }, {
        label: 'Views',
        data: viewData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // change to teal color
        borderColor: 'rgba(75, 192, 192, 1)', // change to teal color
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

