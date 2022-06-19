const projectsContainer = document.querySelector('.projects-container');
const kennyContainer = document.querySelector('.kenny-container');
const textContainer = document.querySelector('.text-container');
const reveal = document.querySelector('.text--reveal');
const kenny = document.querySelector('.text--kenny');
const cursor = document.querySelector('.name__cursor');
const project = document.querySelector('.project');

let open = false;

reveal.onclick = function(){
    if(open === false){
        projectsContainer.style.height = "40vh"; 
        textContainer.style.paddingTop = "50px";
    }else{
        projectsContainer.style.height = "0vh";
        textContainer.style.paddingTop = "0px";
    }
    open = !open;
}

kenny.onclick = function(){
    kennyContainer.classList.remove('move-left');
    kennyContainer.classList.add('move-right');
    setTimeout(function(){
        kennyContainer.classList.add('move-left');
        kennyContainer.classList.remove('move-right');
    },2000);
}

document.onclick = function(e){
    if( open && 
        !e.srcElement.classList.contains('projects-container') &&
        !e.srcElement.classList.contains('projects') &&
        !e.srcElement.classList.contains('project--link') &&
        !e.srcElement.classList.contains('text--reveal')
    ){
        projectsContainer.style.height = "0vh";
        textContainer.style.paddingTop = "0px";
        open = !open;
    }
}
