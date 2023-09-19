// modal container 

const modalContainer = document.querySelector(".modal-cont"); 
const addBtn = document.querySelector(".add-btn");
const colorModalArray = document.getElementsByClassName("color_modal");

addBtn.addEventListener("click", function (event) {
    modalContainer.style.display = "flex";
});

// select all the color box
for (let i = 0; i < colorModalArray.length; i++) {
    const currModalcolor = colorModalArray[i];
    currModalcolor.addEventListener("click", function (event) {
        // remove selected from all the color boxes
        for(let i = 0; i < colorModalArray.length; i++) {
            colorModalArray[i].classList.remove("selected");
        }
        // add selected to the clicked box
        const targetElem = event.target;
        targetElem.classList.add("selected");
    });
}