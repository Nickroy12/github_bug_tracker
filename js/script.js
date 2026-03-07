const issueCount = document.getElementById('issueCount');
const issueContainer = document.getElementById('issuContainer');
async function dataFetch(){
   try{
      const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
      const data = await res.json();
      dataDisplay(data.data);
   }
   catch(error){
      console.log("Error:", error);
   }
}

dataFetch();

const dataDisplay =(data) =>{
    console.log(data)
    issueCount.innerHTML = data.length
    //  issueContainer.innerHTML = ' '

    data.forEach(e => {
        const div = document.createElement('div');
        div.className = '';

        div.innerHTML = `
                  <div class="card bg-base-100  shadow-sm mb-3">
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