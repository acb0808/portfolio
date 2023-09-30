let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

let base_item = document.querySelector('.home-section');
base_item.addEventListener("click", ()=>{
  sidebar.classList.add("close");
});

function closeAllFrame() {
  let FrameList = document.querySelectorAll(`.home-content>iframe`);
  FrameList.forEach(element => {
    // element.style.width = "0";
    element.setAttribute('style', 'height:0;width:0;border:0;border:none;visibility:hidden;');
  });
}

function getDisplayedFrame() {
  let FrameList = document.querySelectorAll(`.home-content>iframe`);
  let Current;
  FrameList.forEach(element => {
    if (element.style.visibility != 'hidden') {
      Current = element;
    }
  });
  return Current;
}

function reloadFrame(frame) {
  const src = frame.attributes.src.value;
  
  frame.attributes.src.value = ''
  console.log(src)
  setTimeout(() => {
    if (src != '') {
      frame.attributes.src.value = src
      console.log(frame.attributes.src.value)
    } 
    
  }, 10)
}

function handleFrame(element) {
  if (!(element.attributes.atr)) {
    return;
  }
  let frameSrc = element.attributes.atr.value;
  if (frameSrc == 'reload') {
    let display = getDisplayedFrame();
    console.log(display)
    if(display) {
      reloadFrame(display);
    }
    return;
  }
  let FrameExist = document.querySelector(`.home-content>iframe[src="${frameSrc}"]`);
  if (FrameExist instanceof HTMLIFrameElement) {
    closeAllFrame();
    FrameExist.setAttribute('style', 'height:100%;width:100%;');
  } else {
    if (frameSrc.indexOf('http') != -1 || frameSrc.indexOf('//') != -1) {
      window.open(frameSrc,'_blank');
      return;
    }
    closeAllFrame();
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", frameSrc);
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    ifrm.frameBorder = "0";
    document.querySelector(".home-content").appendChild(ifrm);

  }
  
}

let frameList = document.querySelectorAll('at');
frameList.forEach(element => {
  element.addEventListener('click', (e) => {
    handleFrame(e.srcElement.parentElement)
  })
});

frameList = document.querySelectorAll('.link_name');
frameList.forEach(element => {
  element.addEventListener('click', (e) => {
    handleFrame(e.srcElement.parentElement.parentElement.parentElement.querySelector('.iocn-link>at'))
  })
});


