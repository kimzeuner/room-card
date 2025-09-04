/*! For license information please see room-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",_=f.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,_?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.1");const A=globalThis,E=A.trustedTypes,x=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,k=`<${S}>`,j=document,P=()=>j.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,I=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=L(1),q=(L(2),L(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),V=new WeakMap,J=j.createTreeWalker(j,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=D;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===D?"!--"===c[1]?r=H:void 0!==c[1]?r=I:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=N):void 0!==c[3]&&(r=N):r===N?">"===c[0]?(r=n??D,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?N:'"'===c[3]?z:U):r===z||r===U?r=N:r===H||r===I?r=D:(r=N,n=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";o+=r===D?i+k:l>=0?(s.push(a),i.slice(0,l)+O+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=X.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(O)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),J.nextNode(),a.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??j).importNode(e,!0);J.currentNode=s;let n=J.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=J.nextNode(),o++)}return J.currentNode=j,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new X(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),o||=!R(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(X,Q),(A.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},dt=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var ut,pt,ft;(ft=ut||(ut={})).language="language",ft.system="system",ft.comma_decimal="comma_decimal",ft.decimal_comma="decimal_comma",ft.space_comma="space_comma",ft.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(pt||(pt={}));var mt=["closed","locked","off"],gt=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n}),_t=new Set(["call-service","divider","section","weblink","cast","select"]),bt={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},yt=function(t){gt(window,"haptic",t)},vt=function(t,e,i,s){var n;"double_tap"===s&&i.double_tap_action?n=i.double_tap_action:"hold"===s&&i.hold_action?n=i.hold_action:"tap"===s&&i.tap_action&&(n=i.tap_action),function(t,e,i,s){if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(yt("warning"),confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?")))switch(s.action){case"more-info":(i.entity||i.camera_image)&&gt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),gt(window,"location-changed",{replace:i})}(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var s,n=function(t){return t.substr(0,t.indexOf("."))}(e),o="group"===n?"homeassistant":n;switch(n){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(o,s,{entity_id:e})})(t,e,mt.includes(t.states[e].state))}(e,i.entity),yt("success"));break;case"call-service":if(!s.service)return void yt("failure");var n=s.service.split(".",2);e.callService(n[0],n[1],s.service_data,s.target),yt("success");break;case"fire-dom-event":gt(t,"ll-custom",s)}}(t,e,i,n)};function $t(t){return void 0!==t&&"none"!==t.action}const wt=t=>t<10?`0${t}`:t,At="unavailable",Et="unknown",xt=[At,Et],Ot="last-changed",Ct="last-updated",St=["relative","total","date","time","datetime"],kt="language",jt=(t,e,i)=>{const s=e?(t=>{switch(t.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t.language}})(e):void 0;if("none"!==e?.number_format&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,Pt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,Pt(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,i?.maximumFractionDigits).toString()}${"currency"===i?.style?` ${i.currency}`:""}`},Pt=(t,e)=>({maximumFractionDigits:2,...e}),Rt=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"}).format(t),Tt=t=>{if(t.time_format===kt||"system"===t.time_format){const e=t.time_format===kt?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return"12"===t.time_format},Mt=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:Tt(e)?"numeric":"2-digit",minute:"2-digit",hour12:Tt(e)}).format(t),Dt=(t,e)=>new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:Tt(e)}).format(t),Ht=t=>t.entity_id.substr(0,t.entity_id.indexOf(".")),It=(t,e,i)=>t&&"object"==typeof t&&"template"in t?Jt(e,i,t.template):t,Nt=t=>"object"==typeof t&&!Array.isArray(t)&&!!t,Ut=t=>!t||xt.includes(t.state),zt=t=>{if(t.attribute&&void 0===t.stateObj.attributes[t.attribute])throw new Error(`Entity: '${t.entity}' has no attribute named '${t.attribute}'`);return t.attribute?t.stateObj.attributes[t.attribute]:t.stateObj.state},Bt=t=>[t.entity].concat(t.entities?.map(t=>Lt(t))).concat(t.info_entities?.map(t=>Lt(t))).concat(t.rows?.flatMap(t=>t.entities).map(t=>Lt(t))).concat(t.cards?.flatMap(t=>qt(t))).concat(Ft(t)).filter(t=>t),Lt=t=>void 0===t?null:"string"==typeof t?t:t.entity,Ft=t=>{const e=(t=>{let e=[];return t?.forEach(t=>{const i=t?.icon?.conditions?.filter(t=>void 0!==t.entity);i&&(e=e.concat(i));const s=t?.hide_if?.conditions?.filter(t=>void 0!==t.entity);s&&(e=e.concat(s))}),e})([t.entities,t.info_entities,t.rows?.flatMap(t=>t.entities)].flatMap(t=>t));return e.filter(t=>t.entity).map(t=>t.entity)},qt=t=>[Lt(t.entity)].concat(t.cards?.flatMap(t=>qt(t))).concat(t.entities?.flatMap(t=>Lt(t))).filter(t=>t),Wt=(t,e)=>{const i="boolean"==typeof t.value?String(t.value):t.value;return"equals"==t.condition&&e==i||"not_equals"==t.condition&&e!=i||"above"==t.condition&&e>i||"below"==t.condition&&e<i||void 0},Vt=(t,e,i)=>{let s="string"==typeof t?{entity:t}:t;return s=((t,e)=>{if(void 0!==t&&t.template){const i=e.templates.filter(e=>e.name===t.template);if(i.length>0){const e=i[0];return{stateObj:t.stateObj,...e.template,...t}}}return t})(s,i),{...s,stateObj:e.states[s.entity]}},Jt=(t,e,i)=>{try{return new Function("states","entity","user","hass","html",`'use strict'; ${i}`).call(void 0,t?.states,e,t?.user,t,F)}catch(t){const e=i.length<=100?i.trim():`${i.trim().substring(0,98)}...`;throw t.message=`${t.name}: ${t.message} in '${e}'`,t.name="RoomCardJSTemplateError",t}},Zt=(t,e)=>{if((t=>t.hide_unavailable&&Ut(t.stateObj))(t))return!0;if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.stateObj.state,s=t.hide_if.conditions?.filter(s=>{let n=i;if(s.entity){const t=e.states[s.entity];n=s.attribute?t.attributes[s.attribute]:t.state}return s.attribute&&!s.entity&&(n=t.stateObj.attributes[s.attribute]),Wt(s,n)});return s?.length>0}};class Kt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Xt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class Yt extends HTMLElement{constructor(){super(),Object.defineProperty(this,"holdTime",{enumerable:!0,configurable:!0,writable:!0,value:500}),Object.defineProperty(this,"ripple",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"held",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"dblClickTimeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Xt?"100px":"50px",height:Xt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?gt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,gt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,gt(t,"action",{action:"double_tap"})):gt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",s),t.addEventListener("touchcancel",s),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",s),t.addEventListener("keyup",t=>{13===t.keyCode&&s(t)})}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-roomcard",Yt);const Gt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Kt{update(t,[e]){return((t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-roomcard"))return t.querySelector("action-handler-roomcard");const e=document.createElement("action-handler-roomcard");return t.appendChild(e),e})();i&&i.bind(t,e)})(t.element,e),q}render(t){}}),Qt=(t,e)=>{if(Ut(e.stateObj))return t.localize(`state.default.${e.stateObj.state}`);let i=zt(e),s=void 0!==e.attribute?e.unit:e.unit||e.stateObj.attributes.unit_of_measurement;if(e.format)return({value:i,unit:s}=re(e,i,t,s)),`${i}${s?` ${s}`:""}`;if(e.attribute)return`${isNaN(i)?i:jt(i,t.locale)}${s?` ${s}`:""}`;const n={...e.stateObj,attributes:{...e.stateObj.attributes,unit_of_measurement:s}};return((t,e,i)=>{const s=e.state;if(s===Et||s===At)return t(`state.default.${s}`);if((t=>!!t.attributes.unit_of_measurement||!!t.attributes.state_class)(e)){if("monetary"===e.attributes.device_class)try{return jt(s,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return`${jt(s,i)}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`}const n=Ht(e);if("input_datetime"===n){let t;return e.attributes.has_date&&e.attributes.has_time?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Mt(t,i)):e.attributes.has_date?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Rt(t,i)):e.attributes.has_time?(t=new Date,t.setHours(e.attributes.hour,e.attributes.minute),Dt(t,i)):e.state}return"humidifier"===n&&"on"===s&&e.attributes.humidity?`${e.attributes.humidity} %`:"counter"===n||"number"===n||"input_number"===n?jt(s,i):"button"===n||"sensor"===n&&"timestamp"===e.attributes.device_class?Mt(new Date(s),i):e.attributes.device_class&&t(`component.${n}.state.${e.attributes.device_class}.${s}`)||t(`component.${n}.state._.${s}`)||s})(t.localize,n,t.locale)},te=(t,e,i)=>{if(!t)return"";if("template"in t)return Jt(i,e,t.template);const s=t;return Object.keys(s).map(t=>`${t}: ${s[t]};`).join("")},ee=(t,e,i,s)=>{if(void 0!==e.show_icon&&!1===e.show_icon)return null;const n=((t,e,i)=>{if("icon"in e&&(void 0===e.show_icon||!1===e.show_icon))throw new Error(`Entity: ${e.entity} => Icon defined but show_icon is set to false or not defined. Please set show_icon to true`);return"icon"in e?"string"==typeof e.icon?e.icon:e.icon.state_on?((t,e)=>{switch(Ht(t)){case"light":case"switch":case"binary_sensor":case"input_boolean":return"on"===t.state?e.state_on:e.state_off}})(t,e.icon):e.icon.conditions?((t,e,i)=>{const s=t.state;return e.icon.conditions.filter(e=>{let n=s;if(e.entity){const t=i.states[e.entity];n=e.attribute?t.attributes[e.attribute]:t.state}return e.attribute&&!e.entity&&(n=t.attributes[e.attribute]),Wt(e,n)}).pop()})(t,e,i):e.icon.template?.icon?Jt(i,t,e.icon.template.icon):void 0:t.attributes.icon||null})(t,e,i),o=((t,e,i)=>{const s=e.icon;return void 0!==s?.template?.styles?Jt(i,t,s.template.styles):null})(t,e,i);return F`<state-badge
        class="icon-small ${s}"
        .hass=${i}
        .stateObj="${t}"
        .overrideIcon="${Nt(n)?n.icon:n}"
        .stateColor="${e.state_color}"
        style="${o??te(Nt(n)?n.styles:null,i.states[e.entity],i)}"
    ></state-badge>`},ie=(t,e)=>{if(!0===t.toggle)return F`<ha-entity-toggle .stateObj="${t.stateObj}" .hass="${e}"></ha-entity-toggle>`;if(!0===t.show_icon)return ee(t.stateObj,t,e);if(t.attribute&&[Ot,Ct].includes(t.attribute))return F`<ha-relative-time
            .hass=${e}
            .datetime=${t.attribute===Ot?t.stateObj.last_changed:t.stateObj.last_updated}
            capitalize
        ></ha-relative-time>`;if(t.format&&St.includes(t.format)){const i=zt(t),s=new Date(i);return s instanceof Date&&!isNaN(s.getTime())?F`<hui-timestamp-display
            .hass=${e}
            .ts=${s}
            .format=${t.format}
            capitalize
        ></hui-timestamp-display>`:i}return Qt(e,t)},se=(t,e,i,s)=>{vt(t,e,i,s.detail.action)},ne=(t,e,i,s,n)=>void 0===e?null:F`<div class="${((t,e)=>`entities-row ${t.content_alignment?`content-${t.content_alignment}`:"content-left"}${void 0!==e?` ${e}`:""}`)(t,n)}">${e.map(t=>oe(t,i,s))}</div>`,oe=(t,e,i)=>null==t.stateObj||Zt(t,e)?null:F`<div class="entity" style="${te(t.styles,e.states[t.entity],e)}"
            @action=${s=>{e&&t&&s.detail.action&&se(i,e,t,s)}}
            .actionHandler=${Gt({hasHold:$t(t.hold_action),hasDoubleClick:$t(t.double_tap_action)})}>
            ${void 0===t.show_name||t.show_name?F`<span>${((t,e)=>{return It(t.name,e,t.stateObj)||(t.entity?t.stateObj.attributes.friendly_name||(i=t.stateObj.entity_id).substr(i.indexOf(".")+1):null)||null;var i})(t,e)}</span>`:""}
            <div>${ee(t.stateObj,t,e)}</div>
            ${t.show_state?F`<span>${Qt(e,t)}</span>`:""}
        </div>`,re=(t,e,i,s)=>{if(t.format.startsWith("precision")){const s=parseInt(t.format.slice(-1),10);e=jt(e,i.locale,{minimumFractionDigits:s,maximumFractionDigits:s})}else isNaN(parseFloat(e))||!isFinite(e)||("brightness"===t.format?(e=Math.round(e/255*100),s="%"):t.format.startsWith("duration")?(e=function(t){const e=Math.floor(t/3600),i=Math.floor(t%3600/60),s=Math.floor(t%3600%60);return e>0?`${e}:${wt(i)}:${wt(s)}`:i>0?`${i}:${wt(s)}`:s>0?""+s:null}("duration-m"===t.format?e/1e3:e),s=void 0):"kilo"===t.format?e=jt(e/1e3,i.locale,{maximumFractionDigits:2}):"invert"===t.format?e=jt(e-2*e,i.locale):"position"===t.format&&(e=jt(100-e,i.locale)));return{value:e,unit:s}},ae=o`
    ha-card {
        display: flex;
        flex-direction: column;
    }
    ha-card .card-header {
        padding-bottom: 0px;
    }
    .icon-small {
        display: inline-block;
    }
    .entity {
        text-align: center;
        cursor: pointer;
    }
    .entity span {
        font-size: 10px;
    }
    .entities-row {
        flex-direction: row;
        flex-wrap: wrap;
        display: inline-flex;
        align-items: center;
        padding: 0 20px 10px 20px;
    }
    .entities-row .entity {
        margin-right: 16px;
    }    
    .entities-row .entity:last-of-type,
    .entities-info-row .entity:last-of-type {
        margin-right: 0;
    }
    .entities-column {
        flex-direction: column;
        display: flex;
        align-items: flex-end;
        justify-content: space-evenly;
    }
    .entities-column .entity div {
        display: inline-block;
        vertical-align: middle;
    }

    .entities-info-row {
        flex-direction: row;
        flex-wrap: wrap;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 10px 20px;
        font-size: 12px;
        position: absolute;
        right: 20px;
        top: 15px;
    }
    .entities-info-row .entity {
        margin-right: 16px;
    }
    .entities-info-row .entity.icon-entity {
        margin-right: 0px;
    }
    .main-state {
        float: left;
        margin-right: 10px;
    }
    .main-state > ha-state-icon > ha-svg-icon {
        vertical-align: baseline;
    }
    .main-icon {
        vertical-align: baseline;
        font-size: 30px;
    }
    .title {
        min-height: 48px;
    }
    .clickable {
        cursor: pointer;
    }
    .content-left {
        justify-content: left;
    }
    .content-center {
        justify-content: center;
    }
    .content-right {
        justify-content: right;
    }
    /* --- Header vertical alignment fix --- */
    
    /* Gesamter Header als Flex-Zeile */
    :host .card-header {
      display: flex;
      align-items: center;          /* vertikal zentriert */
      justify-content: space-between;
      gap: 12px;
      min-height: 40px;             /* stabile Zeilenhöhe */
    }
    
    /* Der erste Block im Header ist das Ergebnis von renderTitle(...).
       Wir zwingen ihn zu einem Flex-Container, damit Icon + Text sauber zentrieren. */
    :host .card-header > *:first-child {
      display: flex;
      align-items: center;          /* Icon + Text auf eine Höhe */
      gap: 8px;
      min-height: 32px;
    }
    
    /* Häufige Titel-Elemente (falls vorhanden) ebenfalls flexen */
    :host .card-header > *:first-child .title,
    :host .card-header > *:first-child .name,
    :host .card-header > *:first-child h1,
    :host .card-header > *:first-child h2 {
      display: flex;
      align-items: center;
      margin: 0;
      line-height: 1.2;
    }
    
    /* Badges/Icons wirklich zentriert darstellen */
    :host .card-header > *:first-child state-badge,
    :host .card-header > *:first-child ha-state-icon,
    :host .card-header > *:first-child ha-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }


`;var ce=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD-EDITOR: module loaded");let le=0,de=class extends at{constructor(){super(),Object.defineProperty(this,"hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_addRow",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureRows();const t=[...this._config.rows];t.push({entities:[]}),this._config.rows=t,this._emitChanged()}}),Object.defineProperty(this,"_removeRow",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows];e.splice(t,1),this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_addRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows],i={...e[t]||{entities:[]}};i.entities=Array.isArray(i.entities)?[...i.entities]:[],i.entities.push({entity:"",name:"",icon:"",show_icon:!0,show_state:!0}),e[t]=i,this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_removeRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],s={...i[t]||{entities:[]}};s.entities=Array.isArray(s.entities)?[...s.entities]:[],s.entities.splice(e,1),i[t]=s,this._config.rows=i,this._emitChanged()}}),Object.defineProperty(this,"_updateRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i,s)=>{this._ensureRows();const n=[...this._config.rows],o={...n[t]||{entities:[]}};o.entities=Array.isArray(o.entities)?[...o.entities]:[];const r={...o.entities[e]||{}};r[i]=s,o.entities[e]=r,n[t]=o,this._config.rows=n,this._emitChanged()}}),Object.defineProperty(this,"_addInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureInfo();const t=[...this._config.info_entities];t.push({entity:"",name:"",icon:"",show_icon:!0}),this._config.info_entities=t,this._emitChanged()}}),Object.defineProperty(this,"_removeInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureInfo();const e=[...this._config.info_entities];e.splice(t,1),this._config.info_entities=e,this._emitChanged()}}),Object.defineProperty(this,"_updateInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i)=>{this._ensureInfo();const s=[...this._config.info_entities],n={...s[t]||{}};n[e]=i,s[t]=n,this._config.info_entities=s,this._emitChanged()}}),console.info("ROOM-CARD-EDITOR: constructed")}connectedCallback(){super.connectedCallback(),["ha-entity-picker","ha-icon-picker"].forEach(t=>customElements.whenDefined(t).then(()=>this.requestUpdate()))}setConfig(t){console.info("ROOM-CARD-EDITOR: setConfig()",t);const e=Array.isArray(t.rows)?t.rows.map(t=>({...t,entities:Array.isArray(t?.entities)?[...t.entities]:[]})):[],i=Array.isArray(t.info_entities)?t.info_entities.map(t=>({...t})):[];this._config={...t,rows:e,info_entities:i},this.requestUpdate()}_emitChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_set(t,e){this._config={...this._config,[t]:e},this._emitChanged()}_ensureRows(){Array.isArray(this._config.rows)||(this._config.rows=[])}_ensureInfo(){Array.isArray(this._config.info_entities)||(this._config.info_entities=[])}_TF(t,e,i){return customElements.get("ha-textfield")?F`<ha-textfield
          .value=${e??""}
          label=${t}
          @input=${t=>i(t.currentTarget.value)}
        ></ha-textfield>`:F`<label class="lbl"
          >${t}
          <input class="plain" .value=${e??""} @input=${t=>i(t.currentTarget.value)} />
        </label>`}_EntityPicker(t,e,i){if(customElements.get("ha-entity-picker"))return F`<ha-entity-picker
        .hass=${this.hass}
        .value=${e??""}
        label=${t}
        allow-custom-entity
        ?disabled=${!this.hass}
        @value-changed=${t=>i(t.detail.value)}
      ></ha-entity-picker>`;const s="rc-entities-"+ ++le,n=Object.keys(this.hass?.states??{}).sort();return F`
      <label class="lbl">
        ${t}
        <input
          class="plain"
          list=${s}
          .value=${e??""}
          @input=${t=>i(t.currentTarget.value)}
          placeholder="sensor.xyz, switch.xyz, …"
        />
      </label>
      <datalist id=${s}>
        ${n.map(t=>F`<option value=${t}></option>`)}
      </datalist>
    `}_IconPicker(t,e){return customElements.get("ha-icon-picker")?F`<ha-icon-picker
          .value=${t??""}
          label="Icon"
          @value-changed=${t=>e(t.detail.value)}
        ></ha-icon-picker>`:this._TF("Icon (mdi:…)",t,e)}_Switch(t,e,i){return customElements.get("ha-switch")&&customElements.get("ha-formfield")?F`<ha-formfield label=${t}
        ><ha-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></ha-switch
      ></ha-formfield>`:customElements.get("mwc-switch")&&customElements.get("mwc-formfield")?F`<mwc-formfield label=${t}
        ><mwc-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></mwc-switch
      ></mwc-formfield>`:F`<label class="lbl"
      ><input type="checkbox" .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)} />
      ${t}</label
    >`}_Btn(t,e,i="primary"){return customElements.get("mwc-button")?F`<mwc-button dense class=${i} @click=${e}>${t}</mwc-button>`:F`<button class="plain-btn ${i}" @click=${e}>${t}</button>`}render(){if(!this._config)return F`<div class="hint">Loading editor…</div>`;const t=this._config;return F`
      <div class="form">
        <!-- Header -->
        <div class="section">
          <div class="section-title">Header</div>
          <div class="field">
            ${this._TF("Title",t.title??"",t=>this._set("title",t))}
          </div>
          <div class="field">
            ${this._EntityPicker("Entity (required)",t.entity??"",t=>this._set("entity",t))}
          </div>
          <div class="toggles">
            ${this._Switch("Hide title",!!t.hide_title,t=>this._set("hide_title",t))}
          </div>
        </div>

        <!-- Rows -->
        <div class="section">
          <div class="section-title">
            Rows
            ${this._Btn("Add row",this._addRow)}
          </div>

          ${(t.rows??[]).length?t.rows.map((t,e)=>F`
                  <div class="row-card">
                    <div class="row-header">
                      <div class="row-title">Row ${e+1}</div>
                      <div class="row-actions">
                        ${this._Btn("Add entity",()=>this._addRowEntity(e),"ghost")}
                        ${this._Btn("Remove row",()=>this._removeRow(e),"danger")}
                      </div>
                    </div>

                    ${Array.isArray(t.entities)&&t.entities.length?t.entities.map((t,i)=>F`
                            <div class="entity-block">
                              <div class="field">
                                ${this._EntityPicker("Entity",t.entity??"",t=>this._updateRowEntity(e,i,"entity",t))}
                              </div>
                              <div class="field">
                                ${this._TF("Name (optional)",t.name??"",t=>this._updateRowEntity(e,i,"name",t))}
                              </div>
                              <div class="field">
                                ${this._IconPicker(t.icon??"",t=>this._updateRowEntity(e,i,"icon",t))}
                              </div>
                              <div class="toggles">
                                ${this._Switch("Show icon",!1!==t.show_icon,t=>this._updateRowEntity(e,i,"show_icon",t))}
                                ${this._Switch("Show state",!1!==t.show_state,t=>this._updateRowEntity(e,i,"show_state",t))}
                              </div>
                              <div class="actions">
                                ${this._Btn("Remove",()=>this._removeRowEntity(e,i),"danger")}
                              </div>
                            </div>
                          `):F`<div class="hint">No entities in this row yet.</div>`}
                  </div>
                `):F`<div class="hint">No rows yet. Click “Add row”.</div>`}
        </div>

        <!-- Info entities (ohne Show state) -->
        <div class="section">
          <div class="section-title">
            Info entities
            ${this._Btn("Add entity",this._addInfoEntity)}
          </div>

          ${Array.isArray(t.info_entities)&&t.info_entities.length?t.info_entities.map((t,e)=>F`
                  <div class="entity-block">
                    <div class="field">
                      ${this._EntityPicker("Entity",t.entity??"",t=>this._updateInfoEntity(e,"entity",t))}
                    </div>
                    <div class="field">
                      ${this._TF("Name (optional)",t.name??"",t=>this._updateInfoEntity(e,"name",t))}
                    </div>
                    <div class="field">
                      ${this._IconPicker(t.icon??"",t=>this._updateInfoEntity(e,"icon",t))}
                    </div>
                    <div class="toggles">
                      ${this._Switch("Show icon",!1!==t.show_icon,t=>this._updateInfoEntity(e,"show_icon",t))}
                    </div>
                    <div class="actions">
                      ${this._Btn("Remove",()=>this._removeInfoEntity(e),"danger")}
                    </div>
                  </div>
                `):F`<div class="hint">No info entities. Click “Add entity”.</div>`}
        </div>
      </div>
    `}};Object.defineProperty(de,"styles",{enumerable:!0,configurable:!0,writable:!0,value:o`
    :host { display:block; box-sizing:border-box; padding:4px 0 8px; }
    /* Breite begrenzen, aber Dropdowns nicht mehr abschneiden */
    .form { display:grid; gap:16px; width:100%; max-width:560px; overflow:visible; }
  
    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:600; flex-wrap:wrap; }
  
    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
    .row-actions { display:flex; gap:8px; flex-wrap:wrap; }
  
    /* JEDES Feld darf überlaufen (für Dropdown-Overlays) */
    .entity-block { display:grid; grid-template-columns: 1fr; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; overflow:visible; }
    .field { min-width:0; overflow:visible; }
  
    /* Breiten/Box-Sizing erzwingen, damit Chevron sichtbar bleibt */
    ha-entity-picker,
    ha-icon-picker,
    ha-textfield,
    ha-combo-box {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
    }
  
    /* Menü unter dem Feld öffnen & gleiche Breite wie das Feld (mwc menu) */
    ha-entity-picker,
    ha-icon-picker {
      --mdc-menu-min-width: 100%;
    }
  
    /* HA-Toggles & Buttons */
    .toggles { display:grid; gap:8px; align-content:start; }
    .actions { display:flex; gap:8px; justify-content:flex-end; }
  
    .hint { opacity:.7; font-style:italic; }
    .lbl { display:grid; gap:6px; font-size:.9rem; }
    input.plain { width:100%; padding:8px; border:1px solid var(--divider-color,#ddd); border-radius:6px; background:var(--card-background-color,#fff); color: var(--primary-text-color); }
  
    .plain-btn { padding:6px 10px; border-radius:8px; border:1px solid var(--divider-color,#ccc); background: var(--secondary-background-color,#f6f6f6); cursor:pointer; }
    .plain-btn.ghost { background:transparent; }
    .plain-btn.danger { border-color: var(--error-color,#d32f2f); color: var(--error-color,#d32f2f); }
  
    mwc-button.danger { --mdc-theme-primary: var(--error-color, #d32f2f); }
  `}),ce([ht({attribute:!1})],de.prototype,"hass",void 0),ce([ht({state:!0,attribute:!1})],de.prototype,"_config",void 0),de=ce([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("room-card-editor")],de),customElements.get("room-card-editor")||customElements.define("room-card-editor",de);var he=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD: script executed"),window.customCards=window.customCards||[],window.customCards.some(t=>"room-card"===t.type)||window.customCards.push({type:"room-card",name:"Room Card",description:"Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI",preview:!0});class ue extends at{constructor(){super(...arguments),Object.defineProperty(this,"monitoredStates",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_configError",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stateObj",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_helpers",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}static getConfigElement(){return console.info("ROOM-CARD: getConfigElement()"),document.createElement("room-card-editor")}static getStubConfig(t,e){return{type:"custom:room-card",title:"Room",entity:Array.isArray(e)&&e.length?e[0]:void 0,show_icon:!0}}getChildCustomCardTypes(t,e){if(t)for(const i of t)i?.type?.startsWith?.("custom:")&&e.add(i.type.substring(7)),this.getChildCustomCardTypes(i.cards,e)}async waitForDependentComponents(t){const e=new Set;this.getChildCustomCardTypes(t.cards,e),e.size&&await Promise.all(Array.from(e).map(t=>customElements.whenDefined(t)))}async setConfig(t){this._configError=void 0;try{(t=>{if(null==t.entities&&null==t.entity&&void 0===t.info_entities&&void 0===t.rows&&void 0===t.cards)throw new Error("Please define entities.")})(t)}catch(t){this._configError=t?.message||String(t),console.warn("ROOM-CARD config warning:",t)}this.config={...t||{},entityIds:Bt(t||{})},null!==document.querySelector("hui-card-editor")||await this.waitForDependentComponents(this.config),"function"==typeof window.loadCardHelpers&&(this._helpers=await window.loadCardHelpers()),this.requestUpdate()}set hass(t){this._hass=t,t&&this.config&&(this.updateMonitoredStates(t),this.config.hass=t),this.requestUpdate()}updateMonitoredStates(t){const e={...this.monitoredStates||{}};let i=!1;for(const s of this.config.entityIds)if(s in t.states){const n=this.monitoredStates&&this.monitoredStates[s],o=t.states[s];(!this.monitoredStates||n?.last_updated<o.last_updated||n?.last_changed<o.last_changed||o!==e[s])&&(i=!0,e[s]=o)}else this.monitoredStates&&s in this.monitoredStates&&(i=!0,delete e[s]);i&&(this.monitoredStates=e)}static get styles(){return ae}render(){if(!this.config)return F``;if(!this._hass){const t=this.config.title??"Room";return F`
        <ha-card elevation="2">
          <div class="card-header"><div class="name">${t}</div></div>
          <div style="padding:12px; opacity:.7">Preview…</div>
        </ha-card>
      `}if(this._configError)return F`<hui-warning>${this._configError}</hui-warning>`;try{const{entity:t,info_entities:e=[],entities:i=[],rows:s=[],stateObj:n}=((t,e)=>{const i={info_entities:[],entities:[]};return e&&t?(i.stateObj=void 0!==t.entity?e.states[t.entity]:void 0,i.entity=void 0!==t.entity?{...t,stateObj:i.stateObj}:void 0,i.info_entities=t.info_entities?.map(i=>Vt(i,e,t))??[],i.entities=t.entities?.map(i=>Vt(i,e,t))??[],i.rows=t.rows?.map(i=>{const s=i.entities?.map(i=>Vt(i,e,t));return{entities:s,hide_if:i.hide_if,content_alignment:i.content_alignment}})??[],t.hass=e,i):i})(this.config,this._hass);return this.stateObj=n,F`
        <ha-card elevation="2" style="${te(this.config.card_styles,n,this._hass)}">
          <div class="card-header">
            ${((t,e,i,s)=>{if(!0===t.hide_title)return null;const n=void 0!==t.tap_action||void 0!==t.double_tap_action,o=It(t.title,e,s?.stateObj);return F`<div class="title${n?" clickable":null}" @action=${n=>{e&&n.detail.action&&se(i,e,s??{tap_action:t.tap_action,double_tap_action:t.double_tap_action,hold_action:t.hold_action},n)}}
    .actionHandler=${Gt({hasHold:$t(s?.hold_action),hasDoubleClick:$t(s?.double_tap_action)})}>${((t,e,i)=>{if(void 0===t)return null;const s=i.states[t.entity];return F`<div
        class="main-state entity"
        style="${te(t.styles,s,i)}">
        ${0===e.entities?.length||e.icon?ee(t.stateObj,e,i,"main-icon"):void 0!==t.show_state&&!1===t.show_state?"":ie(t,i)}
    </div>`})(s,t,e)} ${o}</div>`})(this.config,this._hass,this,t)}
            <div class="entities-info-row">
              ${e.map(t=>((t,e,i)=>void 0===t||!t.stateObj||Zt(t,e)?null:F`<div class="state entity ${!0===t.show_icon?"icon-entity":""}" style="${te(t.styles,t.stateObj,e)}" 
    @action=${s=>{e&&t&&s.detail.action&&se(i,e,t,s)}}
    .actionHandler=${Gt({hasHold:$t(t.hold_action),hasDoubleClick:$t(t.double_tap_action)})}>${ie(t,e)}</div>`)(t,this._hass,this))}
            </div>
          </div>

          ${s&&s.length>0?((t,e,i)=>{const s=t.filter(t=>!((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.hide_if.conditions?.filter(t=>{if(t.entity){const i=e.states[t.entity];return Wt(t,t.attribute?i.attributes[t.attribute]:i.state)}});return i?.length>0}})(t,e));return F`${s.map(t=>ne(t,t.entities,e,i))}`})(s,this._hass,this):ne(this.config,i,this._hass,this)}

          ${this.config.cards?.map(t=>this.createCardElement(t,this._hass))}
        </ha-card>
      `}catch(t){return console.warn("ROOM-CARD render error:",t),F`<hui-warning>${t?.toString?.()??t}</hui-warning>`}}getCardSize(){const t=this.config?.cards?this.config.cards.length:0,e=this.config?.rows?this.config.rows.length:0,i=!this.config?.info_entities&&this.config?.hide_title?1:2;return t+e+(this.config?.entities&&this.config.entities.length>0?1:0)+i}createCardElement(t,e){if(((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=e.states[t.entity]?.state,s=t.hide_if.conditions?.filter(s=>{let n=i;if(s.entity){const t=e.states[s.entity];n=s.attribute?t.attributes[s.attribute]:t.state}return s.attribute&&!s.entity&&(n=e.states[t.entity].attributes[s.attribute]),Wt(s,n)});return s?.length>0}})(t,e)||t.show_states&&t.entity&&!t.show_states.includes(e.states[t.entity]?.state))return null;let i;return i=this._helpers?this._helpers.createCardElement(t):function(t,e){void 0===e&&(e=!1);var i=function(t,e){return s("hui-error-card",{type:"error",error:t,config:e})},s=function(t,e){var s=window.document.createElement(t);try{if(!s.setConfig)return;s.setConfig(e)}catch(s){return console.error(t,s),i(s.message,e)}return s};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var n=t.type;if(n&&n.startsWith("custom:"))n=n.substr(7);else if(e)if(_t.has(n))n="hui-"+n+"-row";else{if(!t.entity)return i("Invalid config given.",t);var o=t.entity.split(".",1)[0];n="hui-"+(bt[o]||"text")+"-entity-row"}else n="hui-"+n+"-card";if(customElements.get(n))return s(n,t);var r=i("Custom element doesn't exist: "+t.type+".",t);r.style.display="None";var a=setTimeout(function(){r.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(a),gt(r,"ll-rebuild",{},r)}),r}(t),i.hass=e,i.style.boxShadow="none",i.style.borderRadius="0",i}}he([ht({attribute:!1})],ue.prototype,"monitoredStates",void 0),he([ht({attribute:!1})],ue.prototype,"_hass",void 0),he([ht({attribute:!1})],ue.prototype,"config",void 0);const pe="room-card";customElements.get(pe)||(customElements.define(pe,ue),console.info("ROOM-CARD: custom element defined"))})();