webpackJsonp([1],{"0V6j":function(t,e){},"7zck":function(t,e){},LaUr:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),r=n("3EgV"),s=n.n(r),o=(n("7zck"),n("Dd8w")),a=n.n(o),c=n("NYxO"),l={name:"Configuration",data:function(){return{e1:!0,opened:!1}},computed:a()({openSettings:function(){return this.opened||!this.gitlabUrl||!this.gitlabToken}},Object(c.c)(["gitlabUrl","gitlabToken"])),methods:a()({},Object(c.d)(["setGitlabUrl","setGitlabToken"]))},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{persistent:"",value:t.openSettings,"max-width":"500px"}},[n("v-btn",{attrs:{slot:"activator",icon:""},on:{click:function(e){e.stopPropagation(),t.opened=!0}},slot:"activator"},[n("v-icon",[t._v("settings")])],1),t._v(" "),n("v-card",[n("v-card-title",[t._v("\n      Configuration\n    ")]),t._v(" "),n("v-card-text",[n("v-text-field",{attrs:{label:"Gitlab URL",value:t.gitlabUrl},on:{input:t.setGitlabUrl}}),t._v(" "),n("v-text-field",{attrs:{password:"",counter:"",label:"Gitlab TOKEN",value:t.gitlabToken,"append-icon":t.e1?"visibility":"visibility_off","append-icon-cb":function(){return t.e1=!t.e1},type:t.e1?"password":"text"},on:{input:t.setGitlabToken}})],1),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(e){t.opened=!1}}},[t._v("Close")])],1)],1)],1)},staticRenderFns:[]},p={name:"App",components:{Configuration:n("VU/8")(l,u,!1,null,null,null).exports},computed:a()({},Object(c.c)(["gitlabUrl"]),{now:function(){return new Date(Date.now()).toLocaleString()}})},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"app"}},[n("v-toolbar",{attrs:{color:"purple darken-3",dark:"",app:"","clipped-left":t.$vuetify.breakpoint.lgAndUp,fixed:""}},[n("v-toolbar-title",[t._v("GitLab Dashboard - "+t._s(t.gitlabUrl))]),t._v(" "),n("v-spacer"),t._v(" "),n("Configuration")],1),t._v(" "),n("v-content",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1),t._v(" "),n("v-footer",{attrs:{app:"",dark:"",color:"purple darken-4"}},[n("v-container",{attrs:{fluid:"","text-xs-center":"","grid-list-xs":""}},[t._v(t._s(t.now))])],1)],1)},staticRenderFns:[]},d=n("VU/8")(p,v,!1,null,null,null).exports,_=n("/ocq"),h={name:"SelectProject",data:function(){return{ux_sheet:!1,ux_isDragging:!1,ux_startY:null,ux_startHeight:null,ux_height:400,search:"",msgSelectProject:"Selecione o Projeto"}},computed:a()({},Object(c.c)(["getAvailableProjects"]),{selectedProjects:{get:function(){return this.$store.getters.getSelectedProjects.map(function(t){return t.id})},set:function(t){this.$store.dispatch("selectProjectsById",t)}}}),watch:{ux_sheet:function(t){t&&this.fetchAvailableProjects()},selectedItems:function(){}},methods:a()({},Object(c.b)(["fetchAvailableProjects"]),{onMouseDown:function(t){this.ux_isDragging=!0,this.ux_startY=t.pageY,this.ux_startHeight=this.ux_height},onMouseMove:function(t){if(this.ux_isDragging){var e=t.pageY-this.ux_startY;this.ux_height=this.ux_startHeight-e}},onMouseUp:function(){this.ux_isDragging=!1}})},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-bottom-sheet",{attrs:{inset:"",lazy:""},model:{value:t.ux_sheet,callback:function(e){t.ux_sheet=e},expression:"ux_sheet"}},[n("v-btn",{attrs:{slot:"activator",fixed:"",bottom:"",right:"",fab:"",dark:"",color:"pink"},slot:"activator"},[n("v-icon",[t._v("add")])],1),t._v(" "),n("v-flex",{on:{mousemove:t.onMouseMove,mouseleave:t.onMouseMove,mouseup:t.onMouseUp}},[n("v-toolbar",{attrs:{id:"toolbarPanel",color:"cyan",dark:""}},[n("v-toolbar-side-icon",{on:{mousedown:t.onMouseDown}}),t._v(" "),n("v-toolbar-title",[t._v(t._s(t.msgSelectProject))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("search")])],1)],1),t._v(" "),n("v-list",{staticClass:"scroll-y",style:{maxHeight:this.ux_height+"px"},attrs:{id:"projectList","two-line":""}},[t._l(t.getAvailableProjects,function(e){return[n("v-list-tile",{key:e.name_with_namespace,attrs:{avatar:""}},[n("v-list-tile-action",[n("v-checkbox",{attrs:{readonly:"",value:e.id,id:"ch"+e.id},model:{value:t.selectedProjects,callback:function(e){t.selectedProjects=e},expression:"selectedProjects"}})],1),t._v(" "),n("v-list-tile-avatar",{attrs:{color:"blue"}},[e.avatar_url?n("img",{attrs:{src:e.avatar_url}}):n("v-card-text",[t._v(t._s(e.name.substring(0,1).toUpperCase()))])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{innerHTML:t._s(e.name)}}),t._v(" "),n("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.path_with_namespace)}})],1)],1)]})],2)],1)],1)},staticRenderFns:[]},g=n("VU/8")(h,f,!1,null,null,null).exports,b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-avatar",{class:[{animation:this.isRunning},this.getPipelineStatusColor]},[e("v-icon",{attrs:{dark:""}},[this._v(this._s(this.getPipelineStatusIcon))])],1)},staticRenderFns:[]};var j={name:"ProjectStatus",components:{PipelineStatus:n("VU/8")({name:"PipelineStatus",props:{pipeline:{}},computed:{isRunning:function(){return"running"===this.pipeline.status},getPipelineStatusColor:function(){switch(this.pipeline.status){case"success":return"green";case"failed":return"red";case"pending":return"orange";case"running":return"blue";default:return"grey darken-1"}},getPipelineStatusIcon:function(){switch(this.pipeline.status){case"success":return"check";case"failed":return"block";case"pending":return"pause";case"running":return"play_arrow";default:return"remove"}}}},b,!1,function(t){n("LaUr")},"data-v-5afa9c3d",null).exports},props:{project:{}},data:function(){return{interval:0,isFetching:!1}},created:function(){this.fetchProject(),this.interval=setInterval(this.fetchProject,1e4)},beforeDestroy:function(){clearInterval(this.interval)},methods:{removeProject:function(){this.$store.dispatch("removeProject",this.project)},fetchProject:function(){var t=this;this.isFetching=!0,this.$store.dispatch("handleProjectLoad",this.project).then(function(){return t.isFetching=!1})},openPipeline:function(t){window.open(this.project.web_url+"/pipelines/"+t.id,"_blank")}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-list-tile",{key:t.project.id},[n("v-list-tile-content",[n("v-list-tile-title",[t._v("\n        "+t._s(t.project.id)+" - "+t._s(t.project.name_with_namespace)+"\n      ")]),t._v(" "),t.project.pipelines?n("div",[n("v-list-tile-sub-title",[t.project.pipelines.branches?n("span",[t._v("Branches")]):t._e(),t._v(" "),t._l(t.project.pipelines.branches,function(e){return[n("v-chip",{key:e.id,on:{click:function(n){t.openPipeline(e)}}},[n("PipelineStatus",{attrs:{pipeline:e}}),t._v("\n              "+t._s(e.ref)+"\n            ")],1)]})],2),t._v(" "),n("v-list-tile-sub-title",[t.project.pipelines.tags?n("span",[t._v("Tags")]):t._e(),t._v(" "),t._l(t.project.pipelines.tags,function(e){return[n("v-chip",{key:e.id},[n("PipelineStatus",{attrs:{pipeline:e}}),t._v("\n              "+t._s(e.ref)+"\n            ")],1)]})],2),t._v(" "),n("v-list-tile-sub-title",[t.project.pipelines.variables?n("span",[t._v("Variables")]):t._e(),t._v(" "),t._l(t.project.pipelines.variables,function(e){return[t._v("\n            "+t._s(e.key)+" - "+t._s(e.value)+"\n          ")]})],2)],1):t._e()],1),t._v(" "),n("v-list-tile-action",[t.isFetching?n("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):n("v-btn",{attrs:{icon:"",flat:"",ripple:"",color:"error"},on:{click:t.removeProject}},[n("v-icon",[t._v("delete")])],1)],1)],1),t._v(" "),n("v-divider")],1)},staticRenderFns:[]};var P={name:"Dashboard",components:{ProjectStatus:n("VU/8")(j,m,!1,function(t){n("0V6j")},null,null).exports,SelectProject:g},computed:a()({},Object(c.e)(["selectedProjects"]),Object(c.c)(["gitlab_project_query","getSelectedProjects"])),created:function(){},watch:{getSelectedProjects:function(t){var e=this;t.forEach(function(t){return e.$store.dispatch("handleProjectLoad",t)})}}},x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",{attrs:{fluid:"","grid-list-xs":"","pa-0":"","ma-0":"",id:"dashboard"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-card",[e("v-list",this._l(this.getSelectedProjects,function(t){return e("ProjectStatus",{key:t.id,attrs:{project:t}})}))],1)],1)],1),this._v(" "),e("SelectProject")],1)},staticRenderFns:[]},k=n("VU/8")(P,x,!1,null,null,null).exports;i.a.use(_.a);var w=new _.a({routes:[{path:"/",name:"Dashboard",component:k}]}),S=n("v/L+"),y=n.n(S),U=(n("sax8"),{state:{_gitlabUrl:"https://gitlab.com",_gitlabToken:""},getters:{gitlabUrl:function(t){return t._gitlabUrl},gitlabToken:function(t){return t._gitlabToken}},mutations:{setGitlabUrl:function(t,e){t._gitlabUrl=e},setGitlabToken:function(t,e){t._gitlabToken=e}}}),T=n("mvHQ"),M=n.n(T),O=n("fZjL"),A=n.n(O),E=n("M4fF"),D=n.n(E),L={gitlab_project_query:function(t){return A()(t._gitlab_query_params).reduce(function(e,n){return e.match("=")||(e=e+"="+t._gitlab_query_params[e]),e+"&"+n+"="+t._gitlab_query_params[n]})},getAvailableProjects:function(t){return t.availableProjects},getSelectedProjects:function(t){return t.selectedProjects}},R={state:{isFetching:!1,selectedProjects:[],availableProjects:[],_gitlab_query_params:{search:"",order_by:"path",sort:"asc",membership:!0,per_page:100}},getters:L,mutations:{setSelectedProjects:function(t,e){e.forEach(function(t){t.pipelines||(t.pipelines={})}),t.selectedProjects=e},clearSelectedProjects:function(t){t.selectedProjects=[]},addSelectedProjects:function(t,e){t.selectedProjects.find(function(t){return t.id===e.id})||t.selectedProjects.push(e)},setAvailableProjects:function(t,e){t.availableProjects=D.a.sortBy(e,"path_with_namespace")},setProjectPipeline:function(t,e){var n=t.selectedProjects.findIndex(function(t){return t.id===e.project.id});t.selectedProjects[n].pipelines[e.prop]=e.json}},actions:{selectProjectsById:function(t,e){var n=t.state,i=t.commit,r=e.map(function(t){return n.availableProjects.find(function(e){return e.id===t})});i("setSelectedProjects",JSON.parse(M()(r)))},fetchAvailableProjects:function(t){var e=t.state,n=t.rootGetters,i=t.commit;fetch(n.gitlabUrl+"/api/v4/projects?"+L.gitlab_project_query(e)+"&private_token="+n.gitlabToken).then(function(t){return t.json()}).then(function(t){i("setAvailableProjects",t)})},handleProjectLoad:function(t,e){var n=t.rootGetters,i=t.commit;fetch(n.gitlabUrl+"/api/v4/projects/"+e.id+"/pipelines?scope=branches&per_page=5&private_token="+n.gitlabToken).then(function(t){return t.json()}).then(function(t){t.length&&i("setProjectPipeline",{project:e,json:t,prop:"branches"})}),fetch(n.gitlabUrl+"/api/v4/projects/"+e.id+"/pipelines?scope=tags&per_page=5&private_token="+n.gitlabToken).then(function(t){return t.json()}).then(function(t){t.length&&i("setProjectPipeline",{project:e,json:t,prop:"tags"})}),fetch(n.gitlabUrl+"/api/v4/projects/"+e.id+"/variables?private_token="+n.gitlabToken).then(function(t){return t.json()}).then(function(t){t.length})}}};i.a.use(c.a);var F=new y.a({strictMode:!1,storage:window.localStorage}),$=new c.a.Store({modules:{configuration:U,projects:R},mutations:{RESTORE_MUTATION:F.RESTORE_MUTATION},strict:!1,plugins:[F.plugin]});i.a.use(s.a),i.a.config.productionTip=!1,new i.a({el:"#app",store:$,router:w,components:{App:d},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.c32010b80f8f681064a9.js.map