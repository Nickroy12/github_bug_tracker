 allIssues =[];
const issueCount = document.getElementById('issueCount');
const issueContainer = document.getElementById('issuContainer');

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const buttons = [allBtn, openBtn, closeBtn];


const loader = (status) =>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        issueContainer.classList.add('hidden' )
    }else{
          issueContainer.classList.remove('hidden')
           document.getElementById('spinner').classList.add('hidden' , );
    }

}
async function dataFetch(){
  try{
    loader(true)
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
      allIssues = data.data;
     dataDisplay(allIssues)
  }
  catch(error){
    console.log("Error:", error)
  }
  finally{
    loader(false)
  }
}
function toggleBtn(activeBtn){
    buttons.forEach(btn=>{
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    activeBtn.classList.remove("btn-outline");
    activeBtn.classList.add("btn-primary");
}
allBtn.addEventListener("click", ()=>{
    toggleBtn(allBtn);
    dataDisplay(allIssues)
});

openBtn.addEventListener("click", ()=>{
   toggleBtn(openBtn);
   const openIssues = allIssues.filter(issue => issue.status === "open");
   dataDisplay(openIssues)
});

closeBtn.addEventListener("click", ()=>{
    toggleBtn(closeBtn);
    const closeIssues = allIssues.filter(issue => issue.status === "closed");
    dataDisplay(closeIssues)
});

closeBtn.addEventListener("click", ()=>{
    toggleBtn(closeBtn);
});

async function modalBox(id){
  const res = await  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  const data = await res.json()
  displayDetails(data.data)
}

const displayDetails = (issue) =>{

  const modalContainer = document.getElementById('modalBody');
  // modalContainer.innerHTML = `hi nick`

  
      modalContainer.innerHTML = `
        <div class="title">
       <h2 class="card-title text-2xl font-bold ">${issue.title}</h2>
        </div>
        <div class="intro flex gap-2 ">
           <span class="rounded-3xl bg-green-500  px-2 text-white font-semibold  ${issue.status === "open" ? 'bg-green-500 rounded-3xl': 'bg-red-500 rounded-3xl'} ">${issue.status}</span>
           <span class="rounded-3xl to-slate-400 font-semibold ">• ${issue.status} by ${issue.author} </span>
           <span class="rounded-3xl  to-slate-400 font-semibold">• ${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      <div class="card-actions ">
      <span class="btn btn-error rounded-3xl btn-soft"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</span>
      <button class="btn btn-warning rounded-3xl btn-soft ${issue.labels[1] === undefined? 'hidden':'flex'}">${issue.labels[1]}</button>
    </div>
     <p class="text-slate-500">${issue.description}</p>
     <div class="workDess flex justify-between items-center ">
      <div class="assign">
        <h2 class="text-slate-500">Assignee:</h2>
        <p class="font-bold"> ${issue.assignee} </p>
      </div>
      <div class="priority">
        <span class="rounded-3xl ${issue.priority === 'high'? 'bg-red-400' : issue.priority === 'medium' ? 'bg-amber-400': 'bg-slate-500'  } px-2 text-white font-semibold ">${issue.priority} </span>
      </div>
     </div>`
  
  document.getElementById('popupbox').showModal();
}

const dataDisplay =(data) =>{
    console.log(data)
    issueCount.innerHTML = data.length
     issueContainer.innerHTML = ' '

    data.forEach(e => {
        const div = document.createElement('div');
        div.className = '';

        div.innerHTML = `
                  <div onclick="modalBox(${e.id})" class="card bg-base-100  shadow-sm mb-3 cursor-pointer">
  <div class="card-body ${e.status === "open" ? 'border-b-2 border-green-500 rounded-3xl': 'border-b-2 border-red-500 rounded-3xl'}" >
    <div class="flex justify-between">
      <div class="git-status">
      <img src="${e.status === 'open' ? 'image/Open-status.png' : 'image/Closed-Status.png'}" alt="status">
      </div>
      <div class="gitCondition ${e.priority === 'high'? 'bg-red-400' : e.priority === 'medium' ? 'bg-amber-400': 'bg-slate-500'  } px-5 rounded-3xl">
        ${e.priority}
      </div>
    </div>
    <h2 class="card-title text-2xl font-bold line-clamp-2">${e.title}</h2>
    <p class="line-clamp-2">${e.description}</p>
    <div class="card-actions ">
      <span class="btn btn-error rounded-3xl btn-soft"><i class="fa-solid fa-bug"></i>${e.labels[0]}</span>
      <button class="btn btn-warning rounded-3xl btn-soft ${e.labels[1] === undefined? 'hidden':'flex'}">${e.labels[1]}</button>
       
    </div>
    <p class="to-slate-500 font-semibold">#${e.id} by ${e.author}</p>
       <p class="to-slate-500 font-semibold">${new Date(e.createdAt).toLocaleDateString()}</p>
  </div>
</div>`
       issueContainer.appendChild(div)
    });
}
dataFetch();