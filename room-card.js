/*! For license information please see room-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,_=m?m.emptyScript:"",f=p.reactiveElementPolyfillSupport,v=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),b={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,f?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,A=w.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,O=`<${S}>`,k=document,j=()=>k.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,U="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,H=/>/g,I=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,D=/"/g,z=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=L(1),B=(L(2),L(3),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),W=new WeakMap,V=k.createTreeWalker(k,129);function Y(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===T?"!--"===l[1]?o=M:void 0!==l[1]?o=H:void 0!==l[2]?(z.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=n??T,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?I:'"'===l[3]?D:N):o===D||o===N?o=I:o===M||o===H?o=T:(o=I,n=void 0);const h=o===I&&t[e+1].startsWith("/>")?" ":"";a+=o===T?i+O:c>=0?(s.push(r),i.slice(0,c)+E+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[a++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),V.nextNode(),r.push({type:2,index:++n});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=P(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new G(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new st(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=V.nextNode(),a++)}return V.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=X(this,t,e,0),a=!P(t)||t!==this._$AH&&t!==B,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=X(this,s[i+o],e,o),r===B&&(r=this._$AH[o]),a||=!P(r)||r!==this._$AH[o],r===F?t=F:t!==F&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===B)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(K,G),(w.litHtmlVersions??=[]).push("3.3.1");const at=globalThis;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new G(e.insertBefore(j(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,at.litElementHydrateSupport?.({LitElement:ot});const rt=at.litElementPolyfillSupport;rt?.({LitElement:ot}),(at.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y},ct=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var ht,ut,pt;(pt=ht||(ht={})).language="language",pt.system="system",pt.comma_decimal="comma_decimal",pt.decimal_comma="decimal_comma",pt.space_comma="space_comma",pt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={}));var mt=["closed","locked","off"],_t=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n}),ft=new Set(["call-service","divider","section","weblink","cast","select"]),vt={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},gt=function(t){_t(window,"haptic",t)},yt=function(t,e,i,s){var n;"double_tap"===s&&i.double_tap_action?n=i.double_tap_action:"hold"===s&&i.hold_action?n=i.hold_action:"tap"===s&&i.tap_action&&(n=i.tap_action),function(t,e,i,s){if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(gt("warning"),confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?")))switch(s.action){case"more-info":(i.entity||i.camera_image)&&_t(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),_t(window,"location-changed",{replace:i})}(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var s,n=function(t){return t.substr(0,t.indexOf("."))}(e),a="group"===n?"homeassistant":n;switch(n){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(a,s,{entity_id:e})})(t,e,mt.includes(t.states[e].state))}(e,i.entity),gt("success"));break;case"call-service":if(!s.service)return void gt("failure");var n=s.service.split(".",2);e.callService(n[0],n[1],s.service_data,s.target),gt("success");break;case"fire-dom-event":_t(t,"ll-custom",s)}}(t,e,i,n)};function bt(t){return void 0!==t&&"none"!==t.action}const $t=t=>t<10?`0${t}`:t,wt="unavailable",At="unknown",xt=[wt,At],Et="last-changed",Ct="last-updated",St=["relative","total","date","time","datetime"],Ot="language",kt=(t,e,i)=>{const s=e?(t=>{switch(t.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t.language}})(e):void 0;if("none"!==e?.number_format&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,jt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,jt(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,i?.maximumFractionDigits).toString()}${"currency"===i?.style?` ${i.currency}`:""}`},jt=(t,e)=>({maximumFractionDigits:2,...e}),Pt=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"}).format(t),Rt=t=>{if(t.time_format===Ot||"system"===t.time_format){const e=t.time_format===Ot?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return"12"===t.time_format},Ut=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:Rt(e)?"numeric":"2-digit",minute:"2-digit",hour12:Rt(e)}).format(t),Tt=(t,e)=>new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:Rt(e)}).format(t),Mt=t=>t.entity_id.substr(0,t.entity_id.indexOf(".")),Ht=(t,e,i)=>t&&"object"==typeof t&&"template"in t?Vt(e,i,t.template):t,It=t=>"object"==typeof t&&!Array.isArray(t)&&!!t,Nt=t=>!t||xt.includes(t.state),Dt=t=>{if(t.attribute&&void 0===t.stateObj.attributes[t.attribute])throw new Error(`Entity: '${t.entity}' has no attribute named '${t.attribute}'`);return t.attribute?t.stateObj.attributes[t.attribute]:t.stateObj.state},zt=t=>[t.entity].concat(t.entities?.map(t=>Lt(t))).concat(t.info_entities?.map(t=>Lt(t))).concat(t.rows?.flatMap(t=>t.entities).map(t=>Lt(t))).concat(t.cards?.flatMap(t=>Bt(t))).concat(qt(t)).filter(t=>t),Lt=t=>void 0===t?null:"string"==typeof t?t:t.entity,qt=t=>{const e=(t=>{let e=[];return t?.forEach(t=>{const i=t?.icon?.conditions?.filter(t=>void 0!==t.entity);i&&(e=e.concat(i));const s=t?.hide_if?.conditions?.filter(t=>void 0!==t.entity);s&&(e=e.concat(s))}),e})([t.entities,t.info_entities,t.rows?.flatMap(t=>t.entities)].flatMap(t=>t));return e.filter(t=>t.entity).map(t=>t.entity)},Bt=t=>[Lt(t.entity)].concat(t.cards?.flatMap(t=>Bt(t))).concat(t.entities?.flatMap(t=>Lt(t))).filter(t=>t),Ft=(t,e)=>{const i="boolean"==typeof t.value?String(t.value):t.value;return"equals"==t.condition&&e==i||"not_equals"==t.condition&&e!=i||"above"==t.condition&&e>i||"below"==t.condition&&e<i||void 0},Wt=(t,e,i)=>{let s="string"==typeof t?{entity:t}:t;return s=((t,e)=>{if(void 0!==t&&t.template){const i=e.templates.filter(e=>e.name===t.template);if(i.length>0){const e=i[0];return{stateObj:t.stateObj,...e.template,...t}}}return t})(s,i),{...s,stateObj:e.states[s.entity]}},Vt=(t,e,i)=>{try{return new Function("states","entity","user","hass","html",`'use strict'; ${i}`).call(void 0,t?.states,e,t?.user,t,q)}catch(t){const e=i.length<=100?i.trim():`${i.trim().substring(0,98)}...`;throw t.message=`${t.name}: ${t.message} in '${e}'`,t.name="RoomCardJSTemplateError",t}},Yt=(t,e)=>{if((t=>t.hide_unavailable&&Nt(t.stateObj))(t))return!0;if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.stateObj.state,s=t.hide_if.conditions?.filter(s=>{let n=i;if(s.entity){const t=e.states[s.entity];n=s.attribute?t.attributes[s.attribute]:t.state}return s.attribute&&!s.entity&&(n=t.stateObj.attributes[s.attribute]),Ft(s,n)});return s?.length>0}};class Jt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Kt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class Xt extends HTMLElement{constructor(){super(),Object.defineProperty(this,"holdTime",{enumerable:!0,configurable:!0,writable:!0,value:500}),Object.defineProperty(this,"ripple",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"held",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"dblClickTimeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Kt?"100px":"50px",height:Kt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},s=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?_t(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,_t(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,_t(t,"action",{action:"double_tap"})):_t(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",s),t.addEventListener("touchcancel",s),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",s),t.addEventListener("keyup",t=>{13===t.keyCode&&s(t)})}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-roomcard",Xt);const Zt=(le=class extends Jt{update(t,[e]){return((t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-roomcard"))return t.querySelector("action-handler-roomcard");const e=document.createElement("action-handler-roomcard");return t.appendChild(e),e})();i&&i.bind(t,e)})(t.element,e),B}render(t){}},(...t)=>({_$litDirective$:le,values:t})),Gt=(t,e)=>{if(Nt(e.stateObj))return t.localize(`state.default.${e.stateObj.state}`);let i=Dt(e),s=void 0!==e.attribute?e.unit:e.unit||e.stateObj.attributes.unit_of_measurement;if(e.format)return({value:i,unit:s}=ae(e,i,t,s)),`${i}${s?` ${s}`:""}`;if(e.attribute)return`${isNaN(i)?i:kt(i,t.locale)}${s?` ${s}`:""}`;const n={...e.stateObj,attributes:{...e.stateObj.attributes,unit_of_measurement:s}};return((t,e,i)=>{const s=e.state;if(s===At||s===wt)return t(`state.default.${s}`);if((t=>!!t.attributes.unit_of_measurement||!!t.attributes.state_class)(e)){if("monetary"===e.attributes.device_class)try{return kt(s,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return`${kt(s,i)}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`}const n=Mt(e);if("input_datetime"===n){let t;return e.attributes.has_date&&e.attributes.has_time?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Ut(t,i)):e.attributes.has_date?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Pt(t,i)):e.attributes.has_time?(t=new Date,t.setHours(e.attributes.hour,e.attributes.minute),Tt(t,i)):e.state}return"humidifier"===n&&"on"===s&&e.attributes.humidity?`${e.attributes.humidity} %`:"counter"===n||"number"===n||"input_number"===n?kt(s,i):"button"===n||"sensor"===n&&"timestamp"===e.attributes.device_class?Ut(new Date(s),i):e.attributes.device_class&&t(`component.${n}.state.${e.attributes.device_class}.${s}`)||t(`component.${n}.state._.${s}`)||s})(t.localize,n,t.locale)},Qt=(t,e,i)=>{if(!t)return"";if("template"in t)return Vt(i,e,t.template);const s=t;return Object.keys(s).map(t=>`${t}: ${s[t]};`).join("")},te=(t,e,i,s)=>{if(void 0!==e.show_icon&&!1===e.show_icon)return null;const n=((t,e,i)=>{if("icon"in e&&(void 0===e.show_icon||!1===e.show_icon))throw new Error(`Entity: ${e.entity} => Icon defined but show_icon is set to false or not defined. Please set show_icon to true`);return"icon"in e?"string"==typeof e.icon?e.icon:e.icon.state_on?((t,e)=>{switch(Mt(t)){case"light":case"switch":case"binary_sensor":case"input_boolean":return"on"===t.state?e.state_on:e.state_off}})(t,e.icon):e.icon.conditions?((t,e,i)=>{const s=t.state;return e.icon.conditions.filter(e=>{let n=s;if(e.entity){const t=i.states[e.entity];n=e.attribute?t.attributes[e.attribute]:t.state}return e.attribute&&!e.entity&&(n=t.attributes[e.attribute]),Ft(e,n)}).pop()})(t,e,i):e.icon.template?.icon?Vt(i,t,e.icon.template.icon):void 0:t.attributes.icon||null})(t,e,i),a=((t,e,i)=>{const s=e.icon;return void 0!==s?.template?.styles?Vt(i,t,s.template.styles):null})(t,e,i);return q`<state-badge
        class="icon-small ${s}"
        .hass=${i}
        .stateObj="${t}"
        .overrideIcon="${It(n)?n.icon:n}"
        .stateColor="${e.state_color}"
        style="${a??Qt(It(n)?n.styles:null,i.states[e.entity],i)}"
    ></state-badge>`},ee=(t,e)=>{if(!0===t.toggle)return q`<ha-entity-toggle .stateObj="${t.stateObj}" .hass="${e}"></ha-entity-toggle>`;if(!0===t.show_icon)return te(t.stateObj,t,e);if(t.attribute&&[Et,Ct].includes(t.attribute))return q`<ha-relative-time
            .hass=${e}
            .datetime=${t.attribute===Et?t.stateObj.last_changed:t.stateObj.last_updated}
            capitalize
        ></ha-relative-time>`;if(t.format&&St.includes(t.format)){const i=Dt(t),s=new Date(i);return s instanceof Date&&!isNaN(s.getTime())?q`<hui-timestamp-display
            .hass=${e}
            .ts=${s}
            .format=${t.format}
            capitalize
        ></hui-timestamp-display>`:i}return Gt(e,t)},ie=(t,e,i,s)=>{yt(t,e,i,s.detail.action)},se=(t,e,i,s,n)=>void 0===e?null:q`<div class="${((t,e)=>`entities-row ${t.content_alignment?`content-${t.content_alignment}`:"content-left"}${void 0!==e?` ${e}`:""}`)(t,n)}">${e.map(t=>ne(t,i,s))}</div>`,ne=(t,e,i)=>null==t.stateObj||Yt(t,e)?null:q`<div class="entity" style="${Qt(t.styles,e.states[t.entity],e)}"
            @action=${s=>{e&&t&&s.detail.action&&ie(i,e,t,s)}}
            .actionHandler=${Zt({hasHold:bt(t.hold_action),hasDoubleClick:bt(t.double_tap_action)})}>
            ${void 0===t.show_name||t.show_name?q`<span>${((t,e)=>{return Ht(t.name,e,t.stateObj)||(t.entity?t.stateObj.attributes.friendly_name||(i=t.stateObj.entity_id).substr(i.indexOf(".")+1):null)||null;var i})(t,e)}</span>`:""}
            <div>${te(t.stateObj,t,e)}</div>
            ${t.show_state?q`<span>${Gt(e,t)}</span>`:""}
        </div>`,ae=(t,e,i,s)=>{if(t.format.startsWith("precision")){const s=parseInt(t.format.slice(-1),10);e=kt(e,i.locale,{minimumFractionDigits:s,maximumFractionDigits:s})}else isNaN(parseFloat(e))||!isFinite(e)||("brightness"===t.format?(e=Math.round(e/255*100),s="%"):t.format.startsWith("duration")?(e=function(t){const e=Math.floor(t/3600),i=Math.floor(t%3600/60),s=Math.floor(t%3600%60);return e>0?`${e}:${$t(i)}:${$t(s)}`:i>0?`${i}:${$t(s)}`:s>0?""+s:null}("duration-m"===t.format?e/1e3:e),s=void 0):"kilo"===t.format?e=kt(e/1e3,i.locale,{maximumFractionDigits:2}):"invert"===t.format?e=kt(e-2*e,i.locale):"position"===t.format&&(e=kt(100-e,i.locale)));return{value:e,unit:s}},oe=a`
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
`,re=()=>`id_${Date.now()}_${Math.random().toString(36).slice(2)}`;var le;class ce extends ot{constructor(){super(...arguments),Object.defineProperty(this,"hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_config",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_entities",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_rows",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_hideIf",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_styles",{enumerable:!0,configurable:!0,writable:!0,value:{}})}setConfig(t){const{hass:e,entityIds:i,...s}=t||{};this._config=s||{};const n=Array.isArray(this._config.entities)?this._config.entities:[];this._entities=n.map(t=>({_id:re(),...t||{}}));const a=Array.isArray(this._config.rows)?this._config.rows:[];this._rows=a.map(t=>({_id:re(),label:t&&(t.label??t.name)||"",entities:Array.isArray(t?.entities)?t.entities.map(t=>({_id:re(),...t||{}})):[]})),this._hideIf=Array.isArray(this._config.hide_if)?[...this._config.hide_if]:[],this._styles=this._config.styles&&"object"==typeof this._config.styles?{...this._config.styles}:{},this.requestUpdate()}_emit(){const t={...this._config};t.entities=this._entities.map(({_id:t,...e})=>e),t.rows=this._rows.map(({_id:t,label:e,entities:i})=>({label:e,entities:i.map(({_id:t,...e})=>e)})),t.hide_if=this._hideIf.length?this._hideIf:void 0,t.styles=Object.keys(this._styles||{}).length?this._styles:void 0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_updateCfg(t,e){const i={...this._config};""===e||void 0===e?delete i[t]:i[t]=e,this._config=i,this._emit(),this.requestUpdate()}_addEntity(){this._entities=[...this._entities,{_id:re(),entity:""}],this._emit(),this.requestUpdate()}_removeEntity(t){const e=[...this._entities];e.splice(t,1),this._entities=e,this._emit(),this.requestUpdate()}_moveEntity(t,e){const i=t+e;if(i<0||i>=this._entities.length)return;const s=[...this._entities],[n]=s.splice(t,1);s.splice(i,0,n),this._entities=s,this._emit(),this.requestUpdate()}_updateEntity(t,e,i){const s=[...this._entities],n={...s[t]||{}};""===i||void 0===i?delete n[e]:n[e]=i,s[t]=n,this._entities=s,this._emit(),this.requestUpdate()}_entityIconPreview(t){if(!t?.show_icon)return q``;const e=t?.entity?this.hass?.states?.[t.entity]:void 0;return t?.icon?q`<ha-state-icon .icon=${t.icon}></ha-state-icon>`:e?q`<ha-state-icon .stateObj=${e}></ha-state-icon>`:q``}_addRow(){this._rows=[...this._rows,{_id:re(),label:"",entities:[]}],this._emit(),this.requestUpdate()}_removeRow(t){const e=[...this._rows];e.splice(t,1),this._rows=e,this._emit(),this.requestUpdate()}_moveRow(t,e){const i=t+e;if(i<0||i>=this._rows.length)return;const s=[...this._rows],[n]=s.splice(t,1);s.splice(i,0,n),this._rows=s,this._emit(),this.requestUpdate()}_updateRowLabel(t,e){const i=[...this._rows];i[t]={...i[t],label:e||void 0},this._rows=i,this._emit(),this.requestUpdate()}_addRowEntity(t){const e=[...this._rows],i={...e[t]||{}};i.entities=[...i.entities||[],{_id:re(),entity:""}],e[t]=i,this._rows=e,this._emit(),this.requestUpdate()}_updateRowEntity(t,e,i,s){const n=[...this._rows],a={...n[t]||{}},o=[...a.entities||[]],r={...o[e]||{}};""===s||void 0===s?delete r[i]:r[i]=s,o[e]=r,a.entities=o,n[t]=a,this._rows=n,this._emit(),this.requestUpdate()}_removeRowEntity(t,e){const i=[...this._rows],s={...i[t]||{}},n=[...s.entities||[]];n.splice(e,1),s.entities=n,i[t]=s,this._rows=i,this._emit(),this.requestUpdate()}_moveRowEntity(t,e,i){const s=[...this._rows],n={...s[t]||{}},a=[...n.entities||[]],o=e+i;if(o<0||o>=a.length)return;const[r]=a.splice(e,1);a.splice(o,0,r),n.entities=a,s[t]=n,this._rows=s,this._emit(),this.requestUpdate()}_addCondition(){this._hideIf=[...this._hideIf,{entity:"",operator:"==",value:"off"}],this._emit(),this.requestUpdate()}_updateCond(t,e,i){const s=[...this._hideIf],n={...s[t]||{}};""===i||void 0===i?delete n[e]:n[e]=i,s[t]=n,this._hideIf=s,this._emit(),this.requestUpdate()}_removeCond(t){const e=[...this._hideIf];e.splice(t,1),this._hideIf=e,this._emit(),this.requestUpdate()}_updateStyle(t,e){const i={...this._styles||{}};""===e||void 0===e?delete i[t]:i[t]=e,this._styles=i,this._emit(),this.requestUpdate()}render(){if(!this.hass)return q``;const t=!!customElements.get("hui-action-editor");return q`
      <!-- Basis -->
      <div class="row">
        <div>Title</div>
        <ha-textfield
          .value=${this._config.title??""}
          label="Title"
          @input=${t=>this._updateCfg("title",t.target.value||void 0)}
        ></ha-textfield>
      </div>

      <div class="row">
        <div>Icon</div>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._config.icon||""}
          @value-changed=${t=>this._updateCfg("icon",t.detail?.value||void 0)}
        ></ha-icon-picker>
      </div>

      <div class="row">
        <div>Content alignment</div>
        <ha-select
          .value=${this._config.content_alignment??"left"}
          @value-changed=${t=>this._updateCfg("content_alignment",t.detail?.value)}
          naturalMenuWidth fixedMenuPosition
          @closed=${t=>t.stopPropagation()}
        >
          <mwc-list-item value="left">Left</mwc-list-item>
          <mwc-list-item value="center">Center</mwc-list-item>
          <mwc-list-item value="right">Right</mwc-list-item>
        </ha-select>
      </div>

      <div class="row">
        <div>Primary entity</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.entity||""}
          @value-changed=${t=>this._updateCfg("entity",t.detail?.value||void 0)}
          allow-custom-entity
          @closed=${t=>t.stopPropagation()}
        ></ha-entity-picker>
      </div>

      <div class="toggle">
        <ha-switch .checked=${!!this._config.show_icon} @change=${t=>this._updateCfg("show_icon",t.target.checked)}></ha-switch>
        <span>Show icon</span>
      </div>
      <div class="toggle">
        <ha-switch .checked=${!!this._config.hide_title} @change=${t=>this._updateCfg("hide_title",t.target.checked)}></ha-switch>
        <span>Hide title</span>
      </div>

      <!-- Entities -->
      <div class="section">Entities</div>
      <div class="muted">Live-Icon wie im Header: explizites <code>icon</code> überschreibt das Entity-Icon.</div>

      ${this._entities.map((e,i)=>q`
        <div class="card" data-k=${e._id}>
          <div class="mini">
            ${this._entityIconPreview(e)}
            <span class="muted subtle">${e.entity||"—"}</span>
          </div>
          <div class="entity-grid">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${e.entity||""}
              label="entity"
              allow-custom-entity
              @value-changed=${t=>this._updateEntity(i,"entity",t.detail?.value||void 0)}
              @closed=${t=>t.stopPropagation()}
            ></ha-entity-picker>
            <ha-textfield .value=${e.name??""} label="name" @input=${t=>this._updateEntity(i,"name",t.target.value||void 0)}></ha-textfield>
            <ha-textfield .value=${e.attribute??""} label="attribute" @input=${t=>this._updateEntity(i,"attribute",t.target.value||void 0)}></ha-textfield>
            <ha-textfield .value=${e.unit??""} label="unit" @input=${t=>this._updateEntity(i,"unit",t.target.value||void 0)}></ha-textfield>
            <ha-textfield .value=${e.icon??""} label="icon (z. B. mdi:sun)" @input=${t=>this._updateEntity(i,"icon",t.target.value||void 0)}></ha-textfield>
            <ha-textfield .value=${e.format??""} label="format" @input=${t=>this._updateEntity(i,"format",t.target.value||void 0)}></ha-textfield>
          </div>

          <div class="entity-switches">
            <span class="chips"><ha-switch .checked=${!!e.show_name} @change=${t=>this._updateEntity(i,"show_name",t.target.checked)}></ha-switch><span>show_name</span></span>
            <span class="chips"><ha-switch .checked=${!!e.show_icon} @change=${t=>this._updateEntity(i,"show_icon",t.target.checked)}></ha-switch><span>show_icon</span></span>
            <span class="chips"><ha-switch .checked=${!!e.state_color} @change=${t=>this._updateEntity(i,"state_color",t.target.checked)}></ha-switch><span>state_color</span></span>
            <span class="chips"><ha-switch .checked=${!!e.toggle} @change=${t=>this._updateEntity(i,"toggle",t.target.checked)}></ha-switch><span>toggle</span></span>
          </div>

          ${t?q`
            <div class="section">Actions</div>
            <div class="mb8">
              <hui-action-editor .hass=${this.hass} .config=${e.tap_action||{}} .label=${"tap_action"}
                @value-changed=${t=>this._updateEntity(i,"tap_action",t.detail?.value||void 0)}></hui-action-editor>
            </div>
            <div class="mb8">
              <hui-action-editor .hass=${this.hass} .config=${e.hold_action||{}} .label=${"hold_action"}
                @value-changed=${t=>this._updateEntity(i,"hold_action",t.detail?.value||void 0)}></hui-action-editor>
            </div>
            <div class="mb8">
              <hui-action-editor .hass=${this.hass} .config=${e.double_tap_action||{}} .label=${"double_tap_action"}
                @value-changed=${t=>this._updateEntity(i,"double_tap_action",t.detail?.value||void 0)}></hui-action-editor>
            </div>
          `:q`<div class="muted">Kein <code>hui-action-editor</code> gefunden – Actions im YAML unten pflegen.</div>`}

          <div class="entity-actions">
            <div>
              <mwc-button dense @click=${()=>this._moveEntity(i,-1)} ?disabled=${0===i}>▲</mwc-button>
              <mwc-button dense @click=${()=>this._moveEntity(i,1)} ?disabled=${i===this._entities.length-1}>▼</mwc-button>
            </div>
            <mwc-button dense danger @click=${()=>this._removeEntity(i)}>Remove</mwc-button>
          </div>
        </div>
      `)}

      <mwc-button raised @click=${this._addEntity}>Add entity</mwc-button>

      <!-- Rows -->
      <div class="section">Rows</div>
      ${this._rows.map((t,e)=>q`
        <div class="card" data-k=${t._id}>
          <div class="row-title">Row ${e+1}</div>
          <div class="row">
            <div>Label</div>
            <ha-textfield .value=${t.label??""} label="label" @input=${t=>this._updateRowLabel(e,t.target.value||"")}></ha-textfield>
          </div>

          ${t.entities.map((i,s)=>q`
            <div class="card subtle" data-k=${i._id}>
              <div class="mini">
                ${i.show_icon?i.icon?q`<ha-state-icon .icon=${i.icon}></ha-state-icon>`:i.entity?q`<ha-state-icon .stateObj=${this.hass?.states?.[i.entity]}></ha-state-icon>`:q``:q``}
                <span class="muted">${i.entity||"—"}</span>
              </div>
              <div class="entity-grid">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${i.entity||""}
                  label="entity"
                  allow-custom-entity
                  @value-changed=${t=>this._updateRowEntity(e,s,"entity",t.detail?.value||void 0)}
                  @closed=${t=>t.stopPropagation()}
                ></ha-entity-picker>
                <ha-textfield .value=${i.name??""} label="name" @input=${t=>this._updateRowEntity(e,s,"name",t.target.value||void 0)}></ha-textfield>
                <ha-textfield .value=${i.icon??""} label="icon" @input=${t=>this._updateRowEntity(e,s,"icon",t.target.value||void 0)}></ha-textfield>
                <ha-textfield .value=${i.unit??""} label="unit" @input=${t=>this._updateRowEntity(e,s,"unit",t.target.value||void 0)}></ha-textfield>
              </div>
              <div class="entity-actions">
                <div>
                  <mwc-button dense @click=${()=>this._moveRowEntity(e,s,-1)} ?disabled=${0===s}>▲</mwc-button>
                  <mwc-button dense @click=${()=>this._moveRowEntity(e,s,1)} ?disabled=${s===t.entities.length-1}>▼</mwc-button>
                </div>
                <mwc-button dense danger @click=${()=>this._removeRowEntity(e,s)}>Remove</mwc-button>
              </div>
            </div>
          `)}

          <mwc-button dense @click=${()=>this._addRowEntity(e)}>Add row entity</mwc-button>

          <div class="entity-actions" style="margin-top:12px">
            <div>
              <mwc-button dense @click=${()=>this._moveRow(e,-1)} ?disabled=${0===e}>Row ▲</mwc-button>
              <mwc-button dense @click=${()=>this._moveRow(e,1)} ?disabled=${e===this._rows.length-1}>Row ▼</mwc-button>
            </div>
            <mwc-button dense danger @click=${()=>this._removeRow(e)}>Remove row</mwc-button>
          </div>
        </div>
      `)}
      <mwc-button raised @click=${this._addRow}>Add row</mwc-button>

      <!-- Conditional visibility -->
      <div class="section">Conditional visibility (hide_if)</div>
      ${this._hideIf.map((t,e)=>q`
        <div class="cond-row">
          <ha-entity-picker .hass=${this.hass} .value=${t.entity||""} allow-custom-entity
            @value-changed=${t=>this._updateCond(e,"entity",t.detail?.value||void 0)}
            @closed=${t=>t.stopPropagation()}></ha-entity-picker>
          <ha-select .value=${t.operator??"=="} @value-changed=${t=>this._updateCond(e,"operator",t.detail?.value)}
            naturalMenuWidth fixedMenuPosition @closed=${t=>t.stopPropagation()}>
            <mwc-list-item value="==">==</mwc-list-item>
            <mwc-list-item value="!=">!=</mwc-list-item>
            <mwc-list-item value="<"><</mwc-list-item>
            <mwc-list-item value=">">></mwc-list-item>
            <mwc-list-item value="<="><=</mwc-list-item>
            <mwc-list-item value=">=">>=</mwc-list-item>
            <mwc-list-item value="contains">contains</mwc-list-item>
          </ha-select>
          <ha-textfield .value=${t.attribute??""} label="attribute (optional)"
            @input=${t=>this._updateCond(e,"attribute",t.target.value||void 0)}></ha-textfield>
          <ha-textfield .value=${t.value??""} label="value"
            @input=${t=>this._updateCond(e,"value",t.target.value)}></ha-textfield>
          <mwc-button dense danger @click=${()=>this._removeCond(e)}>Remove</mwc-button>
        </div>
      `)}
      <mwc-button dense @click=${this._addCondition}>Add condition</mwc-button>

      <!-- Styles -->
      <div class="section">Styles</div>
      <div class="grid-3">
        <ha-textfield .value=${this._styles?.title_color??""} label="title_color (CSS)"
          @input=${t=>this._updateStyle("title_color",t.target.value||void 0)}></ha-textfield>
        <ha-textfield .value=${this._styles?.icon_color??""} label="icon_color (CSS)"
          @input=${t=>this._updateStyle("icon_color",t.target.value||void 0)}></ha-textfield>
        <ha-textfield .value=${this._styles?.font_size??""} label="font_size (CSS)"
          @input=${t=>this._updateStyle("font_size",t.target.value||void 0)}></ha-textfield>
      </div>
      <div class="help">Weitere Styles unten im YAML-Block ergänzen/feintunen.</div>

      <!-- Advanced YAML -->
      <div class="yaml">
        <ha-yaml-editor
          .label=${"Advanced configuration (entities, rows, cards, styles, templates...)"}
          .defaultValue=${{...this._config,entities:this._entities.map(({_id:t,...e})=>e),rows:this._rows.map(({_id:t,label:e,entities:i})=>({label:e,entities:i.map(({_id:t,...e})=>e)})),hide_if:this._hideIf.length?this._hideIf:void 0,styles:Object.keys(this._styles||{}).length?this._styles:void 0}}
          @value-changed=${t=>{const e=t.detail?.value;if(e&&"object"==typeof e){const{hass:t,entityIds:i,entities:s,rows:n,hide_if:a,styles:o,...r}=e;this._config=r||{},this._entities=Array.isArray(s)?s.map(t=>({_id:re(),...t})):[],this._rows=Array.isArray(n)?n.map(t=>({_id:re(),label:t&&(t.label??t.name)||"",entities:Array.isArray(t?.entities)?t.entities.map(t=>({_id:re(),...t})):[]})):[],this._hideIf=Array.isArray(a)?[...a]:[],this._styles=o&&"object"==typeof o?{...o}:{},this._emit(),this.requestUpdate()}}}
        ></ha-yaml-editor>
      </div>
    `}}Object.defineProperty(ce,"properties",{enumerable:!0,configurable:!0,writable:!0,value:{hass:{attribute:!1}}}),Object.defineProperty(ce,"styles",{enumerable:!0,configurable:!0,writable:!0,value:a`
    .row { margin: 8px 0; display: grid; grid-template-columns: 160px 1fr; gap: 12px; align-items: center; }
    .toggle { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
    .help { color: var(--secondary-text-color); font-size: 12px; margin: 8px 0 0; }
    .yaml { margin-top: 16px; }
    ha-yaml-editor { --code-mirror-height: 240px; }
    ha-textfield { width: 100%; }
    .section { margin-top: 18px; font-weight: 600; }
    .muted { color: var(--secondary-text-color); font-size: 12px; }
    .card { border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; margin: 10px 0; }
    .entity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .entity-actions { display: flex; gap: 8px; justify-content: space-between; align-items: center; margin-top: 8px; }
    .entity-switches { display: grid; grid-template-columns: repeat(4, minmax(0, max-content)); gap: 12px; align-items: center; margin-top: 6px; }
    .mini { display:flex; align-items:center; gap:10px; }
    .chips { display:flex; gap: 6px; flex-wrap: wrap; }
    ha-state-icon { --mdc-icon-size: 22px; }
    .grid-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; }
    .cond-row { display:grid; grid-template-columns: 1fr 110px 1fr 1fr auto; gap:8px; align-items:center; }
    .row-title { font-weight: 600; margin-bottom: 8px; }
    .subtle { opacity: .8 }
    .mb8 { margin-bottom: 8px; }
  `}),customElements.get("room-card-editor")||customElements.define("room-card-editor",ce);var de=function(t,e,i,s){var n,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o};console.info("ROOM-CARD: script executed"),window.customCards=window.customCards||[],window.customCards.some(t=>"room-card"===t.type)||window.customCards.push({type:"room-card",name:"Room Card",description:"Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI",preview:!0});let he=class extends ot{constructor(){super(...arguments),Object.defineProperty(this,"monitoredStates",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_helpers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stateObj",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}static getConfigElement(){return document.createElement("room-card-editor")}static getStubConfig(t,e){return{type:"custom:room-card",title:"Room",entity:Array.isArray(e)&&e.length?e[0]:void 0,show_icon:!0}}shouldUpdate(t){return!!this.config&&!!this._hass&&t.size>0}getChildCustomCardTypes(t,e){if(t)for(const i of t)i.type?.startsWith?.("custom:")&&e.add(i.type.substring(7)),this.getChildCustomCardTypes(i.cards,e)}async waitForDependentComponents(t){const e=new Set;this.getChildCustomCardTypes(t.cards,e),await Promise.all(Array.from(e).map(t=>customElements.whenDefined(t)))}async setConfig(t){(t=>{if(null==t.entities&&null==t.entity&&void 0===t.info_entities&&void 0===t.rows&&void 0===t.cards)throw new Error("Please define entities.")})(t),this.config={...t,entityIds:zt(t)},null!==document.querySelector("hui-card-editor")||await this.waitForDependentComponents(this.config);const e=window;"function"==typeof e.loadCardHelpers&&(this._helpers=await e.loadCardHelpers())}set hass(t){this._hass=t,t&&this.config&&(this.updateMonitoredStates(t),this.config.hass=t)}updateMonitoredStates(t){const e={...this.monitoredStates||{}};let i=!1;for(const s of this.config.entityIds)if(s in t.states){const n=this.monitoredStates&&this.monitoredStates[s],a=t.states[s];(!this.monitoredStates||n?.last_updated<a.last_updated||n?.last_changed<a.last_changed||a!==e[s])&&(i=!0,e[s]=a)}else this.monitoredStates&&s in this.monitoredStates&&(i=!0,delete e[s]);i&&(this.monitoredStates=e)}static get styles(){return oe}render(){if(!this._hass||!this.config)return q``;try{const{entity:t,info_entities:e,entities:i,rows:s,stateObj:n}=((t,e)=>{const i={info_entities:[],entities:[]};return e&&t?(i.stateObj=void 0!==t.entity?e.states[t.entity]:void 0,i.entity=void 0!==t.entity?{...t,stateObj:i.stateObj}:void 0,i.info_entities=t.info_entities?.map(i=>Wt(i,e,t))??[],i.entities=t.entities?.map(i=>Wt(i,e,t))??[],i.rows=t.rows?.map(i=>{const s=i.entities?.map(i=>Wt(i,e,t));return{entities:s,hide_if:i.hide_if,content_alignment:i.content_alignment}})??[],t.hass=e,i):i})(this.config,this._hass);return this.stateObj=n,q`
        <ha-card elevation="2" style="${Qt(this.config.card_styles,n,this._hass)}">
          <div class="card-header">
            ${((t,e,i,s)=>{if(!0===t.hide_title)return null;const n=void 0!==t.tap_action||void 0!==t.double_tap_action,a=Ht(t.title,e,s?.stateObj);return q`<div class="title${n?" clickable":null}" @action=${n=>{e&&n.detail.action&&ie(i,e,s??{tap_action:t.tap_action,double_tap_action:t.double_tap_action,hold_action:t.hold_action},n)}}
    .actionHandler=${Zt({hasHold:bt(s?.hold_action),hasDoubleClick:bt(s?.double_tap_action)})}>${((t,e,i)=>{if(void 0===t)return null;const s=i.states[t.entity];return q`<div
        class="main-state entity"
        style="${Qt(t.styles,s,i)}">
        ${0===e.entities?.length||e.icon?te(t.stateObj,e,i,"main-icon"):void 0!==t.show_state&&!1===t.show_state?"":ee(t,i)}
    </div>`})(s,t,e)} ${a}</div>`})(this.config,this._hass,this,t)}
            <div class="entities-info-row">
              ${e.map(t=>((t,e,i)=>void 0===t||!t.stateObj||Yt(t,e)?null:q`<div class="state entity ${!0===t.show_icon?"icon-entity":""}" style="${Qt(t.styles,t.stateObj,e)}" 
    @action=${s=>{e&&t&&s.detail.action&&ie(i,e,t,s)}}
    .actionHandler=${Zt({hasHold:bt(t.hold_action),hasDoubleClick:bt(t.double_tap_action)})}>${ee(t,e)}</div>`)(t,this._hass,this))}
            </div>
          </div>
  
          ${s&&s.length>0?((t,e,i)=>{const s=t.filter(t=>!((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.hide_if.conditions?.filter(t=>{if(t.entity){const i=e.states[t.entity];return Ft(t,t.attribute?i.attributes[t.attribute]:i.state)}});return i?.length>0}})(t,e));return q`${s.map(t=>se(t,t.entities,e,i))}`})(s,this._hass,this):se(this.config,i,this._hass,this)}
  
          ${this.config.cards?.map(t=>this.createCardElement(t,this._hass))}
        </ha-card>
      `}catch(t){return q`<hui-warning>${t?.toString?.()??t}</hui-warning>`}}getCardSize(){const t=this.config?.cards?this.config.cards.length:0,e=this.config?.rows?this.config.rows.length:0,i=!this.config?.info_entities&&this.config?.hide_title?1:2;return t+e+(this.config?.entities&&this.config.entities.length>0?1:0)+i}createCardElement(t,e){if(((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=e.states[t.entity]?.state,s=t.hide_if.conditions?.filter(s=>{let n=i;if(s.entity){const t=e.states[s.entity];n=s.attribute?t.attributes[s.attribute]:t.state}return s.attribute&&!s.entity&&(n=e.states[t.entity].attributes[s.attribute]),Ft(s,n)});return s?.length>0}})(t,e)||t.show_states&&t.entity&&!t.show_states.includes(e.states[t.entity]?.state))return null;let i;return i=this._helpers?this._helpers.createCardElement(t):function(t,e){void 0===e&&(e=!1);var i=function(t,e){return s("hui-error-card",{type:"error",error:t,config:e})},s=function(t,e){var s=window.document.createElement(t);try{if(!s.setConfig)return;s.setConfig(e)}catch(s){return console.error(t,s),i(s.message,e)}return s};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var n=t.type;if(n&&n.startsWith("custom:"))n=n.substr(7);else if(e)if(ft.has(n))n="hui-"+n+"-row";else{if(!t.entity)return i("Invalid config given.",t);var a=t.entity.split(".",1)[0];n="hui-"+(vt[a]||"text")+"-entity-row"}else n="hui-"+n+"-card";if(customElements.get(n))return s(n,t);var o=i("Custom element doesn't exist: "+t.type+".",t);o.style.display="None";var r=setTimeout(function(){o.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(r),_t(o,"ll-rebuild",{},o)}),o}(t),i.hass=e,i.style.boxShadow="none",i.style.borderRadius="0",i}};de([dt({attribute:!1})],he.prototype,"monitoredStates",void 0),de([dt({attribute:!1})],he.prototype,"_hass",void 0),de([dt({attribute:!1})],he.prototype,"config",void 0),he=de([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("room-card")],he),customElements.get("room-card")||customElements.define("room-card",he)})();