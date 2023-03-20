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
  
  // Display 3 random products from the products array.  Ensures that only 3 products are displayed at a time and are all randomly selected.
  function displayProducts() {
    var product1, product2, product3;
  
    do {
      product1 = products[Math.floor(Math.random() * products.length)];
      product2 = products[Math.floor(Math.random() * products.length)];
      product3 = products[Math.floor(Math.random() * products.length)];
    } while (product1 === product2 || product1 === product3 || product2 === product3);
  
    var img1 = document.getElementById('Bag');
    var img2 = document.getElementById('Banana');
    var img3 = document.getElementById('Bathroom');
    var img4 = document.getElementById('Boots');
    var img5 = document.getElementById('Breakfast');
    var img6 = document.getElementById('Bubblegum');
    var img7 = document.getElementById('Chair');
    var img8 = document.getElementById('Cthulhu');
    var img9 = document.getElementById('DogDuck');
    var img10 = document.getElementById('Dragon');
    var img11 = document.getElementById('Pen');
    var img12 = document.getElementById('PetSweep');
    var img13 = document.getElementById('Scissors');
    var img14 = document.getElementById('Shark');
    var img15 = document.getElementById('Sweep');
    var img16 = document.getElementById('Tauntaun');
    var img17 = document.getElementById('Unicorn');
    var img18 = document.getElementById('WaterCan');
    var img19 = document.getElementById('WineGlass');
  
    img1.src = product1.imagePath;
    img2.src = product2.imagePath;
    img3.src = product3.imagePath;
    img4.src = product4.imagePath;
    img5.src = product5.imagePath;
    img6.src = product6.imagePath;
    img7.src = product7.imagePath;
    img8.src = product8.imagePath;
    img9.src = product9.imagePath;
    img10.src = product10.imagePath;
    img11.src = product11.imagePath;
    img12.src = product12.imagePath;
    img13.src = product13.imagePath;
    img14.src = product14.imagePath;
    img15.src = product15.imagePath;
    img16.src = product16.imagePath;
    img17.src = product17.imagePath;
    img18.src = product18.imagePath;
    img19.src = product19.imagePath;
   
    product1.timesShown++;
    product2.timesShown++;
    product3.timesShown++;
    product4.timesShown++;
    product5.timesShown++;
    product6.timesShown++;
    product7.timesShown++;
    product8.timesShown++;
    product9.timesShown++;
    product10.timesShown++;
    product11.timesShown++;
    product12.timesShown++;
    product13.timesShown++;
    product14.timesShown++;
    product15.timesShown++;
    product16.timesShown++;
    product17.timesShown++;
    product18.timesShown++;
    product19.timesShown++;
   
  }
  
  // Checks if all products have been shown to the user at least once.  If the timeShown property of each product object is > 0
  function isVotingComplete() {
    for (var i = 0; i < products.length; i++) {
      if (products[i].timesShown === 0) {
        return false;
      }
    }
    return true;
  }
 
// The displayResults() function displays the vote and view counts for each product in the products array in the results div.
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
  // Click event listener on "products" div -> Increment product's "timesClicked" when corresponding image is clicked, remove listener and display results if all products shown, else display new products.
  var productsDiv = document.getElementById('products');
  productsDiv.addEventListener('click', function(event) {
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
        productsDiv.removeEventListener('click', arguments.callee);
        displayResults();
      } else {
        displayProducts();
      }
    }
  });
  // Adds a click event listener to the "viewResultsButton" element. When the button is clicked, the "displayResults" function is called.
  var viewResultsButton = document.getElementById('viewResults');
  viewResultsButton.addEventListener('click', function() {
    displayResults();
  });
  
  displayProducts();
  