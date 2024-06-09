//selector
const jobInput = document.querySelector("#jobInput");
const jobBtn = document.querySelector("#jobBtn");
const listGroup = document.querySelector("#listGroup");
const doneCount = document.querySelector("#doneCount");
const totalCount = document.querySelector("#totalCount");
const deleteAll = document.querySelector("#deleteAll");
const doneAll = document.querySelector("#doneAll");
const listTemplate = document.querySelector("#listTemplate");
// let count = 1;

// action logic ( Business logic )
const updateJobList = () => {
  //count list
  const lists = document.querySelectorAll(".list");
  totalCount.innerText = lists.length;
};

const updateDoneJobList = () => {
  // count list
  const lists = document.querySelectorAll(".list input:checked");
  doneCount.innerText = lists.length;
};

//create new list
const createNewList = (currentJob) => {
const list = listTemplate.content.cloneNode(true);
list.querySelector(".list").id = "list" + Date.now();
  list.querySelector(".list-task").innerText = currentJob;
console.log(list);
  // const list = document.createElement("div");
  //  list.id = "list" + count++;
  // list.id = "list" + Date.now();
  // list.classList.add("list");
  // list.querySelector(".list-task").innerText = currentJob;

  // list.innerHTML = ``;

  // const listDoneCheck = list.querySelector(".list-done-check");
  // const listTask = list.querySelector(".list-task");

  // listDoneCheck.addEventListener("change", () => {
  // updateDoneJobList();
  //   listTask.classList.toggle("line-through");
  //   list.classList.toggle("duration-200");
  //   list.classList.toggle("opacity-50");
  //   list.classList.toggle("scale-90");
  //   if(listDoneCheck.checked){
  //   editBtn.setAttribute("disabled", true);
  //   }else{
  //   editBtn.removeAttribute("disabled");
  //   }
  //   editBtn.setAttribute("disabled",true);
  // });

  // const editBtn = list.querySelector(".list-edit-btn");
  // const delBtn = list.querySelector(".list-del-btn");

  // delBtn.addEventListener("click", () => {
  //   if (window.confirm("Are you sure delete ?")) {
  //     list.remove();
  //   };
  // });

  // editBtn.addEventListener("click", () => {
  //   editBtn.setAttribute("disabled",true);
  //   listDoneCheck.setAttribute("disabled", true);
  //   const currentTask = listTask.innerText;
  //   const newTaskInput = document.createElement("input");
  //   newTaskInput.className = "border border-stone-950 px-2 py-1 w-[180px]";
  //   newTaskInput.value = currentTask;
  //   listTask.after(newTaskInput);
  //   newTaskInput.focus();
  //   listTask.classList.add("hidden");

  //   newTaskInput.addEventListener("change", () => {
  //   editBtn.removeAttribute("disabled");
  //   listDoneCheck.removeAttribute("disabled");
  //     listTask.innerText = newTaskInput.value;
  //     listTask.classList.remove("hidden");
  //     newTaskInput.remove();
  //   });
  // });

  return list;
  //  console.log(list);
};

const delList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  if (window.confirm("Are you sure delete ?")) {
    
    currentList.classList.add("animate__animated","animate__zoomOut");
    currentList.addEventListener("animationend",() => {
       currentList.remove();
      updateDoneJobList();
      updateJobList();
    })
  }
};

const editList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const editBtn = currentList.querySelector(".list-edit-btn");
  const listDoneCheck = currentList.querySelector(".list-done-check");
  const listTask = currentList.querySelector(".list-task");

  editBtn.setAttribute("disabled", true);
  listDoneCheck.setAttribute("disabled", true);
  const currentTask = listTask.innerText;
  const newTaskInput = document.createElement("input");
  newTaskInput.className = "border border-stone-950 px-2 py-1 w-[180px]";
  newTaskInput.value = currentTask;
  listTask.after(newTaskInput);
  newTaskInput.focus();
  listTask.classList.add("hidden");

  newTaskInput.addEventListener("change", () => {
    editBtn.removeAttribute("disabled");
    listDoneCheck.removeAttribute("disabled");
    listTask.innerText = newTaskInput.value;
    listTask.classList.remove("hidden");
    newTaskInput.remove();
  });
};

const doneList = (listId) => {
  const currentList = document.querySelector(`#${listId}`);
  const listTask = currentList.querySelector(".list-task");
  const listDoneCheck = currentList.querySelector(".list-done-check");
  const editBtn = currentList.querySelector(".list-edit-btn");

  listTask.classList.toggle("line-through");
  currentList.classList.toggle("duration-200");
  currentList.classList.toggle("opacity-50");
  currentList.classList.toggle("scale-90");
  if (listDoneCheck.checked) {
    editBtn.setAttribute("disabled", true);
  } else {
    editBtn.removeAttribute("disabled");
  }
  updateDoneJobList();
}

const addList = (text) => {
  // console.log(jobInput.value);
  listGroup.append(createNewList(text));
  jobInput.value = "";
  updateJobList();
};

// handler
const listGroupHandler = (event) => {
  const list = event.target.closest(".list");
  // console.log(list);
  if (event.target.classList.contains("list-edit-btn")) {
    // console.log("U edit");
    editList(event.target.closest(".list").id);  
  }

  if (event.target.classList.contains("list-del-btn")) {
    // console.log("U del");
    delList(event.target.closest(".list").id);
  }

  if (event.target.classList.contains("list-done-check")) {
    // console.log("U done check");
    doneList(event.target.closest(".list").id);
  }
};

const jobBtnHandler = () => {
  if(jobInput.value.trim()){
    addList(jobInput.value)
  }else{
    alert("U must write text input")
  }
};

const jobInputHandler = (event) => {
  if (event.key === "Enter") {
    addList(jobInput.value);
  }
};

const deleteAllHandler = () => {
  if (confirm ("Are you sure to delete all list?")){
const allList = listGroup.querySelectorAll(".list");
  allList.forEach((list) => list.remove());
  updateJobList();
  }
};


const doneAllHandler = () => {
  if (confirm("Are you sure to done all list?")) {
    const allList = listGroup.querySelectorAll(".list");
    allList.forEach((list) =>
      {
        list.querySelector(".list-done-check").checked = true;
      doneList(list.id);
      });
  }
};
//listener
jobBtn.addEventListener("click", jobBtnHandler);
listGroup.addEventListener("click", listGroupHandler);
jobInput.addEventListener("keyup",jobInputHandler);
deleteAll.addEventListener("click", deleteAllHandler);
doneAll.addEventListener("click", doneAllHandler);


// DOM Node
// const myName = document.createTextNode("khin");
// const myAge = document.createTextNode(25);
// const myJob = document.createTextNode("Developer");

// const mySelf = document.createDocumentFragment();
// mySelf.append(myName);
// mySelf.append(myAge);
// mySelf.append(myJob);
// console.log(mySelf);
// document.body.append(mySelf);

// console.log(deleteAll.children);
// console.log(deleteAll.childNodes[2]);
// ES 6 Module
// Vite