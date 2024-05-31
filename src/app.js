//selector

const jobInput = document.querySelector("#jobInput");
const jobBtn = document.querySelector("#jobBtn");
const listGroup = document.querySelector("#listGroup");
const doneCount = document.querySelector("#doneCount");
const totalCount = document.querySelector("#totalCount");

// process
// console.log(jobInput);
const addList = () => {
  // console.log(jobInput.value);
  listGroup.append(createNewList(jobInput.value));
  jobInput.value = "";
  updateJobList();
};

const updateJobList = () => {
  //count list
  const lists = document.querySelectorAll(".list");
  totalCount.innerText = lists.length;
};

//create element
const createNewList = (currentJob) => {
  const list = document.createElement("div");
  list.classList.add("list");

  const updateDoneJobList = () => {
    //count list
    const lists = list.querySelectorAll(".list input:checked");
    doneCount.innerText = lists.length;
  };

  list.innerHTML = `<div class="        listGroup    border border-stone-950 flex justify-between p-2 items-center mb-6">
                        <div class=" flex gap-2 items-center justify-center ">
                             <input
                           type="checkbox" class="size-4 list-done-check accent-stone-950" />
                            <p class="list-task   font-mono">${currentJob}</p>
                           </div>
                             <div class="control">
                             <button class="border border-stone-950 p-1 disabled:opacity-20 list-edit-btn">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="size-4">
                                     <path stroke-linecap="round" stroke-linejoin="round"
                                         d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                 </svg>
                            </button>
                            <button class="border border-stone-950 p-1 list-del-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                     <path stroke-linecap="round" stroke-linejoin="round"
                                         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                 </svg>
                            </button>  </div>                 </div>`;

  const listDoneCheck = list.querySelector(".list-done-check");
  const listTask = list.querySelector(".list-task");

  listDoneCheck.addEventListener("change", () => {
    updateDoneJobList();
    listTask.classList.toggle("line-through");
    list.classList.toggle("duration-200");
    list.classList.toggle("opacity-50");
    list.classList.toggle("scale-90");
    if(listDoneCheck.checked){
    editBtn.setAttribute("disabled", true);
    }else{
    editBtn.removeAttribute("disabled");
    }
    // editBtn.setAttribute("disabled",true);
  });

  const editBtn = list.querySelector(".list-edit-btn");
  const delBtn = list.querySelector(".list-del-btn");

  delBtn.addEventListener("click", () => {
    if (window.confirm("Are you sure delete ?")) {
      list.remove();
    };
  });

  editBtn.addEventListener("click", () => {
    editBtn.setAttribute("disabled",true);
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
  });

    return list;
    // console.log(list);
  };

  // event
  jobBtn.addEventListener("click", addList);
