let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();
});

searchBtn.addEventListener("click", ()=>{ 
  sidebar.classList.toggle("open");
  menuBtnChange(); 
});


function menuBtnChange() {
 sidebar.classList.contains("open") ? closeBtn.classList.replace("bx-menu", "bx-menu-alt-right") : closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
 
}