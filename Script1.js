// JavaScript source code
let recipeList = null;

fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    recipeList = data;
    console.log("Loaded recipes:", data);

    if (document.getElementById("recipe-container")) {
        loadRecipeCard(loadRecipeNav());
    }
    if (document.getElementById("recipe")) {
        loadRecipe();
    }
  })
  .catch(err => console.error("Error loading JSON:", err));


// populates and creates the ingredients li html elements
function populateIngre(recipeid){
    var section = document.getElementById("ingreSection");
    section.innerHTML = '<h2 id="ingreList">Ingredients</h2>';
    var ingredients = recipeList[recipeid].ingredientSections;
    if (ingredients.length > 1 ){
        for (let i = 0; i < ingredients.length; i++){
            //Add ingredient header 
            var h3 = document.createElement("h3");
            h3.textContent = ingredients[i].title
            section.appendChild(h3)

            //add <ul> list for each
            var ul = document.createElement("ul");
            section.appendChild(ul)
            for (let j = 0; j < ingredients[i].items.length; j++){
                var temp = String(j)
                var li = document.createElement("li");
                li.textContent = ingredients[i].items[j].text;
                ul.appendChild(li);       
        }
    }
} else {
            //append lists of ingredients with no header
            var ul = document.createElement("ul");
            section.appendChild(ul)
            
            for (let j = 0; j < ingredients[0].items.length; j++){
                var li = document.createElement("li");
                li.textContent = ingredients[0].items[j].text;
                ul.appendChild(li);       
        }
    }

}

//populates and create the instructions/steps li elements
function populateStep(recipeid){
    var ul = document.getElementById("steps");
        ul.innerHTML = "";
    stepkeys = recipeList[recipeid].instructions;
    for (let i = 0; i < stepkeys.length; i++) {
        var key = i + 1
        var li = document.createElement("li");
        ul.appendChild(li);
        // creates the index of the step
        var indexdiv = document.createElement("div");
        indexdiv.classList.add("stepIndex");
        indexdiv.textContent = "Step " + key;
        
        //creates the 
        var descdiv = document.createElement("div");
        descdiv.classList.add("stepDescription");
        descdiv.textContent = recipeList[recipeid].instructions[i];

        //appends the index and the step
        li.appendChild(indexdiv);
        li.appendChild(descdiv);

    }
}


function loadRecipeImg(recipeid, div){
    for(let i = 0; i < recipeList[recipeid].images.length; i++){
        var img = document.createElement("img")
        img.classList.add("recipeImg")
        img.src = recipeList[recipeid].images[i]
        div.appendChild(img)
    }

}


//"loads" the recipe in recipe.html
function loadRecipe(){
    // finds the id in the url
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const recipeId = params.get('id');
    //Adds the name to the page
    var name = document.getElementById('respName');
    name.innerHTML = recipeList[recipeId].name;

    //Adds the description to the page
    if (recipeList[recipeId].description != ""){
        var description = document.getElementById('description');
        description.innerHTML = recipeList[recipeId].description;
    } 


    //Add the img to the page
    var imgcontainer = document.getElementById('col2');
    loadRecipeImg(recipeId, imgcontainer)


    //adds the ingredients and steps
    populateIngre(recipeId);
    populateStep(recipeId);
}



//gets the category of recipes that loadRecipeCard() is supposed to "load"
function loadRecipeNav(){
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const recipeCategory = params.get('category');
    // returns the category in the url
    return recipeCategory
} 


//"loads" the created recipe cards in the recipeNav.html
function loadRecipeCard(category){
    var container = document.getElementById("recipe-container");
    container.innerHTML = "";
    var recipes = recipeList;
    var filteredList = recipes.filter(recipe =>
            recipe.tags.includes(category)
        );
        filteredList.forEach(recipe => {
            const card = createRecipeCard(recipe);
            container.appendChild(card);
        });
}

//creates and returns the recipe card for loadRecipeCard()
function createRecipeCard(recipe){
    var cardContainer = document.createElement("div");
    cardContainer.classList.add("recipe-card-container");

    //loads a temperary not found image
    var cardImg = document.createElement("img");
    cardImg.classList.add("recipe-image");
    cardImg.src = "not-found.png"
    cardContainer.appendChild(cardImg);

    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    cardContainer.appendChild(cardContent)

    var cardContentAnchor = document.createElement("a");
    cardContentAnchor.href = "recipe.html?id="+recipe.id;
    cardContent.appendChild(cardContentAnchor)

    var cardContentTitle = document.createElement("h4");
    cardContentTitle.classList.add("card-title");
    cardContentTitle.innerHTML = recipe.name 

    cardContentAnchor.appendChild(cardContentTitle)
    
    return cardContainer
}

