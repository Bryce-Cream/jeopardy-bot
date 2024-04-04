//Few things can be done for this:
// - Add the counter to the resize functionality
// - checkout await and async stuff perhaps when it comes to using the resize function

//Step 0: Variables
const categories_row = document.getElementsByClassName('grid-row-cats')[0];
const num_categories = Number(categories_row.children.length);
let categories_row_height = parseInt(categories_row.style.height);
let categories_row_width = categories_row.offsetWidth;
let one_category_width = Number(Math.round(categories_row_width/num_categories));
let strap_element = document.createElement('div');


//Step 1 create the strap that goes across the categories by appending a child element to the categories row?
strap_element.setAttribute("id", 'strap');
strap_element.style.position = 'absolute';
strap_element.style.right = '10px';
strap_element.style.height = `${categories_row_height}px`;
strap_element.style.width = `${categories_row_width}px`;
strap_element.style.backgroundImage = `url('https://picsum.photos/${Math.round(categories_row_width/num_categories)}/${categories_row_height}')`
categories_row.appendChild(strap_element);

//Step 2: Add a keyup event listener to the window to check if we press (1) if so we remove one of the pictures
window.addEventListener("keyup", checkKeyPressed, false);
window.addEventListener("resize", resizeStrap);
let strap = document.getElementById("strap");
var counter = 0;

function checkKeyPressed(e) 
{
    if (e.keyCode == "49") //1
    {
        strap.style.width = `${parseInt(strap.style.width) - one_category_width}px`;
        counter++;
        
        if(counter>=6)
        {
            strap.style.width = '0px';
        }
        console.log(counter); 
    }
    else if (e.keyCode == "192") // ``` reset
    {
        strap.style.width = `${categories_row_width}px`;
        counter = 0;
    }
}

//on window change update strap Element size()
function resizeStrap()
{
    setTimeout(function() {
        categories_row_height = parseInt(categories_row.style.height);
        categories_row_width = categories_row.offsetWidth;
        one_category_width = Number(Math.round(categories_row_width/num_categories));
        strap_element.style.height = `${categories_row_height}px`;
        strap_element.style.width = `${categories_row_width}px`;
        strap_element.style.backgroundImage = `url('https://picsum.photos/${Math.round(categories_row_width/num_categories)}/${categories_row_height}')`
    }, 125);
}