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

// We are ensuring that we do not get an image from the immediately preceding set of images.
var previousProducts = [];
// Generate 3 unique products from the products array.
function generateUniqueProducts() {
  var pool = products.filter(function(product) {
    return !previousProducts.includes(product);
  });
  var uniqueProducts = [];
  while (uniqueProducts.length < 3) {
    var product = pool[Math.floor(Math.random() * pool.length)];
    if (!uniqueProducts.includes(product)) {
      uniqueProducts.push(product);
    }
  }
  previousProducts = uniqueProducts;
  return uniqueProducts;
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
// If all Product objects have been displayed at least once, removes the click event listener from the productsDiv and displays the results.
// Otherwise, displays 3 new Product objects.
function handleProductClick(event) {
  var target = event.target;
  var productId = target.getAttribute('data-product-id');
  if (productId) {
    productId = parseInt(productId, 10);
    var product = products.find(function(p) {
      return p.id === productId;
    });
    product.timesClicked++;
  }

  if (isVotingComplete()) {
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

  var ctx = canvas.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votes',
        data: voteData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: 'Views',
        data: viewData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
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

