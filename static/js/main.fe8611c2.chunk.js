(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,a){e.exports=a.p+"static/media/user2.f3b2f63b.png"},118:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(9),i=a.n(r),l=(a(61),a(32)),c=a(18),o=a(19),m=a(21),u=a(20),h=a(22),g=(a(62),a(30)),d=a.n(g),E=a(119),p=a(120),A=a(121),f=a(122),b=a(123),v=a(124),y=a(136),w=a(125),x=a(51),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={rightUsername:!0},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleSignIn",value:function(e){e.preventDefault();var t=this.refs.username.value;/^[\w-]+$/.test(t)?(this.setState({rightUsername:!0}),this.props.onSignIn(t)):this.setState({rightUsername:!1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"login__form"},s.a.createElement(E.a,{onSubmit:this.handleSignIn.bind(this)},s.a.createElement(p.a,{tag:"h1",style:{backgroundColor:"#7FDBFF"}},"Real-Time Chat"),s.a.createElement(A.a,{body:!0,inverse:!0,color:"info"},s.a.createElement(f.a,{tag:"h5"},"SIGN-IN"),s.a.createElement(b.a,null,s.a.createElement(v.a,null,s.a.createElement(y.a,{addonType:"prepend"},"@"),s.a.createElement("input",{style:{width:350,height:50,borderRadius:5},type:"text",ref:"username",required:"required",minLength:1,maxLength:12,placeholder:"----------------  Enter Username  -----------------"})),s.a.createElement(w.a,{color:"warning"},"Username must be between 1 and 12 characters long"),s.a.createElement(w.a,{color:"warning"},"Username can contain only letters, numbers and symbols")),s.a.createElement(x.a,{type:"submit",value:"Login",color:"danger"},s.a.createElement("i",{className:"fa fa-sign-in",style:{fontSize:"36px"}}))," ")))}}]),t}(s.a.Component),N=a(126),j=a(127),k=a(128),D=a(129),F=a(130),I=a(137),O=a(131),G=a(132),L=a(133),S=a(134),U=a(135),W=a(52),B=a.n(W),P=a(53),R=a.n(P),M=a(54),J=a.n(M),X=d()("http://gifted-antonym-257013.appspot.com/");X.on("connect",function(){});var Z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={signedin:!1,user:null,messages:[],message:"",path:"./user1.png"},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"signIn",value:function(e){this.setState({signedin:!0,user:{username:e}})}},{key:"signOut",value:function(){this.setState({signedin:!1,user:null})}},{key:"componentDidMount",value:function(){var e=this;this.socket=d()("http://gifted-antonym-257013.appspot.com/"),X.on("messages",function(t){e.setState({messages:t})}),X.on("new_message",function(t){e.setState({messages:[].concat(Object(l.a)(e.state.messages),[t])})})}},{key:"createList",value:function(e){return s.a.createElement("p",{key:e.id},s.a.createElement("div",{style:{marginLeft:"10px"}},s.a.createElement("img",{alt:"user pic",width:"20px",height:"20px",src:a(108)})," ",s.a.createElement("strong",{style:{color:"red"}},e.username," ")),s.a.createElement(A.a,{body:!0,inverse:!0,style:{height:"70px",width:"350px",borderRadius:"20px",marginLeft:"60px",backgroundColor:"#3FE0D0"}},s.a.createElement("div",null,s.a.createElement(R.a,{className:"message__content"},s.a.createElement(J.a,{color:"danger",style:{height:20,width:20}},e.content)))))}},{key:"handleInput",value:function(e){this.setState({message:e.target.value})}},{key:"handleButton",value:function(){var e=this;X.emit("message",{username:this.state.user.username,content:this.state.message},function(t){e.setState({messages:[].concat(Object(l.a)(e.state.messages),[t.data.newMessage])})}),this.setState({message:"halkat"})}},{key:"render",value:function(){var e=this;return this.state.signedin?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"loginPage"},s.a.createElement(N.a,{color:"dark",className:"navbar__header",light:!0,expand:"md"},s.a.createElement(j.a,{className:"navbar__brand",style:{color:"#39ff14"}},s.a.createElement(k.a,{type:"grow",color:"warning",style:{width:"2rem",height:"2rem"}}),"Real-Time Chat"),s.a.createElement(D.a,{isOpen:this.state.isOpen,navbar:!0},s.a.createElement(F.a,{className:"ml-auto",navbar:!0},s.a.createElement(I.a,{nav:!0,inNavbar:!0},s.a.createElement(O.a,{nav:!0,caret:!0,style:{color:"white"}},s.a.createElement("span",{style:{color:"white",fontSize:10}},"Welcome! You're logged in as")," ",s.a.createElement("img",{src:B.a,alt:"User image",width:"25px"}),s.a.createElement("strong",{style:{color:"orange",fontSize:20}},this.state.user.username," ",s.a.createElement(k.a,{size:"sm",color:"primary"})," ")),s.a.createElement(G.a,{right:!0},s.a.createElement(L.a,null,s.a.createElement(x.a,{color:"danger",style:{width:100,height:40,borderRadius:5},onClick:this.signOut.bind(this)},s.a.createElement("i",{className:"fa fa-sign-out"},"Signout")))))))),s.a.createElement("br",null)),s.a.createElement("div",{className:"messageList",style:{position:"absolute",left:"30%",top:"10%",bottom:"50%"}},s.a.createElement(A.a,{style:{width:"600px"}},s.a.createElement(p.a,{color:"primary",tag:"h5",style:{backgroundColor:"#87CEFA",position:"fixed-top"}},s.a.createElement("i",{className:"fa fa-comments"})," Welcome to Live Chat!"),s.a.createElement("div",{class:"scrollbar",id:"style-default"},s.a.createElement("div",{class:"force-overflow"},s.a.createElement(S.a,null,this.state.messages.map(function(t){return e.createList(t)})))),s.a.createElement(U.a,{style:{position:"fixed-bottom",display:"flex"}},s.a.createElement("textarea",{minLength:1,maxLength:200,style:{width:500,height:50,borderRadius:5},type:"text",value:this.state.value,onChange:this.handleInput.bind(this),required:"required",placeholder:"Type message here ......"}),s.a.createElement(x.a,{color:"danger",style:{width:100,height:50,borderRadius:5},onClick:this.handleButton.bind(this)},s.a.createElement("i",{className:"fa fa-send"})))))):s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"loginApp"},this.state.user?s.a.createElement(Y,{user:this.state.user,onSignOut:this.signOut.bind(this)}):s.a.createElement(C,{onSignIn:this.signIn.bind(this)})))}}]),t}(n.Component),Y=function(e){var t=e.user;return s.a.createElement("div",null,"Welcome ",s.a.createElement("strong",null,t.username),"! ",s.a.createElement("br",null))},V=Z;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(116),a(117);i.a.render(s.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},52:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAO/SURBVGhD7ZjfSxRRFMe3gqKnXorwuVToIQ0fMsn9KWi6a7urGxFI6H9QVCBIPvhWD5VZGgZJoYEFoe2OUpFJWqAgaJBUhGXZjwdNyR9B7r2dM56V2fGs7m46u8V+4cNc5p77vd8zM3cFTSmllFJK/49yc3O32+3248B9YNRms83CVYZwOBxWKk0+Wa3WMgj8URtYD8z3UHlyCcLV6cNGApp4A9cL+fn5abQ8sYJA1fqQUfIT1nrJJjGCz+YgBPmtCxY10MAinIsCsjNe+E1zwWIBPMZ9Pt9WsjROFoslmwvEUekrkC01hXLsTol61c/jDwDZGifY+Lw+iBZtaNnlCkPfBLyFW2RrnLjPZ7XQenRNDJKtcYIG1N/8WELr0TQxRrbGCTadx825YLGAHvAw5sjWONGTY0PFQsiHbI3TP92AaEsvOVdxaGG9Gqg+mTcvWtOLyX7jJe5mfAq2Zcr6M4VhYRor01W097Rw8w1nCyV6ibaMcbLfeGED8m5GWBCkCcIh+vshIs6Dl7ENwOvGJoRSIlaEiRH0wPCiNbOQ7I2TUFyjXKhYEF2u12RnvKCBZi5ULIgu5w2yM16yq7SACxULIuCyk11iBE+wlwsWDUJxPiWbxEl0u/ZKxTnNBVwN+PwmcS3ZJFbCX2qGwzjFBeVQw8MaWp4cEo9K0uWDPDZwGFAjFPceWpZckk0mKVt2Snlvv5SdNimVYuAIjK1L93AOaqg8+aQ2EAVUnnziwnJQeXLI5vbnmD3+q8C7kZf9E/JDp5SDtfC9O6W8nbYEjvEezGEN1prdgXpzmXKAbIyXxaPkmt3+PosnIENUnertkxp9b2xU0QprtGugmef4EMh241VUpGyD4M0Wj19og6i4A/NTP35NYlAM/iorSyXUBM5hDbMuCFzb52vf2P8P2V0du2HDFysCaLh4ffhZpAZwjlsTAt/G4XJlF223vkJj/Ha5jbU4ypXxxWAwuDg9vdwAjvEeznFrwvGPFPge76Bt10tyExy6bn7DlXT3fB6YGx5ebgDHeI+r5YAH9ZA2Xh9ZvP4KbqNIlFU9GZjq6FhuAMd4j6uNhNkbOEHb/518vvYtcMDec5tEBA7lUN3lmVADOFYPKlcbCXfgram2djPFiF/Wo4qD3WANao41TIQawDFXsxZmr99GMeIXPIkrnPla2D2dM0PZORLBMVezFnDuLlGM+AVG/XrjaLnpPD2LcHPRgH8oKUb8MnsC3zjzaPCWtX9BuLlogDfwlWLEL3gKC5y5EeDeFCOlJJXJ9AcqbsjJAFC5qgAAAABJRU5ErkJggg=="},56:function(e,t,a){e.exports=a(118)},61:function(e,t,a){},62:function(e,t,a){},88:function(e,t){}},[[56,1,2]]]);
//# sourceMappingURL=main.fe8611c2.chunk.js.map