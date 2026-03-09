const loginBtn = document.getElementById('loginSubmit');

loginBtn.addEventListener('click', function(){
   const nameInput = document.getElementById('nameInput');
const name = nameInput.value.trim();
if(name === ""){
   return alert('Input user name')
}
const passIn = document.getElementById('password');
const pass = passIn.value.trim();
if(pass === ''){
    return alert('Input user Password')
}

if(name === "admin" && pass ==="admin123"){
   alert('Your signing Successful  !')
   window.location.assign('./dashboard.html')
}else{
   alert('Something is wrong !')
}

})


