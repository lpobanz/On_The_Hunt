(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{v8Wd:function(n,l,t){"use strict";t.r(l);var o=t("CcnG"),u=function(){return function(){}}(),e=t("pMnS"),i=t("oBZk"),a=t("ZZ/e"),c=t("gIcY"),r=t("Ip0R"),b=t("fvl4"),s=t("ZYCi"),p=function(){function n(n,l,t){this.firestore=n,this.router=l,this.navCtrl=t}return n.prototype.ngOnInit=function(){var n=this;console.log("test"),this.firestore.collection("Games").snapshotChanges().subscribe((function(l){n.initGameList=l.map((function(n){return console.dir(l),{Name:n.payload.doc.data()["Game Name"],Location:n.payload.doc.data().Location,ID:n.payload.doc.id}})),n.gameList=l.map((function(n){return{Name:n.payload.doc.data()["Game Name"],Location:n.payload.doc.data().Location,ID:n.payload.doc.id}})),console.log(n.gameList)}))},n.prototype.ionViewWillEnter=function(){localStorage.clear()},n.prototype.initializeItems=function(){this.gameList=this.initGameList},n.prototype.filterList=function(n){this.initializeItems();var l=n.srcElement.value;l?this.gameList=this.gameList.filter((function(n){if(n.Name&&l){if(n.Name.toLowerCase().indexOf(l.toLowerCase())>-1)return console.log("ran 3"),!0;if(null==n.Location)return!1;if(n.Location.toLowerCase().indexOf(l.toLowerCase())>-1)return console.log("ran 2"),!0}})):console.log("ran 1")},n.prototype.backBtnClk=function(){this.router.navigate(["login"])},n.prototype.joinGameClk=function(n,l){this.gameName=n,this.gameId=l,console.log(this.gameName,this.gameId),this.navCtrl.navigateRoot(["game-home"],{state:{name:this.gameName,ID:this.gameId}})},n.ngInjectableDef=o.Xb({factory:function(){return new n(o.Yb(b.a),o.Yb(s.m),o.Yb(a.Fb))},token:n,providedIn:"root"}),n}(),m=o.zb({encapsulation:0,styles:[[".email[_ngcontent-%COMP%]{font-size:20px}.itemCard[_ngcontent-%COMP%]{width:calc(100% - 20px);padding:10px;background-color:#fff}.search[_ngcontent-%COMP%]{color:#fff}.head[_ngcontent-%COMP%]{color:#fff;font-weight:700;font-size:20px}.banner[_ngcontent-%COMP%]{--background:rgb(173, 157, 143)}.joinBtn[_ngcontent-%COMP%]{margin-top:15px;margin-left:calc(100% - 70px);--background:#e98534}.bod[_ngcontent-%COMP%]{overflow:scroll;background-color:#ec944b}.cont[_ngcontent-%COMP%], ion-item[_ngcontent-%COMP%]{--ion-background-color:#ec944b}.backBtn[_ngcontent-%COMP%]{position:absolute;left:5px;top:4px;height:30px;width:60px;--background:#ec944b}"]],data:{}});function f(n){return o.Ub(0,[(n()(),o.Bb(0,0,null,null,14,"ion-item",[],null,null,null,i.z,i.j)),o.Ab(1,49152,null,0,a.F,[o.j,o.p,o.F],null,null),(n()(),o.Bb(2,0,null,0,12,"ion-card",[["class","itemCard"]],null,null,null,i.u,i.c)),o.Ab(3,49152,null,0,a.k,[o.j,o.p,o.F],null,null),(n()(),o.Bb(4,0,null,0,10,"ion-card-header",[],null,null,null,i.s,i.d)),o.Ab(5,49152,null,0,a.m,[o.j,o.p,o.F],null,null),(n()(),o.Bb(6,0,null,0,2,"ion-card-title",[["class","email ion-text-wrap"]],null,null,null,i.t,i.e)),o.Ab(7,49152,null,0,a.o,[o.j,o.p,o.F],null,null),(n()(),o.Sb(8,0,["",""])),(n()(),o.Bb(9,0,null,0,2,"ion-label",[["class","ion-text-wrap"]],null,null,null,i.A,i.k)),o.Ab(10,49152,null,0,a.L,[o.j,o.p,o.F],null,null),(n()(),o.Sb(11,0,["Location: ",""])),(n()(),o.Bb(12,0,null,0,2,"ion-button",[["class","joinBtn"]],null,[[null,"click"]],(function(n,l,t){var o=!0;return"click"===l&&(o=!1!==n.component.joinGameClk(n.context.$implicit.Name,n.context.$implicit.ID)&&o),o}),i.r,i.b)),o.Ab(13,49152,null,0,a.i,[o.j,o.p,o.F],null,null),(n()(),o.Sb(-1,0,[" Join Game"]))],null,(function(n,l){n(l,8,0,l.context.$implicit.Name),n(l,11,0,l.context.$implicit.Location)}))}function d(n){return o.Ub(0,[(n()(),o.Bb(0,0,null,null,9,"ion-header",[],null,null,null,i.w,i.g)),o.Ab(1,49152,null,0,a.z,[o.j,o.p,o.F],null,null),(n()(),o.Bb(2,0,null,0,7,"ion-toolbar",[["class","banner"]],null,null,null,i.F,i.p)),o.Ab(3,49152,null,0,a.Ab,[o.j,o.p,o.F],null,null),(n()(),o.Bb(4,0,null,0,2,"ion-button",[["class","backBtn"]],null,[[null,"click"]],(function(n,l,t){var o=!0;return"click"===l&&(o=!1!==n.component.backBtnClk()&&o),o}),i.r,i.b)),o.Ab(5,49152,null,0,a.i,[o.j,o.p,o.F],null,null),(n()(),o.Sb(-1,0,[" Back"])),(n()(),o.Bb(7,0,null,0,2,"ion-title",[["class","head"]],null,null,null,i.E,i.o)),o.Ab(8,49152,null,0,a.yb,[o.j,o.p,o.F],null,null),(n()(),o.Sb(-1,0,["Find Game"])),(n()(),o.Bb(10,0,null,null,10,"ion-content",[["class","cont"]],null,null,null,i.v,i.f)),o.Ab(11,49152,null,0,a.s,[o.j,o.p,o.F],null,null),(n()(),o.Bb(12,0,null,0,8,"body",[["class","bod"]],null,null,null,null,null)),(n()(),o.Bb(13,0,null,null,3,"ion-searchbar",[["class","search"],["showcancelbutton",""]],null,[[null,"ionInput"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,t){var u=!0,e=n.component;return"ionBlur"===l&&(u=!1!==o.Nb(n,16)._handleBlurEvent(t.target)&&u),"ionChange"===l&&(u=!1!==o.Nb(n,16)._handleInputEvent(t.target)&&u),"ionInput"===l&&(u=!1!==e.filterList(t)&&u),u}),i.D,i.n)),o.Pb(5120,null,c.e,(function(n){return[n]}),[a.Kb]),o.Ab(15,49152,null,0,a.ib,[o.j,o.p,o.F],null,null),o.Ab(16,16384,null,0,a.Kb,[o.p],null,null),(n()(),o.Bb(17,0,null,null,3,"ion-list",[],null,null,null,i.B,i.l)),o.Ab(18,49152,null,0,a.M,[o.j,o.p,o.F],null,null),(n()(),o.qb(16777216,null,0,1,null,f)),o.Ab(20,278528,null,0,r.i,[o.W,o.S,o.x],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){n(l,20,0,l.component.gameList)}),null)}function g(n){return o.Ub(0,[(n()(),o.Bb(0,0,null,null,1,"app-find-game",[],null,null,null,d,m)),o.Ab(1,114688,null,0,p,[b.a,s.m,a.Fb],null,null)],(function(n,l){n(l,1,0)}),null)}var h=o.xb("app-find-game",p,g,{},{},[]),L=function(){return function(){}}();t.d(l,"FindGamePageModuleNgFactory",(function(){return k}));var k=o.yb(u,[],(function(n){return o.Kb([o.Lb(512,o.m,o.jb,[[8,[e.a,h]],[3,o.m],o.D]),o.Lb(4608,r.l,r.k,[o.z,[2,r.u]]),o.Lb(4608,c.k,c.k,[]),o.Lb(4608,a.a,a.a,[o.F,o.g]),o.Lb(4608,a.Eb,a.Eb,[a.a,o.m,o.w]),o.Lb(4608,a.Ib,a.Ib,[a.a,o.m,o.w]),o.Lb(1073742336,r.c,r.c,[]),o.Lb(1073742336,c.j,c.j,[]),o.Lb(1073742336,c.c,c.c,[]),o.Lb(1073742336,a.Cb,a.Cb,[]),o.Lb(1073742336,s.o,s.o,[[2,s.t],[2,s.m]]),o.Lb(1073742336,L,L,[]),o.Lb(1073742336,u,u,[]),o.Lb(1024,s.k,(function(){return[[{path:"",component:p}]]}),[])])}))}}]);