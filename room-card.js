/*! For license information please see room-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class s{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(n,t,i)},r=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,m=f.trustedTypes,_=m?m.emptyScript:"",g=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=n;const o=s.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const n=this.constructor,s=this[t];if(i??=n.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,g?.({ReactiveElement:$}),(f.reactiveElementVersions??=[]).push("2.1.1");const E=globalThis,A=E.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,R=`<${S}>`,k=document,P=()=>k.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,D=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=L(1),q=(L(2),L(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),J=new WeakMap,V=k.createTreeWalker(k,129);function K(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===N?"!--"===c[1]?r=M:void 0!==c[1]?r=D:void 0!==c[2]?(B.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=s??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?z:U):r===z||r===U?r=H:r===M||r===D?r=N:(r=H,s=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+R:l>=0?(n.push(a),i.slice(0,l)+O+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class X{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[c,l]=Z(t,e);if(this.el=X.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(O)){const e=l[o++],i=n.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),V.nextNode(),a.push({type:2,index:++s});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,n){if(e===q)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=j(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,n)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??k).importNode(e,!0);V.currentNode=n;let s=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(s=V.nextNode(),o++)}return V.currentNode=k,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),j(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new G(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new X(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Y(this,t,e,0),o=!j(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Y(this,n[i+r],e,r),a===q&&(a=this._$AH[r]),o||=!j(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends tt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===q)return;const i=this._$AH,n=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=E.litHtmlPolyfillSupport;ot?.(X,Q),(E.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},dt=(t=lt,e,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t)}}throw Error("Unsupported decorator location: "+n)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return ht({...t,state:!0,attribute:!1})}var pt,ft,mt;(mt=pt||(pt={})).language="language",mt.system="system",mt.comma_decimal="comma_decimal",mt.decimal_comma="decimal_comma",mt.space_comma="space_comma",mt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var _t=["closed","locked","off"],gt=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s}),vt=new Set(["call-service","divider","section","weblink","cast","select"]),yt={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},bt=function(t){gt(window,"haptic",t)},wt=function(t,e,i,n){var s;"double_tap"===n&&i.double_tap_action?s=i.double_tap_action:"hold"===n&&i.hold_action?s=i.hold_action:"tap"===n&&i.tap_action&&(s=i.tap_action),function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(bt("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&gt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),gt(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,s=function(t){return t.substr(0,t.indexOf("."))}(e),o="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(o,n,{entity_id:e})})(t,e,_t.includes(t.states[e].state))}(e,i.entity),bt("success"));break;case"call-service":if(!n.service)return void bt("failure");var s=n.service.split(".",2);e.callService(s[0],s[1],n.service_data,n.target),bt("success");break;case"fire-dom-event":gt(t,"ll-custom",n)}}(t,e,i,s)};function $t(t){return void 0!==t&&"none"!==t.action}const Et=t=>t<10?`0${t}`:t,At="unavailable",xt="unknown",Ot=[At,xt],Ct="last-changed",St="last-updated",Rt=["relative","total","date","time","datetime"],kt="language",Pt=(t,e,i)=>{const n=e?(t=>{switch(t.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"system":return;default:return t.language}})(e):void 0;if("none"!==e?.number_format&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,jt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,jt(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,i?.maximumFractionDigits).toString()}${"currency"===i?.style?` ${i.currency}`:""}`},jt=(t,e)=>({maximumFractionDigits:2,...e}),It=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"}).format(t),Tt=t=>{if(t.time_format===kt||"system"===t.time_format){const e=t.time_format===kt?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return"12"===t.time_format},Nt=(t,e)=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:Tt(e)?"numeric":"2-digit",minute:"2-digit",hour12:Tt(e)}).format(t),Mt=(t,e)=>new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:Tt(e)}).format(t),Dt=t=>t.entity_id.substr(0,t.entity_id.indexOf(".")),Ht=(t,e,i)=>t&&"object"==typeof t&&"template"in t?Kt(e,i,t.template):t,Ut=t=>"object"==typeof t&&!Array.isArray(t)&&!!t,zt=t=>!t||Ot.includes(t.state),Bt=t=>{if(t.attribute&&void 0===t.stateObj.attributes[t.attribute])throw new Error(`Entity: '${t.entity}' has no attribute named '${t.attribute}'`);return t.attribute?t.stateObj.attributes[t.attribute]:t.stateObj.state},Lt=t=>[t.entity].concat(t.entities?.map(t=>Ft(t))).concat(t.info_entities?.map(t=>Ft(t))).concat(t.rows?.flatMap(t=>t.entities).map(t=>Ft(t))).concat(t.cards?.flatMap(t=>Wt(t))).concat(qt(t)).filter(t=>t),Ft=t=>void 0===t?null:"string"==typeof t?t:t.entity,qt=t=>{const e=(t=>{let e=[];return t?.forEach(t=>{const i=t?.icon?.conditions?.filter(t=>void 0!==t.entity);i&&(e=e.concat(i));const n=t?.hide_if?.conditions?.filter(t=>void 0!==t.entity);n&&(e=e.concat(n))}),e})([t.entities,t.info_entities,t.rows?.flatMap(t=>t.entities)].flatMap(t=>t));return e.filter(t=>t.entity).map(t=>t.entity)},Wt=t=>[Ft(t.entity)].concat(t.cards?.flatMap(t=>Wt(t))).concat(t.entities?.flatMap(t=>Ft(t))).filter(t=>t),Jt=(t,e)=>{const i="boolean"==typeof t.value?String(t.value):t.value;return"equals"==t.condition&&e==i||"not_equals"==t.condition&&e!=i||"above"==t.condition&&e>i||"below"==t.condition&&e<i||void 0},Vt=(t,e,i)=>{let n="string"==typeof t?{entity:t}:t;return n=((t,e)=>{if(void 0!==t&&t.template){const i=e.templates.filter(e=>e.name===t.template);if(i.length>0){const e=i[0];return{stateObj:t.stateObj,...e.template,...t}}}return t})(n,i),{...n,stateObj:e.states[n.entity]}},Kt=(t,e,i)=>{try{return new Function("states","entity","user","hass","html",`'use strict'; ${i}`).call(void 0,t?.states,e,t?.user,t,F)}catch(t){const e=i.length<=100?i.trim():`${i.trim().substring(0,98)}...`;throw t.message=`${t.name}: ${t.message} in '${e}'`,t.name="RoomCardJSTemplateError",t}},Zt=(t,e)=>{if((t=>t.hide_unavailable&&zt(t.stateObj))(t))return!0;if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.stateObj.state,n=t.hide_if.conditions?.filter(n=>{let s=i;if(n.entity){const t=e.states[n.entity];s=n.attribute?t.attributes[n.attribute]:t.state}return n.attribute&&!n.entity&&(s=t.stateObj.attributes[n.attribute]),Jt(n,s)});return n?.length>0}};class Xt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Yt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class Gt extends HTMLElement{constructor(){super(),Object.defineProperty(this,"holdTime",{enumerable:!0,configurable:!0,writable:!0,value:500}),Object.defineProperty(this,"ripple",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"timer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"held",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"dblClickTimeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Yt?"100px":"50px",height:Yt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});const i=t=>{let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime)},n=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?gt(t,"action",{action:"hold"}):e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,gt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,gt(t,"action",{action:"double_tap"})):gt(t,"action",{action:"tap"}))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n),t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",n),t.addEventListener("keyup",t=>{13===t.keyCode&&n(t)})}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}}customElements.define("action-handler-roomcard",Gt);const Qt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Xt{update(t,[e]){return((t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-roomcard"))return t.querySelector("action-handler-roomcard");const e=document.createElement("action-handler-roomcard");return t.appendChild(e),e})();i&&i.bind(t,e)})(t.element,e),q}render(t){}}),te=(t,e)=>{if(zt(e.stateObj))return t.localize(`state.default.${e.stateObj.state}`);let i=Bt(e),n=void 0!==e.attribute?e.unit:e.unit||e.stateObj.attributes.unit_of_measurement;if(e.format)return({value:i,unit:n}=re(e,i,t,n)),`${i}${n?` ${n}`:""}`;if(e.attribute)return`${isNaN(i)?i:Pt(i,t.locale)}${n?` ${n}`:""}`;const s={...e.stateObj,attributes:{...e.stateObj.attributes,unit_of_measurement:n}};return((t,e,i)=>{const n=e.state;if(n===xt||n===At)return t(`state.default.${n}`);if((t=>!!t.attributes.unit_of_measurement||!!t.attributes.state_class)(e)){if("monetary"===e.attributes.device_class)try{return Pt(n,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return`${Pt(n,i)}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`}const s=Dt(e);if("input_datetime"===s){let t;return e.attributes.has_date&&e.attributes.has_time?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Nt(t,i)):e.attributes.has_date?(t=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),It(t,i)):e.attributes.has_time?(t=new Date,t.setHours(e.attributes.hour,e.attributes.minute),Mt(t,i)):e.state}return"humidifier"===s&&"on"===n&&e.attributes.humidity?`${e.attributes.humidity} %`:"counter"===s||"number"===s||"input_number"===s?Pt(n,i):"button"===s||"sensor"===s&&"timestamp"===e.attributes.device_class?Nt(new Date(n),i):e.attributes.device_class&&t(`component.${s}.state.${e.attributes.device_class}.${n}`)||t(`component.${s}.state._.${n}`)||n})(t.localize,s,t.locale)},ee=(t,e,i)=>{if(!t)return"";if("template"in t)return Kt(i,e,t.template);const n=t;return Object.keys(n).map(t=>`${t}: ${n[t]};`).join("")},ie=(t,e,i,n)=>{if(void 0!==e.show_icon&&!1===e.show_icon)return null;const s=((t,e,i)=>{if("icon"in e&&(void 0===e.show_icon||!1===e.show_icon))throw new Error(`Entity: ${e.entity} => Icon defined but show_icon is set to false or not defined. Please set show_icon to true`);return"icon"in e?"string"==typeof e.icon?e.icon:e.icon.state_on?((t,e)=>{switch(Dt(t)){case"light":case"switch":case"binary_sensor":case"input_boolean":return"on"===t.state?e.state_on:e.state_off}})(t,e.icon):e.icon.conditions?((t,e,i)=>{const n=t.state;return e.icon.conditions.filter(e=>{let s=n;if(e.entity){const t=i.states[e.entity];s=e.attribute?t.attributes[e.attribute]:t.state}return e.attribute&&!e.entity&&(s=t.attributes[e.attribute]),Jt(e,s)}).pop()})(t,e,i):e.icon.template?.icon?Kt(i,t,e.icon.template.icon):void 0:t.attributes.icon||null})(t,e,i),o=((t,e,i)=>{const n=e.icon;return void 0!==n?.template?.styles?Kt(i,t,n.template.styles):null})(t,e,i);return F`<state-badge
        class="icon-small ${n}"
        .hass=${i}
        .stateObj="${t}"
        .overrideIcon="${Ut(s)?s.icon:s}"
        .stateColor="${e.state_color}"
        style="${o??ee(Ut(s)?s.styles:null,i.states[e.entity],i)}"
    ></state-badge>`},ne=(t,e,i,n)=>{wt(t,e,i,n.detail.action)},se=(t,e,i,n,s)=>void 0===e?null:F`<div class="${((t,e)=>`entities-row ${t.content_alignment?`content-${t.content_alignment}`:"content-left"}${void 0!==e?` ${e}`:""}`)(t,s)}">${e.map(t=>oe(t,i,n))}</div>`,oe=(t,e,i)=>null==t.stateObj||Zt(t,e)?null:F`<div class="entity" style="${ee(t.styles,e.states[t.entity],e)}"
            @action=${n=>{e&&t&&n.detail.action&&ne(i,e,t,n)}}
            .actionHandler=${Qt({hasHold:$t(t.hold_action),hasDoubleClick:$t(t.double_tap_action)})}>
            ${void 0===t.show_name||t.show_name?F`<span>${((t,e)=>{return Ht(t.name,e,t.stateObj)||(t.entity?t.stateObj.attributes.friendly_name||(i=t.stateObj.entity_id).substr(i.indexOf(".")+1):null)||null;var i})(t,e)}</span>`:""}
            <div>${ie(t.stateObj,t,e)}</div>
            ${t.show_state?F`<span>${te(e,t)}</span>`:""}
        </div>`,re=(t,e,i,n)=>{if(t.format.startsWith("precision")){const n=parseInt(t.format.slice(-1),10);e=Pt(e,i.locale,{minimumFractionDigits:n,maximumFractionDigits:n})}else isNaN(parseFloat(e))||!isFinite(e)||("brightness"===t.format?(e=Math.round(e/255*100),n="%"):t.format.startsWith("duration")?(e=function(t){const e=Math.floor(t/3600),i=Math.floor(t%3600/60),n=Math.floor(t%3600%60);return e>0?`${e}:${Et(i)}:${Et(n)}`:i>0?`${i}:${Et(n)}`:n>0?""+n:null}("duration-m"===t.format?e/1e3:e),n=void 0):"kilo"===t.format?e=Pt(e/1e3,i.locale,{maximumFractionDigits:2}):"invert"===t.format?e=Pt(e-2*e,i.locale):"position"===t.format&&(e=Pt(100-e,i.locale)));return{value:e,unit:n}},ae=o`
  ha-card {
    display: flex;
    flex-direction: column;
  }

  /* Header sauber ausrichten */
  .card-header {
    display: flex;
    align-items: center;           /* vertikale Zentrierung */
    justify-content: space-between;
    gap: 12px;
    min-height: 48px;
    padding: 8px 16px 0 16px;
    box-sizing: border-box;
  }

  /* Linker Titelblock (Icon + Text) */
  .card-header > *:first-child {
    display: inline-flex;
    align-items: center;           /* Icon + Text gleiche Höhe */
    gap: 8px;
    min-height: 32px;
  }

  .card-header state-badge,
  .card-header ha-state-icon,
  .card-header ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* Info-Entities rechts: Icons/Text vertikal mittig */
  .entities-info-row {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;           /* hier: vertikal mittig */
    justify-content: center;
    font-size: 12px;
    padding-right: 4px;
  }
  .entities-info-row .entity {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .entities-info-row .entity ha-icon,
  .entities-info-row .entity ha-state-icon,
  .entities-info-row .entity state-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* Hauptinhalte */
  .entity {
    text-align: center;
    cursor: pointer;
  }
  .entity span {
    font-size: 10px;
  }

  .entities-row {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    padding: 0 20px 12px 20px;
  }

  .entities-column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
  }
  .entities-column .entity div {
    display: inline-block;
    vertical-align: middle;
  }

  .main-state { margin-right: 10px; }
  .main-state > ha-state-icon > ha-svg-icon { vertical-align: middle; }
  .main-icon { vertical-align: middle; font-size: 30px; }

  .title { min-height: 32px; display:inline-flex; align-items:center; }

  .clickable { cursor: pointer; }

  .content-left   { justify-content: left; }
  .content-center { justify-content: center; }
  .content-right  { justify-content: right; }
`;var ce=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD-EDITOR: module loaded");const le=()=>!!customElements.get("ha-textfield");let de=0,he=0;const ue={de:{header:"Header",title:"Titel",entityReq:"Entity (Pflichtfeld)",icon:"Icon",hideTitle:"Titel ausblenden",rows:"Reihen",addRow:"Reihe hinzufügen",addEntity:"Entity hinzufügen",removeRow:"Reihe entfernen",remove:"Entfernen",duplicate:"Duplizieren",moveUp:"Nach oben",moveDown:"Nach unten",nameOptional:"Name (optional)",showIcon:"Icon anzeigen",showState:"Zustand anzeigen",decimals:"Dezimalstellen",unitOverride:"Einheit (Override)",infoEntities:"Info Entities",noRows:"Noch keine Reihen. Klicke „Reihe hinzufügen“.",noEntitiesInRow:"Noch keine Entities in dieser Reihe.",noInfo:"Keine Info-Entities. Klicke „Entity hinzufügen“.",iconStatic:"Statisch",iconConditional:"Bedingt",conditions:"Bedingungen",operator:"Operator",value:"Wert",elseIcon:"Else-Icon (optional)",invalidHeaderEntity:"Header-Entity ist erforderlich.",invalidRowEntity:"Mindestens eine Entity in jeder Reihe ist erforderlich.",loading:"Editor wird geladen…"},en:{header:"Header",title:"Title",entityReq:"Entity (required)",icon:"Icon",hideTitle:"Hide title",rows:"Rows",addRow:"Add row",addEntity:"Add entity",removeRow:"Remove row",remove:"Remove",duplicate:"Duplicate",moveUp:"Move up",moveDown:"Move down",nameOptional:"Name (optional)",showIcon:"Show icon",showState:"Show state",decimals:"Decimals",unitOverride:"Unit (override)",infoEntities:"Info entities",noRows:"No rows yet. Click “Add row”.",noEntitiesInRow:"No entities in this row yet.",noInfo:"No info entities. Click “Add entity”.",iconStatic:"Static",iconConditional:"Conditional",conditions:"Conditions",operator:"Operator",value:"Value",elseIcon:"Else icon (optional)",invalidHeaderEntity:"Header entity is required.",invalidRowEntity:"At least one entity per row is required.",loading:"Loading editor…"}};function pe(t,e){return ue[function(t){return(t?.locale?.language||t?.language||(navigator?.language||"en").slice(0,2)).startsWith("de")?"de":"en"}(t)][e]}function fe(t){return function(t){return null!==t&&"object"==typeof t&&!Array.isArray(t)}(t)&&Array.isArray(t.conditions)}function me(t,e){if(""===t||null==t)return e;const i=Number(t);return Number.isFinite(i)?i:e}let _e=class extends at{constructor(){super(),Object.defineProperty(this,"hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_errors",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_addRow",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureRows();const t=[...this._config.rows];t.push({entities:[]}),this._config.rows=t,this._emitChanged()}}),Object.defineProperty(this,"_removeRow",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows];e.splice(t,1),this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_moveRow",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],n=t+e;n<0||n>=i.length||([i[t],i[n]]=[i[n],i[t]],this._config.rows=i,this._emitChanged())}}),Object.defineProperty(this,"_dupRow",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows],i=JSON.parse(JSON.stringify(e[t]||{entities:[]}));e.splice(t+1,0,i),this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_addRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows],i={...e[t]||{entities:[]}};i.entities=Array.isArray(i.entities)?[...i.entities]:[],i.entities.push({entity:"",name:"",icon:"",show_icon:!0,show_state:!0,decimals:void 0,unit:""}),e[t]=i,this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_removeRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],n={...i[t]||{entities:[]}};n.entities=Array.isArray(n.entities)?[...n.entities]:[],n.entities.splice(e,1),i[t]=n,this._config.rows=i,this._emitChanged()}}),Object.defineProperty(this,"_moveRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i)=>{this._ensureRows();const n=[...this._config.rows],s={...n[t]||{entities:[]}};s.entities=Array.isArray(s.entities)?[...s.entities]:[];const o=e+i;o<0||o>=s.entities.length||([s.entities[e],s.entities[o]]=[s.entities[o],s.entities[e]],n[t]=s,this._config.rows=n,this._emitChanged())}}),Object.defineProperty(this,"_dupRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],n={...i[t]||{entities:[]}};n.entities=Array.isArray(n.entities)?[...n.entities]:[];const s=JSON.parse(JSON.stringify(n.entities[e]||{}));n.entities.splice(e+1,0,s),i[t]=n,this._config.rows=i,this._emitChanged()}}),Object.defineProperty(this,"_updateRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i,n)=>{this._ensureRows();const s=[...this._config.rows],o={...s[t]||{entities:[]}};o.entities=Array.isArray(o.entities)?[...o.entities]:[];const r={...o.entities[e]||{}};r[i]=n,o.entities[e]=r,s[t]=o,this._config.rows=s,this._emitChanged()}}),Object.defineProperty(this,"_addInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureInfo();const t=[...this._config.info_entities];t.push({entity:"",name:"",icon:"",show_icon:!0}),this._config.info_entities=t,this._emitChanged()}}),Object.defineProperty(this,"_removeInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureInfo();const e=[...this._config.info_entities];e.splice(t,1),this._config.info_entities=e,this._emitChanged()}}),Object.defineProperty(this,"_moveInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureInfo();const i=[...this._config.info_entities],n=t+e;n<0||n>=i.length||([i[t],i[n]]=[i[n],i[t]],this._config.info_entities=i,this._emitChanged())}}),Object.defineProperty(this,"_dupInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureInfo();const e=[...this._config.info_entities],i=JSON.parse(JSON.stringify(e[t]||{}));e.splice(t+1,0,i),this._config.info_entities=e,this._emitChanged()}}),Object.defineProperty(this,"_updateInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i)=>{this._ensureInfo();const n=[...this._config.info_entities],s={...n[t]||{}};s[e]=i,n[t]=s,this._config.info_entities=n,this._emitChanged()}}),console.info("ROOM-CARD-EDITOR: constructed")}connectedCallback(){super.connectedCallback(),["ha-entity-picker","ha-icon-picker"].forEach(t=>customElements.whenDefined(t).then(()=>this.requestUpdate()))}setConfig(t){const e=Array.isArray(t.rows)?t.rows.map(t=>({...t,entities:Array.isArray(t?.entities)?[...t.entities]:[]})):[],i=Array.isArray(t.info_entities)?t.info_entities.map(t=>({...t})):[];this._config={...t,rows:e,info_entities:i},this._validate(),this.requestUpdate()}_validate(){const t=[],e=this._config||{};if(e.entity||t.push(pe(this.hass,"invalidHeaderEntity")),Array.isArray(e.rows))for(const i of e.rows)if(!Array.isArray(i.entities)||0===i.entities.length){t.push(pe(this.hass,"invalidRowEntity"));break}this._errors=t}_emitChanged(){this._validate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_set(t,e){this._config={...this._config,[t]:e},this._emitChanged()}_ensureRows(){Array.isArray(this._config.rows)||(this._config.rows=[])}_ensureInfo(){Array.isArray(this._config.info_entities)||(this._config.info_entities=[])}_isBuggyPicker(){const t=(this.hass?.config?.version??"").match(/^(\d+)\.(\d+)\.(\d+)/);if(!t)return!1;const e=Number(t[1]),i=Number(t[2]);return 2025===e&&i>=9}_TF(t,e,i){return le()?F`<ha-textfield
          .value=${e??""}
          label=${t}
          @input=${t=>i(t.currentTarget.value)}
        ></ha-textfield>`:F`<label class="lbl">
          ${t}
          <input class="plain" .value=${e??""} @input=${t=>i(t.currentTarget.value)} />
        </label>`}_NumTF(t,e,i){return le()?F`<ha-textfield
          type="number"
          .value=${e??""}
          label=${t}
          @input=${t=>i(me(t.currentTarget.value,void 0))}
        ></ha-textfield>`:F`<label class="lbl">
          ${t}
          <input
            class="plain"
            type="number"
            .value=${e??""}
            @input=${t=>i(me(t.currentTarget.value,void 0))}
          />
        </label>`}_EntityPicker(t,e,i,n){const s=this._isBuggyPicker(),o=t=>{if(i(t),n){const e=function(t,e){if(!t||!e)return"";const i=t.states?.[e];return i?.attributes?.friendly_name||""}(this.hass,t);e&&n(e)}};if(customElements.get("ha-entity-picker")&&!s)return F`
        <div class="picker-anchor">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${e??""}
            label=${t}
            allow-custom-entity
            ?disabled=${!this.hass}
            style="
              width:100%; display:block;
              --mdc-menu-min-width: 100%;
              --vaadin-combo-box-overlay-width: 100%;
              --mdc-menu-surface-vertical-offset: 2px;
            "
            @value-changed=${t=>o(t.detail.value)}
          ></ha-entity-picker>
        </div>
      `;const r="rc-entities-"+ ++de,a=Object.keys(this.hass?.states??{}).sort();return F`
      <div class="picker-anchor">
        <label class="lbl">
          ${t}
          <input
            class="plain"
            list=${r}
            .value=${e??""}
            @change=${t=>o(t.currentTarget.value)}
            @input=${t=>i(t.currentTarget.value)}
            placeholder="sensor.xyz, switch.xyz, …"
            style="width:100%;"
          />
        </label>
        <datalist id=${r}>
          ${a.map(t=>F`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}_IconPicker(t,e,i){const n=customElements.get("ha-icon-picker")?F`<ha-icon-picker
            .value=${t??""}
            label=${pe(this.hass,"icon")}
            @value-changed=${t=>e(t.detail.value)}
          ></ha-icon-picker>`:this._TF("Icon (mdi:…)",t,e);return F`
      <div class="icon-row">
        <div class="icon-preview">
          <ha-icon .icon=${i||t||"mdi:help-circle-outline"}></ha-icon>
        </div>
        <div class="icon-input">${n}</div>
      </div>
    `}_Switch(t,e,i){return customElements.get("ha-switch")&&customElements.get("ha-formfield")?F`<ha-formfield label=${t}
        ><ha-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></ha-switch
      ></ha-formfield>`:customElements.get("mwc-switch")&&customElements.get("mwc-formfield")?F`<mwc-formfield label=${t}
        ><mwc-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></mwc-switch
      ></mwc-formfield>`:F`<label class="lbl"
      ><input type="checkbox" .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)} />
      ${t}</label
    >`}_Btn(t,e,i="primary"){return customElements.get("mwc-button")?F`<mwc-button dense class=${i} @click=${e}>${t}</mwc-button>`:F`<button class="plain-btn ${i}" @click=${e}>${t}</button>`}_evalIconPreview(t){if(!t||!Array.isArray(t.conditions)||!this.hass)return;const e=this.hass;for(const i of t.conditions){const t=i.entity&&e.states[i.entity];if(!t)continue;const n=String(t.state??"").toLowerCase(),s=String(i.value??"").toLowerCase(),o=i.operator??"=";let r=!1;if("="===o)r=n===s;else if("!="===o)r=n!==s;else if("contains"===o)r=n.includes(s);else{const e=Number(t.state),n=Number(i.value);Number.isFinite(e)&&Number.isFinite(n)&&("<"===o?r=e<n:">"===o?r=e>n:"<="===o?r=e<=n:">="===o&&(r=e>=n))}if(r&&i.icon)return i.icon}return t.else||void 0}_IconControl(t,e,i,n){let s=(n&&(n.icon_conditions??n.icon))??"";const o=fe(s)||fe(n?.icon_conditions),r="rc-icon-mode-"+ ++he,a=o?this._evalIconPreview(s?.conditions?s:n.icon_conditions):"string"==typeof s?s:void 0;return F`
      <div class="icon-control">
        <div class="icon-mode">
          <label><input type="radio" name=${r} .checked=${!o} @change=${()=>{const t="string"==typeof s?s:"";this._assignIcon(e,i,{icon:t,icon_conditions:void 0})}} /> ${pe(this.hass,"iconStatic")}</label>
          <label><input type="radio" name=${r} .checked=${o} @change=${()=>{const t=fe(s)?s:{conditions:[{entity:"",operator:"=",value:"",icon:""}],else:""};this._assignIcon(e,i,{icon:void 0,icon_conditions:t})}} /> ${pe(this.hass,"iconConditional")}</label>
        </div>

        ${o?this._IconConditionsEditor(t,s?.conditions?s:n.icon_conditions,t=>{this._assignIcon(e,i,{icon:void 0,icon_conditions:t})},a):F`<div class="field">${this._IconPicker("string"==typeof s?s:"",t=>{this._assignIcon(e,i,{icon:t,icon_conditions:void 0})},a)}</div>`}
      </div>
    `}_IconConditionsEditor(t,e,i,n){const s=e&&fe(e)?e:{conditions:[],else:""},o=(t,e)=>{const n={conditions:[...s.conditions],else:s.else??""};n.conditions[t]={...n.conditions[t],...e},i(n)};return F`
      <div class="cond-wrap">
        <div class="cond-title">${t} – ${pe(this.hass,"conditions")}</div>

        ${s.conditions.length?s.conditions.map((t,e)=>F`
                <div class="cond-row">
                  <div class="field">
                    ${this._EntityPicker("Entity",t.entity??"",t=>o(e,{entity:t}))}
                  </div>

                  <div class="field">
                    <ha-select
                      naturalMenuWidth
                      label=${pe(this.hass,"operator")}
                      .value=${t.operator??"="}
                      @selected=${t=>o(e,{operator:t.target.value})}
                      @closed=${t=>t.stopPropagation()}
                    >
                      <mwc-list-item value="=">=</mwc-list-item>
                      <mwc-list-item value="!=">!=</mwc-list-item>
                      <mwc-list-item value="<"><</mwc-list-item>
                      <mwc-list-item value=">">></mwc-list-item>
                      <mwc-list-item value="<="><=</mwc-list-item>
                      <mwc-list-item value=">=">>=</mwc-list-item>
                      <mwc-list-item value="contains">contains</mwc-list-item>
                    </ha-select>
                  </div>

                  <div class="field">
                    ${this._TF(pe(this.hass,"value"),t.value??"",t=>o(e,{value:t}))}
                  </div>

                  <div class="field">
                    ${this._IconPicker(t.icon??"",t=>o(e,{icon:t}))}
                  </div>

                  <div class="actions">
                    ${this._Btn(pe(this.hass,"remove"),()=>(t=>{const e={conditions:[...s.conditions],else:s.else??""};e.conditions.splice(t,1),i(e)})(e),"danger")}
                  </div>
                </div>
              `):F`<div class="hint">No conditions yet.</div>`}

        <div class="actions">${this._Btn("Add condition",()=>{const t={conditions:[...s.conditions],else:s.else??""};t.conditions.push({entity:"",operator:"=",value:"",icon:""}),i(t)},"ghost")}</div>

        <div class="field">
          ${this._IconPicker(s.else??"",t=>{const e={conditions:[...s.conditions],else:t};i(e)},n)}
        </div>
        <div class="hint">${pe(this.hass,"elseIcon")}</div>
      </div>
    `}_assignIcon(t,e,i){if(this._config){if("header"===t){const t={...this._config};return void 0!==i.icon_conditions?(delete t.icon,t.icon_conditions=i.icon_conditions):(delete t.icon_conditions,t.icon=i.icon??""),this._config=t,void this._emitChanged()}if("row"===t&&e&&"number"==typeof e.ri&&"number"==typeof e.ei){this._ensureRows();const t=[...this._config.rows??[]],n={...t[e.ri]||{entities:[]}};n.entities=Array.isArray(n.entities)?[...n.entities]:[];const s={...n.entities[e.ei]||{}};return void 0!==i.icon_conditions?(delete s.icon,s.icon_conditions=i.icon_conditions):(delete s.icon_conditions,s.icon=i.icon??""),n.entities[e.ei]=s,t[e.ri]=n,this._config.rows=t,void this._emitChanged()}if("info"===t&&e&&"number"==typeof e.ii){this._ensureInfo();const t=[...this._config.info_entities??[]],n={...t[e.ii]||{}};void 0!==i.icon_conditions?(delete n.icon,n.icon_conditions=i.icon_conditions):(delete n.icon_conditions,n.icon=i.icon??""),t[e.ii]=n,this._config.info_entities=t,this._emitChanged()}}}render(){if(!this._config)return F`<div class="hint">${pe(this.hass,"loading")}</div>`;const t=this._config;return F`
      <div class="form">
        <!-- Errors -->
        ${this._errors.length?F`<div class="errors">${this._errors.map(t=>F`<div class="error">${t}</div>`)}</div>`:null}

        <!-- Header -->
        <div class="section">
          <div class="section-title">${pe(this.hass,"header")}</div>
          <div class="field">
            ${this._TF(pe(this.hass,"title"),t.title??"",t=>this._set("title",t))}
          </div>
          <div class="field">
            ${this._EntityPicker(pe(this.hass,"entityReq"),t.entity??"",t=>this._set("entity",t),e=>{t.title&&"Room"!==t.title||this._set("title",e)})}
          </div>
          <div class="field">
            ${this._IconControl(pe(this.hass,"icon"),"header",null,t)}
          </div>
          <div class="toggles">
            ${this._Switch(pe(this.hass,"hideTitle"),!!t.hide_title,t=>this._set("hide_title",t))}
          </div>
        </div>

        <!-- Rows -->
        <div class="section">
          <div class="section-title">
            ${pe(this.hass,"rows")}
            <span class="row-toolbar">
              ${this._Btn(pe(this.hass,"addRow"),this._addRow)}
            </span>
          </div>

          ${(t.rows??[]).length?t.rows.map((t,e)=>F`
                  <div class="row-card">
                    <div class="row-header">
                      <div class="row-title">Row ${e+1}</div>
                      <div class="row-actions">
                        ${this._Btn(pe(this.hass,"moveUp"),()=>this._moveRow(e,-1),"ghost")}
                        ${this._Btn(pe(this.hass,"moveDown"),()=>this._moveRow(e,1),"ghost")}
                        ${this._Btn(pe(this.hass,"duplicate"),()=>this._dupRow(e),"ghost")}
                        ${this._Btn(pe(this.hass,"removeRow"),()=>this._removeRow(e),"danger")}
                        ${this._Btn(pe(this.hass,"addEntity"),()=>this._addRowEntity(e))}
                      </div>
                    </div>

                    ${Array.isArray(t.entities)&&t.entities.length?t.entities.map((t,i)=>F`
                            <div class="entity-block">
                              <div class="field">
                                ${this._EntityPicker("Entity",t.entity??"",t=>this._updateRowEntity(e,i,"entity",t),n=>{t.name||this._updateRowEntity(e,i,"name",n)})}
                              </div>
                              <div class="field">
                                ${this._TF(pe(this.hass,"nameOptional"),t.name??"",t=>this._updateRowEntity(e,i,"name",t))}
                              </div>
                              <div class="field">
                                ${this._IconControl("Icon","row",{ri:e,ei:i},t)}
                              </div>
                              <div class="toggles">
                                ${this._Switch(pe(this.hass,"showIcon"),!1!==t.show_icon,t=>this._updateRowEntity(e,i,"show_icon",t))}
                                ${this._Switch(pe(this.hass,"showState"),!1!==t.show_state,t=>this._updateRowEntity(e,i,"show_state",t))}
                              </div>
                              <div class="field two">
                                ${this._NumTF(pe(this.hass,"decimals"),t.decimals,t=>this._updateRowEntity(e,i,"decimals",t))}
                                ${this._TF(pe(this.hass,"unitOverride"),t.unit??"",t=>this._updateRowEntity(e,i,"unit",t))}
                              </div>
                              <div class="actions">
                                ${this._Btn(pe(this.hass,"moveUp"),()=>this._moveRowEntity(e,i,-1),"ghost")}
                                ${this._Btn(pe(this.hass,"moveDown"),()=>this._moveRowEntity(e,i,1),"ghost")}
                                ${this._Btn(pe(this.hass,"duplicate"),()=>this._dupRowEntity(e,i),"ghost")}
                                ${this._Btn(pe(this.hass,"remove"),()=>this._removeRowEntity(e,i),"danger")}
                              </div>
                            </div>
                          `):F`<div class="hint">${pe(this.hass,"noEntitiesInRow")}</div>`}
                  </div>
                `):F`<div class="hint">${pe(this.hass,"noRows")}</div>`}
        </div>

        <!-- Info entities -->
        <div class="section">
          <div class="section-title">
            ${pe(this.hass,"infoEntities")}
            ${this._Btn(pe(this.hass,"addEntity"),this._addInfoEntity)}
          </div>

          ${Array.isArray(t.info_entities)&&t.info_entities.length?t.info_entities.map((t,e)=>F`
                  <div class="entity-block">
                    <div class="field">
                      ${this._EntityPicker("Entity",t.entity??"",t=>this._updateInfoEntity(e,"entity",t),i=>{t.name||this._updateInfoEntity(e,"name",i)})}
                    </div>
                    <div class="field">
                      ${this._TF(pe(this.hass,"nameOptional"),t.name??"",t=>this._updateInfoEntity(e,"name",t))}
                    </div>
                    <div class="field">
                      ${this._IconControl("Icon","info",{ii:e},t)}
                    </div>
                    <div class="toggles">
                      ${this._Switch(pe(this.hass,"showIcon"),!1!==t.show_icon,t=>this._updateInfoEntity(e,"show_icon",t))}
                    </div>
                    <div class="actions">
                      ${this._Btn(pe(this.hass,"moveUp"),()=>this._moveInfoEntity(e,-1),"ghost")}
                      ${this._Btn(pe(this.hass,"moveDown"),()=>this._moveInfoEntity(e,1),"ghost")}
                      ${this._Btn(pe(this.hass,"duplicate"),()=>this._dupInfoEntity(e),"ghost")}
                      ${this._Btn(pe(this.hass,"remove"),()=>this._removeInfoEntity(e),"danger")}
                    </div>
                  </div>
                `):F`<div class="hint">${pe(this.hass,"noInfo")}</div>`}
        </div>
      </div>
    `}};Object.defineProperty(_e,"styles",{enumerable:!0,configurable:!0,writable:!0,value:o`
    :host { display:block; box-sizing:border-box; padding:4px 0 8px; }

    .form {
      display: grid;
      gap: 16px;
      width: 100%;
      max-width: 620px;
      overflow: visible;
    }

    .errors { display:grid; gap:6px; }
    .error { color: var(--error-color, #d32f2f); font-weight: 600; }

    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:600; flex-wrap:wrap; }
    .row-toolbar { display:flex; gap:8px; }

    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
    .row-actions { display:flex; gap:8px; flex-wrap:wrap; }

    .entity-block { display:grid; grid-template-columns: 1fr; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; overflow:visible; }
    .field { min-width:0; overflow:visible; position:relative; }
    .field.two { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }

    .picker-anchor { position: relative; overflow: visible; width: 100%; }

    ha-entity-picker,
    ha-icon-picker,
    ha-textfield,
    ha-combo-box,
    ha-select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
    }

    ha-entity-picker {
      --mdc-menu-min-width: 100%;
      --vaadin-combo-box-overlay-width: 100%;
    }

    /* Icon preview row */
    .icon-row { display:grid; grid-template-columns: auto 1fr; align-items:center; gap:10px; }
    .icon-preview { width: 36px; height: 36px; display:flex; align-items:center; justify-content:center; }
    .icon-preview ha-icon { --mdc-icon-size: 24px; }

    /* Icon-Mode & Conditions: immer vertikal */
    .icon-control { display:grid; gap:8px; }
    .icon-mode { display:flex; gap:16px; align-items:center; }

    .cond-wrap { display:grid; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; }
    .cond-title { font-weight:600; }

    .cond-wrap .cond-row {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr !important;
      gap: 10px;
      width: 100%;
    }
    .cond-wrap .cond-row > .field,
    .cond-wrap .cond-row > .actions {
      grid-column: 1 / -1 !important;
      width: 100%;
    }
    .cond-wrap .cond-row ha-select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
      --mdc-menu-min-width: 100%;
    }

    .toggles { display:grid; gap:8px; align-content:start; }
    .actions { display:flex; gap:8px; justify-content:flex-end; }

    .hint { opacity:.7; font-style:italic; }
    .lbl { display:grid; gap:6px; font-size:.9rem; }
    input.plain { width:100%; padding:8px; border:1px solid var(--divider-color,#ddd); border-radius:6px; background:var(--card-background-color,#fff); color: var(--primary-text-color); }

    .plain-btn { padding:6px 10px; border-radius:8px; border:1px solid var(--divider-color,#ccc); background: var(--secondary-background-color,#f6f6f6); cursor:pointer; }
    .plain-btn.ghost { background:transparent; }
    .plain-btn.danger { border-color: var(--error-color,#d32f2f); color: var(--error-color,#d32f2f); }

    mwc-button.danger { --mdc-theme-primary: var(--error-color, #d32f2f); }
  `}),ce([ht({attribute:!1})],_e.prototype,"hass",void 0),ce([ut()],_e.prototype,"_config",void 0),ce([ut()],_e.prototype,"_errors",void 0),_e=ce([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("room-card-editor")],_e),customElements.get("room-card-editor")||customElements.define("room-card-editor",_e);var ge=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD: script executed"),window.customCards=window.customCards||[],window.customCards.some(t=>"room-card"===t.type)||window.customCards.push({type:"room-card",name:"Room Card",description:"Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI",preview:!0});class ve extends at{constructor(){super(...arguments),Object.defineProperty(this,"monitoredStates",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_configError",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stateObj",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_helpers",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}static getConfigElement(){return console.info("ROOM-CARD: getConfigElement()"),document.createElement("room-card-editor")}static getStubConfig(t,e){return{type:"custom:room-card",title:"Room",entity:Array.isArray(e)&&e.length?e[0]:void 0,show_icon:!0}}getChildCustomCardTypes(t,e){if(t)for(const i of t)i?.type?.startsWith?.("custom:")&&e.add(i.type.substring(7)),this.getChildCustomCardTypes(i.cards,e)}async waitForDependentComponents(t){const e=new Set;this.getChildCustomCardTypes(t.cards,e),e.size&&await Promise.all(Array.from(e).map(t=>customElements.whenDefined(t)))}async setConfig(t){this._configError=void 0;try{(t=>{if(null==t.entities&&null==t.entity&&void 0===t.info_entities&&void 0===t.rows&&void 0===t.cards)throw new Error("Please define entities.")})(t)}catch(t){this._configError=t?.message||String(t),console.warn("ROOM-CARD config warning:",t)}this.config={...t||{},entityIds:Lt(t||{})},null!==document.querySelector("hui-card-editor")||await this.waitForDependentComponents(this.config),"function"==typeof window.loadCardHelpers&&(this._helpers=await window.loadCardHelpers()),this.requestUpdate()}set hass(t){this._hass=t,t&&this.config&&(this.updateMonitoredStates(t),this.config.hass=t),this.requestUpdate()}updateMonitoredStates(t){const e={...this.monitoredStates||{}};let i=!1;for(const n of this.config.entityIds)if(n in t.states){const s=this.monitoredStates&&this.monitoredStates[n],o=t.states[n];(!this.monitoredStates||s?.last_updated<o.last_updated||s?.last_changed<o.last_changed||o!==e[n])&&(i=!0,e[n]=o)}else this.monitoredStates&&n in this.monitoredStates&&(i=!0,delete e[n]);i&&(this.monitoredStates=e)}static get styles(){return ae}render(){if(!this.config)return F``;if(!this._hass){const t=this.config.title??"Room";return F`
        <ha-card elevation="2">
          <div class="card-header"><div class="name">${t}</div></div>
          <div style="padding:12px; opacity:.7">Preview…</div>
        </ha-card>
      `}if(this._configError)return F`<hui-warning>${this._configError}</hui-warning>`;try{const{entity:t,info_entities:e=[],entities:i=[],rows:n=[],stateObj:s}=((t,e)=>{const i={info_entities:[],entities:[]};return e&&t?(i.stateObj=void 0!==t.entity?e.states[t.entity]:void 0,i.entity=void 0!==t.entity?{...t,stateObj:i.stateObj}:void 0,i.info_entities=t.info_entities?.map(i=>Vt(i,e,t))??[],i.entities=t.entities?.map(i=>Vt(i,e,t))??[],i.rows=t.rows?.map(i=>{const n=i.entities?.map(i=>Vt(i,e,t));return{entities:n,hide_if:i.hide_if,content_alignment:i.content_alignment}})??[],t.hass=e,i):i})(this.config,this._hass);this.stateObj=s;const o=Array.isArray(e)&&e.length>0,r=this.config?.icon||!!this.config?.icon_conditions,a=!this.config.hide_title||o||r;return F`
        <ha-card elevation="2" style="${ee(this.config.card_styles,s,this._hass)}">
          ${a?F`
                <div class="card-header">
                  ${((t,e,i,n)=>{if(!0===t.hide_title)return null;const s=void 0!==t.tap_action||void 0!==t.double_tap_action,o=Ht(t.title,e,n?.stateObj);return F`<div class="title${s?" clickable":""}" @action=${s=>{e&&s.detail.action&&ne(i,e,n??{tap_action:t.tap_action,double_tap_action:t.double_tap_action,hold_action:t.hold_action},s)}}
    .actionHandler=${Qt({hasHold:$t(n?.hold_action),hasDoubleClick:$t(n?.double_tap_action)})}>${((t,e,i)=>{if(void 0===t)return null;const n=i.states[t.entity];return F`<div
        class="main-state entity"
        style="${ee(t.styles,n,i)}">
        ${0===e.entities?.length||e.icon?ie(t.stateObj,e,i,"main-icon"):void 0!==t.show_state&&!1===t.show_state?"":((t,e)=>{if(!0===t.toggle)return F`<ha-entity-toggle .stateObj="${t.stateObj}" .hass="${e}"></ha-entity-toggle>`;if(!0===t.show_icon)return ie(t.stateObj,t,e);if(t.attribute&&[Ct,St].includes(t.attribute))return F`<ha-relative-time
            .hass=${e}
            .datetime=${t.attribute===Ct?t.stateObj.last_changed:t.stateObj.last_updated}
            capitalize
        ></ha-relative-time>`;if(t.format&&Rt.includes(t.format)){const i=Bt(t),n=new Date(i);return n instanceof Date&&!isNaN(n.getTime())?F`<hui-timestamp-display
            .hass=${e}
            .ts=${n}
            .format=${t.format}
            capitalize
        ></hui-timestamp-display>`:i}return te(e,t)})(t,i)}
    </div>`})(n,t,e)} ${o}</div>`})(this.config,this._hass,this,t)}
                  <div class="entities-info-row">
                    ${e.map(t=>((t,e,i)=>void 0===t||!t.stateObj||Zt(t,e)?null:F`<div class="state entity icon-entity"
        style="${ee(t.styles,t.stateObj,e)}"
        @action=${n=>{e&&t&&n.detail.action&&ne(i,e,t,n)}}
        .actionHandler=${Qt({hasHold:$t(t.hold_action),hasDoubleClick:$t(t.double_tap_action)})}>
        ${ie(t.stateObj,t,e)}
    </div>`)(t,this._hass,this))}
                  </div>
                </div>
              `:null}

          ${n&&n.length>0?((t,e,i)=>{const n=t.filter(t=>!((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=t.hide_if.conditions?.filter(t=>{if(t.entity){const i=e.states[t.entity];return Jt(t,t.attribute?i.attributes[t.attribute]:i.state)}});return i?.length>0}})(t,e));return F`${n.map(t=>se(t,t.entities,e,i))}`})(n,this._hass,this):se(this.config,i,this._hass,this)}

          ${this.config.cards?.map(t=>this.createCardElement(t,this._hass))}
        </ha-card>
      `}catch(t){return console.warn("ROOM-CARD render error:",t),F`<hui-warning>${t?.toString?.()??t}</hui-warning>`}}getCardSize(){const t=this.config?.cards?this.config.cards.length:0,e=this.config?.rows?this.config.rows.length:0,i=this.config?.entities&&this.config.entities.length>0?1:0,n=Array.isArray(this.config?.info_entities)&&(this.config?.info_entities?.length??0)>0,s=this.config?.icon||!!this.config?.icon_conditions;return t+e+i+(!this.config?.hide_title||n||s?1:0)}createCardElement(t,e){if(((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=e.states[t.entity]?.state,n=t.hide_if.conditions?.filter(n=>{let s=i;if(n.entity){const t=e.states[n.entity];s=n.attribute?t.attributes[n.attribute]:t.state}return n.attribute&&!n.entity&&(s=e.states[t.entity].attributes[n.attribute]),Jt(n,s)});return n?.length>0}})(t,e)||t.show_states&&t.entity&&!t.show_states.includes(e.states[t.entity]?.state))return null;let i;return i=this._helpers?this._helpers.createCardElement(t):function(t,e){void 0===e&&(e=!1);var i=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,e){var n=window.document.createElement(t);try{if(!n.setConfig)return;n.setConfig(e)}catch(n){return console.error(t,n),i(n.message,e)}return n};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var s=t.type;if(s&&s.startsWith("custom:"))s=s.substr(7);else if(e)if(vt.has(s))s="hui-"+s+"-row";else{if(!t.entity)return i("Invalid config given.",t);var o=t.entity.split(".",1)[0];s="hui-"+(yt[o]||"text")+"-entity-row"}else s="hui-"+s+"-card";if(customElements.get(s))return n(s,t);var r=i("Custom element doesn't exist: "+t.type+".",t);r.style.display="None";var a=setTimeout(function(){r.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(a),gt(r,"ll-rebuild",{},r)}),r}(t),i.hass=e,i.style.boxShadow="none",i.style.borderRadius="0",i}}ge([ht({attribute:!1})],ve.prototype,"monitoredStates",void 0),ge([ht({attribute:!1})],ve.prototype,"_hass",void 0),ge([ht({attribute:!1})],ve.prototype,"config",void 0);const ye="room-card";customElements.get(ye)||(customElements.define(ye,ve),console.info("ROOM-CARD: custom element defined"))})();