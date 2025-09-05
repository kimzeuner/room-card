/*! For license information please see room-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",_=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??w)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,_?.({ReactiveElement:$}),(f.reactiveElementVersions??=[]).push("2.1.1");const E=globalThis,A=E.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+S,O=`<${R}>`,P=document,k=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),L=q(1),F=(q(2),q(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),J=new WeakMap,V=P.createTreeWalker(P,129);function K(t,e){if(!j(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===N?"!--"===c[1]?r=M:void 0!==c[1]?r=U:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=n??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?z:D):r===z||r===D?r=H:r===M||r===U?r=N:(r=H,n=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+O:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=Z(t,e);if(this.el=G.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===R)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=I(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>j(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new G(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Q(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!I(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===F)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=E.litHtmlPolyfillSupport;ot?.(G,Y),(E.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Y(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.1");const lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},dt=(t=lt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return ht({...t,state:!0,attribute:!1})}var pt,ft,mt;(mt=pt||(pt={})).language="language",mt.system="system",mt.comma_decimal="comma_decimal",mt.decimal_comma="decimal_comma",mt.space_comma="space_comma",mt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var gt=new Set(["call-service","divider","section","weblink","cast","select"]),_t={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"};function vt(t,e){return t?.icon_conditions?function(t,e){if(e&&Array.isArray(e.conditions)){for(const i of e.conditions){const e=i.entity&&t.states[i.entity];if(!e)continue;const s=String(e.state??"").toLowerCase(),n=String(i.value??"").toLowerCase(),o=i.operator??"=";let r=!1;if("="===o)r=s===n;else if("!="===o)r=s!==n;else if("contains"===o)r=s.includes(n);else{const t=Number(e.state),s=Number(i.value);Number.isFinite(t)&&Number.isFinite(s)&&("<"===o?r=t<s:">"===o?r=t>s:"<="===o?r=t<=s:">="===o&&(r=t>=s))}if(r&&i.icon)return i.icon}return e.else||void 0}}(e,t.icon_conditions):t?.icon}function yt(t,e){const i=t.entity,s=i&&e.states[i],n=!1!==t.show_icon,o=!1!==t.show_state,r=vt(t,e),a=t.name||s?.attributes?.friendly_name||i||"",c=i&&o?function(t,e,i,s){const n=t.states[e];if(!n)return"";const o=n.state,r=s||n.attributes?.unit_of_measurement||"",a=Number(o);if(Number.isFinite(a)&&"number"==typeof i){const t=a.toFixed(i);return r?`${t} ${r}`:t}return r?`${o} ${r}`:String(o)}(e,i,t.decimals,t.unit):"";return L`
    <div class="entity">
      ${n&&(r||s)?L`<ha-icon .icon=${r||"mdi:checkbox-blank-circle-outline"}></ha-icon>`:null}
      <div class="name">${a}</div>
      ${o?L`<div class="value">${c}</div>`:null}
    </div>
  `}const wt=t=>[t.entity].concat(t.entities?.map(t=>bt(t))).concat(t.info_entities?.map(t=>bt(t))).concat(t.rows?.flatMap(t=>t.entities).map(t=>bt(t))).concat(t.cards?.flatMap(t=>Et(t))).concat($t(t)).filter(t=>t),bt=t=>void 0===t?null:"string"==typeof t?t:t.entity,$t=t=>{const e=(t=>{let e=[];return t?.forEach(t=>{const i=t?.icon?.conditions?.filter(t=>void 0!==t.entity);i&&(e=e.concat(i));const s=t?.hide_if?.conditions?.filter(t=>void 0!==t.entity);s&&(e=e.concat(s))}),e})([t.entities,t.info_entities,t.rows?.flatMap(t=>t.entities)].flatMap(t=>t));return e.filter(t=>t.entity).map(t=>t.entity)},Et=t=>[bt(t.entity)].concat(t.cards?.flatMap(t=>Et(t))).concat(t.entities?.flatMap(t=>bt(t))).filter(t=>t),At=(t,e,i)=>{let s="string"==typeof t?{entity:t}:t;return s=((t,e)=>{if(void 0!==t&&t.template){const i=e.templates.filter(e=>e.name===t.template);if(i.length>0){const e=i[0];return{stateObj:t.stateObj,...e.template,...t}}}return t})(s,i),{...s,stateObj:e.states[s.entity]}},xt=o`
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
`;var Ct=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD-EDITOR: module loaded");const St=()=>!!customElements.get("ha-textfield");let Rt=0,Ot=0;const Pt={de:{header:"Header",title:"Titel",entityReq:"Entity (Pflichtfeld)",icon:"Icon",hideTitle:"Titel ausblenden",rows:"Reihen",addRow:"Reihe hinzufügen",addEntity:"Entity hinzufügen",removeRow:"Reihe entfernen",remove:"Entfernen",duplicate:"Duplizieren",moveUp:"Nach oben",moveDown:"Nach unten",nameOptional:"Name (optional)",showIcon:"Icon anzeigen",showState:"Zustand anzeigen",decimals:"Dezimalstellen",unitOverride:"Einheit (Override)",infoEntities:"Info Entities",noRows:"Noch keine Reihen. Klicke „Reihe hinzufügen“.",noEntitiesInRow:"Noch keine Entities in dieser Reihe.",noInfo:"Keine Info-Entities. Klicke „Entity hinzufügen“.",iconStatic:"Statisch",iconConditional:"Bedingt",conditions:"Bedingungen",operator:"Operator",value:"Wert",elseIcon:"Else-Icon (optional)",invalidHeaderEntity:"Header-Entity ist erforderlich.",invalidRowEntity:"Mindestens eine Entity in jeder Reihe ist erforderlich.",loading:"Editor wird geladen…"},en:{header:"Header",title:"Title",entityReq:"Entity (required)",icon:"Icon",hideTitle:"Hide title",rows:"Rows",addRow:"Add row",addEntity:"Add entity",removeRow:"Remove row",remove:"Remove",duplicate:"Duplicate",moveUp:"Move up",moveDown:"Move down",nameOptional:"Name (optional)",showIcon:"Show icon",showState:"Show state",decimals:"Decimals",unitOverride:"Unit (override)",infoEntities:"Info entities",noRows:"No rows yet. Click “Add row”.",noEntitiesInRow:"No entities in this row yet.",noInfo:"No info entities. Click “Add entity”.",iconStatic:"Static",iconConditional:"Conditional",conditions:"Conditions",operator:"Operator",value:"Value",elseIcon:"Else icon (optional)",invalidHeaderEntity:"Header entity is required.",invalidRowEntity:"At least one entity per row is required.",loading:"Loading editor…"}};function kt(t,e){return Pt[function(t){return(t?.locale?.language||t?.language||(navigator?.language||"en").slice(0,2)).startsWith("de")?"de":"en"}(t)][e]}function It(t){return function(t){return null!==t&&"object"==typeof t&&!Array.isArray(t)}(t)&&Array.isArray(t.conditions)}function jt(t,e){if(""===t||null==t)return e;const i=Number(t);return Number.isFinite(i)?i:e}let Tt=class extends at{constructor(){super(),Object.defineProperty(this,"hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_errors",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_addRow",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureRows();const t=[...this._config.rows];t.push({entities:[]}),this._config.rows=t,this._emitChanged()}}),Object.defineProperty(this,"_removeRow",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows];e.splice(t,1),this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_moveRow",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._config.rows=i,this._emitChanged())}}),Object.defineProperty(this,"_dupRow",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows],i=JSON.parse(JSON.stringify(e[t]||{entities:[]}));e.splice(t+1,0,i),this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_addRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureRows();const e=[...this._config.rows],i={...e[t]||{entities:[]}};i.entities=Array.isArray(i.entities)?[...i.entities]:[],i.entities.push({entity:"",name:"",icon:"",show_icon:!0,show_state:!0,decimals:void 0,unit:""}),e[t]=i,this._config.rows=e,this._emitChanged()}}),Object.defineProperty(this,"_removeRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],s={...i[t]||{entities:[]}};s.entities=Array.isArray(s.entities)?[...s.entities]:[],s.entities.splice(e,1),i[t]=s,this._config.rows=i,this._emitChanged()}}),Object.defineProperty(this,"_moveRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i)=>{this._ensureRows();const s=[...this._config.rows],n={...s[t]||{entities:[]}};n.entities=Array.isArray(n.entities)?[...n.entities]:[];const o=e+i;o<0||o>=n.entities.length||([n.entities[e],n.entities[o]]=[n.entities[o],n.entities[e]],s[t]=n,this._config.rows=s,this._emitChanged())}}),Object.defineProperty(this,"_dupRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureRows();const i=[...this._config.rows],s={...i[t]||{entities:[]}};s.entities=Array.isArray(s.entities)?[...s.entities]:[];const n=JSON.parse(JSON.stringify(s.entities[e]||{}));s.entities.splice(e+1,0,n),i[t]=s,this._config.rows=i,this._emitChanged()}}),Object.defineProperty(this,"_updateRowEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i,s)=>{this._ensureRows();const n=[...this._config.rows],o={...n[t]||{entities:[]}};o.entities=Array.isArray(o.entities)?[...o.entities]:[];const r={...o.entities[e]||{}};r[i]=s,o.entities[e]=r,n[t]=o,this._config.rows=n,this._emitChanged()}}),Object.defineProperty(this,"_addInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:()=>{this._ensureInfo();const t=[...this._config.info_entities];t.push({entity:"",name:"",icon:"",show_icon:!0}),this._config.info_entities=t,this._emitChanged()}}),Object.defineProperty(this,"_removeInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureInfo();const e=[...this._config.info_entities];e.splice(t,1),this._config.info_entities=e,this._emitChanged()}}),Object.defineProperty(this,"_moveInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e)=>{this._ensureInfo();const i=[...this._config.info_entities],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._config.info_entities=i,this._emitChanged())}}),Object.defineProperty(this,"_dupInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:t=>{this._ensureInfo();const e=[...this._config.info_entities],i=JSON.parse(JSON.stringify(e[t]||{}));e.splice(t+1,0,i),this._config.info_entities=e,this._emitChanged()}}),Object.defineProperty(this,"_updateInfoEntity",{enumerable:!0,configurable:!0,writable:!0,value:(t,e,i)=>{this._ensureInfo();const s=[...this._config.info_entities],n={...s[t]||{}};n[e]=i,s[t]=n,this._config.info_entities=s,this._emitChanged()}}),console.info("ROOM-CARD-EDITOR: constructed")}connectedCallback(){super.connectedCallback(),["ha-entity-picker","ha-icon-picker"].forEach(t=>customElements.whenDefined(t).then(()=>this.requestUpdate()))}setConfig(t){const e=Array.isArray(t.rows)?t.rows.map(t=>({...t,entities:Array.isArray(t?.entities)?[...t.entities]:[]})):[],i=Array.isArray(t.info_entities)?t.info_entities.map(t=>({...t})):[];this._config={...t,rows:e,info_entities:i},this._validate(),this.requestUpdate()}_validate(){const t=[],e=this._config||{};if(e.entity||t.push(kt(this.hass,"invalidHeaderEntity")),Array.isArray(e.rows))for(const i of e.rows)if(!Array.isArray(i.entities)||0===i.entities.length){t.push(kt(this.hass,"invalidRowEntity"));break}this._errors=t}_emitChanged(){this._validate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_set(t,e){this._config={...this._config,[t]:e},this._emitChanged()}_ensureRows(){Array.isArray(this._config.rows)||(this._config.rows=[])}_ensureInfo(){Array.isArray(this._config.info_entities)||(this._config.info_entities=[])}_isBuggyPicker(){const t=(this.hass?.config?.version??"").match(/^(\d+)\.(\d+)\.(\d+)/);if(!t)return!1;const e=Number(t[1]),i=Number(t[2]);return 2025===e&&i>=9}_TF(t,e,i){return St()?L`<ha-textfield
          .value=${e??""}
          label=${t}
          @input=${t=>i(t.currentTarget.value)}
        ></ha-textfield>`:L`<label class="lbl">
          ${t}
          <input class="plain" .value=${e??""} @input=${t=>i(t.currentTarget.value)} />
        </label>`}_NumTF(t,e,i){return St()?L`<ha-textfield
          type="number"
          .value=${e??""}
          label=${t}
          @input=${t=>i(jt(t.currentTarget.value,void 0))}
        ></ha-textfield>`:L`<label class="lbl">
          ${t}
          <input
            class="plain"
            type="number"
            .value=${e??""}
            @input=${t=>i(jt(t.currentTarget.value,void 0))}
          />
        </label>`}_EntityPicker(t,e,i,s){const n=this._isBuggyPicker(),o=t=>{if(i(t),s){const e=function(t,e){if(!t||!e)return"";const i=t.states?.[e];return i?.attributes?.friendly_name||""}(this.hass,t);e&&s(e)}};if(customElements.get("ha-entity-picker")&&!n)return L`
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
      `;const r="rc-entities-"+ ++Rt,a=Object.keys(this.hass?.states??{}).sort();return L`
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
          ${a.map(t=>L`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}_IconPicker(t,e,i){const s=customElements.get("ha-icon-picker")?L`<ha-icon-picker
            .value=${t??""}
            label=${kt(this.hass,"icon")}
            @value-changed=${t=>e(t.detail.value)}
          ></ha-icon-picker>`:this._TF("Icon (mdi:…)",t,e);return L`
      <div class="icon-row">
        <div class="icon-preview">
          <ha-icon .icon=${i||t||"mdi:help-circle-outline"}></ha-icon>
        </div>
        <div class="icon-input">${s}</div>
      </div>
    `}_Switch(t,e,i){return customElements.get("ha-switch")&&customElements.get("ha-formfield")?L`<ha-formfield label=${t}
        ><ha-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></ha-switch
      ></ha-formfield>`:customElements.get("mwc-switch")&&customElements.get("mwc-formfield")?L`<mwc-formfield label=${t}
        ><mwc-switch .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)}></mwc-switch
      ></mwc-formfield>`:L`<label class="lbl"
      ><input type="checkbox" .checked=${!!e} @change=${t=>i(!!t.currentTarget.checked)} />
      ${t}</label
    >`}_Btn(t,e,i="primary"){return customElements.get("mwc-button")?L`<mwc-button dense class=${i} @click=${e}>${t}</mwc-button>`:L`<button class="plain-btn ${i}" @click=${e}>${t}</button>`}_evalIconPreview(t){if(!t||!Array.isArray(t.conditions)||!this.hass)return;const e=this.hass;for(const i of t.conditions){const t=i.entity&&e.states[i.entity];if(!t)continue;const s=String(t.state??"").toLowerCase(),n=String(i.value??"").toLowerCase(),o=i.operator??"=";let r=!1;if("="===o)r=s===n;else if("!="===o)r=s!==n;else if("contains"===o)r=s.includes(n);else{const e=Number(t.state),s=Number(i.value);Number.isFinite(e)&&Number.isFinite(s)&&("<"===o?r=e<s:">"===o?r=e>s:"<="===o?r=e<=s:">="===o&&(r=e>=s))}if(r&&i.icon)return i.icon}return t.else||void 0}_IconControl(t,e,i,s){let n=(s&&(s.icon_conditions??s.icon))??"";const o=It(n)||It(s?.icon_conditions),r="rc-icon-mode-"+ ++Ot,a=o?this._evalIconPreview(n?.conditions?n:s.icon_conditions):"string"==typeof n?n:void 0;return L`
      <div class="icon-control">
        <div class="icon-mode">
          <label><input type="radio" name=${r} .checked=${!o} @change=${()=>{const t="string"==typeof n?n:"";this._assignIcon(e,i,{icon:t,icon_conditions:void 0})}} /> ${kt(this.hass,"iconStatic")}</label>
          <label><input type="radio" name=${r} .checked=${o} @change=${()=>{const t=It(n)?n:{conditions:[{entity:"",operator:"=",value:"",icon:""}],else:""};this._assignIcon(e,i,{icon:void 0,icon_conditions:t})}} /> ${kt(this.hass,"iconConditional")}</label>
        </div>

        ${o?this._IconConditionsEditor(t,n?.conditions?n:s.icon_conditions,t=>{this._assignIcon(e,i,{icon:void 0,icon_conditions:t})},a):L`<div class="field">${this._IconPicker("string"==typeof n?n:"",t=>{this._assignIcon(e,i,{icon:t,icon_conditions:void 0})},a)}</div>`}
      </div>
    `}_IconConditionsEditor(t,e,i,s){const n=e&&It(e)?e:{conditions:[],else:""},o=(t,e)=>{const s={conditions:[...n.conditions],else:n.else??""};s.conditions[t]={...s.conditions[t],...e},i(s)};return L`
      <div class="cond-wrap">
        <div class="cond-title">${t} – ${kt(this.hass,"conditions")}</div>

        ${n.conditions.length?n.conditions.map((t,e)=>L`
                <div class="cond-row">
                  <div class="field">
                    ${this._EntityPicker("Entity",t.entity??"",t=>o(e,{entity:t}))}
                  </div>

                  <div class="field">
                    <ha-select
                      naturalMenuWidth
                      label=${kt(this.hass,"operator")}
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
                    ${this._TF(kt(this.hass,"value"),t.value??"",t=>o(e,{value:t}))}
                  </div>

                  <div class="field">
                    ${this._IconPicker(t.icon??"",t=>o(e,{icon:t}))}
                  </div>

                  <div class="actions">
                    ${this._Btn(kt(this.hass,"remove"),()=>(t=>{const e={conditions:[...n.conditions],else:n.else??""};e.conditions.splice(t,1),i(e)})(e),"danger")}
                  </div>
                </div>
              `):L`<div class="hint">No conditions yet.</div>`}

        <div class="actions">${this._Btn("Add condition",()=>{const t={conditions:[...n.conditions],else:n.else??""};t.conditions.push({entity:"",operator:"=",value:"",icon:""}),i(t)},"ghost")}</div>

        <div class="field">
          ${this._IconPicker(n.else??"",t=>{const e={conditions:[...n.conditions],else:t};i(e)},s)}
        </div>
        <div class="hint">${kt(this.hass,"elseIcon")}</div>
      </div>
    `}_assignIcon(t,e,i){if(this._config){if("header"===t){const t={...this._config};return void 0!==i.icon_conditions?(delete t.icon,t.icon_conditions=i.icon_conditions):(delete t.icon_conditions,t.icon=i.icon??""),this._config=t,void this._emitChanged()}if("row"===t&&e&&"number"==typeof e.ri&&"number"==typeof e.ei){this._ensureRows();const t=[...this._config.rows??[]],s={...t[e.ri]||{entities:[]}};s.entities=Array.isArray(s.entities)?[...s.entities]:[];const n={...s.entities[e.ei]||{}};return void 0!==i.icon_conditions?(delete n.icon,n.icon_conditions=i.icon_conditions):(delete n.icon_conditions,n.icon=i.icon??""),s.entities[e.ei]=n,t[e.ri]=s,this._config.rows=t,void this._emitChanged()}if("info"===t&&e&&"number"==typeof e.ii){this._ensureInfo();const t=[...this._config.info_entities??[]],s={...t[e.ii]||{}};void 0!==i.icon_conditions?(delete s.icon,s.icon_conditions=i.icon_conditions):(delete s.icon_conditions,s.icon=i.icon??""),t[e.ii]=s,this._config.info_entities=t,this._emitChanged()}}}render(){if(!this._config)return L`<div class="hint">${kt(this.hass,"loading")}</div>`;const t=this._config;return L`
      <div class="form">
        <!-- Errors -->
        ${this._errors.length?L`<div class="errors">${this._errors.map(t=>L`<div class="error">${t}</div>`)}</div>`:null}

        <!-- Header -->
        <div class="section">
          <div class="section-title">${kt(this.hass,"header")}</div>
          <div class="field">
            ${this._TF(kt(this.hass,"title"),t.title??"",t=>this._set("title",t))}
          </div>
          <div class="field">
            ${this._EntityPicker(kt(this.hass,"entityReq"),t.entity??"",t=>this._set("entity",t),e=>{t.title&&"Room"!==t.title||this._set("title",e)})}
          </div>
          <div class="field">
            ${this._IconControl(kt(this.hass,"icon"),"header",null,t)}
          </div>
          <div class="toggles">
            ${this._Switch(kt(this.hass,"hideTitle"),!!t.hide_title,t=>this._set("hide_title",t))}
          </div>
        </div>

        <!-- Rows -->
        <div class="section">
          <div class="section-title">
            ${kt(this.hass,"rows")}
            <span class="row-toolbar">
              ${this._Btn(kt(this.hass,"addRow"),this._addRow)}
            </span>
          </div>

          ${(t.rows??[]).length?t.rows.map((t,e)=>L`
                  <div class="row-card">
                    <div class="row-header">
                      <div class="row-title">Row ${e+1}</div>
                      <div class="row-actions">
                        ${this._Btn(kt(this.hass,"moveUp"),()=>this._moveRow(e,-1),"ghost")}
                        ${this._Btn(kt(this.hass,"moveDown"),()=>this._moveRow(e,1),"ghost")}
                        ${this._Btn(kt(this.hass,"duplicate"),()=>this._dupRow(e),"ghost")}
                        ${this._Btn(kt(this.hass,"removeRow"),()=>this._removeRow(e),"danger")}
                        ${this._Btn(kt(this.hass,"addEntity"),()=>this._addRowEntity(e))}
                      </div>
                    </div>

                    ${Array.isArray(t.entities)&&t.entities.length?t.entities.map((t,i)=>L`
                            <div class="entity-block">
                              <div class="field">
                                ${this._EntityPicker("Entity",t.entity??"",t=>this._updateRowEntity(e,i,"entity",t),s=>{t.name||this._updateRowEntity(e,i,"name",s)})}
                              </div>
                              <div class="field">
                                ${this._TF(kt(this.hass,"nameOptional"),t.name??"",t=>this._updateRowEntity(e,i,"name",t))}
                              </div>
                              <div class="field">
                                ${this._IconControl("Icon","row",{ri:e,ei:i},t)}
                              </div>
                              <div class="toggles">
                                ${this._Switch(kt(this.hass,"showIcon"),!1!==t.show_icon,t=>this._updateRowEntity(e,i,"show_icon",t))}
                                ${this._Switch(kt(this.hass,"showState"),!1!==t.show_state,t=>this._updateRowEntity(e,i,"show_state",t))}
                              </div>
                              <div class="field two">
                                ${this._NumTF(kt(this.hass,"decimals"),t.decimals,t=>this._updateRowEntity(e,i,"decimals",t))}
                                ${this._TF(kt(this.hass,"unitOverride"),t.unit??"",t=>this._updateRowEntity(e,i,"unit",t))}
                              </div>
                              <div class="actions">
                                ${this._Btn(kt(this.hass,"moveUp"),()=>this._moveRowEntity(e,i,-1),"ghost")}
                                ${this._Btn(kt(this.hass,"moveDown"),()=>this._moveRowEntity(e,i,1),"ghost")}
                                ${this._Btn(kt(this.hass,"duplicate"),()=>this._dupRowEntity(e,i),"ghost")}
                                ${this._Btn(kt(this.hass,"remove"),()=>this._removeRowEntity(e,i),"danger")}
                              </div>
                            </div>
                          `):L`<div class="hint">${kt(this.hass,"noEntitiesInRow")}</div>`}
                  </div>
                `):L`<div class="hint">${kt(this.hass,"noRows")}</div>`}
        </div>

        <!-- Info entities -->
        <div class="section">
          <div class="section-title">
            ${kt(this.hass,"infoEntities")}
            ${this._Btn(kt(this.hass,"addEntity"),this._addInfoEntity)}
          </div>

          ${Array.isArray(t.info_entities)&&t.info_entities.length?t.info_entities.map((t,e)=>L`
                  <div class="entity-block">
                    <div class="field">
                      ${this._EntityPicker("Entity",t.entity??"",t=>this._updateInfoEntity(e,"entity",t),i=>{t.name||this._updateInfoEntity(e,"name",i)})}
                    </div>
                    <div class="field">
                      ${this._TF(kt(this.hass,"nameOptional"),t.name??"",t=>this._updateInfoEntity(e,"name",t))}
                    </div>
                    <div class="field">
                      ${this._IconControl("Icon","info",{ii:e},t)}
                    </div>
                    <div class="toggles">
                      ${this._Switch(kt(this.hass,"showIcon"),!1!==t.show_icon,t=>this._updateInfoEntity(e,"show_icon",t))}
                    </div>
                    <div class="actions">
                      ${this._Btn(kt(this.hass,"moveUp"),()=>this._moveInfoEntity(e,-1),"ghost")}
                      ${this._Btn(kt(this.hass,"moveDown"),()=>this._moveInfoEntity(e,1),"ghost")}
                      ${this._Btn(kt(this.hass,"duplicate"),()=>this._dupInfoEntity(e),"ghost")}
                      ${this._Btn(kt(this.hass,"remove"),()=>this._removeInfoEntity(e),"danger")}
                    </div>
                  </div>
                `):L`<div class="hint">${kt(this.hass,"noInfo")}</div>`}
        </div>
      </div>
    `}};Object.defineProperty(Tt,"styles",{enumerable:!0,configurable:!0,writable:!0,value:o`
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
  `}),Ct([ht({attribute:!1})],Tt.prototype,"hass",void 0),Ct([ut()],Tt.prototype,"_config",void 0),Ct([ut()],Tt.prototype,"_errors",void 0),Tt=Ct([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("room-card-editor")],Tt),customElements.get("room-card-editor")||customElements.define("room-card-editor",Tt);var Nt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("ROOM-CARD: script executed"),window.customCards=window.customCards||[],window.customCards.some(t=>"room-card"===t.type)||window.customCards.push({type:"room-card",name:"Room Card",description:"Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI",preview:!0});class Mt extends at{constructor(){super(...arguments),Object.defineProperty(this,"monitoredStates",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_configError",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stateObj",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_helpers",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}static getConfigElement(){return console.info("ROOM-CARD: getConfigElement()"),document.createElement("room-card-editor")}static getStubConfig(t,e){return{type:"custom:room-card",title:"Room",entity:Array.isArray(e)&&e.length?e[0]:void 0,show_icon:!0}}getChildCustomCardTypes(t,e){if(t)for(const i of t)i?.type?.startsWith?.("custom:")&&e.add(i.type.substring(7)),this.getChildCustomCardTypes(i.cards,e)}async waitForDependentComponents(t){const e=new Set;this.getChildCustomCardTypes(t.cards,e),e.size&&await Promise.all(Array.from(e).map(t=>customElements.whenDefined(t)))}async setConfig(t){this._configError=void 0;try{!function(t){if(!t)throw new Error("No config");if(!t.entity)throw new Error("Header entity is required")}(t)}catch(t){this._configError=t?.message||String(t),console.warn("ROOM-CARD config warning:",t)}this.config={...t||{},entityIds:wt(t||{})},null!==document.querySelector("hui-card-editor")||await this.waitForDependentComponents(this.config),"function"==typeof window.loadCardHelpers&&(this._helpers=await window.loadCardHelpers()),this.requestUpdate()}set hass(t){this._hass=t,t&&this.config&&(this.updateMonitoredStates(t),this.config.hass=t),this.requestUpdate()}updateMonitoredStates(t){const e={...this.monitoredStates||{}};let i=!1;for(const s of this.config.entityIds)if(s in t.states){const n=this.monitoredStates&&this.monitoredStates[s],o=t.states[s];(!this.monitoredStates||n?.last_updated<o.last_updated||n?.last_changed<o.last_changed||o!==e[s])&&(i=!0,e[s]=o)}else this.monitoredStates&&s in this.monitoredStates&&(i=!0,delete e[s]);i&&(this.monitoredStates=e)}static get styles(){return xt}render(){if(!this.config)return L``;if(!this._hass){const t=this.config.title??"Room";return L`
        <ha-card elevation="2">
          <div class="card-header"><div class="name">${t}</div></div>
          <div style="padding:12px; opacity:.7">Preview…</div>
        </ha-card>
      `}if(this._configError)return L`<hui-warning>${this._configError}</hui-warning>`;try{const{entity:t,info_entities:e=[],entities:i=[],rows:s=[],stateObj:n}=((t,e)=>{const i={info_entities:[],entities:[]};return e&&t?(i.stateObj=void 0!==t.entity?e.states[t.entity]:void 0,i.entity=void 0!==t.entity?{...t,stateObj:i.stateObj}:void 0,i.info_entities=t.info_entities?.map(i=>At(i,e,t))??[],i.entities=t.entities?.map(i=>At(i,e,t))??[],i.rows=t.rows?.map(i=>{const s=i.entities?.map(i=>At(i,e,t));return{entities:s,hide_if:i.hide_if,content_alignment:i.content_alignment}})??[],t.hass=e,i):i})(this.config,this._hass);this.stateObj=n;const o=Array.isArray(e)&&e.length>0,r=this.config?.icon||!!this.config?.icon_conditions,a=!this.config.hide_title||o||r;return L`
        <ha-card elevation="2" style="${function(t){if(!t)return"";try{return Object.entries(t).map(([t,e])=>`${t}: ${String(e)};`).join(" ")}catch{return""}}(this.config.card_styles,this._hass)}">
          ${a?L`
                <div class="card-header">
                  ${function(t,e){const i=t.title||"",s=vt(t,e),n=!t.hide_title;return L`
    <div class="title">
      ${s?L`<ha-icon .icon=${s}></ha-icon>`:null}
      ${n?L`<div class="name">${i}</div>`:null}
    </div>
  `}(this.config,this._hass)}
                  <div class="entities-info-row">
                    ${e.map(t=>function(t,e){const i=t.entity,s=i&&e.states[i],n=!1!==t.show_icon,o=vt(t,e),r=t.name||s?.attributes?.friendly_name||i||"";return L`
    <div class="entity">
      ${n&&(o||s)?L`<ha-icon .icon=${o||"mdi:information-outline"}></ha-icon>`:null}
      <span>${r}${s?`: ${s.state}`:""}</span>
    </div>
  `}(t,this._hass))}
                  </div>
                </div>
              `:null}

          ${s&&s.length>0?function(t,e){return L`
    ${t.map(t=>L`
        <div class="entities-row">
          ${(t.entities||[]).map(t=>yt(t,e))}
        </div>
      `)}
  `}(s,this._hass):function(t,e,i){return L`
    <div class="entities-row">
      ${e.map(t=>yt(t,i))}
    </div>
  `}(this.config,i,this._hass)}

          ${this.config.cards?.map(t=>this.createCardElement(t,this._hass))}
        </ha-card>
      `}catch(t){return console.warn("ROOM-CARD render error:",t),L`<hui-warning>${t?.toString?.()??t}</hui-warning>`}}getCardSize(){const t=this.config?.cards?this.config.cards.length:0,e=this.config?.rows?this.config.rows.length:0,i=this.config?.entities&&this.config.entities.length>0?1:0,s=Array.isArray(this.config?.info_entities)&&(this.config?.info_entities?.length??0)>0,n=this.config?.icon||!!this.config?.icon_conditions;return t+e+i+(!this.config?.hide_title||s||n?1:0)}createCardElement(t,e){if(((t,e)=>{if(void 0===t.hide_if)return!1;if(t.hide_if){const i=e.states[t.entity]?.state,s=t.hide_if.conditions?.filter(s=>{let n=i;if(s.entity){const t=e.states[s.entity];n=s.attribute?t.attributes[s.attribute]:t.state}return s.attribute&&!s.entity&&(n=e.states[t.entity].attributes[s.attribute]),((t,e)=>{const i="boolean"==typeof t.value?String(t.value):t.value;return"equals"==t.condition&&e==i||"not_equals"==t.condition&&e!=i||"above"==t.condition&&e>i||"below"==t.condition&&e<i||void 0})(s,n)});return s?.length>0}})(t,e)||t.show_states&&t.entity&&!t.show_states.includes(e.states[t.entity]?.state))return null;let i;return i=this._helpers?this._helpers.createCardElement(t):function(t,e){void 0===e&&(e=!1);var i=function(t,e){return s("hui-error-card",{type:"error",error:t,config:e})},s=function(t,e){var s=window.document.createElement(t);try{if(!s.setConfig)return;s.setConfig(e)}catch(s){return console.error(t,s),i(s.message,e)}return s};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var n=t.type;if(n&&n.startsWith("custom:"))n=n.substr(7);else if(e)if(gt.has(n))n="hui-"+n+"-row";else{if(!t.entity)return i("Invalid config given.",t);var o=t.entity.split(".",1)[0];n="hui-"+(_t[o]||"text")+"-entity-row"}else n="hui-"+n+"-card";if(customElements.get(n))return s(n,t);var r=i("Custom element doesn't exist: "+t.type+".",t);r.style.display="None";var a=setTimeout(function(){r.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(a),function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});n.detail=i,t.dispatchEvent(n)}(r,"ll-rebuild",{},r)}),r}(t),i.hass=e,i.style.boxShadow="none",i.style.borderRadius="0",i}}Nt([ht({attribute:!1})],Mt.prototype,"monitoredStates",void 0),Nt([ht({attribute:!1})],Mt.prototype,"_hass",void 0),Nt([ht({attribute:!1})],Mt.prototype,"config",void 0);const Ut="room-card";customElements.get(Ut)||(customElements.define(Ut,Mt),console.info("ROOM-CARD: custom element defined"))})();