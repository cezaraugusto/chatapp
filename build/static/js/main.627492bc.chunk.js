(this.webpackJsonpchatapp=this.webpackJsonpchatapp||[]).push([[0],{182:function(e,t,n){"use strict";n.r(t);var s=n(3),a=n(0),c=n.n(a),r=n(72),i=n.n(r),o=(n(83),n(8)),l=n(48),u=n(6),d=(n(84),n(37));n(85),n(87);d.a.initializeApp({apiKey:"AIzaSyAzb00TjeYTc6k8YSRYPbQ4RVz-g8SVOro",authDomain:"tribe-cezar.firebaseapp.com",projectId:"tribe-cezar",storageBucket:"tribe-cezar.appspot.com",messagingSenderId:"11813997156",appId:"1:11813997156:web:68ce9a8db7f40f67ab6d71",measurementId:"G-341K7GCW4R"});var j=d.a.auth,b=d.a.database(),h=n(18);function m(e){var t=e.content,n=e.timestamp,s=e.uid,a=e.anonymousUsername;b.ref("chats").push({content:t,timestamp:n,uid:s,anonymousUsername:a})}var O=n(21),f=n.n(O),v=n(31),p=function(){var e=Object(v.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j().currentUser){e.next=9;break}return e.prev=1,e.next=4,j().signInAnonymously();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.error({error:e.t0});case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(){return e.apply(this,arguments)}}();function x(){var e;null===(e=j().currentUser)||void 0===e||e.delete()}var g=function(e){var t=e.setAnonymousUsername,n=Object(a.useState)(""),c=Object(o.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)(!0),u=Object(o.a)(l,2),d=u[0],j=u[1];return d?Object(s.jsxs)("form",{className:"first-screen nes-field",onSubmit:function(){t(r),j(!1)},children:[Object(s.jsxs)("h1",{className:"section-title",children:["Hello!",Object(s.jsx)("br",{}),"Welcome to the chat app"]}),Object(s.jsx)("input",{type:"text",name:"namefield",placeholder:"Your name",className:"nes-input",onChange:function(e){i(e.target.value)},value:r}),Object(s.jsx)("input",{type:"submit",className:"nes-btn is-primary",disabled:""===r,value:"Go chat!"})]}):null};var N=function(e){var t=e.anonymousUsername,n=e.chatArea,c=j().currentUser,r=Object(a.useState)(c),i=Object(o.a)(r,1)[0],l=Object(a.useState)(""),u=Object(o.a)(l,2),d=u[0],b=u[1],h=Object(a.useState)(null),O=Object(o.a)(h,2),p=O[0],x=O[1],g=function(e){if(e){b("");var t=e.scrollHeight;null===e||void 0===e||e.scrollBy(0,t)}},N=function(e){var t=null===e||void 0===e?void 0:e.message;t&&x(t)};Object(a.useEffect)((function(){var e={anonymousUsername:t,content:"".concat(t," just joined."),timestamp:Date.now(),uid:"".concat(null===i||void 0===i?void 0:i.uid,"-").concat(t)||""};try{m(e),g(null===n||void 0===n?void 0:n.current)}catch(s){N(s)}}),[n,null===i||void 0===i?void 0:i.uid,t]);var y=function(){var e=Object(v.a)(f.a.mark((function e(s){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),x(null),a={anonymousUsername:t,content:d,timestamp:Date.now(),uid:"".concat(null===i||void 0===i?void 0:i.uid,"-").concat(t)||""};try{m(a),g(null===n||void 0===n?void 0:n.current)}catch(c){N(c)}case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(s.jsxs)("form",{className:"twoCol",onSubmit:y,children:[p?Object(s.jsx)("p",{className:"is-error",children:p}):null,Object(s.jsx)("textarea",{placeholder:"What are you thinking?",className:"nes-textarea",onChange:function(e){b(e.target.value)},value:d}),Object(s.jsx)("input",{className:"nes-btn is-primary",type:"submit",value:"Send!"})]})};var y=function(e){var t=e.user,n=e.chat,a=new Date(n.timestamp),c="".concat(null===t||void 0===t?void 0:t.uid,"-").concat(n.anonymousUsername);return Object(s.jsxs)("article",{className:"nes-container with-title",style:{borderColor:c===n.uid?"#f7d51d":"inherit"},children:[Object(s.jsxs)("header",{className:"title",children:[n.anonymousUsername,Object(s.jsxs)("time",{dateTime:a.toDateString(),children:["(",function(){var e={date:a.toLocaleDateString(),hour:a.getHours(),minute:a.getMinutes()};return"".concat(e.hour,":").concat(e.minute)}(),")"]})]}),n.content]},n.timestamp)};var w=function(){var e=Object(a.useRef)(null);return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("button",{type:"button",className:"nes-btn is-primary",onClick:function(){var t;null===(t=e.current)||void 0===t||t.showModal()},children:"How it works?"}),Object(s.jsx)("dialog",{className:"nes-dialog",ref:e,children:Object(s.jsxs)("form",{method:"dialog",children:[Object(s.jsx)("h3",{className:"section-title",children:"How it works?"}),Object(s.jsx)("div",{className:"lists",children:Object(s.jsxs)("ul",{className:"nes-list is-disc",children:[Object(s.jsx)("li",{children:"When a user opens the web app, they should enter their name and then join."}),Object(s.jsx)("li",{children:"When a user joins, they are going to be visible to other users."}),Object(s.jsxs)("li",{children:[Object(s.jsx)("pre",{}),"When a user is close enough to other users/they can write messages that will be visible to them based on their distance, so the closer, the more relevant the messages will be."]})]})}),Object(s.jsx)("menu",{className:"dialog-menu",children:Object(s.jsx)("button",{className:"nes-btn is-primary",children:"Gotcha!"})})]})})]})};var S=function(e){var t=e.user,n=e.chats,c=e.anonymousUsername,r=Object(a.useRef)(null);return Object(s.jsxs)("section",{className:"sidebar",children:[Object(s.jsxs)("section",{className:"nes-container",children:[Object(s.jsxs)("p",{children:[Object(s.jsx)("b",{children:"Welcome,"})," ",c]}),Object(s.jsxs)("div",{className:"mid-center",children:[Object(s.jsx)(w,{}),Object(s.jsx)("button",{className:"nes-btn is-error",onClick:function(){x()},children:"Log me out!"})]})]}),Object(s.jsx)("div",{className:"mid-center",children:Object(s.jsxs)("h3",{className:"topic-title",children:["Your workspace\xa0",Object(s.jsx)("i",{className:"nes-icon is-small heart"}),Object(s.jsx)("i",{className:"nes-icon is-small heart"}),Object(s.jsx)("i",{className:"nes-icon is-small heart"}),Object(s.jsx)("i",{className:"nes-icon is-small heart"}),Object(s.jsx)("i",{className:"nes-icon is-small heart"})]})}),Object(s.jsx)("div",{ref:r,className:"chatList",children:n.map((function(e){return Object(s.jsx)(y,{user:t,chat:e},e.timestamp)}))}),Object(s.jsx)(N,{chatArea:r,anonymousUsername:c})]})},k=n(73),U=n(38),C=n(75),A=n.n(C),E=(n(179),n(76));function z(e){var t,n,c=e.id,r=e.content,i=e.data,l=Object(a.useState)(!1),u=Object(o.a)(l,2),d=u[0],j=u[1],b=Object(a.useRef)(null),h=null===(t=b.current)||void 0===t||null===(n=t.parentNode)||void 0===n?void 0:n.parentNode;return Object(s.jsx)(E.a,{as:"div","data-tile":!0,trackVisibility:!0,delay:100,root:h,onChange:function(){j(!d)},children:Object(s.jsxs)("div",{id:c,ref:b,className:"message-list chat-user",children:[Object(s.jsx)("section",{className:"message -left",children:i.isCurrentNode||d?Object(s.jsx)("div",{className:"nes-balloon from-left",children:Object(s.jsx)("p",{children:i.lastMessage})}):null}),Object(s.jsxs)("div",{className:"user-info",children:[Object(s.jsx)("i",{className:"nes-ash"}),Object(s.jsx)("div",{className:"nes-badge",children:Object(s.jsx)("span",{className:i.isCurrentNode?"is-warning":"is-success",children:i.isCurrentNode?"".concat(r," (you!)"):r})})]})]})})}var D=function(e){var t=e.id,n=e.chats,c=Object(a.useState)([]),r=Object(o.a)(c,2),i=r[0],l=r[1],u=Object(U.a)({nodes:i,links:[]}),d=Object(U.c)(u),j=Object(o.a)(d,2),m=j[0],O=j[1],f=O.addNode,v=O.onChange;Object(a.useEffect)((function(){var e,t=(e=function(e){l(e)},void b.ref("unauthenticatedUsers").on("value",(function(t){if(t&&t.val()){for(var n=[],s=0,a=Object.values(t.val());s<a.length;s++){var c=a[s];n.push(c)}e(n)}})));return function(){return t}}),[]),Object(a.useEffect)((function(){if(i){var e,t=Object(k.a)(i);try{for(t.s();!(e=t.n()).done;){var n=e.value;f(n)}}catch(s){t.e(s)}finally{t.f()}}}),[f,i]);var p=function(e){var t=n.filter((function(t){return t.uid===e}));return t.length>=1&&t[t.length-1]?t[t.length-1].content:"Hello!"};return Object(s.jsx)(U.b,{schema:{links:[],nodes:A()(0===m.nodes.length?null:m.nodes.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{render:z,data:{lastMessage:p(e.id),isCurrentNode:e.id===t},disableDrag:e.id!==t})})),"id")},onChange:function(e){v(e),l(e.nodes)}})};function H(e,t){var n=Math.random()*(t-e)+e;return Math.floor(n)}var I=function(){var e=j().currentUser,t=Object(a.useState)(e),n=Object(o.a)(t,1)[0],c=Object(a.useState)(""),r=Object(o.a)(c,2),i=r[0],l=r[1],u=Object(a.useState)([]),d=Object(o.a)(u,2),m=d[0],O=d[1];Object(a.useEffect)((function(){var e;e=function(e){return O(e)},b.ref("chats").on("value",(function(t){if(t&&t.val()){for(var n=[],s=0,a=Object.values(t.val());s<a.length;s++){var c=a[s];n.push(c)}var r=n.sort((function(e,t){return e.timestamp-t.timestamp}));e(r)}})),n&&i&&function(e){var t=e.username,n=e.uid,s=e.coordinates;b.ref("unauthenticatedUsers").push({id:"".concat(n,"-").concat(t),content:t,coordinates:s,inputs:[{id:"".concat(t,"-input"),alignment:"left"}],outputs:[{id:"".concat(t,"-output"),alignment:"right"}]})}({username:i,uid:null===n||void 0===n?void 0:n.uid,coordinates:[H(150,700),H(150,700)]})}),[n,i]);var f=function(){x()};if(Object(a.useEffect)((function(){return window.addEventListener("beforeunload",f),function(){window.removeEventListener("beforeunload",f)}}),[]),!n)return null;var v="".concat(null===n||void 0===n?void 0:n.uid,"-").concat(i),p={user:n,setAnonymousUsername:l},N={id:v,chats:m},y={user:n,chats:m,anonymousUsername:i};return""===i?Object(s.jsx)(g,Object(h.a)({},p)):Object(s.jsxs)("main",{children:[Object(s.jsx)(D,Object(h.a)({},N)),Object(s.jsx)(S,Object(h.a)({},y))]})};var M=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){j().onAuthStateChanged((function(e){e?c(!0):(p(),c(!1))}))}),[]),n?Object(s.jsxs)(l.a,{children:[Object(s.jsxs)("nav",{children:[Object(s.jsx)(l.b,{to:"/",children:"Home"}),Object(s.jsx)("a",{href:"https://github.com/cezaraugusto",rel:"noreferrer noopener",target:"_blank",children:Object(s.jsx)("span",{className:"nes-text is-success",children:"Ask developer!"})})]}),Object(s.jsx)(u.c,{children:Object(s.jsx)(u.a,{path:"/",children:Object(s.jsx)(I,{})})})]}):Object(s.jsxs)("div",{className:"loading",role:"status",children:[Object(s.jsx)("progress",{className:"nes-progress is-pattern",value:"70",max:"100"}),Object(s.jsx)("h3",{className:"topic-title",children:"Loading chat..."})]})};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(M,{})}),document.getElementById("root"))},83:function(e,t,n){},84:function(e,t,n){}},[[182,1,2]]]);
//# sourceMappingURL=main.627492bc.chunk.js.map