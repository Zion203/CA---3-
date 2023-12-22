var img_div = document.getElementById("dish-random")
var dish_name = document.getElementById("dish-name")
var ol_ing = document.getElementById("list_ing")
var steps_para = document.getElementById("steps")
var pop_up = document.getElementById("discriptions-box")
var close_button = document.getElementsByClassName("close-button")[0]
var search_button  = document.getElementById("search-div")
var input_tag = document.getElementById("input")
var category_divs = document.getElementById("searched-dishes")
var category_div = document.getElementById("search-content")
var category_button = document.getElementById("Categories")
var search_icon = document.getElementById("search-icon")


var ingredians = []
var steps = ""


// fetching the data
fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((response)=>response.json())
.then((data)=>{

    // collecting the data
    let requierd_data=data.meals[0]
    let img_link = requierd_data.strMealThumb
    let img_name = requierd_data.strMeal

    for(let i = 1 ; i<21 ; i++){
        ingredians.push([requierd_data[`strIngredient${i}`],requierd_data[`strMeasure${i}`]])
    }
    steps = requierd_data.strInstructions

    //inserting the data fetched
    img_div.setAttribute("src",img_link)
    dish_name.innerText = img_name
})

// for the instruction menu

function instruction_menu(){
    let temp = ""
    ingredians.forEach(function(item){
        if (item[0]!=""){
            temp+=`<li>${item[0]} - ${item[1]}</li>`
        }
    })
    //inserting the data
    ol_ing.innerHTML = temp
    steps_para.innerText = steps
    pop_up.style.visibility = "visible"
}

img_div.onclick = () =>{
    instruction_menu()
}

// close button
close_button.onclick = () =>{
    pop_up.style.visibility = "hidden"
}

//search button
search_button.onclick = () =>{
    let user_input = input_tag.value
    category_find(user_input)
    
}

search_icon.onclick = () =>{
    window.scrollTo({
        top:700,
        behavior:"smooth"
    })
}


// fetch data according to category 
function category_find(user_input) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user_input}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                appender(data.meals);
            // } else {
            //     console.error('Invalid response format. Meals property not found.');
            }
        })
 
    }

// inserts the fetched data from category
function appender(list){
    let temp = ""
    list.forEach(function(item){
        temp+=`<div class="searched-dish">
                    <img class="search-image " src="${item.strMealThumb}" alt="temp-dish">
                    <div id="name-div">
                        <p class="dishes-name bigger">${item.strMeal}</p>
                    </div>
                </div>`
    })
    category_divs.innerHTML = temp
    category_div.style.display = "flex"
}

// in input tag when no value the category should be none
input_tag.addEventListener("search",function(event){
    if (event.target.value.trim()==""){
        category_div.style.display = "none"
    }
})
let function_open = false
category_button.onclick =()=>{
    if (function_open){
        close_fun()
        function_open=false
    }else{
        category_button.innerHTML = `<p>close</p>
    <p onclick="category_finder('Beef')">Beef</p>
    <p onclick="category_finder('Chicken')">Chicken</p>
    <p onclick="category_finder('Dessert')">Dessert</p>
    <p onclick="category_finder('Lamb')">Lamb</p>
    <p onclick="category_finder('Miscellaneous')">Miscellaneous</p>
    <p onclick="category_finder('Pasta')">Pasta</p>
    <p onclick="category_finder('Pork')">Pork</p>
    <p onclick="category_finder('Seafood')">Seafood</p>
    <p onclick="category_finder('Side')">Side</p>
    <p onclick="category_finder('Starter')">Starter</p>
    <p onclick="category_finder('Vegan')">Vegan</p>
    <p onclick="category_finder('Vegetarian')">Vegetarian</p>
    <p onclick="category_finder('Breakfast')">Breakfast</p>
    <p onclick="category_finder('Goat')">Goat</p>
`
function_open = true
    }
}

function category_finder(name){
    category_find(name)
    input_tag.value = name
    window.scrollTo({
        top:700,
        behavior:"smooth"
    })
}

function close_fun(){
    category_button.innerHTML = "<p>Categories</p>"
}
