(this["webpackJsonptodolist-13"]=this["webpackJsonptodolist-13"]||[]).push([[0],{111:function(t,e,a){},143:function(t,e,a){"use strict";a.r(e);var n,i,s=a(4),c=a(0),o=a.n(c),r=a(10),d=a.n(r),l=(a(111),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,198)).then((function(e){var a=e.getCLS,n=e.getFID,i=e.getFCP,s=e.getLCP,c=e.getTTFB;a(t),n(t),i(t),s(t),c(t)}))}),u=(a(74),a(190)),j=a(191),f=a(192),b=a(20),h=a(33),p=a(85),O=a.n(p);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(n||(n={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={}));var g,m=O.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"22fb0358-8da6-4e56-907c-49cc186ecf5f"}}),x=function(){return m.get("todo-lists")},k=function(t){return m.post("todo-lists",{title:t})},v=function(t){return m.delete("todo-lists/".concat(t))},C=function(t,e){return m.put("todo-lists/".concat(t),{title:e})},y=function(t){return m.get("todo-lists/".concat(t,"/tasks"))},T=function(t,e){return m.delete("todo-lists/".concat(t,"/tasks/").concat(e))},I=function(t,e){return m.post("todo-lists/".concat(t,"/tasks"),{title:e})},A=function(t,e,a){return m.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},S=function(t){return m.post("auth/login",t)},w=function(){return m.delete("auth/login")},F=function(){return m.get("auth/me")},L=function(t,e){t(H({error:e})),t(B({status:"failed"}))},E=Object(h.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}}}),P=E.actions.setIsLoggedInAC,z=E.reducer;!function(t){t[t.successs=0]="successs",t[t.failed=1]="failed",t[t.captcha=10]="captcha"}(g||(g={}));var N=Object(h.b)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error},setIsInitializedAC:function(t,e){t.isInitialized=e.payload.isInitialized}}}),D=N.actions,H=D.setAppErrorAC,B=D.setAppStatusAC,M=(D.setIsInitializedAC,N.reducer),R=a(22),U=a(197),q=a(194);function Z(t){return Object(s.jsx)(q.a,Object(R.a)({elevation:6,variant:"filled"},t))}function G(){var t=Object(b.c)((function(t){return t.app.error})),e=Object(b.b)(),a=function(t,a){"clickaway"!==a&&e(H({error:null}))};return Object(s.jsx)(U.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(s.jsx)(Z,{onClose:a,severity:"error",children:t})})}var J=a(57),K=a(17),$=a(181),_=a(182),V=a(183),W=a(184),Y=a(193),Q=a(185),X=a(195),tt=a(186),et=a(93),at=function(){var t=Object(b.b)(),e=Object(b.c)((function(t){return t.auth.isLoggedIn})),a=Object(et.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<4&&(e.password="Invalid password (minimal 4 sybmols)"):e.password="Password is required",e},onSubmit:function(e){var n;t((n=e,function(t){t(B({status:"loading"})),S(n).then((function(e){e.data.resultCode===g.successs?(t(E.actions.setIsLoggedInAC({value:!0})),t(B({status:"succeeded"}))):L(t,e.data.messages[0])})).catch((function(e){L(t,e.message)}))})),a.resetForm()}});return e?Object(s.jsx)(K.a,{to:"/"}):Object(s.jsx)($.a,{container:!0,justify:"center",children:Object(s.jsx)($.a,{children:Object(s.jsx)("form",{onSubmit:a.handleSubmit,children:Object(s.jsxs)(_.a,{children:[Object(s.jsxs)(V.a,{children:[Object(s.jsxs)("p",{children:["To log in get registered",Object(s.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:"here"})]}),Object(s.jsx)("p",{children:"or use common test account credentials:"}),Object(s.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(s.jsx)("p",{children:"Password: free"})]}),Object(s.jsxs)(W.a,{children:[Object(s.jsx)(Y.a,Object(R.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?Object(s.jsx)("div",{style:{color:"red"},children:a.errors.email}):null,Object(s.jsx)(Y.a,Object(R.a)({label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?Object(s.jsx)("div",{style:{color:"red"},children:a.errors.password}):null,Object(s.jsx)(Q.a,{label:"Remember me",control:Object(s.jsx)(X.a,Object(R.a)({},a.getFieldProps("rememberMe ")))}),Object(s.jsx)(tt.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},nt=a(144),it=a(51),st=a(180),ct=a(91),ot=a.n(ct),rt=o.a.memo((function(t){var e=Object(c.useState)(""),a=Object(it.a)(e,2),n=a[0],i=a[1],o=Object(c.useState)(null),r=Object(it.a)(o,2),d=r[0],l=r[1],u=function(){""!==n.trim()?(t.addItem(n),i("")):l("Title is required")};return Object(s.jsxs)("div",{children:[Object(s.jsx)(Y.a,{variant:"outlined",error:!!d,value:n,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){null!==d&&l(null),13===t.charCode&&u()},label:"Title",helperText:d,disabled:"loading"===t.entityStatus,size:"small",style:t.mainItem?{width:"320px"}:{}}),Object(s.jsx)(st.a,{color:"primary",onClick:u,disabled:"loading"===t.entityStatus,children:Object(s.jsx)(ot.a,{})})]})})),dt=Object(h.b)({name:"todolist",initialState:[],reducers:{removeTodolistAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&t.splice(a,1)},addTodolistAC:function(t,e){t.unshift(Object(R.a)(Object(R.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitleAC:function(t,e){var a=t.find((function(t){return t.id===e.payload.id}));a&&(a.title=e.payload.title)},changeTodolistFilterAC:function(t,e){var a=t.find((function(t){return t.id===e.payload.id}));a&&(a.filter=e.payload.filter)},setTodolistAC:function(t,e){return e.payload.todos.map((function(t){return Object(R.a)(Object(R.a)({},t),{},{filter:"all",entityStatus:"idle"})}))},changeTodolistEntityStatusAC:function(t,e){var a=t.find((function(t){return t.id===e.payload.id}));a&&(a.entityStatus=e.payload.entityStatus)}}}),lt=dt.actions,ut=lt.removeTodolistAC,jt=lt.addTodolistAC,ft=lt.changeTodolistTitleAC,bt=lt.changeTodolistFilterAC,ht=lt.setTodolistAC,pt=lt.changeTodolistEntityStatusAC,Ot=dt.reducer,gt=Object(h.b)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(t,e){t[e.payload.todolistId]=t[e.payload.todolistId].filter((function(t){return t.id!==e.payload.taskId}))},addTaskAC:function(t,e){t[e.payload.task.todoListId].push(e.payload.task)},changeTaskStatusAC:function(t,e){var a=t[e.payload.todolistId].map((function(t){return t.id===e.payload.taskId?Object(R.a)(Object(R.a)({},t),{},{status:e.payload.status}):t}));t[e.payload.todolistId]=a},changeTaskTitleAC:function(t,e){var a=t[e.payload.todolistId].map((function(t){return t.id===e.payload.taskId?Object(R.a)(Object(R.a)({},t),{},{title:e.payload.title}):t}));t[e.payload.todolistId]=a},setTasksAC:function(t,e){t[e.payload.todolistId]=e.payload.tasks}},extraReducers:function(t){t.addCase(jt,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(ut,(function(t,e){delete t[e.payload.todolistId]})),t.addCase(ht,(function(t,e){e.payload.todos.forEach((function(e){t[e.id]=[]}))}))}}),mt=gt.actions,xt=mt.removeTaskAC,kt=mt.addTaskAC,vt=mt.changeTaskStatusAC,Ct=mt.changeTaskTitleAC,yt=mt.setTasksAC,Tt=gt.reducer,It=o.a.memo((function(t){var e=Object(c.useState)(!1),a=Object(it.a)(e,2),n=a[0],i=a[1],o=Object(c.useState)(t.value),r=Object(it.a)(o,2),d=r[0],l=r[1];return n?Object(s.jsx)(Y.a,{value:d,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.onChange(d)}}):Object(s.jsx)("span",{onDoubleClick:function(){i(!0),l(t.value)},children:t.value})})),At=a(187),St=a(6),wt=a(63),Ft=Object(St.a)({root:{color:wt.a[400],"&$checked":{color:wt.a[600]}},checked:{}})((function(t){return Object(s.jsx)(X.a,Object(R.a)({color:"default"},t))})),Lt=o.a.memo((function(t){var e=Object(c.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),a=Object(c.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.task.id,a?n.Completed:n.New,t.todolistId)}),[t.task.id,t.todolistId]),i=Object(c.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(s.jsxs)("div",{className:n.Completed?"is-done":"",children:[Object(s.jsx)(Ft,{checked:t.task.status===n.Completed,onChange:a,name:"checkedG"}),Object(s.jsx)(It,{value:t.task.title,onChange:i}),Object(s.jsx)(st.a,{onClick:e,children:Object(s.jsx)(At.a,{color:"secondary"})})]},t.task.id)})),Et=o.a.memo((function(t){var e=Object(b.b)();Object(c.useEffect)((function(){if(!t.demo){var a,n=(a=t.id,function(t){t(B({status:"loading"})),y(a).then((function(e){var n=e.data.items;t(yt({tasks:n,todolistId:a})),t(B({status:"succeeded"}))})).catch((function(e){L(t,e.message)}))});e(n)}}),[]);var a=Object(c.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),i=Object(c.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.id,t.changeTodolistTitle]),o=Object(c.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id,t.changeFilter]),r=Object(c.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id,t.changeFilter]),d=Object(c.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id,t.changeFilter]),l=t.tasks;return"active"===t.filter&&(l=t.tasks.filter((function(t){return t.status===n.New}))),"completed"===t.filter&&(l=t.tasks.filter((function(t){return t.status===n.Completed}))),Object(s.jsxs)("div",{children:[Object(s.jsxs)("h3",{children:[Object(s.jsx)(It,{value:t.title,onChange:i}),Object(s.jsx)(st.a,{onClick:function(){t.removeTodolist(t.id)},disabled:"loading"===t.entityStatus,children:Object(s.jsx)(At.a,{})})]}),Object(s.jsx)(rt,{addItem:a,entityStatus:t.entityStatus}),Object(s.jsx)("div",{children:l.map((function(e){return Object(s.jsx)(Lt,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)}))}),Object(s.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(s.jsx)(tt.a,{variant:"all"===t.filter?"outlined":"text",onClick:o,color:"default",children:"All"}),Object(s.jsx)(tt.a,{variant:"active"===t.filter?"outlined":"text",onClick:r,color:"primary",children:"Active"}),Object(s.jsx)(tt.a,{variant:"completed"===t.filter?"outlined":"text",onClick:d,color:"secondary",children:"Completed"})]})]})})),Pt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(b.c)((function(t){return t.auth.isLoggedIn}));Object(c.useEffect)((function(){if(!a&&n){var t=function(t){t(B({status:"loading"})),x().then((function(e){var a=e.data;t(ht({todos:a})),t(B({status:"succeeded"}))})).catch((function(e){L(t,e.message)}))};r(t)}}),[]);var i=Object(b.c)((function(t){return t.todolists})),o=Object(b.c)((function(t){return t.tasks})),r=Object(b.b)(),d=Object(c.useCallback)((function(t,e){r(function(t,e){return function(a){a(B({status:"loading"})),T(t,e).then((function(n){a(xt({taskId:e,todolistId:t})),a(B({status:"succeeded"}))})).catch((function(t){L(a,t.message)}))}}(e,t))}),[]),l=Object(c.useCallback)((function(t,e){r(function(t,e){return function(a){a(B({status:"loading"})),I(t,e).then((function(t){if(t.data.resultCode===g.successs){var e=t.data.data.item;a(kt({task:e})),a(B({status:"succeeded"}))}else L(a,t.data.messages[0])})).catch((function(t){L(a,t.message)}))}}(e,t))}),[]),u=Object(c.useCallback)((function(t,e,a){r(function(t,e,a){return function(n,i){var s=i().tasks[t].find((function(t){return t.id===e}));if(s){var c={title:s.title,status:a,startDate:s.startDate,priority:s.priority,description:s.description,deadline:s.deadline};A(t,e,c).then((function(a){var i=a.data.data.item.status;n(vt({taskId:e,status:i,todolistId:t}))})).catch((function(t){L(n,t.message)}))}}}(a,t,e))}),[]),j=Object(c.useCallback)((function(t,e,a){r(function(t,e,a){return function(n,i){n(B({status:"loading"}));var s=i().tasks[t].find((function(t){return t.id===e}));if(s){var c={title:a,status:s.status,startDate:s.startDate,priority:s.priority,description:s.description,deadline:s.deadline};A(t,e,c).then((function(a){var i=a.data.data.item.title;n(Ct({taskId:e,title:i,todolistId:t})),n(B({status:"succeeded"}))})).catch((function(t){L(n,t.message)}))}}}(a,t,e))}),[]),f=Object(c.useCallback)((function(t,e){var a=bt({id:e,filter:t});r(a)}),[]),h=Object(c.useCallback)((function(t){var e;r((e=t,function(t){t(B({status:"loading"})),t(pt({id:e,entityStatus:"loading"})),v(e).then((function(a){t(ut({todolistId:e})),t(B({status:"succeeded"}))})).catch((function(e){L(t,e.message)}))}))}),[]),p=Object(c.useCallback)((function(t,e){r(function(t,e){return function(a){a(B({status:"loading"})),C(t,e).then((function(n){a(ft({id:t,title:e})),a(B({status:"succeeded"}))})).catch((function(t){L(a,t.message)}))}}(t,e))}),[]),O=Object(c.useCallback)((function(t){r(function(t){return function(e){e(B({status:"loading"})),k(t).then((function(t){if(t.data.resultCode===g.successs){var a=t.data.data.item;e(jt({todolist:a})),e(B({status:"succeeded"}))}else L(e,t.data.messages[0])})).catch((function(t){L(e,t.message)}))}}(t))}),[r]);return n?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)($.a,{container:!0,style:{padding:"20px",justifyContent:"center"},children:[Object(s.jsx)("div",{className:"mainTitle",children:"Create New Todolist:"}),Object(s.jsx)(rt,{addItem:O,mainItem:!0})]}),Object(s.jsx)($.a,{container:!0,spacing:3,children:i.map((function(t){var e=o[t.id];return Object(s.jsx)($.a,{item:!0,children:Object(s.jsx)(nt.a,{style:{padding:"15px"},className:"todolist",children:Object(s.jsx)(Et,{id:t.id,title:t.title,tasks:e,filter:t.filter,entityStatus:t.entityStatus,removeTask:d,changeFilter:f,addTask:l,changeTaskStatus:u,removeTodolist:h,changeTaskTitle:j,changeTodolistTitle:p,demo:a})})},t.id)}))})]}):Object(s.jsx)(K.a,{to:"/login"})},zt=a(92),Nt=a(188),Dt=a(189),Ht=a(145),Bt=Object(St.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",borderRadius:3,border:0,color:"white",height:48,padding:"0 30px",boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",minHeight:"60px",position:"relative"},label:{textTransform:"capitalize"}})(Nt.a);function Mt(t){return Object(s.jsx)(Bt,{position:"static",children:Object(s.jsxs)(Dt.a,{children:[Object(s.jsx)(Ht.a,{variant:"h4",style:{cursor:"default"},children:"Todolist"}),t.isLoggedIn&&Object(s.jsx)(tt.a,{color:"inherit",onClick:t.logoutHandler,style:{position:"absolute",right:"10px",fontWeight:"bold",fontSize:"16px"},children:"Logout"})]})})}var Rt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(b.c)((function(t){return t.app.status})),i=Object(b.c)((function(t){return t.app.isInitialized})),o=Object(b.c)((function(t){return t.auth.isLoggedIn})),r=Object(b.b)();return Object(c.useEffect)((function(){r((function(t){F().then((function(e){e.data.resultCode===g.successs&&t(P({value:!0}))})).finally((function(){t(N.actions.setIsInitializedAC({isInitialized:!0}))}))}))}),[]),i?Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(zt.a,{type:"polygon",bg:!0}),Object(s.jsxs)(J.a,{children:[Object(s.jsx)(G,{}),Object(s.jsx)(Mt,{isLoggedIn:o,logoutHandler:function(){r((function(t){t(B({status:"loading"})),w().then((function(e){e.data.resultCode===g.successs?(t(E.actions.setIsLoggedInAC({value:!1})),t(B({status:"succeeded"}))):L(t,e.data.messages[0])})).catch((function(e){L(t,e.messages)}))}))}}),"loading"===n&&Object(s.jsx)(j.a,{color:"secondary"}),Object(s.jsx)(f.a,{fixed:!0,children:Object(s.jsxs)(K.d,{children:[Object(s.jsx)(K.b,{exact:!0,path:"/",render:function(){return Object(s.jsx)(Pt,{demo:a})}}),Object(s.jsx)(K.b,{path:"/login",render:function(){return Object(s.jsx)(at,{})}}),Object(s.jsx)(K.b,{path:"/404",render:function(){return Object(s.jsx)("h1",{children:"404: PAGE NOT FOUND"})}}),Object(s.jsx)(K.a,{from:"*",to:"/"})]})})]})]}):Object(s.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(s.jsx)(u.a,{})})},Ut=a(24),qt=a(52),Zt=Object(Ut.c)({tasks:Tt,todolists:Ot,app:M,auth:z}),Gt=Object(h.a)({reducer:Zt,middleware:function(t){return t().prepend(qt.a)}});window.store=Gt,d.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(b.a,{store:Gt,children:Object(s.jsx)(Rt,{})})}),document.getElementById("root")),l()},74:function(t,e,a){}},[[143,1,2]]]);
//# sourceMappingURL=main.fcb4f04e.chunk.js.map