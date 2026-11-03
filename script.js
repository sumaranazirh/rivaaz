var AL={g:"Gluten",p:"Peanuts",t:"Tree nuts",s:"Sesame"};
var CATS=[
["Street food","Made fresh to order."],
["Namkeen","Crunchy savoury snacks, kept dry and airtight so they stay crisp."],
["Bakes & sweets","Soft, fresh-baked treats and traditional sweets."]];
var M=[
{n:"Ragda Pattice",d:"Crisp potato patties topped with warm, spiced white peas and chutneys.",c:0,a:[],f:1},
{n:"Panipuri",d:"Crunchy hollow puris filled with spiced potato and chickpeas, and tangy mint water.",c:0,a:["g"],f:1},
{n:"Paav Bhaji",d:"A rich, spiced bhaji with soft pav.",c:0,a:["g"],f:1},
{n:"Paratha",d:"Layered wholewheat flatbread, served fresh to order.",c:0,a:["g"],f:1},
{n:"Indian Farsaan",d:"A mixed selection of traditional savoury snacks.",c:1,a:[]},
{n:"Tikha Sev / Bhavnagari Sev",d:"Thick, spicy gram-flour strands with a satisfying crunch.",c:1,a:[],v:["Ask about the spice mix"]},
{n:"Tikha Gathiya / Papdi Gathiya",d:"Soft-crisp gram-flour strips, peppery and lightly spiced.",c:1,a:[]},
{n:"Aloo Bhujia / Plain Bhujia",d:"Fine, crunchy strands of potato and gram flour.",c:1,a:[]},
{n:"Chana Jor Garam",d:"Flattened roasted chickpeas, seasoned with a hot, tangy spice blend.",c:1,a:[]},
{n:"Poha Chivda / Cornflakes Chivda",d:"A light, crunchy mix of flattened rice or cornflakes, tossed with nuts and spices.",c:1,a:["p","t","s"],v:["Nuts and sesame vary by batch"]},
{n:"Chakli / Murukku",d:"Crisp spiral snacks made from rice and gram flour.",c:1,a:["s"],v:["Sesame varies by batch"]},
{n:"Mathri / Namak Para",d:"Flaky, fried wheat-flour crisps with a savoury bite.",c:1,a:["g"]},
{n:"Khakhra",d:"Thin, roasted wheat crackers, light and crisp.",c:1,a:["g"]},
{n:"Eggless Cake",d:"A soft, moist cake made without eggs.",c:2,a:["g"]},
{n:"Muffin Cake",d:"Individual-sized muffin cakes, soft and light.",c:2,a:["g"]},
{n:"Cookie",d:"Crisp, golden cookies.",c:2,a:["g"]},
{n:"Donut",d:"Soft, freshly made ring donuts.",c:2,a:["g"]},
{n:"Indian Sweet",d:"A traditional Indian sweet, made by hand.",c:2,a:["g"]}
];
var hide={},pick={},cur="home";
function cnt(){return M.filter(function(m,i){return pick[i]}).length}
function bar(n){var b=document.getElementById("obar");b.hidden=!n||cur==="order";document.getElementById("ocount").textContent=n+(n===1?" dish":" dishes")+" in your order";document.body.classList.toggle("has-bar",!b.hidden)}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;")}
var openC=-1;
function setOpen(ci,sc){openC=ci;document.querySelectorAll("#menuList .cat").forEach(function(el){var o=+el.dataset.c===ci;el.classList.toggle("open",o);el.querySelector(".chead").setAttribute("aria-expanded",o)});
  if(sc&&ci>=0){var el=document.querySelector('#menuList .cat[data-c="'+ci+'"]');if(el)setTimeout(function(){el.scrollIntoView({behavior:"smooth",block:"start"})},80)}}
function toggleCat(ci){var was=openC===ci;setOpen(was?-1:ci,!was)}
function render(){
  var h="";
  CATS.forEach(function(c,ci){
    var items=M.map(function(m,i){return{m:m,i:i}}).filter(function(o){return o.m.c===ci&&!o.m.a.some(function(a){return hide[a]})});
    var sel=items.filter(function(o){return pick[o.i]}).length,b="";
    if(!items.length)b='<div class="empty">No dishes here match your filter.</div>';
    items.forEach(function(o){var m=o.m,t="";
      if(m.f)t+='<span class="tag fresh">Made fresh to order</span>';
      if(!m.a.length)t+='<span class="tag ok">No declared allergens</span>';
      m.a.forEach(function(a){t+='<span class="tag">Contains '+AL[a].toLowerCase()+'</span>'});
      (m.v||[]).forEach(function(v){t+='<span class="tag fresh">'+v+'</span>'});
      b+='<div class="item'+(pick[o.i]?' sel':'')+'"><div><h4><span class="veg" role="img" aria-label="Vegetarian"></span>'+esc(m.n)+'</h4><p>'+esc(m.d)+'</p><div class="tags">'+t+'</div></div><button class="add" type="button" data-i="'+o.i+'" aria-label="'+(pick[o.i]?'Remove ':'Add ')+m.n+' to order" aria-pressed="'+(!!pick[o.i])+'">'+(pick[o.i]?"Added":"Add to order")+'</button></div>'});
    var op=openC===ci;
    h+='<div class="cat'+(op?' open':'')+'" data-c="'+ci+'"><button class="chead im'+ci+'" type="button" aria-expanded="'+op+'" aria-label="Toggle '+c[0]+' menu section"><span class="cov"><span class="cn">'+c[0]+'</span><span class="cs">'+c[1]+'</span><span class="cm"><span class="cc">'+items.length+(items.length===1?" dish":" dishes")+(sel?" · "+sel+" added":"")+'</span><span class="chev" aria-hidden="true"></span></span></span></button><div class="cbody"><div class="cin">'+b+'</div></div></div>';
  });
  document.getElementById("menuList").innerHTML=h;
  buildMsg();
}
function buildMsg(){bar(cnt());
  var l=M.filter(function(m,i){return pick[i]}).map(function(m){return "• "+m.n});
  var t="Hello Rivaaz,\n\nI’d like to order:\n"+(l.length?l.join("\n"):"(choose dishes from the menu above)")+
    "\n\nQuantities: \nDate needed: \nCollection or delivery: \nAllergies: \nName: ";
  document.getElementById("ob").value=t;
  document.getElementById("wa").href="https://wa.me/353899548998?text="+encodeURIComponent(t);
  document.getElementById("em").href="mailto:hello.rivaazkitchen@gmail.com?subject="+encodeURIComponent("Rivaaz order enquiry")+"&body="+encodeURIComponent(t);
}
var ch="";
Object.keys(AL).forEach(function(k){ch+='<button class="chip" type="button" data-a="'+k+'" aria-pressed="false" aria-label="Filter by '+AL[k]+'">'+AL[k]+'</button>'});
document.getElementById("chips").innerHTML=ch;
document.getElementById("chips").addEventListener("click",function(e){
  var b=e.target.closest(".chip");if(!b)return;
  var k=b.dataset.a;hide[k]=!hide[k];b.setAttribute("aria-pressed",!!hide[k]);b.setAttribute("aria-label",hide[k]?"Show "+AL[k]+" dishes":"Filter by "+AL[k]);render();
});
document.getElementById("menuList").addEventListener("click",function(e){
  var ch=e.target.closest(".chead");if(ch){toggleCat(+ch.parentNode.dataset.c);return}var it=e.target.closest(".item"),b=e.target.closest(".add")||(it&&it.querySelector(".add"));if(!b)return;
  var i=b.dataset.i;pick[i]=!pick[i];render();
  var n=document.querySelector('.add[data-i="'+i+'"]');if(n)n.focus();
});
document.getElementById("copy").addEventListener("click",function(){
  var ta=document.getElementById("ob"),m=document.getElementById("msg");
  ta.select();
  function ok(){m.textContent="Copied. Paste it into your message to us."}
  function bad(){m.textContent="Select the text above and copy it."}
  try{navigator.clipboard.writeText(ta.value).then(ok,function(){document.execCommand("copy")?ok():bad()})}
  catch(x){try{document.execCommand("copy")?ok():bad()}catch(y){bad()}}
});
var NAMES={home:"Home",menu:"Menu",about:"Our story",allergens:"Allergens & safety",order:"Order"};
function table(){var K=["g","p","t","s"],h="<table><thead><tr><th>Dish</th>"+K.map(function(k){return"<th>"+AL[k]+"</th>"}).join("")+"</tr></thead><tbody>";
  M.forEach(function(m){var vv=(m.v||[]).join(" ").indexOf("vary")>-1;
    h+='<tr><th scope="row">'+esc(m.n)+"</th>"+K.map(function(k){var has=m.a.indexOf(k)>-1;return has?'<td class="y">'+(vv?"Varies":"Contains")+"</td>":"<td>–</td>"}).join("")+"</tr>"});
  document.getElementById("atab").innerHTML=h+"</tbody></table>"}
function route(o){var h=typeof o==="string"?o:(location.hash||"#home").slice(1);if(!NAMES[h])h="home";
  Object.keys(NAMES).forEach(function(p){document.getElementById("p-"+p).hidden=(p!==h)});
  document.querySelectorAll("#nav a").forEach(function(a){if(a.getAttribute("href")==="#"+h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  document.title="Rivaaz – "+NAMES[h];cur=h;bar(cnt());window.scrollTo(0,0)}
window.addEventListener("hashchange",function(){route()});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href^=\"#\"]");if(!a)return;var h=a.getAttribute("href").slice(1);if(!NAMES[h])return;e.preventDefault();try{history.replaceState(null,"","#"+h)}catch(x){try{location.hash=h}catch(y){}}route(h);if(a.dataset.open!==undefined)setOpen(+a.dataset.open,true)});
(function(){var q="main .card,main .item";
document.addEventListener("pointermove",function(e){if(e.pointerType==="touch"||!e.target.closest)return;var t=e.target.closest(q);if(!t)return;var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,st=t.style;
st.setProperty("--ry",((x-.5)*8).toFixed(2)+"deg");st.setProperty("--rx",((.5-y)*6).toFixed(2)+"deg");st.setProperty("--mx",(x*100).toFixed(0)+"%");st.setProperty("--my",(y*100).toFixed(0)+"%")});
document.addEventListener("pointerout",function(e){if(!e.target.closest)return;var t=e.target.closest(q);if(t&&!t.contains(e.relatedTarget)){["--rx","--ry"].forEach(function(p){t.style.removeProperty(p)})}})})();
document.getElementById("blogo").src=document.querySelector(".logo").src;
table();
render();route();
