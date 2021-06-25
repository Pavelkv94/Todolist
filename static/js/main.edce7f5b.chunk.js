(this["webpackJsonptodolist-13"]=this["webpackJsonptodolist-13"]||[]).push([[0],{105:function(t,e,n){},106:function(t,e,n){},134:function(t,e,n){"use strict";n.r(e);var a,i,c=n(3),s=n(0),o=n.n(s),r=n(10),d=n.n(r),l=(n(105),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,190)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,c=e.getLCP,s=e.getTTFB;n(t),a(t),i(t),c(t),s(t)}))}),u=(n(106),n(178)),j=n(179),b=n(180),f=n(170),O=n(136),h=n(175),p=n(182),T=n(183),g=n(181),m=n(19),v=n(8),k=n(82),x=n.n(k);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={}));var S,I=x.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"a75ca69e-11c9-4fb1-b265-ac7ff31550a1"}}),C=function(){return I.get("todo-lists")},y=function(t){return I.post("todo-lists",{title:t})},E=function(t){return I.delete("todo-lists/".concat(t))},A=function(t,e){return I.put("todo-lists/".concat(t),{title:e})},D=function(t){return I.get("todo-lists/".concat(t,"/tasks"))},L=function(t,e){return I.delete("todo-lists/".concat(t,"/tasks/").concat(e))},w=function(t,e){return I.post("todo-lists/".concat(t,"/tasks"),{title:e})},N=function(t,e,n){return I.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},F=function(t){return I.post("auth/login",t)},R=function(){return I.delete("auth/login")},G=function(){return I.get("auth/me")},H=function(t,e){t(V(e)),t(U("failed"))},P={isLoggedIn:!1},K=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},M={status:"idle",error:null,isInitialized:!1};!function(t){t[t.successs=0]="successs",t[t.failed=1]="failed",t[t.captcha=10]="captcha"}(S||(S={}));var U=function(t){return{type:"App/SET-STATUS",status:t}},V=function(t){return{type:"App/SET-ERROR",error:t}},z=n(188),Z=n(185);function q(t){return Object(c.jsx)(Z.a,Object(v.a)({elevation:6,variant:"filled"},t))}function B(){var t=Object(m.c)((function(t){return t.app.error})),e=Object(m.b)(),n=function(t,n){"clickaway"!==n&&e(V(null))};return Object(c.jsx)(z.a,{open:null!==t,autoHideDuration:6e3,onClose:n,children:Object(c.jsx)(q,{onClose:n,severity:"error",children:t})})}var Y=n(51),J=n(15),_=n(171),$=n(189),Q=n(172),W=n(173),X=n(184),tt=n(174),et=n(186),nt=n(89),at=function(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.auth.isLoggedIn})),n=Object(nt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<4&&(e.password="Invalid password (minimal 4 sybmols)"):e.password="Password is required",e},onSubmit:function(e){var a;t((a=e,function(t){t(U("loading")),F(a).then((function(e){e.data.resultCode===S.successs?(t(K(!0)),t(U("succeeded"))):H(t,e.data.messages[0])})).catch((function(e){H(t,e.message)}))})),n.resetForm()}});return e?Object(c.jsx)(J.a,{to:"/"}):Object(c.jsx)(_.a,{container:!0,justify:"center",children:Object(c.jsx)(_.a,{item:!0,xs:4,children:Object(c.jsx)("form",{onSubmit:n.handleSubmit,children:Object(c.jsxs)($.a,{children:[Object(c.jsxs)(Q.a,{children:[Object(c.jsxs)("p",{children:["To log in get registered",Object(c.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:"here"})]}),Object(c.jsx)("p",{children:"or use common test account credentials:"}),Object(c.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(c.jsx)("p",{children:"Password: free"})]}),Object(c.jsxs)(W.a,{children:[Object(c.jsx)(X.a,Object(v.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email?Object(c.jsx)("div",{style:{color:"red"},children:n.errors.email}):null,Object(c.jsx)(X.a,Object(v.a)({label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password?Object(c.jsx)("div",{style:{color:"red"},children:n.errors.password}):null,Object(c.jsx)(tt.a,{label:"Remember me",control:Object(c.jsx)(et.a,Object(v.a)({},n.getFieldProps("rememberMe ")))}),Object(c.jsx)(h.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},it=n(135),ct=n(44),st=n(176),ot=o.a.memo((function(t){console.log("AddItemForm called");var e=Object(s.useState)(""),n=Object(ct.a)(e,2),a=n[0],i=n[1],o=Object(s.useState)(null),r=Object(ct.a)(o,2),d=r[0],l=r[1],u=function(){""!==a.trim()?(t.addItem(a),i("")):l("Title is required")};return Object(c.jsxs)("div",{children:[Object(c.jsx)(X.a,{variant:"outlined",error:!!d,value:a,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){null!==d&&l(null),13===t.charCode&&u()},label:"Title",helperText:d,disabled:"loading"===t.entityStatus}),Object(c.jsx)(f.a,{color:"primary",onClick:u,disabled:"loading"===t.entityStatus,children:Object(c.jsx)(st.a,{})})]})})),rt=n(52),dt=n(39),lt={},ut=[],jt=o.a.memo((function(t){console.log("EditableSpan called");var e=Object(s.useState)(!1),n=Object(ct.a)(e,2),a=n[0],i=n[1],o=Object(s.useState)(t.value),r=Object(ct.a)(o,2),d=r[0],l=r[1];return a?Object(c.jsx)(X.a,{value:d,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.onChange(d)}}):Object(c.jsx)("span",{onDoubleClick:function(){i(!0),l(t.value)},children:t.value})})),bt=n(177),ft=o.a.memo((function(t){var e=Object(s.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(s.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?a.Completed:a.New,t.todolistId)}),[t.task.id,t.todolistId]),i=Object(s.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(c.jsxs)("div",{className:a.Completed?"is-done":"",children:[Object(c.jsx)(et.a,{checked:t.task.status===a.Completed,color:"primary",onChange:n}),Object(c.jsx)(jt,{value:t.task.title,onChange:i}),Object(c.jsx)(f.a,{onClick:e,children:Object(c.jsx)(bt.a,{})})]},t.task.id)})),Ot=o.a.memo((function(t){var e=Object(m.b)();Object(s.useEffect)((function(){if(!t.demo){var n,a=(n=t.id,function(t){t(U("loading")),D(n).then((function(e){var a=e.data.items;t(function(t,e){return{type:"todolist/tasks/SET-TASKS",tasks:t,todolistId:e}}(a,n)),t(U("succeeded"))})).catch((function(e){H(t,e.message)}))});e(a)}}),[]);var n=Object(s.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),i=Object(s.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.id,t.changeTodolistTitle]),o=Object(s.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id,t.changeFilter]),r=Object(s.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id,t.changeFilter]),d=Object(s.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id,t.changeFilter]),l=t.tasks;return"active"===t.filter&&(l=t.tasks.filter((function(t){return t.status===a.New}))),"completed"===t.filter&&(l=t.tasks.filter((function(t){return t.status===a.Completed}))),Object(c.jsxs)("div",{children:[Object(c.jsxs)("h3",{children:[Object(c.jsx)(jt,{value:t.title,onChange:i}),Object(c.jsx)(f.a,{onClick:function(){t.removeTodolist(t.id)},disabled:"loading"===t.entityStatus,children:Object(c.jsx)(bt.a,{})})]}),Object(c.jsx)(ot,{addItem:n,entityStatus:t.entityStatus}),Object(c.jsx)("div",{children:l.map((function(e){return Object(c.jsx)(ft,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)}))}),Object(c.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(c.jsx)(h.a,{variant:"all"===t.filter?"outlined":"text",onClick:o,color:"default",children:"All"}),Object(c.jsx)(h.a,{variant:"active"===t.filter?"outlined":"text",onClick:r,color:"primary",children:"Active"}),Object(c.jsx)(h.a,{variant:"completed"===t.filter?"outlined":"text",onClick:d,color:"secondary",children:"Completed"})]})]})})),ht=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(m.c)((function(t){return t.auth.isLoggedIn}));Object(s.useEffect)((function(){if(!n&&a){var t=function(t){t(U("loading")),C().then((function(e){var n=e.data;t(function(t){return{type:"todolists/SET-TODOS",todos:t}}(n)),t(U("succeeded"))})).catch((function(e){H(t,e.message)}))};r(t)}}),[]);var i=Object(m.c)((function(t){return t.todolists})),o=Object(m.c)((function(t){return t.tasks})),r=Object(m.b)(),d=Object(s.useCallback)((function(t,e){r(function(t,e){return function(n){n(U("loading")),L(t,e).then((function(a){n(function(t,e){return{type:"todolist/tasks/REMOVE-TASK",taskId:t,todolistId:e}}(e,t)),n(U("succeeded"))})).catch((function(t){H(n,t.message)}))}}(e,t))}),[]),l=Object(s.useCallback)((function(t,e){r(function(t,e){return function(n){n(U("loading")),w(t,e).then((function(t){if(t.data.resultCode===S.successs){var e=t.data.data.item;n({type:"todolist/tasks/ADD-TASK",task:e}),n(U("succeeded"))}else H(n,t.data.messages[0])})).catch((function(t){H(n,t.message)}))}}(e,t))}),[]),u=Object(s.useCallback)((function(t,e,n){r(function(t,e,n){return function(a,i){var c=i().tasks[t].find((function(t){return t.id===e}));if(c){var s={title:c.title,status:n,startDate:c.startDate,priority:c.priority,description:c.description,deadline:c.deadline};N(t,e,s).then((function(n){var i=n.data.data.item.status;a(function(t,e,n){return{type:"todolist/tasks/CHANGE-TASK-STATUS",status:e,todolistId:n,taskId:t}}(e,i,t))})).catch((function(t){H(a,t.message)}))}}}(n,t,e))}),[]),j=Object(s.useCallback)((function(t,e,n){r(function(t,e,n){return function(a,i){a(U("loading"));var c=i().tasks[t].find((function(t){return t.id===e}));if(c){var s={title:n,status:c.status,startDate:c.startDate,priority:c.priority,description:c.description,deadline:c.deadline};N(t,e,s).then((function(n){var i=n.data.data.item.title;a(function(t,e,n){return{type:"todolist/tasks/CHANGE-TASK-TITLE",title:e,todolistId:n,taskId:t}}(e,i,t)),a(U("succeeded"))})).catch((function(t){H(a,t.message)}))}}}(n,t,e))}),[]),b=Object(s.useCallback)((function(t,e){var n={type:"todolists/CHANGE-TODOLIST-FILTER",id:e,filter:t};r(n)}),[]),f=Object(s.useCallback)((function(t){var e;r((e=t,function(t){t(U("loading")),t({type:"todolists/CHANGE-TODOLIST-ENTITY-STATUS",id:e,entityStatus:"loading"}),E(e).then((function(n){t(function(t){return{type:"todolists/REMOVE-TODOLIST",id:t}}(e)),t(U("succeeded"))})).catch((function(e){H(t,e.message)}))}))}),[]),O=Object(s.useCallback)((function(t,e){r(function(t,e){return function(n){n(U("loading")),A(t,e).then((function(a){n(function(t,e){return{type:"todolists/CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e)),n(U("succeeded"))})).catch((function(t){H(n,t.message)}))}}(t,e))}),[]),h=Object(s.useCallback)((function(t){r(function(t){return function(e){e(U("loading")),y(t).then((function(t){if(t.data.resultCode===S.successs){var n=t.data.data.item;e({type:"todolists/ADD-TODOLIST",todolist:n}),e(U("succeeded"))}else H(e,t.data.messages[0])})).catch((function(t){H(e,t.message)}))}}(t))}),[r]);return a?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(_.a,{container:!0,style:{padding:"20px"},children:Object(c.jsx)(ot,{addItem:h})}),Object(c.jsx)(_.a,{container:!0,spacing:3,children:i.map((function(t){var e=o[t.id];return Object(c.jsx)(_.a,{item:!0,children:Object(c.jsx)(it.a,{style:{padding:"10px"},children:Object(c.jsx)(Ot,{id:t.id,title:t.title,tasks:e,filter:t.filter,entityStatus:t.entityStatus,removeTask:d,changeFilter:b,addTask:l,changeTaskStatus:u,removeTodolist:f,changeTaskTitle:j,changeTodolistTitle:O,demo:n})})},t.id)}))})]}):Object(c.jsx)(J.a,{to:"/login"})};var pt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(m.c)((function(t){return t.app.status})),i=Object(m.c)((function(t){return t.app.isInitialized})),o=Object(m.c)((function(t){return t.auth.isLoggedIn})),r=Object(m.b)();return Object(s.useEffect)((function(){r((function(t){G().then((function(e){e.data.resultCode===S.successs&&t(K(!0))})).finally((function(){t({type:"App/SET-IS-INITIALIZED",isInitialized:!0})}))}))}),[]),i?Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)(Y.a,{children:[Object(c.jsx)(B,{}),Object(c.jsx)(j.a,{position:"static",children:Object(c.jsxs)(b.a,{children:[Object(c.jsx)(f.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(c.jsx)(g.a,{})}),Object(c.jsx)(O.a,{variant:"h6",children:"Todolist"}),o&&Object(c.jsx)(h.a,{color:"inherit",onClick:function(){r((function(t){t(U("loading")),R().then((function(e){e.data.resultCode===S.successs?(t(K(!1)),t(U("succeeded"))):H(t,e.data.messages[0])})).catch((function(e){H(t,e.messages)}))}))},children:"Logout"})]})}),"loading"===a&&Object(c.jsx)(p.a,{color:"secondary"}),Object(c.jsx)(T.a,{fixed:!0,children:Object(c.jsxs)(J.d,{children:[Object(c.jsx)(J.b,{exact:!0,path:"/",render:function(){return Object(c.jsx)(ht,{demo:n})}}),Object(c.jsx)(J.b,{path:"/login",render:function(){return Object(c.jsx)(at,{})}}),Object(c.jsx)(J.b,{path:"/404",render:function(){return Object(c.jsx)("h1",{children:"404: PAGE NOT FOUND"})}}),Object(c.jsx)(J.a,{from:"*",to:"/"})]})})]})}):Object(c.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(c.jsx)(u.a,{})})},Tt=n(41),gt=n(88),mt=Object(Tt.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:lt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"todolist/tasks/SET-TASKS":var n=Object(v.a)({},t);return n[e.todolistId]=e.tasks,n;case"todolists/SET-TODOS":var a=Object(v.a)({},t);return e.todos.forEach((function(t){a[t.id]=[]})),a;case"todolist/tasks/REMOVE-TASK":var i=Object(v.a)({},t),c=i[e.todolistId],s=c.filter((function(t){return t.id!==e.taskId}));return i[e.todolistId]=s,i;case"todolist/tasks/ADD-TASK":var o=Object(v.a)({},t),r=o[e.task.todoListId],d=[e.task].concat(Object(dt.a)(r));return o[e.task.todoListId]=d,o;case"todolist/tasks/CHANGE-TASK-STATUS":var l=t[e.todolistId],u=l.map((function(t){return t.id===e.taskId?Object(v.a)(Object(v.a)({},t),{},{status:e.status}):t}));return t[e.todolistId]=u,Object(v.a)({},t);case"todolist/tasks/CHANGE-TASK-TITLE":var j=t[e.todolistId],b=j.map((function(t){return t.id===e.taskId?Object(v.a)(Object(v.a)({},t),{},{title:e.title}):t}));return t[e.todolistId]=b,Object(v.a)({},t);case"todolists/ADD-TODOLIST":return Object(v.a)(Object(v.a)({},t),{},Object(rt.a)({},e.todolist.id,[]));case"todolists/REMOVE-TODOLIST":var f=Object(v.a)({},t);return delete f[e.id],f;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ut,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"todolists/SET-TODOS":return e.todos.map((function(t){return Object(v.a)(Object(v.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"todolists/REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"todolists/ADD-TODOLIST":return[Object(v.a)(Object(v.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(dt.a)(t));case"todolists/CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t.id===e.id}));return n&&(n.title=e.title),Object(dt.a)(t);case"todolists/CHANGE-TODOLIST-FILTER":var a=t.find((function(t){return t.id===e.id}));return a&&(a.filter=e.filter),Object(dt.a)(t);case"todolists/CHANGE-TODOLIST-ENTITY-STATUS":var i=t.find((function(t){return t.id===e.id}));return i&&(i.entityStatus=e.entityStatus),Object(dt.a)(t);default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"App/SET-STATUS":return Object(v.a)(Object(v.a)({},t),{},{status:e.status});case"App/SET-ERROR":return Object(v.a)(Object(v.a)({},t),{},{error:e.error});case"App/SET-IS-INITIALIZED":return Object(v.a)(Object(v.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(v.a)(Object(v.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),vt=Object(Tt.d)(mt,Object(Tt.a)(gt.a));window.store=vt,d.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(m.a,{store:vt,children:Object(c.jsx)(pt,{})})}),document.getElementById("root")),l()}},[[134,1,2]]]);
//# sourceMappingURL=main.edce7f5b.chunk.js.map