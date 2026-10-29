// Microsoft sign-in uses MSAL's OAuth/OIDC flow. It identifies the signed-in Microsoft account;
// it does NOT sign into Xbox Live/Minecraft or create a Minecraft server.
const MS_CLIENT_ID = "PASTE_YOUR_MICROSOFT_APP_CLIENT_ID_HERE";
const REDIRECT_URI = window.location.origin + window.location.pathname;
let msalApp = null;
const loginBtn = document.querySelector("#login");
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
if (MS_CLIENT_ID !== "PASTE_YOUR_MICROSOFT_APP_CLIENT_ID_HERE" && window.msal) {
  msalApp = new msal.PublicClientApplication({auth:{clientId:MS_CLIENT_ID,authority:"https://login.microsoftonline.com/consumers",redirectUri:REDIRECT_URI},cache:{cacheLocation:"sessionStorage"}});
  msalApp.initialize().then(async()=>{try{const r=await msalApp.handleRedirectPromise();const a=r?.account||msalApp.getAllAccounts()[0];if(a){loginBtn.textContent="Signed in: "+(a.name||a.username);}}catch(e){console.error(e);alert("Microsoft sign-in did not complete. Check your app registration and redirect URL.");}});
} else {loginBtn.title="Set up a Microsoft app registration and paste its client ID in app.js first";}
loginBtn.addEventListener("click",async()=>{
 if(!msalApp){alert("Microsoft sign-in setup is not finished yet. Follow README.md and paste your app client ID into app.js.");return;}
 try{await msalApp.loginRedirect({scopes:["openid","profile","email"]});}catch(e){console.error(e);alert("Sign-in could not start. Check the Microsoft app registration.");}
});
const starter=[
{name:"Example Community Server",ip:"play.example.net",port:19132,desc:"Demo listing — replace with a real server address.",demo:true},
];
function getList(k,fallback=[]){try{return JSON.parse(localStorage.getItem(k)||"null")||fallback}catch{return fallback}}
function saveList(k,v){localStorage.setItem(k,JSON.stringify(v))}
function renderServers(){
 const all=[...starter,...getList("blockhubServers")];
 document.querySelector("#servers").innerHTML=all.map((s,i)=>`<div class="server"><strong>${escapeHtml(s.name)}</strong><div class="addr">${escapeHtml(s.ip)}:${escapeHtml(s.port)}</div><p>${escapeHtml(s.desc||"Bedrock server listing")}${s.demo?" (demo)":""}</p><button type="button" data-copy="${escapeHtml(s.ip)}" data-port="${escapeHtml(s.port)}">Copy address</button></div>`).join("");
 document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.dataset.copy+":"+b.dataset.port);b.textContent="Copied!";}catch{alert("Server address: "+b.dataset.copy+"  Port: "+b.dataset.port)}});
}
function addListing(form,kind){
 form.addEventListener("submit",e=>{e.preventDefault();const world=kind==="world";const item={name:document.querySelector(world?"#worldName":"#serverName").value.trim(),ip:document.querySelector(world?"#worldIp":"#serverIp").value.trim(),port:Number(document.querySelector(world?"#worldPort":"#serverPort").value),desc:document.querySelector(world?"#worldDesc":"#serverDesc").value.trim()};if(!item.name||!item.ip||!Number.isInteger(item.port)||item.port<1||item.port>65535)return alert("Check the name, address and port.");const key=world?"blockhubWorlds":"blockhubServers";saveList(key,[item,...getList(key)]);form.reset();if(world){document.querySelector("#worldPort").value=19132;renderWorlds()}else{document.querySelector("#serverPort").value=19132;renderServers()}});
}
function renderWorlds(){const el=document.querySelector("#myWorlds"),list=getList("blockhubWorlds");el.innerHTML=list.length?`<h3>Your listings</h3>`+list.map(w=>`<div class="server"><strong>${escapeHtml(w.name)}</strong><div class="addr">${escapeHtml(w.ip)}:${escapeHtml(w.port)}</div><p>${escapeHtml(w.desc)}</p></div>`).join(""):`<p class="small">No world listings yet.</p>`}
addListing(document.querySelector("#serverForm"),"server");addListing(document.querySelector("#worldForm"),"world");renderServers();renderWorlds();