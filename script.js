
// MODEL   --Stores the Cat data, includes: name, image url, and click count
var model = {
    currentCat: null,
    cats: [
        {
            name: 'Max',
            image: 'cat.jpg',
            clickings: 0
        },
        {
            name: 'Tom',
            image: 'cat2.jpg',
            clickings: 0
        },
        {
            name: 'Meow-Meow',
            image: 'cat3.jpg',
            clickings: 0
        },
        {
            name: 'Tiger',
            image: 'cat4.jpg',
            clickings: 0
        },
        {
            name: 'Kitty',
            image: 'cat5.jpg',
            clickings: 0
        }
    ]
};

/*======OCTOPUS======*/
var octopus = {
    init: function () {
        //set currentCat to the first cat on list
        model.currentCat = model.cats[0];
        
        //initialize views
        catListView.init();
        catView.init();
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    getCats: function () {
        return model.cats;
    },
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },
    incrementCounter: function () {
        model.currentCat.clickings++;
        catView.render();
    }
};


/*=======View=======*/
var catView = {
    init: function () {
    this.myCatPic = document.getElementById('cat');
    this.billboard = document.getElementById('headname');
    this.counter = document.getElementById('count');  
    this.myCatPic.addEventListener('click', function() {
        octopus.incrementCounter();
    });
        this.render();
    },
    
    render: function () {
        var currentCat = octopus.getCurrentCat();
        this.counter.textContent = currentCat.clickings;
        this.billboard.textContent = currentCat.name;
        this.myCatPic = currentCat.image;
    }
    
};

var catListView = {
 
    init: function () {
        //store the DOM element for easy access later
        this.catListElem = document.getElementById('menu');
        
        //render this view (update the DOM elements with correct values)
        this.render();
    },
    
    render: function () {
        var cat, elem, i;
        //get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();
        
        //empty the cat list
        this.catListElem.innerHTML = '';
        
        //loop over the cats
        for (i=0;i<cats.length;i++) {
            //this is the cat we are looping over
            cat = cats[i];
            
            //make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;
            
            //on click, setCurrentCat and render the catView
            //this uses our closure-in-a-loop trick to connect the value
            //of the cat variable to the click event function
            elem.addEventListener('click',(function(catCopy){
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));
            
            //add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
    
};

//start the damn thing!
octopus.init();
