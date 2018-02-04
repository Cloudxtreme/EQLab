var zamTooltip=new function(){function g(e){return document.getElementById(e)}function y(e){return document.body.currentStyle?document.body.currentStyle[e]:getComputedStyle(document.body,null)[e]}function b(){return y("position")=="static"?0:parseInt(y("marginTop"))}function w(e,t){var n=e.ownerDocument&&e.ownerDocument.defaultView&&e.ownerDocument.defaultView.getComputedStyle&&e.ownerDocument.defaultView.getComputedStyle(e,null),r=n&&n.getPropertyValue(t?"height":"width")||"";if(r&&r.indexOf(".")>-1){r=parseFloat(r)+parseInt(n.getPropertyValue(t?"padding-top":"padding-left"))+parseInt(n.getPropertyValue(t?"padding-bottom":"padding-right"))+parseInt(n.getPropertyValue(t?"border-top-width":"border-left-width"))+parseInt(n.getPropertyValue(t?"border-bottom-width":"border-right-width"))}else{r=t?e.offsetHeight:e.offsetWidth}return r}function E(e){var t=document.getElementsByTagName("body")[0],n=e.offsetLeft,r=e.offsetTop;while(e.offsetParent){n=n+e.offsetParent.offsetLeft;r=r+e.offsetParent.offsetTop;if(e==t)break;e=e.offsetParent}return{x:n,y:r}}function S(e){var t=0;var n=0;if(!e)var e=window.event;if(e.pageX||e.pageY){t=e.pageX;n=e.pageY}else if(e.clientX||e.clientY){t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop+8}return{x:t,y:n}}function x(){if(document.readyState!="complete"&&document.readyState!="loaded"){setTimeout(x,50);return}if(!g("headjs")){var e=document.createElement("div");e.id="headjs";e.style.position="absolute";e.style.left=0;e.style.right=0;e.style.top=0;e.style.zIndex=999999999;document.body.insertBefore(e,document.body.childNodes[0])}if(document.addEventListener){document.addEventListener("mouseover",zamTooltip.mouseOver,true);document.addEventListener("mousemove",zamTooltip.mouseOut,true)}else{document.attachEvent("onmouseover",zamTooltip.mouseOver);document.attachEvent("onmousemove",zamTooltip.mouseOut)}if(!o||typeof zam_tooltips=="object"){zamTooltip.preload()}}function T(e){if(e.className&&e.className.indexOf("zam-icon")>-1){return e}else if(e.parentNode.className&&e.parentNode.className.indexOf("zam-icon")>-1){return e.parentNode}var t=e.childNodes;for(var n in t){if(t[n].className&&t[n].className.indexOf("zam-icon")>-1){return t[n]}}return false}function N(t,n){if(t.nodeName!="A"||t.href.length==0&&t.rel.length==0||t.href.indexOf("#")!=-1&&t.href.replace(/#.*/,"").replace(/&h=[0-9]+/,"")==location.href.replace(/#.*/,"").replace(/&h=[0-9]+/,"")||t.rel.indexOf("nott")!=-1)return false;if(o&&!t.href.match(e)){var i=false;for(var s in r){if(!s.match(/^[0-9]+$/))continue;if(t.getAttribute("data-"+r[s])){i=true}}if(!i)return false}var u;if(!o&&t.rel.indexOf("tt:")==0&&(u=P(t.rel.replace(/^tt:/,"")))){if(typeof n!="string"){d=u;h=n}var a=T(t);if(a){v=a;m=1}else{v=0;m=0}if(n=="list")return false;else if(n=="return")return u;C(u)}else if(u=_(t.href)){if(typeof n!="string"){d=u;h=n}var a=T(t);if(a){v=a;m=1}else{v=0;m=0}if(n=="list"||n=="return"){u.target=t;return u}C(u)}else if(u=D(t)){if(typeof n!="string"){d=u;h=n}var a=T(t);if(a){v=a;m=1}else{v=0;m=0}if(n=="list"||n=="return"){u.target=t;return u}C(u)}else{return false}if(!t.zamEvents){if(t.title)t.title="";t.zamEvents=1;t.onmousemove=L;t.onmouseout=function(){d=0;O();v=0}}return true}function C(e){if(e.usingName&&p[e.site]&&p[e.site][e.lang]&&p[e.site][e.lang][e.dataType]){var t=p[e.site][e.lang][e.dataType];for(var n in t){if(t[n].name&&j(t[n].name)==j(B(e.id))){k(t[n]);return}}M(e)}else if(!e.usingName&&p[e.site]&&p[e.site][e.lang]&&p[e.site][e.lang][e.dataType]&&p[e.site][e.lang][e.dataType][e.id]&&(e.dataType!="forums"||!e.reply&&p[e.site][e.lang][e.dataType][e.id][1]||p[e.site][e.lang][e.dataType][e.id][e.reply])){k(e)}else{M(e)}}function k(e){var t;if(e.dataType=="forums"){var n=e.reply?e.reply:1;t=p[e.site][e.lang][e.dataType][e.id][n]}else{t=p[e.site][e.lang][e.dataType][e.id]}if(d.usingName){if(d.site==t.site&&d.lang==t.lang&&d.dataType==t.dataType&&j(d.id)==j(t.name)&&t.html.substring(0,11)!="Unavailable"){zamTooltip.renderTooltip(t.html)}}else if(d.site==t.site&&d.lang==t.lang&&d.dataType==t.dataType&&d.id==t.id&&(d.dataType!="forums"||!d.reply&&!t.reply||d.reply&&t.reply&&d.reply==t.reply)&&t.html.substring(0,11)!="Unavailable"){zamTooltip.renderTooltip(t.html)}}function L(e){if(typeof e=="undefined")e=h;var t=g("headtt");if(t){if(v){var n=E(v);t.style.top=n.y-w(t,1)+"px";t.style.left=n.x+v.offsetWidth+"px";t.style.right="auto";var r=A(e,t);if(r.x||r.y){if(r.y){t.style.top=n.y+v.offsetHeight+"px"}if(r.x){t.style.left="auto";t.style.right=F().r-n.x+"px";if(!r.y)t.style.top=n.y-w(t,1)+"px"}}t.style.display="block"}else{var i=S(e);if(b()){i.y+=b()}var s=w(t,1);if(!s){t.style.display="block";s=w(t,1)}t.style.top=i.y-s-l.y+"px";t.style.left=i.x+l.x+"px";t.style.right="auto";var r=A(e,t);if(r.x||r.y){if(r.y){t.style.top=i.y+l.y+17+"px"}if(r.x){t.style.left="auto";t.style.right=r.x+l.x+"px"}}t.style.display="block"}}}function A(e,t){var n=0,r=0;var i=F();if(v){var s=E(v);if(s.y-w(t,1)<i.t)r=1;if(s.x+v.offsetWidth+w(t)+1>i.r)n=1;return{x:n,y:r}}var o=S(e);if(o.y-w(t,1)-6<i.t)r=1;if(o.x+w(t)+7>i.r)n=i.r-o.x;return{x:n,y:r}}function O(){var e=g("headtt");if(e)e.parentNode.removeChild(e)}function M(e,t){if(!e.id)return;if(e.dataType=="forums"||i[e.site]&&i[e.site]["get"]&&i[e.site]["get"][e.dataType]){var n=document.createElement("script");n.type="text/javascript";if(e.dataType=="forums"){var r=e.reply?e.id+":"+e.reply:e.id;n.src=t?e.host+i.general.get.forum.group+r:e.host+i.general.get.forum.single+r}else{n.src=t?e.host+i[e.site]["get"][e.dataType]["group"].replace(/LANGREP/,e.lang)+e.id:e.host+i[e.site]["get"][e.dataType]["single"].replace(/LANGREP/,e.lang)+e.id}if(document.head){document.head.appendChild(n)}else{document.body.appendChild(n)}}}function _(e){if(u){var r=e.match(/#m(sg)?(\d+)/);var s=0;if(!r||r[2]==0){r=e.match(/(mid)\=(\d+)/);var o=e.match(/#(\d+)$/);if(o){s=o[1]}}if(r&&r[2]){var f=e.match(/^(http:\/\/([^\/\.]+)\.([^\/]+\.)?(allakha)?zam\.com)\//);if(f){var l={host:f[1],site:f[2],lang:"en",dataType:"forums",id:r[2]};if(s){l.reply=s}else{var c=e.match(/&p=([0-9]+)/);if(c&&c[1]!=1){l.reply=(c[1]-1)*a+2}}return l}}}e=e.replace(/#.*/,"");var h;for(var p in n){if(!p.match(/^[0-9]+$/))continue;if(!i[n[p]])continue;h=e.match(i[n[p]].normal);var d=true;if(!h&&i[n[p]].extra){h=e.match(i[n[p]].extra);d=false}if(h){if(h[3]=="db"||h[3]=="itemraw")h[3]="en";if(e.indexOf("source=lucy")>-1)h[4]="lucy";var l={host:t.siteToHost[h[2]],site:h[2],lang:h[3],dataType:h[4],id:h[5]};if(d&&!H(l)){l.id=B(l.id);l.usingName=1}return l}}h=e.match(i.general.wiki);if(!h)h=e.match(i.general.wikiEdit);if(h){var v=h[6].replace(" ","_").toLowerCase().split("_");if(v&&v[0]&&v[1]&&t.wikiToDb[v[0]]&&t.wikiToDb[v[0]][v[1]]){var l={host:h[1],site:h[2],lang:"en",dataType:t.wikiToDb[v[0]][v[1]],id:B(h[7].replace(/_/g," ")),usingName:1};return l}}return false}function D(e){var n,i;for(var o in r){if(!o.match(/^[0-9]+$/))continue;if(n=e.getAttribute("data-"+r[o])){var u=t.gameToSite[r[o]]?t.gameToSite[r[o]]:r[o];if(i=n.match(s[u])){if(u=="lucy"&&i[1]=="item")i[1]="id";var a="en";var f={game:r[o],data:n,host:t.siteToHost[u],site:u,lang:a,dataType:i[1],id:i[2]};var l=true;if(f.site=="rift"&&f.dataType=="stc")l=false;if(l&&!H(f)){f.id=B(f.id);f.usingName=1}return f}}}return false}function P(e){var t=e.split("&");var n={};for(var r in t){if(typeof t[r]!="string")continue;var i=t[r].split("=");if(i[0]&&i[1]){n[i[0]]=i[1]}}if(n&&n.id&&n.type){n.dataType=n.type;if(!n.lang)n.lang="en";if(!n.site)n.site=window.location.href.replace(/https?:\/\/([^\/\.]+)\..*/,"$1");return n}return false}function H(e){if(i[e.site].idCheckResult==true&&e.id.match(i[e.site].idCheck)||i[e.site].idCheckResult==false&&!e.id.match(i[e.site].idCheck)){return true}else{return false}}function B(e){return e.replace(/%20/g," ").replace(/\+/g," ").replace(/%27/g,"'").replace(/%2C/g,",").replace(/^ +/,"").replace(/ +$/,"")}function j(e){return e.toLowerCase().replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function F(){var e=document.body.scrollLeft;var t=document.body.scrollTop;if(e==0){if(window.pageYOffset){e=window.pageXOffset}else{e=document.body.parentElement?document.body.parentElement.scrollLeft:0}}if(t==0){if(window.pageYOffset){t=window.pageYOffset}else{t=document.body.parentElement?document.body.parentElement.scrollTop:0}}var n=window.innerHeight?window.innerHeight:document.body.clientHeight;var r=window.innerWidth?window.innerWidth:document.body.clientWidth;return{l:e,t:t,r:e+r,b:t+n}}var e=/^https?:\/\/.*\.(zam|allakhazam)\.com\//;var t={gameToSite:{eq:"everquest"},siteToHost:{everquest:"http://everquest.allakhazam.com",eq2:"http://eq2.zam.com",ffxi:"http://ffxi.allakhazam.com",ffxiv:"http://ffxiv.zam.com",lotro:"http://lotro.allakhazam.com",lucy:"http://everquest.allakhazam.com",rift:"http://rift.zam.com",war:"http://war.allakhazam.com"},wikiToDb:{eq2:{item:"item"},ffxi:{item:"item"},ffxiv:{ability:"ability",item:"item",guildleve:"guildleve",local:"localleve"},rift:{ability:"ability",achievement:"achievement",item:"item",quest:"quest",mob:"npc",recipe:"recipe",collection:"collection"},war:{item:"item"}}};var n=["everquest","eq2","ffxi","ffxiv","lotro","lucy","rift","war"];var r=["eq","eq2","ffxi","ffxiv","lotro","lucy","rift","war"];var i={general:{wiki:/^(http:\/\/([^\/\.]+)\.([^\/]+\.)?(allakha)?zam\.com)\/(wiki)\/([^\:]+)\:([^\/\?]+)/,wikiEdit:/^(http:\/\/([^\/\.]+)\.([^\/]+\.)?(allakha)?zam\.com)\/(wiki)\.html\?e=([^\:]+)\:([^\/\?]+)/,get:{forum:{single:"/fcluster/msgmo.pl?id=",group:"/fcluster/msgmo.pl?ids="},wiki:{single:"/fcluster/msgmo.pl?id=",group:"/fcluster/msgmo.pl?ids="}}},everquest:{normal:/^(http:\/\/(everquest)\.[^\/]+)\/(db)\/[^\/\.]+\.html\?.*(item)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{item:{single:"/cluster/ihtml.pl?zamtt=1&item=",group:"/cluster/ihtml.pl?zamtt=1&items="},lucy:{single:"/cluster/ihtml.pl?zamtt=1&source=lucy&item=",group:"/cluster/ihtml.pl?zamtt=1&source=lucy&items="}}},eq2:{normal:/^(http:\/\/(eq2)\.[^\/]+)\/(db)\/[^\/\.]+\.html\?.*eq2(item)=([^&;]+)/,idCheck:/^[0-9a-f]{32,32}$/,idCheckResult:true,get:{item:{single:"/db/tooltip.html?item=",group:"/db/tooltip.html?items="}}},ffxi:{normal:/^(http:\/\/(ffxi)\.[^\/]+)\/(db)\/[^\/\.]+\.html\?.*f(item)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{item:{single:"/cluster/fitem.pl?zamtt=1&id=",group:"/cluster/fitem.pl?zamtt=1&ids="}}},ffxiv:{normal:/^(http:\/\/(ffxiv)\.[^\/]+)\/(db|en|de|fr|ja)\/[^\/\.]+\.html\?.*ffxiv(item|guildleve|localleve|ability)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{item:{single:"/LANGREP/tooltip.html?item=",group:"/LANGREP/tooltip.html?items="},guildleve:{single:"/LANGREP/tooltip.html?guildleve=",group:"/LANGREP/tooltip.html?guildleves="},localleve:{single:"/LANGREP/tooltip.html?localleve=",group:"/LANGREP/tooltip.html?localleves="},ability:{single:"/LANGREP/tooltip.html?ability=",group:"/LANGREP/tooltip.html?abilities="}}},lotro:{normal:/^(http:\/\/(lotro)\.[^\/]+)\/(db)\/[^\/\.]+\.html\?.*lotr(item)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{item:{single:"/cluster/ihtml.pl?zamtt=1&item=",group:"/cluster/ihtml.pl?zamtt=1&items="}}},lucy:{normal:/^(http:\/\/(lucy)\.[^\/]+)\/(itemraw)\.html\?.*(id)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{id:{single:"/cluster/ihtml.pl?zamtt=1&for=lucy&item=",group:"/cluster/ihtml.pl?zamtt=1&for=lucy&items="}}},rift:{normal:/^(http:\/\/(rift)\.[^\/]+)\/(db|en)\/(item|ability|achievement|collection|npc|quest|recipe)\/([^\/]+)/,idCheck:/[^0-9A-F-]/,idCheckResult:false,extra:/^(http:\/\/(rift)\.[^\/]+)\/(db|en)\/(stc).html\?riftstc=([A-Za-z0-9\._-]+)/,get:{item:{single:"/LANGREP/tooltip.html?item=",group:"/LANGREP/tooltip.html?items="},ability:{single:"/LANGREP/tooltip.html?ability=",group:"/LANGREP/tooltip.html?abilities="},achievement:{single:"/LANGREP/tooltip.html?achievement=",group:"/LANGREP/tooltip.html?achievements="},collection:{single:"/LANGREP/tooltip.html?collection=",group:"/LANGREP/tooltip.html?collections="},npc:{single:"/LANGREP/tooltip.html?npc=",group:"/LANGREP/tooltip.html?npcs="},quest:{single:"/LANGREP/tooltip.html?quest=",group:"/LANGREP/tooltip.html?quests="},recipe:{single:"/LANGREP/tooltip.html?recipe=",group:"/LANGREP/tooltip.html?recipes="},stc:{single:"/LANGREP/tooltip.html?stc=",group:"/LANGREP/tooltip.html?stcs="}}},war:{normal:/^(http:\/\/(war)\.[^\/]+)\/(db)\/[^\/\.]+\.html\?.*war(item|quest)=([^&;]+)/,idCheck:/[^0-9]/,idCheckResult:false,get:{item:{single:"/cluster/iover.pl?zamtt=1&id=",group:"/cluster/iover.pl?zamtt=1&ids="},quest:{single:"/cluster/qover.pl?zamtt=1&id=",group:"/cluster/qover.pl?zamtt=1&ids="}}}};var s={everquest:/^(item)=(.*)/,eq2:/^(item)=(.*)/,ffxi:/^(item)=(.*)/,ffxiv:/^(item|guildleve|localleve|ability)=(.*)/,lotro:/^(item)=(.*)/,lucy:/^(item)=(.*)/,rift:/^(item|ability|achievement|collection|npc|quest|recipe|stc)=(.*)/,war:/^(item|quest)=(.*)/};var o=typeof ZAM=="undefined"?1:0;var u=0;var a=50;(function(){if(!o){var e="";var t="msgMo=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)==0)e=i.substring(t.length,i.length)}if(e!="false"){u=1;a=50}}})();var f=o?"//zam.zamimg.com":ZAM.staticUrl();(function(){if(!o){var e=(window.location+"").replace(/http:\/\/([^\/]+)\/?.*/,"$1").split(".");if(e.length==4){for(var n in t.siteToHost){t.siteToHost[n]=t.siteToHost[n].replace(/(http:\/\/[^\.]+\.)/,"$1"+e[1]+".")}}}})();var l={x:6,y:6};var c=0;(function(){var e=navigator.userAgent.toLowerCase().match(/msie ([0-9]+)/);if(e){c=e[1];if(c<9){l={x:12,y:12}}}})();var h="";var p={};var d=0;var v=0;var m=0;this.init=function(){if(!document.body){setTimeout(zamTooltip.init,20);return}if(c&&c<8){if(document.readyState!="complete"&&document.readyState!="loaded"){setTimeout(zamTooltip.init,20);return}}var e=document.createElement("link");e.rel="stylesheet";e.type="text/css";e.href=f+"/c/tooltips.css?5";if(document.head){document.head.appendChild(e)}else{document.body.appendChild(e)}x()};this.preload=function(){var e=!o&&g("col-main")?g("col-main"):document.body;e=e.getElementsByTagName("a");var t={};for(var n in e){var r=N(e[n],"list");if(r){if(!t[r.site])t[r.site]={};if(!t[r.site][r.lang])t[r.site][r.lang]={};if(!t[r.site][r.lang][r.dataType])t[r.site][r.lang][r.dataType]={};if(r.dataType=="forums"){if(!t[r.site][r.lang][r.dataType][r.id])t[r.site][r.lang][r.dataType][r.id]={};if(r.reply){t[r.site][r.lang][r.dataType][r.id][r.reply]={id:r.id,reply:r.reply,host:r.host}}else{t[r.site][r.lang][r.dataType][r.id][1]={id:r.id,host:r.host}}}else{t[r.site][r.lang][r.dataType][r.id]={id:r.id,host:r.host}}}}var i;var s=[];for(var u in t){for(var a in t[u]){for(var f in t[u][a]){if(f=="forums")continue;s=[];for(var n in t[u][a][f]){if(t[u][a][f][n].id){s.push(t[u][a][f][n].id);i=t[u][a][f][n]["host"]}else if(f=="forums"){for(var l in t[u][a][f][n]){if(typeof t[u][a][f][n][l]!="object")continue;i=t[u][a][f][n][l]["host"];if(t[u][a][f][n][l].reply){s.push({id:n,reply:t[u][a][f][n][l].reply})}else{s.push({id:n})}}}}var c={host:i,site:u,lang:a,dataType:f};if(f=="forums"){var h="";for(var n in s){if(typeof s[n]!="object")continue;if(s[n].reply){h+=s[n].id+":"+s[n].reply+","}else{h+=s[n].id+","}}c.id=h.replace(/,$/,"")}else{c.id=s.join(",")}M(c,1)}}}};this.modifyLinks=function(e,t,n){if(typeof zam_tooltips!="object")return;var r=zam_tooltips;if(r.colorlinks||r.iconizelinks||r.renamelinks||r.renamespecifiedlinks){var i=0;var s=!o&&g("col-main")?g("col-main"):document.body;s=s.getElementsByTagName("a");for(var u=0;u<s.length;u++){if(i>200||typeof s[u]!="object")continue;if(!s[u])continue;var a=N(s[u],"return");if(a&&a.target.getAttribute("data-zam-modified")!="yes"&&a.site==e&&a.lang==t&&a.dataType==n){a.target.setAttribute("data-zam-modified","yes");var f=false;if(a.usingName){if(p[a.site]&&p[a.site][a.lang]&&p[a.site][a.lang][a.dataType]){var l=p[a.site][a.lang][a.dataType];for(var c in l){if(l[c].name&&j(l[c].name)==j(B(a.id))){f=l[c]}}}}else if(p[a.site]&&p[a.site][a.lang]&&p[a.site][a.lang][a.dataType]){f=p[a.site][a.lang][a.dataType][a.id]}if(f){if(n=="forums"){if(!r.renameforumlinks)continue;if(a.reply){if(f[a.reply])f=f[a.reply]}else if(f[1]){f=f[1]}if(!f)continue}i++;if((r.renamelinks||r.renamespecifiedlinks&&a.target.getAttribute("data-zamrename")=="yes")&&f.name&&a.target.innerHTML){a.target.innerHTML=f.name}if(r.colorlinks&&f.linkColor){a.target.className+=" "+f.linkColor}if(r.iconizelinks&&f.icon){var h;if(f.icon.indexOf("<a")>-1){var d=document.createElement("div");d.innerHTML=f.icon;d=d.childNodes[0];var v=d.getElementsByTagName("a")[0];v.href=a.target.href;if(h=D(a.target)){d.setAttribute("data-"+h.game,h.data)}v.setAttribute("data-zam-modified","yes");a.target.parentNode.insertBefore(d,a.target)}else{var d=document.createElement("a");d.href=a.target.href;if(h=D(a.target)){d.setAttribute("data-"+h.game,h.data)}d.setAttribute("data-zam-modified","yes");d.innerHTML=f.icon;a.target.parentNode.insertBefore(d,a.target)}}}}}}};this.mouseOver=function(e){var t=e.target?e.target:e.srcElement;var n=0;while(t!=null&&n<5&&!N(t,e)){t=t.parentNode;++n}};this.mouseOut=function(e){h=e};this.store=function(e){if(!e.lang)e.lang="en";if(!p[e.site])p[e.site]={};if(!p[e.site][e.lang])p[e.site][e.lang]={};if(!p[e.site][e.lang][e.dataType])p[e.site][e.lang][e.dataType]={};if(e.dataType=="forums"){if(!p[e.site][e.lang][e.dataType][e.id])p[e.site][e.lang][e.dataType][e.id]={};if(e.reply){p[e.site][e.lang][e.dataType][e.id][e.reply]=e}else{p[e.site][e.lang][e.dataType][e.id][1]=e}}else{p[e.site][e.lang][e.dataType][e.id]=e}k(e)};this.renderTooltip=function(e){var t=m?' class="hide-icon"':"";g("headjs").innerHTML='<div id="headtt"'+t+' style="display:none;position:absolute;z-index:99999999999">'+e+"</div>";L()}};zamTooltip.init()