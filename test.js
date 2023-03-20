// Constructor function for creating a Product object with name, image path, times shown, and times clicked properties.
function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
  }
  
  // Global variable for an array of Product objects.
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
  
  // Display 3 unique Product objects from the products array by selecting them randomly without replacement.
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
  
  // Generate 3 unique Product objects from the products array by selecting them randomly without replacement.
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
  
  // Checks if all Product objects in the products array have been displayed to the user at least once by examining the timesShown property of each object.
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
    if (target.tagName === 'IMG') {
      var src = target.src;
      for (var i = 0; i < products.length; i++) {
        if (products[i].imagePath === src) {
          products[i].timesClicked++;
          break;
        }
      }
      if (isVotingComplete()) { // If all products have been shown, remove the event listener and display the results
        productsDiv.removeEventListener('click', handleProductClick);
        displayResults();
      } else { // Otherwise, display 3 new products
        displayProducts();
      }
    }
  }
  
  var productsDiv = document.getElementById('products'); // Get the products div
  productsDiv.addEventListener('click', handleProductClick); // Add the event listener for when an image is clicked
  
  var viewResultsButton = document.getElementById('viewResults'); // Get the view results button
  viewResultsButton.addEventListener('click', function() { // Add an event listener to display results when the button is clicked
    displayResults();
  });
  
  displayProducts(); // Display 3 initial products to start the app
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