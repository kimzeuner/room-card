/*! For license information please see room-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:r,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:c,getPrototypeOf:d}=Object,p=globalThis,u=p.trustedTypes,_=u?u.emptyScript:"",m=p.reactiveElementPolyfillSupport,v=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&r(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...l(t),...c(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??g)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,m?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,b=w.trustedTypes,A=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+x,C=`<${S}>`,P=document,R=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,k="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,T=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,N=/"/g,q=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),z=D(1),L=(D(2),D(3),Symbol.for("lit-noChange")),B=Symbol.for("lit-nothing"),W=new WeakMap,V=P.createTreeWalker(P,129);function K(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=M;for(let e=0;e<i;e++){const i=t[e];let r,h,l=-1,c=0;for(;c<i.length&&(a.lastIndex=c,h=a.exec(i),null!==h);)c=a.lastIndex,a===M?"!--"===h[1]?a=j:void 0!==h[1]?a=H:void 0!==h[2]?(q.test(h[2])&&(n=RegExp("</"+h[2],"g")),a=T):void 0!==h[3]&&(a=T):a===T?">"===h[0]?(a=n??M,l=-1):void 0===h[1]?l=-2:(l=a.lastIndex-h[2].length,r=h[1],a=void 0===h[3]?T:'"'===h[3]?N:I):a===N||a===I?a=T:a===j||a===H?a=M:(a=T,n=void 0);const d=a===T&&t[e+1].startsWith("/>")?" ":"";o+=a===M?i+C:l>=0?(s.push(r),i.slice(0,l)+E+i.slice(l)+x+d):i+x+(-2===l?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[h,l]=Y(t,e);if(this.el=J.createElement(h,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(x),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),s.removeAttribute(t)}else t.startsWith(x)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),V.nextNode(),r.push({type:2,index:++n});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)r.push({type:7,index:n}),t+=x.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===L)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new G(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new it(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=V.nextNode(),o++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new F(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Z(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=Z(this,s[i+a],e,a),r===L&&(r=this._$AH[a]),o||=!O(r)||r!==this._$AH[a],r===B?t=B:t!==B&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class et extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===L)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(J,G),(w.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new G(e.insertBefore(R(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.1");const rt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},ht=(t=rt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function lt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const ct=()=>`id_${Date.now()}_${Math.random().toString(36).slice(2)}`;class dt extends ot{constructor(){super(...arguments),Object.defineProperty(this,"hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_config",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_entities",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_rows",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_hideIf",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_styles",{enumerable:!0,configurable:!0,writable:!0,value:{}})}setConfig(t){const{hass:e,entityIds:i,...s}=t||{};this._config=s||{};const n=Array.isArray(this._config.entities)?this._config.entities:[];this._entities=n.map(t=>({_id:ct(),...t||{}}));const o=Array.isArray(this._config.rows)?this._config.rows:[];this._rows=o.map(t=>({_id:ct(),label:t&&(t.label??t.name)||"",entities:Array.isArray(t?.entities)?t.entities.map(t=>({_id:ct(),...t||{}})):[]})),this._hideIf=Array.isArray(this._config.hide_if)?[...this._config.hide_if]:[],this._styles=this._config.styles&&"object"==typeof this._config.styles?{...this._config.styles}:{},this.requestUpdate()}_emit(){const t={...this._config};t.entities=this._entities.map(({_id:t,...e})=>e),t.rows=this._rows.map(({_id:t,label:e,entities:i})=>({label:e,entities:i.map(({_id:t,...e})=>e)})),t.hide_if=this._hideIf.length?this._hideIf:void 0,t.styles=Object.keys(this._styles||{}).length?this._styles:void 0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_updateCfg(t,e){const i={...this._config};""===e||void 0===e?delete i[t]:i[t]=e,this._config=i,this._emit(),this.requestUpdate()}_addEntity(){this._entities=[...this._entities,{_id:ct(),entity:""}],this._emit(),this.requestUpdate()}_removeEntity(t){const e=[...this._entities];e.splice(t,1),this._entities=e,this._emit(),this.requestUpdate()}_moveEntity(t,e){const i=t+e;if(i<0||i>=this._entities.length)return;const s=[...this._entities],[n]=s.splice(t,1);s.splice(i,0,n),this._entities=s,this._emit(),this.requestUpdate()}_updateEntity(t,e,i){const s=[...this._entities],n={...s[t]||{}};""===i||void 0===i?delete n[e]:n[e]=i,s[t]=n,this._entities=s,this._emit(),this.requestUpdate()}_entityIconPreview(t){if(!t?.show_icon)return z``;const e=t?.entity?this.hass?.states?.[t.entity]:void 0;return t?.icon?z`<ha-state-icon .icon=${t.icon}></ha-state-icon>`:e?z`<ha-state-icon .stateObj=${e}></ha-state-icon>`:z``}_addRow(){this._rows=[...this._rows,{_id:ct(),label:"",entities:[]}],this._emit(),this.requestUpdate()}_removeRow(t){const e=[...this._rows];e.splice(t,1),this._rows=e,this._emit(),this.requestUpdate()}_moveRow(t,e){const i=t+e;if(i<0||i>=this._rows.length)return;const s=[...this._rows],[n]=s.splice(t,1);s.splice(i,0,n),this._rows=s,this._emit(),this.requestUpdate()}_updateRowLabel(t,e){const i=[...this._rows];i[t]={...i[t],label:e||void 0},this._rows=i,this._emit(),this.requestUpdate()}_addRowEntity(t){const e=[...this._rows],i={...e[t]||{}};i.entities=[...i.entities||[],{_id:ct(),entity:""}],e[t]=i,this._rows=e,this._emit(),this.requestUpdate()}_updateRowEntity(t,e,i,s){const n=[...this._rows],o={...n[t]||{}},a=[...o.entities||[]],r={...a[e]||{}};""===s||void 0===s?delete r[i]:r[i]=s,a[e]=r,o.entities=a,n[t]=o,this._rows=n,this._emit(),this.requestUpdate()}_removeRowEntity(t,e){const i=[...this._rows],s={...i[t]||{}},n=[...s.entities||[]];n.splice(e,1),s.entities=n,i[t]=s,this._rows=i,this._emit(),this.requestUpdate()}_moveRowEntity(t,e,i){const s=[...this._rows],n={...s[t]||{}},o=[...n.entities||[]],a=e+i;if(a<0||a>=o.length)return;const[r]=o.splice(e,1);o.splice(a,0,r),n.entities=o,s[t]=n,this._rows=s,this._emit(),this.requestUpdate()}_addCondition(){this._hideIf=[...this._hideIf,{entity:"",operator:"==",value:"off"}],this._emit(),this.requestUpdate()}_updateCond(t,e,i){const s=[...this._hideIf],n={...s[t]||{}};""===i||void 0===i?delete n[e]:n[e]=i,s[t]=n,this._hideIf=s,this._emit(),this.requestUpdate()}_removeCond(t){const e=[...this._hideIf];e.splice(t,1),this._hideIf=e,this._emit(),this.requestUpdate()}_updateStyle(t,e){const i={...this._styles||{}};""===e||void 0===e?delete i[t]:i[t]=e,this._styles=i,this._emit(),this.requestUpdate()}render(){if(!this.hass)return z``;const t=!!customElements.get("hui-action-editor");return z`
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

      ${this._entities.map((e,i)=>z`
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

          ${t?z`
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
          `:z`<div class="muted">Kein <code>hui-action-editor</code> gefunden – Actions im YAML unten pflegen.</div>`}

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
      ${this._rows.map((t,e)=>z`
        <div class="card" data-k=${t._id}>
          <div class="row-title">Row ${e+1}</div>
          <div class="row">
            <div>Label</div>
            <ha-textfield .value=${t.label??""} label="label" @input=${t=>this._updateRowLabel(e,t.target.value||"")}></ha-textfield>
          </div>

          ${t.entities.map((i,s)=>z`
            <div class="card subtle" data-k=${i._id}>
              <div class="mini">
                ${i.show_icon?i.icon?z`<ha-state-icon .icon=${i.icon}></ha-state-icon>`:i.entity?z`<ha-state-icon .stateObj=${this.hass?.states?.[i.entity]}></ha-state-icon>`:z``:z``}
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
      ${this._hideIf.map((t,e)=>z`
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
          @value-changed=${t=>{const e=t.detail?.value;if(e&&"object"==typeof e){const{hass:t,entityIds:i,entities:s,rows:n,hide_if:o,styles:a,...r}=e;this._config=r||{},this._entities=Array.isArray(s)?s.map(t=>({_id:ct(),...t})):[],this._rows=Array.isArray(n)?n.map(t=>({_id:ct(),label:t&&(t.label??t.name)||"",entities:Array.isArray(t?.entities)?t.entities.map(t=>({_id:ct(),...t})):[]})):[],this._hideIf=Array.isArray(o)?[...o]:[],this._styles=a&&"object"==typeof a?{...a}:{},this._emit(),this.requestUpdate()}}}
        ></ha-yaml-editor>
      </div>
    `}}Object.defineProperty(dt,"properties",{enumerable:!0,configurable:!0,writable:!0,value:{hass:{attribute:!1}}}),Object.defineProperty(dt,"styles",{enumerable:!0,configurable:!0,writable:!0,value:((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)})`
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
  `}),customElements.get("room-card-editor")||customElements.define("room-card-editor",dt);var pt=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};window.customCards=window.customCards||[],window.customCards.some(t=>"room-card"===t.type)||window.customCards.push({type:"room-card",name:"Room Card",description:"Diagnostic build: always renders a visible card.",preview:!0});class ut extends ot{constructor(){super(...arguments),Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_hass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_configError",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}static getConfigElement(){return document.createElement("room-card-editor")}static getStubConfig(t,e){return{type:"custom:room-card",title:"Room",entity:Array.isArray(e)&&e.length?e[0]:void 0,show_icon:!0}}async setConfig(t){console.info("ROOM-CARD setConfig()",t),this._configError=void 0;try{if(!t)throw new Error("Empty config")}catch(t){this._configError=t?.message||String(t),console.warn("ROOM-CARD config warning:",t)}this.config={...t||{}}}set hass(t){this._hass=t,this.requestUpdate()}render(){const t=this.config||{};return this._hass?this._configError?z`<hui-warning>${this._configError}</hui-warning>`:z`<ha-card>
      <div class="card-header"><div class="name">${t.title??"Room"}</div></div>
      <div style="padding:12px">
        It works with hass<br />
        Entity: ${t.entity??"—"}
      </div>
    </ha-card>`:z`<ha-card>
        <div class="card-header"><div class="name">${t.title??"Room"}</div></div>
        <div style="padding:12px;opacity:.7">It works (preview)</div>
      </ha-card>`}}pt([lt({attribute:!1})],ut.prototype,"config",void 0),pt([lt({attribute:!1})],ut.prototype,"_hass",void 0);const _t="room-card";customElements.get(_t)||(customElements.define(_t,ut),console.info("ROOM-CARD: custom element defined")),console.info("ROOM-CARD: script executed (diagnostic)")})();