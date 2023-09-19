// modal container 

const modalContainer = document.querySelector(".modal-cont"); 
const addBtn = document.querySelector(".add-btn");
const colorModalArray = document.querySelectorAll(".color_modal");
const textArea = document.querySelector(".textarea-cont");
const mainCont = document.querySelector(".main-cont");
const uid = new ShortUniqueId({ length: 5 });

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

textArea.addEventListener("keypress", function(event){
    if(event.key == "Enter" && event.shiftKey == false)
    {
        modalContainer.style.display = "none";

        // create a ticket
        const ticketTask = textArea.value;
        const currModalElement = document.querySelector(".selected");
        const ticketColor = currModalElement.getAttribute("data-color");


        // reset the modal container
        textArea.value = "";
        for(let i = 0; i < colorModalArray.length; i++) {
            colorModalArray[i].classList.remove("selected");
        }
        colorModalArray[0].classList.add("selected");

        createTicket(ticketTask, ticketColor);
    }
});

function createTicket(ticketTask, ticketColor) {
    let ticketContainer = document.createElement("div");
    const id = uid.rnd();
    ticketContainer.classList.add("ticket-cont");

    ticketContainer.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="ticket-area">${ticketTask}</div>
        <i class="fa-solid fa-lock lock_icon"></i>`;
    
    mainCont.appendChild(ticketContainer);
    const lockButton = ticketContainer.querySelector(".lock_icon");
    const ticketArea = ticketContainer.querySelector(".ticket-area");

    handlelockButton(lockButton, ticketArea);
}


function handlelockButton(lockButton, ticketArea) {
    lockButton.addEventListener("click", function () {
        // Lock button : <i class="fa-solid fa-lock "></i>
        // Unlock button:     < i class="fa-solid fa-lock-open" ></ >
        const isLocked = lockButton.classList.contains("fa-lock");
        if (isLocked == true) {
            // have unlock it
            lockButton.classList.remove("fa-lock");
            lockButton.classList.add("fa-lock-open");
            // make my ticket task area : editable
            ticketArea.setAttribute("contenteditable", "true")
        } else {
            // lock it 
            lockButton.classList.remove("fa-lock-open");
            lockButton.classList.add("fa-lock");
            ticketArea.setAttribute("contenteditable", "false")
            // make my ticket task area : locked
        }
    });
}
