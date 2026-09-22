const song = document.getElementById("song");
const openBtn = document.getElementById("openBtn");
const story = document.getElementById("story");
const musicBtn = document.getElementById("musicBtn");
const musicState = document.getElementById("musicState");
const equalizer = document.getElementById("equalizer");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const responseEmail = "mauricioromeroleon20@gmail.com";

async function sendResponse(choice){
  try{
    const response = await fetch(`https://formsubmit.co/ajax/${responseEmail}`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({
        _subject:`Respuesta a tu declaración: ${choice}`,
        respuesta:choice,
        _template:"table",
        _captcha:"false"
      })
    });
    return response.ok;
  }catch(error){
    return false;
  }
}

function hearts(amount=14){
  const box=document.querySelector(".hearts");
  for(let i=0;i<amount;i++){
    const h=document.createElement("span");
    h.className="floating-heart";
    h.textContent=Math.random()>.5?"♥":"♡";
    h.style.left=(Math.random()*100)+"%";
    h.style.fontSize=(10+Math.random()*20)+"px";
    h.style.animationDuration=(5+Math.random()*5)+"s";
    h.style.animationDelay=(Math.random()*2)+"s";
    box.appendChild(h);
    setTimeout(()=>h.remove(),11000);
  }
}
setInterval(()=>hearts(3),1800);

function playMusic(){
  song.play().then(()=>{
    musicState.textContent="Reproduciendo";
    musicBtn.textContent="Ⅱ";
    equalizer.style.opacity="1";
  }).catch(()=>{
    musicState.textContent="Toca el botón para reproducir";
  });
}

openBtn.addEventListener("click",()=>{
  story.classList.remove("hidden");
  document.body.style.overflowY="auto";
  playMusic();
  story.scrollIntoView({behavior:"smooth"});
  hearts(22);
});

musicBtn.addEventListener("click",()=>{
  if(song.paused){
    playMusic();
  }else{
    song.pause();
    musicBtn.textContent="▶";
    musicState.textContent="Pausada";
    equalizer.style.opacity=".35";
  }
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

yesBtn.addEventListener("click",async()=>{
  const sent = await sendResponse("Sí ❤️");
  document.getElementById("modalText").textContent=sent
    ? "Entonces este pequeño detalle valió la pena. ❤️ Gracias por decir que sí. Ahora empieza nuestra historia. Te llegará una notificación por correo."
    : "Gracias por responder. ❤️ La página no pudo enviar la notificación; revisa la conexión a internet.";
  modal.classList.remove("hidden");
  hearts(40);
});
maybeBtn.addEventListener("click",async()=>{
  const sent = await sendResponse("Déjame pensarlo");
  document.getElementById("modalText").textContent=sent
    ? "Está bien. Solo quería que supieras lo que siento. Tómate tu tiempo. ❤️ Tu respuesta quedó registrada y te llegará una notificación por correo."
    : "Está bien. ❤️ Tu respuesta se mostró, pero no se pudo enviar la notificación; revisa la conexión a internet.";
  modal.classList.remove("hidden");
});
closeModal.addEventListener("click",()=>modal.classList.add("hidden"));
modal.addEventListener("click",(e)=>{if(e.target===modal)modal.classList.add("hidden")});
