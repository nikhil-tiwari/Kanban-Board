// modal container

const modalContainer = document.querySelector(".modal-cont");
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".del-btn");
const colorModalArray = document.querySelectorAll(".color_modal");
const textArea = document.querySelector(".textarea-cont");
const mainCont = document.querySelector(".main-cont");
const toolboxColorArray = document.querySelectorAll(
  ".toolbox-priority-cont .color"
);

const uid = new ShortUniqueId({ length: 5 });
const colorArray = ["red", "blue", "green", "purple"];
let ticketsArray = [];

if (localStorage.getItem("ticketsArray") !== null) {
  const stringTicketArray = localStorage.getItem("ticketsArray");
  ticketsArray = JSON.parse(stringTicketArray);

  for(let i=0;i<ticketsArray.length;i++) {
    let ticketObj = ticketsArray[i];
    createTicket(ticketObj.task, ticketObj.color, ticketObj.id, true);
  }
}

//********logic when plus is clicked and if the plus is clicked by mistake***********
addBtn.addEventListener("click", function (event) {
  modalContainer.style.display = "flex";
  mainCont.addEventListener("click", function (event) {
    for (let i = 0; i < colorModalArray.length; i++) {
      colorModalArray[i].classList.remove("selected");
    }
    colorModalArray[0].classList.add("selected");
    textArea.value = "";
    modalContainer.style.display = "none";
  });
});

function highlightColor(contColorArray) {
  for (let i = 0; i < contColorArray.length; i++) {
    const currcolor = contColorArray[i];
    currcolor.addEventListener("click", function (event) {
      // remove selected from all the color boxes
      for (let i = 0; i < contColorArray.length; i++) {
        contColorArray[i].classList.remove("selected");
      }
      // add selected to the clicked box
      const targetElem = event.target;
      targetElem.classList.add("selected");
    });
  }
}

// highlighting the color that is clicked
highlightColor(colorModalArray);

// *********************creating ticket**********************************
textArea.addEventListener("keypress", function (event) {
  if (event.key == "Enter" && event.shiftKey == false) {
    modalContainer.style.display = "none";

    // create a ticket
    const ticketTask = textArea.value;
    const currModalElement = document.querySelector(".selected");
    const ticketColor = currModalElement.getAttribute("data-color");

    // reset the modal container
    textArea.value = "";
    for (let i = 0; i < colorModalArray.length; i++) {
      colorModalArray[i].classList.remove("selected");
    }
    colorModalArray[0].classList.add("selected");

    createTicket(ticketTask, ticketColor);
  }
});

function createTicket(ticketTask, ticketColor, pID, flag) {
  let ticketContainer = document.createElement("div");
  let id;
  if(flag) {
    id = pID;
  } else {
    id = uid.rnd();
  }
  
  ticketContainer.classList.add("ticket-cont");

  ticketContainer.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="ticket-area">${ticketTask}</div>
        <i class="fa-solid fa-lock lock_icon"></i>`;

  mainCont.appendChild(ticketContainer);
  const lockButton = ticketContainer.querySelector(".lock_icon");
  const ticketArea = ticketContainer.querySelector(".ticket-area");
  const ticketColorElem = ticketContainer.querySelector(".ticket-color");

  if(!flag) {
    let ticketObj = {
      id: id,
      color: ticketColor,
      task: ticketTask,
    };
  
    ticketsArray.push(ticketObj);
    setLocalStorage();
  }

  handlelockButton(lockButton, ticketArea, id);

  handleChangeColor(ticketColorElem, id);

  handleDelete(ticketContainer, id);
}

function handlelockButton(lockButton, ticketArea, id) {
  lockButton.addEventListener("click", function () {
    // Lock button : <i class="fa-solid fa-lock "></i>
    // Unlock button:     < i class="fa-solid fa-lock-open" ></ >
    const isLocked = lockButton.classList.contains("fa-lock");
    if (isLocked === true) {
      // unlock it
      lockButton.classList.remove("fa-lock");
      lockButton.classList.add("fa-lock-open");
      // make my ticket task area editable
      ticketArea.setAttribute("contenteditable", "true");
    } else {
      // lock it
      lockButton.classList.remove("fa-lock-open");
      lockButton.classList.add("fa-lock");
      // make my ticket task area locked
      ticketArea.setAttribute("contenteditable", "false");
    }

    // reflecting the changes in the local storage
    for(let i=0;i<ticketsArray.length;i++) {
      let ticketObj = ticketsArray[i];
      // console.log(ticketObj);
      if(ticketObj.id == id) {
        ticketObj.task = ticketArea.innerText;
        break;
      }
    }
    setLocalStorage();
  });
}

function handleChangeColor(ticketColorElem, id) {
  // we just need to change the class of the ticket-color div
  ticketColorElem.addEventListener("click", function (event) {
    const currColor = ticketColorElem.classList[1];
    // console.log(currColor);
    const currIndex = colorArray.indexOf(currColor);
    // console.log(currIndex);
    const newIndex = (currIndex + 1) % colorArray.length;
    // console.log(newIndex);
    const newColor = colorArray[newIndex];
    ticketColorElem.classList.remove(currColor);
    ticketColorElem.classList.add(newColor);

    // reflecting the changes in the local storage
    for(let i=0;i<ticketsArray.length;i++) {
      let ticketObj = ticketsArray[i];
      // console.log(ticketObj);
      if(ticketObj.id == id) {
        ticketObj.color = newColor;
        break;
      }
    }
    setLocalStorage();
  });
}

// ***********************filtering the tickets according to the colors******************************
for (let i = 0; i < toolboxColorArray.length; i++) {
  const currToolboxColor = toolboxColorArray[i];
  currToolboxColor.addEventListener("click", function (event) {
    // remove selected from all the color boxes
    for (let i = 0; i < toolboxColorArray.length; i++) {
      toolboxColorArray[i].classList.remove("selectedForFilter");
    }
    // add selected to the clicked box
    const targetElem = event.target;
    targetElem.classList.add("selectedForFilter");
    const currColorforFilter = colorArray[i];
    //console.log(currColor);

    filterTickets(currColorforFilter);
  });
}

function filterTickets(currColorforFilter) {
  // console.log(currColorforFilter);
  const ticketArray = mainCont.querySelectorAll(".ticket-cont");
  // console.log(ticketArray);
  for (let i = 0; i < ticketArray.length; i++) {
    const currTicket = ticketArray[i];
    // console.log(currTicket);
    const isPresent = currTicket.querySelector(`.${currColorforFilter}`);
    if (isPresent == null) {
      currTicket.style.display = "none";
    } else {
      currTicket.style.display = "block";
    }
  }
}

//************************remove all the filters********************************* */
for (let i = 0; i < toolboxColorArray.length; i++) {
  const currToolboxColor = toolboxColorArray[i];
  currToolboxColor.addEventListener("dblclick", function (event) {
    // remove selected from all the color boxes
    for (let i = 0; i < toolboxColorArray.length; i++) {
      toolboxColorArray[i].classList.remove("selectedForFilter");
    }

    showAllTickets();
  });
}

function showAllTickets() {
  const ticketArray = mainCont.querySelectorAll(".ticket-cont");
  // console.log(ticketArray);
  for (let i = 0; i < ticketArray.length; i++) {
    const currTicket = ticketArray[i];
    currTicket.style.display = "block";
  }
}

//**************************deleting a ticket*********************************
let flag = false;
removeBtn.addEventListener("click", function (event) {
  if (!flag) {
    flag = true;
    alert("Delete button has been activated");
    removeBtn.style.backgroundColor = "red";
  } else {
    flag = false;
    removeBtn.style.backgroundColor = "inherit";
  }
});

// will be called upon the creation of the ticket
function handleDelete(ticketContainer, id) {
  ticketContainer.addEventListener("click", function (event) {
    if (flag == true) {
      if (confirm("Do you want to delete this ticket?") == true) {
        ticketContainer.remove();
        // reflecting the changes in the local storage: delete the ticket from the local storage array
        let removeIdx;
        for(let i=0;i<ticketsArray.length;i++) {
          let ticketObj = ticketsArray[i];
          // console.log(ticketObj);
          if(ticketObj.id == id) {
            removeIdx = i;
            break;
          }
        }
        // console.log(removeIdx);
        ticketsArray.splice(removeIdx,1);
        setLocalStorage();
      }
    }
  });
}

//**********************local storage*************************
function setLocalStorage() {
  const stringTicketArray = JSON.stringify(ticketsArray);
  localStorage.setItem("ticketsArray", stringTicketArray);
}