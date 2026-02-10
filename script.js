
/*document.addEventListener("DOMContentLoaded", function (){
const link = ducument.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page");
function setActive(){
    let scrollPos = window.scrollY +200;
    sections .forEach(section => {
        if(
            scrollPos >= section.offsetTop && 
            scrollPos < section.offsetTop +
            section.offsetHeight){
                links.forEach(link =>{
                    links.classList.remove("active");
                    if(link.getattribute("href") === "#" + section.id){
                        link.classList.add("active");
                    }
                });
            }
    });
}
window.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);
});*/
