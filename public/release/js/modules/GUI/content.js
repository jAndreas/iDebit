define(["guitools","deferred","mediator","server","tools"],function(e,t,n,r,i){function l(){console.log("content.js init"),a=e.cacheNodes(o.className("content")[0]),a["BUTTON.login"].addEventListener("click",d,!1),a["DIV.app"].addEventListener("click",v,!1)}function c(){}function h(e){confirm(e.sender+" will "+e.amount+" flocken von Dir haben..")&&r.emit("requestconfirmed",{})}function p(e){function t(e){var t='<span class="name">%r</span><span class="status">%r</span><button data-target="%r" class="getmoney">Schulden eintreiben</button>'.sFormat(e,"0",e),n=document.createElement("div");n.className="infoLine",n.innerHTML=t,a["DIV.app"].appendChild(n)}if(e)switch(e.status){case"success":f=e.name,u(e.people)==="Array"&&e.people.forEach(t),a["DIV.login"].className=a["DIV.login"].className+" hidden",a["DIV.app"].className=a["DIV.app"].className+" visible";break;case"fail":alert("login failed")}}function d(e){r.emit("login",{name:a["INPUT.username"].value,password:a["INPUT.password"].value},p)}function v(e){function n(e){}if(e.target.nodeName==="BUTTON"){var t=prompt("Wieviel soll's denn sein ?",0);r.emit("getmoney",{from:e.target.getAttribute("data-target"),sender:f,amount:t},n)}}var s=Object.create(null),o=e.By,u=i.type,a,f="villain";return i.mixin(s).with({init:l,destroy:c}),r.on("moneyrequested",h),s})