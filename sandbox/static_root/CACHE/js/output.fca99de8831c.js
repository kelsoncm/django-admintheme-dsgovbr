class BRAccordion{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){for(const button of this.component.querySelectorAll('button.header')){button.addEventListener('click',(event)=>{this._collapse(event)
this._changeIcon(event)})}}
_collapse(event){if(this.component.hasAttribute('single')){for(const field of this.component.querySelectorAll('.item')){if(field===event.currentTarget.parentNode){if(field.hasAttribute('active')){field.removeAttribute('active')}else{field.setAttribute('active','')}}else{if(field.hasAttribute('active')){field.removeAttribute('active')}}}}else{for(const field of this.component.querySelectorAll('.item')){if(field===event.currentTarget.parentNode){if(field.hasAttribute('active')){field.removeAttribute('active')}else{field.setAttribute('active','')}}}}}
_changeIcon(){for(const field of this.component.querySelectorAll('.item')){if(field.hasAttribute('active')){for(const icon of field.querySelectorAll('.icon')){icon.children[0].classList.remove('fa-angle-down')
icon.children[0].classList.add('fa-angle-up')}}else{for(const icon of field.querySelectorAll('.icon')){icon.children[0].classList.remove('fa-angle-up')
icon.children[0].classList.add('fa-angle-down')}}}}}
BRAccordion
class BRBreadcrumb{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){this._setView()
window.addEventListener('resize',()=>{this._setView()})
window.document.addEventListener('click',(event)=>{if(!this.component.contains(event.target)&&this.component.querySelector('.br-card')){this.component.querySelector('.br-card').remove()}})}
resetBreadcrumbs(){this._reset()
const brcardBreadcrumb=this.component.querySelector('.br-card')
if(brcardBreadcrumb!==null){brcardBreadcrumb.remove()}
this._setView()}
_setView(){this._reset()
for(const crumbList of this.component.querySelectorAll('.crumb-list')){const crumbs=crumbList.querySelectorAll('.crumb:not([data-active])')
if(window.innerWidth<575){if(crumbs.length!==1){crumbs.forEach((crumb)=>{crumb.classList.add('d-none')})
this._insertExpandButton()}}else{if(crumbList.scrollWidth>crumbList.offsetWidth||crumbs.length>5){crumbs.forEach((crumb,index)=>{if(index>0&&index<crumbs.length-1){crumb.classList.add('d-none')}})
this._insertExpandButton()}}}}
_insertExpandButton(){const crumb=this._createCrumb()
const crumbList=this.component.querySelector('.crumb-list')
const crumbs=crumbList.querySelectorAll('.crumb')
crumbList.insertBefore(crumb,crumbs[1])
for(const itemTabindex of this.component.querySelectorAll('[aria-current="page"]')){itemTabindex.setAttribute('tabindex','-1')}}
_reset(){this.component.querySelectorAll('.crumb-list .crumb').forEach((crumb)=>{if(crumb.classList.contains('menu-mobil')){crumb.remove()
for(const itemTabindex of this.component.querySelectorAll('[aria-current="page"]')){itemTabindex.setAttribute('tabindex','0')}}else{crumb.classList.remove('d-none')}})}
_createCrumb(){const crumb=document.createElement('li')
crumb.classList.add('crumb','menu-mobil')
crumb.setAttribute('data-toggle','dropdown')
const button=document.createElement('button')
button.classList.add('br-button','circle')
button.setAttribute('aria-label','Abrir menu Breadcrumb')
const span=document.createElement('span')
span.classList.add('sr-only')
span.innerHTML='Botão Menu'
const folderIcon=document.createElement('i')
folderIcon.classList.add('fas','fa-folder-plus')
const chevronIcon=document.createElement('i')
chevronIcon.classList.add('icon','fas','fa-chevron-right')
crumb.appendChild(chevronIcon)
crumb.appendChild(button)
button.appendChild(span)
button.appendChild(folderIcon)
crumb.addEventListener('click',()=>{let card=this.component.querySelector('.br-card')
if(card){folderIcon.classList.remove('fas','fa-folder-minus')
folderIcon.classList.add('fas','fa-folder-plus')
button.setAttribute('aria-label','Breadcrumb menu fechado')
this.component.querySelector('.br-card').remove()}else{folderIcon.classList.remove('fas','fa-folder-plus')
folderIcon.classList.add('fas','fa-folder-minus')
button.setAttribute('aria-label','Breadcrumb menu aberto')
card=this._createList()
this.component.appendChild(card)}})
return crumb}
_createList(){const card=document.createElement('nav')
card.classList.add('br-card')
this.component.querySelectorAll('.crumb-list .crumb').forEach((crumb)=>{if(crumb.classList.contains('d-none')){const item=document.createElement('div')
item.classList.add('br-item')
if(!crumb.classList.contains('home')){item.appendChild(crumb.querySelector('a').cloneNode(true))
card.appendChild(item)}}})
return card}}
BRBreadcrumb
class Collapse{constructor({trigger,iconToShow='fa-chevron-down',iconToHide='fa-chevron-up',useIcons=true}){this.trigger=trigger
this.useIcons=useIcons
this.breakpoint=trigger.getAttribute('data-breakpoint')
this.setIconToShow(iconToShow)
this.setIconToHide(iconToHide)
this._setTarget()
this._setUp()}
_setTarget(){this.target=document.querySelector(`#${this.trigger.getAttribute('data-target')}`)}
_checkBreakpoint(){if(this.breakpoint){if(window.matchMedia('(min-width: 977px)').matches){this.target.removeAttribute('hidden')}}}
_setUp(){this._setVisibilityStatus()
if(this.useIcons){this._toggleIcon()}
this.trigger.setAttribute('aria-controls',`${this.trigger.getAttribute('data-target')}`)
this._checkBreakpoint()
this.trigger.setAttribute('tabindex','0')}
_setVisibilityStatus(){this._setTriggerVisibilityStatus()
this._setTargetVisibilityStatus()}
_setTriggerVisibilityStatus(){if(this.target){if(this.target.hasAttribute('hidden')){this.trigger.setAttribute('data-visible',false)
this.trigger.setAttribute('aria-expanded',false)}else{this.trigger.setAttribute('data-visible',true)
this.trigger.setAttribute('aria-expanded',true)}}}
_handleTriggerKeyPress(){this._handleTriggerClickBehavior()}
_setTargetVisibilityStatus(){if(this.target){if(this.target.hasAttribute('hidden')){this.target.setAttribute('aria-hidden',true)}else{this.target.setAttribute('aria-hidden',false)
this._focusOnFirstItem(this.target)}}}
_handleTriggerClickBehavior(){if(this.breakpoint){if(window.matchMedia('(max-width: 977px)').matches){this._toggleVisibility()
if(this.useIcons){this._toggleIcon()}
this.trigger.dispatchEvent(new Event('change'))}}else{this._toggleVisibility()
if(this.useIcons){this._toggleIcon()}
this.trigger.dispatchEvent(new Event('change'))}}
_toggleVisibility(){if(this.target){this.target.hasAttribute('hidden')?this._showTarget():this._hideTarget()}}
_showTarget(){this.target.removeAttribute('hidden')
this._setVisibilityStatus()
this._focusOnFirstItem(this.target)}
_hideTarget(){this.target.setAttribute('hidden','')
this._setVisibilityStatus()}
_focusOnFirstItem(target){const focusableElements=target.querySelectorAll('a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])')
const firstItem=Array.from(focusableElements).find((element)=>{return!element.hasAttribute('hidden')})
if(firstItem){firstItem.scrollIntoView({block:'nearest'})}}
_toggleIcon(){this.trigger.querySelectorAll('i.fas').forEach((icon)=>{if(this.target){icon.classList.remove(this.target.hasAttribute('hidden')?this.iconToHide:this.iconToShow)
icon.classList.add(this.target.hasAttribute('hidden')?this.iconToShow:this.iconToHide)}})}
setBehavior(){this.trigger.addEventListener('click',(event)=>{if(event.type==='click'){this._handleTriggerClickBehavior()}})
this.trigger.addEventListener('keydown',(event)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault()
this._handleTriggerKeyPress()}})
this.target.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&!this.target.hasAttribute('hidden')){event.preventDefault()
this._hideTarget()
this.trigger.focus()}})}
setIconToShow(iconToShow){this.iconToShow=iconToShow}
setIconToHide(iconToHide){this.iconToHide=iconToHide}}
class BRCard{constructor(name,component,id){this.name=name
this.component=component
this.component.setAttribute('id',`card${id}`)
this._setBehavior()}
_setBehavior(){this._setFlipBehavior()
this._setDragBehavior()
this._setDisableBehavior()
this._collpaseBehavior()}
_collpaseBehavior(){this.component.querySelectorAll('[data-toggle="collapse"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const collapse=new Collapse(config)
collapse.setBehavior()})}
_setDisableBehavior(){if(this.component.classList.contains('disabled')){this.component.setAttribute('aria-hidden','true')
const buttons=this.component.querySelectorAll('button')
const inputs=this.component.querySelectorAll('input')
const selects=this.component.querySelectorAll('select')
const textareas=this.component.querySelectorAll('textarea')
for(const button of buttons){button.setAttribute('disabled','disabled')}
for(const input of inputs){input.setAttribute('disabled','disabled')}
for(const select of selects){select.setAttribute('disabled','disabled')}
for(const textarea of textareas){textarea.setAttribute('disabled','disabled')}}}
_setFlipBehavior(){for(const flip of this.component.querySelectorAll('button.flip')){flip.addEventListener('click',()=>{if(this.component.getAttribute('flipped')==='off'){this.component.setAttribute('flipped','on')}else{this.component.setAttribute('flipped','off')}})}}
_setDragBehavior(){for(const img of this.component.querySelectorAll('img')){img.setAttribute('draggable','false')}
for(const link of this.component.querySelectorAll('a')){link.setAttribute('draggable','false')}
this.component.addEventListener('dragstart',(event)=>{event.stopPropagation()
event.dataTransfer.setData('text/plain',this.component.getAttribute('id'))
event.dropEffect='move'})}}
BRCard
class Swipe{constructor(element){this.evtMap={SWIPE_DOWN:[],SWIPE_LEFT:[],SWIPE_RIGHT:[],SWIPE_UP:[],}
this.xDown=null
this.yDown=null
this.element=element
element.addEventListener('touchstart',(evt)=>{return this.handleTouchStart(evt)},false)
element.addEventListener('touchend',(evt)=>{return this.handleTouchEnd(evt)},false)}
on(evt,cb){this.evtMap[evt].push(cb)}
off(evt,lcb){this.evtMap[evt]=this.evtMap[evt].filter((cb)=>{return cb!==lcb})}
trigger(evt,data){this.evtMap[evt].map((handler)=>{return handler(data)})}
handleTouchStart(evt){this.xDown=evt.touches[0].clientX
this.yDown=evt.touches[0].clientY}
handleTouchEnd(evt){const deltaX=evt.changedTouches[0].clientX-this.xDown
const deltaY=evt.changedTouches[0].clientY-this.yDown
if(Math.abs(deltaX)>Math.abs(deltaY)){deltaX<0?this.trigger('SWIPE_LEFT'):this.trigger('SWIPE_RIGHT')}else{deltaY>0?this.trigger('SWIPE_DOWN'):this.trigger('SWIPE_UP')}}}
Swipe
class BRStep{constructor(name,component){this.name=name
this.component=component
this.activeStepNum=0
this.DOMstrings={stepsBar:this.component,stepsBarClass:'step-progress',stepsBtnClass:'step-progress-btn',stepsBtns:this.component.querySelectorAll('.step-progress-btn'),}
this.removeAttributes=(elemSet,attrName)=>{elemSet.forEach((elem)=>{elem.removeAttribute(attrName)})}
this.findParent=(elem,parentClass)=>{let currentNode=elem
while(!currentNode.classList.contains(parentClass)){currentNode=currentNode.parentNode}
return currentNode}
this.getActiveStep=(elem)=>{return Array.from(this.DOMstrings.stepsBtns).indexOf(elem)}
this.setActiveStep=function(num){this.removeAttributes(this.DOMstrings.stepsBtns,'active')
this.removeAttributes(this.DOMstrings.stepsBtns,'aria-current')
this.DOMstrings.stepsBtns.forEach((elem,index)=>{if(index===num){elem.removeAttribute('disabled')
elem.setAttribute('active','')
elem.setAttribute('aria-current','step')}})
this.activeStepNum=num}
this.setStepsNum=()=>{this.DOMstrings.stepsBtns.forEach((elem,index)=>{const img=elem.querySelector('.step-icon')
const text=this.component.getAttribute('data-type')==='text'
if(text){elem.setAttribute('step-num',`${index + 1}/${this.DOMstrings.stepsBtns.length}`)}else if(img){elem.setAttribute('step-num','')}else elem.setAttribute('step-num',index+1)})}
this.setStep=(num)=>{const activeStep=num<=this.DOMstrings.stepsBtns.length?num-1:0
this.setActiveStep(activeStep)}
this._setBehavior()}
_setBehavior(){this.DOMstrings.stepsBar.addEventListener('click',(e)=>{const eventTarget=e.target
if(!eventTarget.classList.contains(`${this.DOMstrings.stepsBtnClass}`)){e.target.parentNode.click()
return}
const activeStepNum=this.getActiveStep(eventTarget)
this.setActiveStep(activeStepNum)})
this.setStepsNum()
if(this.component.hasAttribute('data-initial')){this.setStep(this.component.getAttribute('data-initial'))}else this.setStep(1)
if(!this.component.classList.contains('vertical')&&!this.component.hasAttribute('data-scroll')){}}}
BRStep
class BRCarousel{constructor(name,component){this.name=name
this.component=component
this.activeStageNum=0
this.DOMstrings={carouselNextBtn:this.component.querySelector('.carousel-btn-next'),carouselPages:this.component.querySelectorAll('.carousel-page'),carouselPrevBtn:this.component.querySelector('.carousel-btn-prev'),carouselStage:this.component.querySelector('.carousel-stage'),circular:this.component.hasAttribute('data-circular'),step:this.component.querySelector('.br-step'),}
this.step=new BRStep('br-step',this.DOMstrings.step)
this._setBehavior()}
removeAttributes(elemSet,attrName){elemSet.forEach((elem)=>{elem.removeAttribute(attrName)})}
getActiveStep(){return this.step.activeStepNum}
setActiveStep(activeStepNum){this.step.setActiveStep(activeStepNum)}
getActiveStage(){let activeStage
this.DOMstrings.carouselPages.forEach((stage)=>{if(stage.hasAttribute('active')){activeStage=stage}})
return activeStage}
setActiveStage(num){this.removeAttributes(this.DOMstrings.carouselPages,'active')
this.DOMstrings.carouselPages.forEach((stage,index)=>{if(index>num){stage.style.left='100%'}else{stage.style.left='-100%'}
if(index===num){stage.setAttribute('active','')
this.activeStageNum=num}})
this.disabledBtns()}
disabledBtns(){if(!this.DOMstrings.circular){if(this.activeStageNum===0){if(this.DOMstrings.carouselNextBtn){if(document.activeElement==this.DOMstrings.carouselPrevBtn)this.DOMstrings.carouselNextBtn.focus()
this.DOMstrings.carouselPrevBtn.setAttribute('disabled','')}}else{this.DOMstrings.carouselPrevBtn.removeAttribute('disabled')}
if(this.activeStageNum===this.DOMstrings.carouselPages.length-1){if(this.DOMstrings.carouselNextBtn){if(document.activeElement==this.DOMstrings.carouselNextBtn)this.DOMstrings.carouselPrevBtn.focus()
this.DOMstrings.carouselNextBtn.setAttribute('disabled','')}}else{this.DOMstrings.carouselNextBtn.removeAttribute('disabled')}}}
shiftPage(num){const activeStage=this.getActiveStage()
const PanelsSize=this.DOMstrings.carouselPages.length-1
let activeStageNum=Array.from(this.DOMstrings.carouselPages).indexOf(activeStage)
if(num<0){if(this.DOMstrings.circular){activeStageNum=activeStageNum===0?PanelsSize:(activeStageNum-=1)}else{activeStageNum-=activeStageNum===0?0:1}}else{if(this.DOMstrings.circular){activeStageNum=activeStageNum===PanelsSize?0:(activeStageNum+=1)}else{activeStageNum+=activeStageNum===PanelsSize?0:1}}
this.setActiveStep(activeStageNum)
this.setActiveStage(activeStageNum)}
_setBehavior(){this.DOMstrings.carouselNextBtn.addEventListener('click',()=>{this.shiftPage(1)})
this.DOMstrings.carouselPrevBtn.addEventListener('click',()=>{this.shiftPage(-1)})
this.DOMstrings.step.addEventListener('click',()=>{this.setActiveStage(this.step.activeStepNum)})
const dispatcher=new Swipe(this.DOMstrings.carouselStage)
dispatcher.on('SWIPE_LEFT',()=>{this.shiftPage(1)})
dispatcher.on('SWIPE_RIGHT',()=>{this.shiftPage(-1)})
this.disabledBtns()}}
BRCarousel
class Checkgroup{constructor(trigger){this.parent=trigger
this.parent.indeterminate=this.parent.hasAttribute('indeterminate')
this.children=this._setChildren(trigger.dataset.parent)}
get checkedLabel(){return this.parent.dataset.checkedLabel||this.parent.nextElementSibling.innerText}
get uncheckedLabel(){return this.parent.dataset.uncheckedLabel||this.parent.nextElementSibling.innerText}
setBehavior(){this._setParentBehavior()
this._setChildBehavior()}
_setChildren(tag){return document.querySelectorAll(`[data-child="${tag}"]`)}
_setParentBehavior(){this.parent.addEventListener('click',this._handleParentClick.bind(this))
this.parent.addEventListener('change',this._handleParentChange.bind(this))}
_handleParentClick(){if(!this.parent.hasAttribute('data-parent-sync')){this._setIndeterminateStateOnClick()}
this._setParentCheckboxLabel()}
_setIndeterminateStateOnClick(){if(this.parent.hasAttribute('indeterminate')){this.parent.removeAttribute('indeterminate')
this.parent.indeterminate=false
this.parent.checked=true}}
_handleParentChange(){if(!this.parent.hasAttribute('data-parent-sync')){this._changeChildState()
this._setParentCheckboxLabel()}else{this.parent.removeAttribute('data-parent-sync')}}
_changeChildState(){this.children.forEach((child)=>{if(child.checked!==this.parent.checked||child.hasAttribute('indeterminate')){child.removeAttribute('indeterminate')
child.indeterminate=false
child.checked=this.parent.checked
child.dispatchEvent(new Event('change'))}})}
_setChildBehavior(){this.children.forEach((child)=>{child.addEventListener('click',this._handleChildClick.bind(this))
child.addEventListener('change',this._handleChildChange.bind(this))})}
_handleChildClick(event){event.currentTarget.setAttribute('data-child-sync','')}
_handleChildChange(event){if(event.currentTarget.hasAttribute('data-child-sync')){this._setIndeterminateStateOnChildChange()
this.parent.setAttribute('data-parent-sync','')
this.parent.dispatchEvent(new Event('click'))
this.parent.dispatchEvent(new Event('change'))
event.currentTarget.removeAttribute('data-child-sync')}}
_setIndeterminateStateOnChildChange(){if(this._isAllChildrenChecked()){this.parent.removeAttribute('indeterminate')
this.parent.indeterminate=false
this.parent.checked=true}else if(this._isAllChildrenUnchecked()){this.parent.removeAttribute('indeterminate')
this.parent.indeterminate=false
this.parent.checked=false}else{this.parent.setAttribute('indeterminate','')
this.parent.indeterminate=true
this.parent.checked=true}}
_isAllChildrenChecked(){let allChildChecked=true
this.children.forEach((child)=>{if(!child.checked||child.indeterminate){allChildChecked=false}})
return allChildChecked}
_isAllChildrenUnchecked(){let allChildUnchecked=true
this.children.forEach((child)=>{if(child.checked){allChildUnchecked=false}})
return allChildUnchecked}
_setParentCheckboxLabel(){if(this.parent.checked&&!this.parent.indeterminate){this.parent.nextElementSibling.innerHTML=this.uncheckedLabel
this.parent.setAttribute('aria-label',this.uncheckedLabel)}else{this.parent.nextElementSibling.innerHTML=this.checkedLabel
this.parent.setAttribute('aria-label',this.checkedLabel)}}}
class BRCheckbox{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){this._setCheckgroupBehavior()}
_setCheckgroupBehavior(){this.component.querySelectorAll('input[type="checkbox"][data-parent]').forEach((trigger)=>{const checkgroup=new Checkgroup(trigger)
checkgroup.setBehavior()})}}
BRCheckbox
class CookiebarData{constructor(json,lang){this.PRIORITY_LEVELS=5
Object.assign(this,this._filterByLang(json,lang))
this._setDataCoherenceByPriority(this.PRIORITY_LEVELS)}
_filterByLang(json,lang){const list=JSON.parse(json)
const data=list.filter((element)=>{return element.lang===lang})
if(data.length>0){return data[0]}else{return list[0]}}
_setDataCoherenceByPriority(){this.selectAll=!this.allOptOut?true:this.selectAll
this.cookieGroups.forEach((groupData)=>{groupData.groupOptOut=!this.allOptOut?false:groupData.groupOptOut
groupData.groupSelected=this.selectAll||!groupData.groupOptOut?true:groupData.groupSelected
groupData.cookieList.forEach((cookieData)=>{cookieData.cookieOptOut=!groupData.groupOptOut?false:cookieData.cookieOptOut
cookieData.cookieSelected=groupData.groupSelected||!cookieData.cookieOptOut?groupData.groupSelected:cookieData.cookieSelected})})
this._setIndeterminateState()}
_setIndeterminateState(){this._setGroupIndeterminateState()
this._setAllIndeterminateState()}
_setGroupIndeterminateState(){this.cookieGroups.forEach((groupData)=>{let allChecked=true
let allUnchecked=true
groupData.cookieList.forEach((cookieData)=>{cookieData.cookieSelected?(allUnchecked=false):(allChecked=false)})
groupData.groupSelected=allChecked?true:allUnchecked?false:true
groupData.groupIndeterminated=allChecked||allUnchecked?false:true})}
_setAllIndeterminateState(){let allChecked=true
let allUnchecked=true
let indeterminated=false
this.cookieGroups.forEach((groupData)=>{groupData.groupSelected?(allUnchecked=false):(allChecked=false)
if(groupData.groupIndeterminated){indeterminated=true}})
this.selectAll=allChecked?true:allUnchecked?false:true
this.allIndeterminated=indeterminated?true:allChecked||allUnchecked?false:true}
getCookiesCheckedAmount(groupData){let count=0
groupData.cookieList.forEach((cookieData)=>{if(cookieData.cookieSelected)count+=1})
return count}
getCookiesAmount(groupData){let count=0
groupData.cookieList.forEach(()=>{count+=1})
return count}
static loadJSON(path,callback){const rawFile=new XMLHttpRequest()
rawFile.overrideMimeType('application/json')
rawFile.open('GET',path,true)
rawFile.onreadystatechange=()=>{if(rawFile.readyState===4&&rawFile.status===200){callback(rawFile.responseText)}}
rawFile.send(null)}}
class CookiebarLabels{constructor(data){this.data=data}
setLastUpdateLabel(){return this.data.lastUpdateLabel||'Última atualização'}
setCookieGroupsLabel(){return this.data.cookieGroupsLabel||'Classes de cookies'}
setUnselectAllLabel(){return this.data.unselectAllLabel||'Desselecionar tudo'}
setSelectAllLabel(){return this.data.selectAllLabel||'Selecionar tudo'}
setCheckAllLabel(){if(this.data.selectAll&&!this.data.allIndeterminated){return this.setUnselectAllLabel()}else{return this.setSelectAllLabel()}}
setUnselectAllGroupLabel(){return this.data.unselectAllGroupLabel||'Desselecionar toda classe'}
setSelectAllGroupLabel(){return this.data.selectAllGroupLabel||'Selecionar toda classe'}
setCheckGroupLabel(groupData){if(groupData.groupSelected&&!groupData.groupIndeterminated){return this.setUnselectAllGroupLabel()}else{return this.setSelectAllGroupLabel()}}
setAlwaysActiveLabel(){return this.data.alwaysActiveLabel||'Sempre ativo'}
setCheckCookieEnabledLabel(){return this.data.onLabel||'Ligado'}
setCheckCookieDisabledLabel(){return this.data.offLabel||'Desligado'}
setCookieNameLabel(){return this.data.cookieNameLabel||'Cookies'}
setCookieExpiresLabel(){return this.data.expiresLabel||'Vencimento'}
setCookieDomainLabel(){return this.data.domainLabel||'Domínio'}
setCookieEnterpriseLabel(){return this.data.enterpriseLabel||'Empresa'}
setCookiePurposeLabel(){return this.data.purposeLabel||'Finalidade'}
setCookieDescriptionLabel(){return this.data.descriptionLabel||'Descrição'}
setPoliticsButtonLabel(){return this.data.allOptOut?this.data.optOutButton||'Definir Cookies':this.data.optInButton||'Ver Política de Cookies'}
setAcceptButtonLabel(){return this.data.acceptButton||'Aceitar'}}
class CookiebarTemplates{constructor(data){this.data=data
this.labels=new CookiebarLabels(this.data)}
setGlobalContentArea(){return`<div class="br-modal">
              <div class="br-card" id="card0">
                <div class="container-fluid p-1 p-2xh">
                  <div class="wrapper p-2xh">
                    ${this._setIntroductoryContentArea()}
                    <div id="info-t" class="br-modal-body">
                      ${this._setInfoText()}
                      ${this._setMainContentArea()}
                      ${this._setComplementaryContentArea()}
                    </div>
                  </div>
                  ${this._setActionArea()}
                </div>
              </div>
            </div>`}
_setIntroductoryContentArea(){return`<div class="br-modal-header entry-content">
              ${this._setMainTitle()}
              ${this._setLastUpdate()}
              ${this._setEntryText()}
            </div>`}
_setMainContentArea(){return`<div class="br-list main-content">
              ${this._setMainContentHeader()}
              ${this._setCookieGroups()}
              ${this.data.noteList && this.data.noteList.length ? this._setNotifications() : ''}
            </div>`}
_setActionArea(){return`<div class="br-modal-footer actions justify-content-end">
              ${this._setPoliticsButton()}
              ${this._setAcceptButton()}
            </div>`}
_setMainTitle(){return`<div class="br-modal-title">
              <div class="row">
                <div class="col-sm">
                  <h1>${this.data.mainTitle}</h1>
                </div>
                <div class="col-sm-auto order-first order-sm-last">
                  ${this._setCloseButton()}
                </div>
              </div>
            </div>`}
_setLastUpdate(){return`<p class="last-update">${this.labels.setLastUpdateLabel()}: <span>${this.data.lastUpdate}</span></p>`}
_setEntryText(){return`<p class="entry-text">${this.data.entryText}</p>`}
_setInfoText(){return`<p class="info-text">${this.data.infoText}</p>`}
_setMainContentHeader(){return`<div class="header">
              <div class="row justify-content-between flex-fill">
                <div class="col-12 col-sm align-self-center mb-2">
                  <div class="title">${this.labels.setCookieGroupsLabel()}</div>
                </div>
                <div class="col-12 align-self-center">
                  ${this.data.allOptOut ? this._setCheckAll() : ''}
                </div>
                <div class="col-12 text-sm-right message mt-1">
                  ${this.setAllAlertMessage()}
                </div>
              </div>
            </div>`}
_setCookieGroups(){let groupTemplates=''
this.data.cookieGroups.forEach((groupData,groupIndex)=>{groupTemplates+=`<hr>
                          <div class="br-item group-info">
                            <div class="row mb-1">
                              <div class="col-12 col-sm align-self-center order-4 order-sm-1">
                                ${this._setGroupName(groupData)}
                              </div>
                              <div class="col align-self-center order-1 order-sm-2">
                                ${
                                  groupData.groupOptOut
                                    ? this._setCheckGroup(groupData, groupIndex)
                                    : `<span class="always-active float-sm-right">${this.labels.setAlwaysActiveLabel()}</span>`
                                }
                              </div>
                              <div class="col col-sm-auto align-self-center order-2 order-sm-3">
                                ${this._setGroupButton(groupData.groupName)}
                              </div>
                              <div class="col-12 col-sm-12 order-3 order-sm-4 text-sm-right message mt-1 mb-1">
                                ${this.setGroupAlertMessage(groupData)}
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <p class="group-description">${this._setGroupDescription(groupData)}</p>
                              </div>
                            </div>
                          </div>
                          <div class="br-list cookie-info">
                            <div class="br-item">
                              <div class="row">
                                <div class="col">
                                  ${this._setCookieInfo(groupData, groupIndex)}
                                </div>
                              </div>
                            </div>
                          </div>`})
return groupTemplates}
_setGroupName(groupData){return`<span class="group-name" title="Expandir">${groupData.groupName}</span>
              <span class="cookies-checked" title="Expandir">(${
                groupData.groupOptOut ? `${this.data.getCookiesCheckedAmount(groupData)}de` : ''
              }</span><span class="group-size" title="Expandir">${this.data.getCookiesAmount(groupData)})</span>`}
_setGroupDescription(groupData){return`<p class="group-description">${groupData.groupText}</p>`}
_setCookieInfo(groupData,groupIndex){let cookieTemplates=''
groupData.cookieList.forEach((cookieData,cookieIndex)=>{cookieTemplates+=`<div class="br-card">
                            <div class="card-content">
                              <div class="row mb-1">
                                <div class="col-12 text-right">
                                  ${
                                    cookieData.cookieOptOut
                                      ? this._setCheckCookie(groupIndex, cookieData, cookieIndex)
                                      : ''
                                  }
                                </div>
                                <div class="col-12 message text-right mb-1 mt-1">
                                  ${this.setCookieAlertMessage(cookieData)}
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieNameLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.cookieName}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieExpiresLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.expires}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieDomainLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.domain}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieEnterpriseLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.enterprise}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookiePurposeLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.purpose}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="fixed-width cookie-term">
                                  <span>${this.labels.setCookieDescriptionLabel()}</span>
                                </div>
                                <div class="col-12 col-sm mb-1 cookie-data">
                                  <span>${cookieData.description}</span>
                                </div>
                              </div>
                            </div>
                          </div>`})
return cookieTemplates}
_setNotifications(){return`<hr>
            <div class="br-item">
              <div class="row">
                <div class="col align-self-center">
                  <span class="group-name" title="Expandir">
                    ${this.data.noteTitle}</span>
                </div>
                <div class="col-auto">
                  ${this._setGroupButton(this.data.noteTitle)}
                </div>
              </div>
            </div>
            <div class="br-list">
              ${this._setNotificationInfo()}
            </div>
            <hr>`}
_setNotificationInfo(){let notificationTemplates=''
this.data.noteList.forEach((notificationData)=>{notificationTemplates+=`<div class="br-item notes">
                                  <div class="row">
                                    <div class="col">
                                      <p>${notificationData.question}</p>
                                      <p>${notificationData.answer}</p>
                                    </div>
                                  </div>
                                </div>`})
return notificationTemplates}
_setComplementaryContentArea(){return`<div class="br-list complementary-content">
              ${this._setLinkInfo()}
            </div>`}
_setLinkInfo(){let linkTemplates=''
this.data.links.forEach((linkData)=>{const target=linkData.target?' target="${linkData.target}"':'';linkTemplates+=`<div class="br-item text-center">
                          <div class="row">
                            <div class="col">
                              <a href="${linkData.url}"${target}>${linkData.name}<i class="fas fa-external-link-alt" aria-hidden="true"></i>
                              </a>
                            </div>
                          </div>
                        </div>`})
return linkTemplates}
_setPoliticsButton(){return`<button class="br-button secondary small" type="button" aria-label="${this.labels.setPoliticsButtonLabel()}">${this.labels.setPoliticsButtonLabel()}</button>`}
_setAcceptButton(){return`<button class="br-button primary small" type="button" aria-label="${this.labels.setAcceptButtonLabel()}">${this.labels.setAcceptButtonLabel()}</button>`}
_setCloseButton(){return`<button class="br-button close circle small float-right" type="button" data-dismiss="br-modal" aria-label="${
      this.data.closeLabel || 'fechar'
    }">
              <i class="fas fa-times"></i>
            </button>`}
_setGroupButton(groupName){return`<button class="br-button circle small float-right" type="button" aria-label="Expandir grupo de Cookies ${groupName}">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </button>`}
_setCheckAll(){return`<div class="br-checkbox">
              <input
                id="check-all"
                name="check-all"
                type="checkbox"                
                aria-label="${this.labels.setCheckAllLabel()}"
                ${this.data.selectAll ? 'checked' : ''}
                ${this.data.allIndeterminated ? 'indeterminate' : ''}
                data-parent="check-all"
                data-checked-label="${this.labels.setSelectAllLabel()}"
                data-unchecked-label="${this.labels.setUnselectAllLabel()}"
              />
              <label for="check-all">
                ${this.labels.setCheckAllLabel()}
              </label>
            </div>`}
_setCheckGroup(groupData,groupIndex){return`<div class="br-checkbox">
              <input
                id="${`check-group-${groupIndex}`}"
                name="${`check-group-${groupIndex}`}"
                type="checkbox"                
                aria-label="${this.labels.setCheckGroupLabel(groupData)}"
                ${groupData.groupSelected ? 'checked' : ''}
                ${groupData.groupIndeterminated ? 'indeterminate' : ''}
                data-child="check-all"
                data-parent="${`check-group-${groupIndex}`}"
                data-checked-label="${this.labels.setSelectAllGroupLabel()}"
                data-unchecked-label="${this.labels.setUnselectAllGroupLabel()}"
              />
              <label for="${`check-group-${groupIndex}`}">
                ${this.labels.setCheckGroupLabel(groupData)}
              </label>
            </div>`}
_setCheckCookie(groupIndex,cookieData,cookieIndex){return`<div class="br-switch small icon">
              <input
                id="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                name="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                type="checkbox"
                role="switch"
                ${cookieData.cookieSelected ? 'checked' : ''}
                data-child="${`check-group-${groupIndex}`}"
              />
              <label
                for="${`check-cookie-${groupIndex}-${cookieIndex}`}"
                aria-label="${
                  cookieData.cookieSelected
                    ? this.labels.setCheckCookieEnabledLabel()
                    : this.labels.setCheckCookieDisabledLabel()
                }">
              </label>
              <div
                class="switch-data"
                data-enabled="${this.labels.setCheckCookieEnabledLabel()}"
                data-disabled="${this.labels.setCheckCookieDisabledLabel()}">
              </div>
            </div>`}
setAllAlertMessage(){return this.data.allAlertMessage?`<span class="feedback warning ${
          !this.data.selectAll || this.data.allIndeterminated ? '' : 'd-none'
        }" role="alert" aria-live="polite">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                ${this.data.allAlertMessage}
              </span>`:''}
setGroupAlertMessage(groupData){return groupData.groupAlertMessage?`<span class="feedback warning ${
          !groupData.groupSelected || groupData.groupIndeterminated ? '' : 'd-none'
        }" role="alert" aria-live="polite">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          ${groupData.groupAlertMessage}
        </span>`:''}
setCookieAlertMessage(cookieData){return cookieData.alertMessage?`<span class="feedback warning ${!cookieData.cookieSelected ? '' : 'd-none'}" role="alert" aria-live="polite">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          ${cookieData.alertMessage}
        </span>`:''}}
const POLITICS_BUTTON='.actions .br-button.secondary'
const ACCEPT_BUTTON='.actions .br-button.primary'
const ACTION_BUTTONS=`${POLITICS_BUTTON}, ${ACCEPT_BUTTON}`
const CLOSE_BUTTON='.br-modal-header .br-button.close'
const CONTAINER_FLUID='.br-modal > .br-card .container-fluid'
const WRAPPER='.br-modal > .br-card .wrapper'
const MODAL_FOOTER='.br-modal > .br-card .br-modal-footer'
const GROUP_INFO='.main-content .group-info'
const COOKIE_CARD='.main-content .cookie-info .br-card'
const BROAD_ALERT='.header .row:nth-child(1) div:nth-child(3) .feedback'
const GROUP_ALERT='.row:nth-child(1) div:nth-child(4) .feedback'
const COOKIE_ALERT='.row:nth-child(1) div:nth-child(2) .feedback'
const BR_CHECKBOX='.br-checkbox input[type="checkbox"]'
const BR_SWITCH='.br-switch input[type="checkbox"]'
const CHECKBOX=`${BR_CHECKBOX}, ${BR_SWITCH}`
const PARENT_CHECKBOX='.main-content .br-checkbox input[data-parent]'
const COOKIES_CHECKED='.main-content .br-item .cookies-checked'
const GROUP_BUTTON='.main-content .br-item .br-button'
const GROUP_NAME='.main-content .br-item .group-name'
const GROUP_SIZE='.main-content .br-item .group-size'
const BUTTON_ICON='.br-button i.fas'
class BRCookiebar{constructor({name,component,json,lang,mode='default',callback}){this.name=name
this.component=component
this.data=new CookiebarData(json,lang)
this.templates=new CookiebarTemplates(this.data)
this.mode=mode
this.callback=callback
this._setUp()}
_setUp(){this._buildCookiebar()
this._setAccessibility()
this._setBehavior()
this._showCookiebar()}
_buildCookiebar(){this.component.innerHTML=this.templates.setGlobalContentArea()}
_setAccessibility(){this.component.setAttribute('role','dialog')
this.component.setAttribute('aria-modal',true)
this.component.setAttribute('aria-describedby','info-t')
this.component.setAttribute('aria-label','Componente para definição de Cookies')}
_setBehavior(){this._setAcceptButtonBehavior()
this._setPoliticsButtonBehavior()
this._setCloseButtonBehavior()
this._setToggleGroupBehavior()
this._setCheckboxBehavior()
this._setSelectionBehavior()
this._setWindowResizeBehavior()}
_setAcceptButtonBehavior(){const acceptButton=this.component.querySelector(selectors.ACCEPT_BUTTON)
acceptButton.addEventListener('click',()=>{this._hideCookiebar()
document.body.style.overflowY='auto'
this.callback(this._setOutputJSON())})
acceptButton.addEventListener('keydown',(event)=>{if(event.key==='Tab'){if(!this.component.classList.contains('default')){this.component.focus()}}})
this._setActionButtonResponsive(acceptButton)}
_setPoliticsButtonBehavior(){this.component.querySelectorAll(selectors.POLITICS_BUTTON).forEach((politicsButton)=>{politicsButton.addEventListener('click',()=>{politicsButton.classList.add('d-none')
this.component.classList.remove('default')
this.component.focus()
document.body.style.overflowY='hidden'
this._setOpenView()})
this._setActionButtonResponsive(politicsButton)})}
_setCloseButtonBehavior(){this.component.querySelectorAll(selectors.CLOSE_BUTTON).forEach((closeButton)=>{closeButton.addEventListener('click',()=>{this.component.classList.add('default')
switch(this.mode){case'open':this._hideCookiebar()
default:}
this.component.querySelector(selectors.POLITICS_BUTTON).classList.remove('d-none')
document.body.style.overflowY='auto'
this._setDefaultView()})})}
_setWindowResizeBehavior(){window.addEventListener('resize',()=>{if(!this.component.classList.contains('default')){this._setOpenView()}
this.component.querySelectorAll(selectors.ACTION_BUTTONS).forEach((button)=>{this._setActionButtonResponsive(button)})})}
_setActionButtonResponsive(button){if(window.matchMedia('(max-width: 574px)').matches){button.classList.add('block')}
if(window.matchMedia('(min-width: 575px)').matches){button.classList.remove('block')}}
_setToggleGroupBehavior(){this.component.querySelectorAll(`${`${selectors.GROUP_BUTTON},${selectors.GROUP_NAME},${selectors.COOKIES_CHECKED},${selectors.GROUP_SIZE}`}`).forEach((clickable)=>{clickable.addEventListener('click',this._handleToggleGroupClick.bind(this))})}
_handleToggleGroupClick(event){const element=this._getParentElementByClass(event.currentTarget,'br-item')
if(element.classList.contains('open')){element.classList.remove('open')
element.nextElementSibling.querySelectorAll(selectors.BR_SWITCH).forEach((check)=>{check.setAttribute('tabindex',-1)})
this._setGroupAttributes(element,`Expandir o grupo de Cookies ${element.querySelector('.group-name').innerText}`)
this._toggleIcon(element,'fa-angle-up','fa-angle-down')}else{element.classList.add('open')
element.nextElementSibling.querySelectorAll(selectors.BR_SWITCH).forEach((check)=>{check.setAttribute('tabindex',0)})
this._setGroupAttributes(element,`Retrair o grupo de Cookies ${element.querySelector('.group-name').innerText}`)
this._toggleIcon(element,'fa-angle-down','fa-angle-up')
this._scrollUp(element)}}
_setCheckboxBehavior(){this.component.querySelectorAll(selectors.PARENT_CHECKBOX).forEach((trigger)=>{this.checkgroupBehavior=new Checkgroup(trigger)
this.checkgroupBehavior.setBehavior()})}
_setSelectionBehavior(){this.component.querySelectorAll(selectors.CHECKBOX).forEach((checkbox)=>{checkbox.addEventListener('change',this._controlSelection.bind(this))})}
_controlSelection(event){const segment=event.currentTarget.id.split('-')
switch(segment[1]){case'all':this._setCheckAllBehavior(event.currentTarget)
break
case'group':this._setCheckgroupBehavior(event.currentTarget,segment[2])
break
case'cookie':this._setCheckCookieBehavior(event.currentTarget,segment[2],segment[3])
break
default:}}
_setCheckAllBehavior(checkbox){this.data.selectAll=checkbox.checked
this.data.allIndeterminated=checkbox.hasAttribute('indeterminate')?true:false
this._displayBroadAlertMessage()}
_setCheckgroupBehavior(checkbox,groupIndex){this.data.cookieGroups[groupIndex].groupSelected=checkbox.checked
this.data.cookieGroups[groupIndex].groupIndeterminated=checkbox.hasAttribute('indeterminate')?true:false
this.data.cookieGroups[groupIndex].cookieList.forEach((cookieData,cookieIndex)=>{if(!cookieData.cookieOptOut){cookieData.cookieSelected=checkbox.checked
this._displayCookieAlertMessage(groupIndex,cookieIndex)}})
this._displayGroupAlertMessage(groupIndex)}
_setCheckCookieBehavior(checkbox,groupIndex,cookieIndex){this.data.cookieGroups[groupIndex].cookieList[cookieIndex].cookieSelected=checkbox.checked
this._displayCookieAlertMessage(groupIndex,cookieIndex)}
_displayBroadAlertMessage(){this.component.querySelectorAll(selectors.BROAD_ALERT).forEach((broadAlert)=>{if(this.data.allAlertMessage&&(!this.data.selectAll||this.data.allIndeterminated)){broadAlert.classList.remove('d-none')}else{broadAlert.classList.add('d-none')}})}
_displayGroupAlertMessage(groupIndex){const group=this.component.querySelectorAll(selectors.GROUP_INFO)[groupIndex]
group.querySelectorAll(selectors.GROUP_ALERT).forEach((groupAlert)=>{if(this.data.cookieGroups[groupIndex].groupAlertMessage&&(!this.data.cookieGroups[groupIndex].groupSelected||this.data.cookieGroups[groupIndex].groupIndeterminated)){groupAlert.classList.remove('d-none')}else{groupAlert.classList.add('d-none')}})}
_displayCookieAlertMessage(groupIndex,cookieIndex){const group=this.component.querySelectorAll(selectors.GROUP_INFO)[groupIndex]
const cookie=group.nextElementSibling.querySelectorAll(selectors.COOKIE_CARD)[cookieIndex]
cookie.querySelectorAll(selectors.COOKIE_ALERT).forEach((cookieAlert)=>{if(this.data.cookieGroups[groupIndex].cookieList[cookieIndex].alertMessage&&!this.data.cookieGroups[groupIndex].cookieList[cookieIndex].cookieSelected){cookieAlert.classList.remove('d-none')}else{cookieAlert.classList.add('d-none')}})}
_getParentElementByClass(element,className){parent=element.parentNode
while(!parent.classList.contains(className)){parent=parent.parentNode}
return parent}
_toggleIcon(element,oldIcon,newIcon){element.querySelectorAll(selectors.BUTTON_ICON).forEach((icon)=>{icon.classList.remove(oldIcon)
icon.classList.add(newIcon)})}
_setGroupAttributes(element,label){element.querySelectorAll(`${`${selectors.GROUP_BUTTON},${selectors.GROUP_NAME},${selectors.COOKIES_CHECKED},${selectors.GROUP_SIZE}`}`).forEach((item)=>{item.setAttribute('aria-label',label)})}
_scrollUp(element){setTimeout(()=>{this.component.querySelectorAll(selectors.WRAPPER).forEach(()=>{setTimeout(()=>{element.scrollIntoView({behavior:'smooth',block:'start',})},150)},5000)})}
_showCookiebar(){this.component.classList.remove('d-none')
this.component.focus()
switch(this.mode){case'open':this.component.classList.remove('default')
this.component.querySelectorAll(selectors.POLITICS_BUTTON).forEach((button)=>{button.classList.add('d-none')})
document.body.style.overflowY='hidden'
this._setOpenView()
default:}}
_hideCookiebar(){this.component.classList.add('d-none')}
_setOpenView(){const wrapper=this.component.querySelector(selectors.WRAPPER)
const containerFluid=this.component.querySelector(selectors.CONTAINER_FLUID)
const modalFooter=this.component.querySelector(selectors.MODAL_FOOTER)
const padding=window.getComputedStyle(containerFluid,null).getPropertyValue('padding-top').match(/\d+/)
const height=`${window.innerHeight - padding * 2 - modalFooter.offsetHeight}px`
wrapper.style.height=height}
_setDefaultView(){this.component.querySelector(selectors.WRAPPER).removeAttribute('style')}
_setOutputJSON(){this.output={}
this.output.selectAll=this.data.allIndeterminated?'indeterminated':this.data.selectAll
this.output.cookieGroups=[]
this.data.cookieGroups.forEach((groupData)=>{const cookies=[]
groupData.cookieList.forEach((cookieData)=>{cookies.push({cookieId:cookieData.cookieId,cookieSelected:cookieData.cookieSelected,})})
this.output.cookieGroups.push({cookieList:cookies,groupId:groupData.groupId,groupSelected:groupData.groupIndeterminated?'indeterminated':groupData.groupSelected,})})
return JSON.stringify(this.output)}
static createCookiebar(json,callback){const brCookiebar=document.createElement('div')
brCookiebar.classList.add('br-cookiebar','default','d-none')
brCookiebar.setAttribute('tabindex',1)
document.body.appendChild(brCookiebar)
const params={callback,component:brCookiebar,json,lang:'pt-br',mode:'default',name:'br-cookiebar',}
return new BRCookiebar(params)}}
const Brazilian=require('flatpickr/dist/l10n/pt').default.pt
class BRDateTimePicker{constructor(name,component,config,language=Brazilian){this.name=name
this.component=component
this.language=language
this.component.querySelectorAll('.br-button').forEach((elem)=>{elem.setAttribute('aria-hidden','true')
elem.setAttribute('tab-index','-1')})
this.component.addEventListener('blur',()=>{if(!isNaN(new Date(this.component.value))){fp.setDate(this.component.value)}})
this.component.addEventListener('keyup',()=>{if(!isNaN(new Date(this.component.value))){if(this.component.selectionStart>=10)fp.setDate(this.component.value)
else fp.jumpToDate(this.component.value)}})
flatpickr.localize(language)
this.configAttribute=this.component.getAttribute('datetimepicker-config')
if(this.configAttribute){const properties=this.configAttribute.split(',')
this.obj=[]
properties.forEach((element)=>{const tup=element.split(':')
this.obj[tup[0]]=tup[1].replaceAll("'",'').trim()
this.saida=this.obj},this)
this.config=this.obj}else{this.config=config}
this._buildDateTimePicker()}
_dateInputMask(elm){elm.setAttribute('maxlength',10)
elm.addEventListener('keypress',(e)=>{if(e.keyCode<47||e.keyCode>57){e.preventDefault()}
const len=elm.value.length
if(len!==1||len!==3){if(e.keyCode===47){e.preventDefault()}}
if(len===2){elm.value+='/'}
if(len===5){elm.value+='/'}})}
_dateTimeInputMask(elm){elm.setAttribute('maxlength',16)
elm.addEventListener('keypress',(e)=>{if(e.keyCode<47||e.keyCode>57){e.preventDefault()}
const len=elm.value.length
if(len!==1||len!==3){if(e.keyCode===47){e.preventDefault()}}
switch(len){case 2:elm.value+='/'
break
case 5:elm.value+='/'
break
case 10:elm.value+=' '
break
case 13:elm.value+=':'
break
default:break}})}
_dateRangeInputMask(elm){elm.setAttribute('maxlength',25)
elm.addEventListener('keypress',(e)=>{if(e.keyCode<47||e.keyCode>57){e.preventDefault()}
const len=elm.value.length
if(len!==1||len!==3){if(e.keyCode===47){e.preventDefault()}}
this._positionRangeMask(elm,len)})}
_positionRangeMask(elm,len){const tamSeparator=this.language.rangeSeparator.length
const daySeparator=10+tamSeparator+2
const monthSeparator=10+tamSeparator+5
elm.setAttribute('maxlength',20+tamSeparator)
switch(len){case 2:elm.value+='/'
break
case 5:elm.value+='/'
break
case 10:elm.value+=this.language.rangeSeparator
break
case daySeparator:elm.value+='/'
break
case monthSeparator:elm.value+='/'
break
default:break}}
_timeInputMask(elm){elm.setAttribute('maxlength',5)
elm.addEventListener('keypress',(e)=>{if(e.keyCode<47||e.keyCode>57){e.preventDefault()}
const len=elm.value.length
if(len!==1||len!==3){if(e.keyCode===47){e.preventDefault()}}
if(len===2){elm.value+=':'}})}
_buildDateTimePicker(){let format='d/m/Y'
let time=false
let noCalendar=false
switch(this.component.getAttribute('data-type')){case'date':format='d/m/Y'
time=false
noCalendar=false
this._dateInputMask(this.component.querySelectorAll('input')[0])
break
case'time':format='H:i'
time=true
noCalendar=true
this._timeInputMask(this.component.querySelectorAll('input')[0])
break
case'datetime-local':format='d/m/Y H:i'
time=true
noCalendar=false
this._dateTimeInputMask(this.component.querySelectorAll('input')[0])
break
case'datetime-range':format='d/m/Y'
time=false
noCalendar=false
this._dateRangeInputMask(this.component.querySelectorAll('input')[0])
break
default:format='d/m/Y'
time=false
noCalendar=false
if(this.component.getAttribute('data-mode')==='range'){this._dateRangeInputMask(this.component.querySelectorAll('input')[0])}else{this._dateInputMask(this.component.querySelectorAll('input')[0])}
break}
this.config_native={allowInput:true,dateFormat:format,enableTime:time,minuteIncrement:1,wrap:true,}
this.config_min_flat={clickOpens:false,disableMobile:'true',mode:this.component.getAttribute('data-mode'),nextArrow:'<button class="br-button circle small" type="button"><i class="fas fa-chevron-right"></i></button>',noCalendar:noCalendar,prevArrow:'<button class="br-button circle small" type="button"><i class="fas fas fa-chevron-left"></i></button>',wrap:true,}
this.config_flatpick=Object.assign(this.config_native,this.config)
this.config_flatpick=Object.assign(this.config_flatpick,this.config_min_flat)
this.calendar=flatpickr(this.component,Object.assign(this.config_native,this.config))
this.calendar.config.onOpen.push(()=>{if(this.config_flatpick.allowInput){this.component.querySelectorAll('.br-button').forEach((elem)=>{elem.setAttribute('aria-hidden','true')
elem.setAttribute('tab-index','-1')})}else{this.component.querySelectorAll('.flatpickr-calendar').forEach((elem)=>{console.log(elem)
elem.setAttribute('tab-index','-1')})}
document.querySelectorAll('.flatpickr-day').forEach((element)=>{element.setAttribute('tabindex','1')})
document.querySelectorAll('.arrowUp').forEach((element)=>{element.classList.add('fas','fa-chevron-up')})
document.querySelectorAll('.arrowDown').forEach((element)=>{element.classList.add('fas','fa-chevron-down')})})}}
BRDateTimePicker
class BRFooter{constructor(name,component){this.name=name
this.component=component
this._setUp()
this._setBehavior()}
_setUp(){this.list=this.component.querySelector('.br-list.horizontal')}
_setBehavior(){this._setCollapseBehavior()
window.onresize=function(){if(window.matchMedia('(min-width: 992px)').matches){window.document.querySelectorAll('.br-footer .br-list:not(.horizontal)').forEach((trigger)=>{trigger.style.display='block'})}else{window.document.querySelectorAll('.br-footer .br-list:not(.horizontal)').forEach((trigger)=>{trigger.style.display='none'})
window.document.querySelectorAll('.br-footer i').forEach((iconComponent)=>{iconComponent.classList.remove('fa-angle-up')
iconComponent.classList.add('fa-angle-down')})}}}
_setCollapseBehavior(){this.britems=[]
if(this.list){this.list.querySelectorAll('.br-list').forEach((trigger)=>{if(window.matchMedia('(max-width: 992px)').matches){trigger.style.display='none'}})
this.list.querySelectorAll('.br-item').forEach((trigger)=>{trigger.addEventListener('click',(e)=>{if(window.matchMedia('(max-width: 992px)').matches){this._showList(e)}})
this.britems.push(trigger)})
this.list.querySelectorAll('.br-item').forEach((trigger)=>{trigger.addEventListener('keydown',(e)=>{if(e.keyCode===13){if(window.matchMedia('(max-width: 992px)').matches){this._showList(e)}}})
this.britems.push(trigger)})}}
_showList(e){parent=e.target.parentElement
parent=parent.classList.contains('col-2')?e.target.parentElement:e.target.parentElement.parentElement
parent=parent.classList.contains('col-2')?parent:e.target.parentElement.parentElement.parentElement
this._closeAllColumns(parent)
parent.querySelectorAll('.br-list ').forEach((trigger)=>{trigger.style.display=trigger.style.display==='block'?'none':'block'
const iconComponent=parent.querySelector('i')
trigger.style.display==='block'?this._iconAngleUP(iconComponent):this._iconAngleDOWN(iconComponent)
this._setAriaAttributes(trigger,e)})}
_closeAllColumns(target){this.component.querySelectorAll('.br-list:not(.horizontal)').forEach((trigger)=>{if(target!==trigger.parentElement){trigger.style.display='none'
this.component.querySelectorAll('.header i').forEach((iconComponent)=>{this._iconAngleDOWN(iconComponent)})}})}
_iconAngleUP(iconComponent){iconComponent.classList.remove('fa-angle-down')
iconComponent.classList.add('fa-angle-up')}
_iconAngleDOWN(iconComponent){iconComponent.classList.remove('fa-angle-up')
iconComponent.classList.add('fa-angle-down')}
_setAriaAttributes(optionTriggerExternal,event){const itemList=this.list.querySelectorAll('.br-item')
itemList.forEach(()=>{const listId=`list-${Math.floor(Math.random() * 10000)}`
const isBlock=optionTriggerExternal.style.display==='block'
const{parentElement}=event.target
parentElement.setAttribute('id',listId)
parentElement.setAttribute('data-visible',isBlock)
parentElement.setAttribute('aria-expanded',isBlock)
parentElement.setAttribute('aria-label',isBlock?'expandido':'recolhido')
parentElement.setAttribute('aria-controls',listId)
parentElement.setAttribute('data-group','group1')
parentElement.setAttribute('data-target',listId)})}}
BRFooter
class Tooltip{constructor({component,activator,place='top',timer,active,textTooltip,type='info',onActivator=false}){const text_tooltip=textTooltip?textTooltip:component
if(typeof text_tooltip==='undefined'){return}
this.onActivator=onActivator
this.activator=activator
this.component=component?component:this._setContent(text_tooltip,type)
this.place=this.component.getAttribute('place')===null?this.component.getAttribute('place'):place
const positions=['top','right','bottom','left']
this.popover=this.component.hasAttribute('popover')
this.notification=this.component.classList.contains('br-notification')
this.timer=this.component.getAttribute('timer')?this.component.getAttribute('timer'):timer
this.active=this.component.hasAttribute('active')?this.component.hasAttribute('active'):active
this.placement=positions.includes(place)?place:this.notification
this.popperInstance=null
this.showEvents=['mouseenter','click','focus']
this.hideEvents=['mouseleave','blur']
this.closeTimer=null
this._create()
this._setBehavior()}
_setBehavior(){if(this.activator){this.showEvents.forEach((event)=>{this.activator.addEventListener(event,(otherEvent)=>{this._show(otherEvent)})})}
if(this.popover){const closeBtn=this.component.querySelector('.close')
closeBtn.addEventListener('click',(event)=>{this._hide(event,this.component)
this._toggleActivatorIcon()})}else{this.hideEvents.forEach((event)=>{this.activator.addEventListener(event,(otherEvent)=>{this._hide(otherEvent,this.component)})})}}
_setContent(contentText,type){const text_tooltip=document.createElement('div')
text_tooltip.setAttribute('role','tooltip')
text_tooltip.setAttribute('place','top')
text_tooltip.setAttribute(type,type)
text_tooltip.innerText=`${contentText}`
text_tooltip.classList.add('br-tooltip')
text_tooltip.classList.add('sample')
if(this.activator&&this.onActivator){this.activator.appendChild(text_tooltip)}else{document.body.appendChild(text_tooltip)}
return text_tooltip}
_create(){this._setLayout()
if(this.notification){this.component.setAttribute('notification','')
this.popperInstance=createPopper(this.activator,this.component,{modifiers:[{name:'offset',options:{offset:[0,8],},},{name:'preventOverflow',options:{altAxis:false,mainAxis:true,},},{name:'flip',options:{fallbackPlacements:['top','right']}},],placement:'bottom',strategy:'fixed',})}else{this.popperInstance=createPopper(this.activator,this.component,{modifiers:[{name:'offset',options:{offset:[0,8],},},{name:'preventOverflow',options:{altAxis:true,mainAxis:true,},},{name:'flip',options:{fallbackPlacements:['top','right','bottom','left']},},],placement:this.placement,})}}
_show(event){this.component.style.display='unset'
this.component.setAttribute('data-show','')
this.component.style.zIndex=9999
this.popperInstance.update()
this.component.style.visibility='visible'
if(this.timer){clearTimeout(this.closeTimer)
this.closeTimer=setTimeout(this._hide,this.timer,event,this.component)}}
_hide(event,component){component.removeAttribute('data-show')
component.style.zIndex=-1
component.style.visibility='hidden'
clearTimeout(component.closeTimer)}
_setLayout(){const arrow=document.createElement('div')
arrow.setAttribute('data-popper-arrow','')
if(this.component.querySelectorAll('.arrow').length<1){arrow.classList.add('arrow')}
this.component.appendChild(arrow)
if(this.popover){const close=document.createElement('button')
close.setAttribute('type','button')
close.classList.add('close')
const ico=document.createElement('i')
ico.classList.add('fas','fa-times')
close.appendChild(ico)
this.component.appendChild(close)}}
_toggleActivatorIcon(){const icon=this.activator.querySelector('button svg')
if(icon){icon.classList.toggle('fa-angle-down')
icon.classList.toggle('fa-angle-up')}
this.activator.toggleAttribute('active')}}
Tooltip
class BRHeader{constructor(name,component){this.name=name
this.component=component
this.componentSearch=this.component.querySelector('.header-search')
this.componentSearchInput=this.component.querySelector('.header-search input')
this.componentSearchTrigger=this.component.querySelector('[data-toggle="search"]')
this.componentSearchDismiss=this.component.querySelector('[data-dismiss="search"]')
this.hideDrop=null
this.menuTrigger=this.component.querySelector('[data-target="#main-navigation"]')
this._setBehavior()}
_setBehavior(){this._setLogoutBehavior()
this._setSearchBehaviors()
this._setKeyboardBehaviors()
this._setDropdownBehavior()
this._setSticky()}
_setLoginBehavior(){for(const login of this.component.querySelectorAll('[data-trigger="login"]')){login.addEventListener('click',()=>{const loginParent=login.closest('.header-login')
loginParent.querySelector('.header-sign-in').classList.add('d-none')
loginParent.querySelector('.header-avatar').classList.remove('d-none')})}}
_setLogoutBehavior(){for(const logout of this.component.querySelectorAll('[data-trigger="logout"]')){logout.addEventListener('click',()=>{const logoutParent=logout.closest('.header-login')
logoutParent.querySelector('.avatar').classList.remove('show')
logoutParent.querySelector('[data-toggle="dropdown"]').classList.remove('active')
logoutParent.querySelector('.header-sign-in').classList.remove('d-none')
logoutParent.querySelector('.header-avatar').classList.add('d-none')})}}
_setSearchBehaviors(){if(this.componentSearchTrigger){this.componentSearchTrigger.addEventListener('focus',()=>{this._cleanDropDownHeader()})
this.componentSearchTrigger.addEventListener('click',()=>{this._openSearch()})}
if(this.componentSearchDismiss){this.componentSearchDismiss.addEventListener('click',()=>{this._closeSearch()})}}
_setKeyboardBehaviors(){if(this.componentSearchInput){this.componentSearchInput.addEventListener('keydown',(event)=>{switch(event.keyCode){case 27:this._closeSearch()
break
default:break}})}
for(const trigger of this.component.querySelectorAll('.dropdown [data-toggle="dropdown"]')){trigger.addEventListener('keydown',(event)=>{switch(event.keyCode){case 32:if(event.target.parentNode.classList.contains('show')){event.target.parentNode.click()
event.target.parentNode.classList.remove('show')
event.target.classList.remove('active')
event.stopPropagation()}
break
default:break}})}}
_openSearch(){if(this.componentSearch){this.componentSearch.classList.add('active')
this.componentSearch.querySelector('input').focus()}}
_closeSearch(){if(this.componentSearch){this.componentSearch.classList.remove('active')
this._nextFocusElement().focus()}}
handleEvent(event){const notificationElement=this.component.querySelector('.br-notification')
if(notificationElement&&!notificationElement.contains(event.target)){if(this.activateTr!==event.target.parentNode){this._cleanDropDownHeaderRef(this.component)}}}
_setDropdownBehavior(){this.cleaned=false
let hideDrop
this.activateTr='teste'
for(const trigger of this.component.querySelectorAll('.dropdown [data-toggle="dropdown"]')){trigger.addEventListener('click',(event)=>{this._headerTooltip()
clearTimeout(hideDrop)
this.activateTr=trigger
document.addEventListener('mousedown',this,false)
event.stopImmediatePropagation()
const hasShow=trigger.classList.contains('active')
if(hasShow){trigger.classList.remove('active')
trigger.closest('.dropdown').classList.remove('show')}else{this._cleanDropDownHeader()
trigger.classList.add('active')
trigger.closest('.dropdown').classList.add('show')
const next=this._nextFocusElement()
next.addEventListener('focus',()=>{clearTimeout(hideDrop)})}
event.stopPropagation()
return''})}
this.menuTrigger.addEventListener('focus',()=>{this._cleanDropDownHeader()})}
_headerTooltip(){if(this.TooltipExampleList){this.TooltipExampleList.forEach((tooltipElem)=>{tooltipElem.component.remove()
tooltipElem.popperInstance.destroy()})}
this.TooltipExampleList=[]
this.component.querySelectorAll('.notification-tooltip').forEach((TooltipExample)=>{const texttooltip=TooltipExample.getAttribute('data-tooltip-text')
const config={activator:TooltipExample,placement:'top',textTooltip:texttooltip,}
const x=new Tooltip(config)
this.TooltipExampleList.push(x)})}
_cleanDropDownHeaderRef(ref){if(this.cleaned===false){for(const trigger of ref.querySelectorAll('.dropdown.show')){trigger.classList.remove('show')
trigger.parentNode.classList.remove('show')
for(const button of ref.querySelectorAll('.br-button')){button.classList.remove('active')}}}
this.cleaned=false}
_cleanDropDownHeader(){this._cleanDropDownHeaderRef(this.component)}
_setSticky(){if(this.component.hasAttribute('data-sticky')){window.onscroll=()=>{if(window.pageYOffset>this.component.offsetHeight){this.component.classList.add('sticky','compact')}else{this.component.classList.remove('sticky','compact')}}}}
_nextFocusElement(){const focussableElements='a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
if(document.activeElement){const focussable=Array.prototype.filter.call(document.body.querySelectorAll(focussableElements),(element)=>{return element.offsetWidth>0||element.offsetHeight>0||element===document.activeElement})
const index=focussable.indexOf(document.activeElement)
if(index>-1){const nextElement=focussable[index+1]||focussable[0]
return nextElement}}
return null}}
BRHeader
class BRInput{constructor(name,component){this.name=name
this.component=component
this._currentFocus=-1
this._setBehavior()}
_setBehavior(){this._setPasswordViewBehavior()
this._setAutocompleteBehavior()}
_setPasswordViewBehavior(){for(const inputPassword of this.component.querySelectorAll('input[type="password"]')){if(!inputPassword.disabled){for(const buttonIcon of inputPassword.parentNode.querySelectorAll('.br-button')){buttonIcon.addEventListener('click',(event)=>{this._toggleShowPassword(event)},false)}}}}
_toggleShowPassword(event){for(const icon of event.currentTarget.querySelectorAll('.fas')){if(icon.classList.contains('fa-eye')){icon.classList.remove('fa-eye')
icon.classList.add('fa-eye-slash')
for(const input of this.component.querySelectorAll('input[type="password"]')){input.setAttribute('type','text')}
for(const button of this.component.querySelectorAll('button[aria-label="Exibir senha"]')){button.setAttribute('aria-checked','true')}}else if(icon.classList.contains('fa-eye-slash')){icon.classList.remove('fa-eye-slash')
icon.classList.add('fa-eye')
for(const input of this.component.querySelectorAll('input[type="text"]')){input.setAttribute('type','password')}
for(const button of this.component.querySelectorAll('button[aria-label="Exibir senha"]')){button.setAttribute('aria-checked','false')}}}}
_setAutocompleteBehavior(){for(const inputAutocomplete of this.component.querySelectorAll('input.search-autocomplete')){inputAutocomplete.addEventListener('input',(event)=>{this._clearSearchItems()
this._buildSearchItems(event.currentTarget)},false)
inputAutocomplete.addEventListener('keydown',(event)=>{this._handleArrowKeys(event)},false)}}
_buildSearchItems(element){const searchList=window.document.createElement('div')
searchList.setAttribute('class','search-items')
this.component.appendChild(searchList)
if(element.value!==''){for(const data of this.dataList){if(data.substr(0,element.value.length).toUpperCase()===element.value.toUpperCase()){const item=window.document.createElement('div')
item.innerHTML=`<strong>${data.substr(0, element.value.length)}</strong>`
item.innerHTML+=data.substr(element.value.length)
item.innerHTML+=`<input type="hidden" value="${data}">`
item.addEventListener('click',(event)=>{for(const input of event.currentTarget.querySelectorAll('input[type="hidden"]')){element.value=input.value}
this._clearSearchItems()},false)
searchList.appendChild(item)}}}else{this._clearSearchItems()}}
_clearSearchItems(){for(const searchItems of this.component.querySelectorAll('.search-items')){for(const item of searchItems.querySelectorAll('div')){searchItems.removeChild(item)}
this.component.removeChild(searchItems)}}
_handleArrowKeys(event){switch(event.keyCode){case 13:if(this._currentFocus>-1){event.preventDefault()
for(const searchItems of this.component.querySelectorAll('.search-items')){for(const itemActive of searchItems.querySelectorAll('div.is-active')){itemActive.click()}}
this._currentFocus=-1}
break
case 38:if(this._currentFocus>0){this._currentFocus-=1}
this._switchFocus()
break
case 40:for(const searchItems of this.component.querySelectorAll('.search-items')){if(this._currentFocus<searchItems.querySelectorAll('div').length-1){this._currentFocus+=1}}
this._switchFocus()
break
default:break}}
_switchFocus(){for(const searchItems of this.component.querySelectorAll('.search-items')){for(const[index,item]of searchItems.querySelectorAll('div').entries()){if(index===this._currentFocus){item.classList.add('is-active')}
if(index!==this._currentFocus){item.classList.remove('is-active')}}}}
setAutocompleteData(dataList){this.dataList=dataList}}
BRInput
class BRItem{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){this._setCheckboxSelection()
this._setRadioSelection()}
_setCheckboxSelection(){for(const checkbox of this.component.querySelectorAll('.br-checkbox input[type="checkbox"]')){if(checkbox.checked){this.component.classList.add('selected')}
checkbox.addEventListener('click',(event)=>{if(event.currentTarget.checked){this.component.classList.add('selected')}else{this.component.classList.remove('selected')}})}}
_setRadioSelection(){for(const radio of this.component.querySelectorAll('.br-radio input[type="radio"]')){if(radio.checked){radio.setAttribute('checked','')
this.component.classList.add('selected')}
radio.addEventListener('click',(event)=>{for(const item of this.component.parentElement.querySelectorAll('.br-item')){for(const radioItem of item.querySelectorAll('.br-radio input[type="radio"]')){if(radioItem===event.currentTarget){radioItem.setAttribute('checked','')
item.classList.add('selected')}else{radioItem.removeAttribute('checked')
item.classList.remove('selected')}}}})}}}
BRItem
class BRList{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){this._setCollapseBehavior()}
_setCollapseBehavior(){this.component.querySelectorAll('[data-toggle="collapse"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const collapse=new Collapse(config)
collapse.setBehavior()})}}
BRList
class BRMenu{constructor(name,component){this.name=name
this.component=component
this.id=this.component.id
this.breakpoints=this.component.dataset.breakpoints?this.component.dataset.breakpoints.split(' '):['col-sm-4','col-lg-3']
this.pushShadow='shadow-lg-right'
this.trigger=document.querySelector(`[data-target="#${this.id}"]`)
this.contextual=this.component.querySelector('[data-toggle="contextual"]')
this.dismiss=this.component.querySelectorAll('[data-dismiss="menu"]')
this.scrim=this.component.querySelector('.menu-scrim')
this.componentFolders=this.component.querySelectorAll('.menu-folder')
this.componentSiders=this.component.querySelectorAll('.side-menu')
this.componentItems=this.component.querySelectorAll('.menu-item')
this.elementOpenMenu=HTMLElement
this.inSubmenu=false
this.triggerParent=HTMLElement
this._setBehavior()}
_setBehavior(){this._toggleMenu()
this._setDropMenu()
this._setSideMenu()
this._setKeyboardBehaviors()
this._setBreakpoints()
this._setView()
this._addARIAAttributes()
window.addEventListener('resize',()=>{this._setView()})}
_setView(){const template=document.querySelector('body')
const menuContextual=document.querySelector('.menu-trigger')
if(menuContextual&&window.innerWidth<992){template.classList.add('mb-5')}else{template.classList.remove('mb-5')}}
_setBreakpoints(){if(!this.component.classList.contains('push')&&!this.contextual){this.component.querySelector('.menu-panel').classList.add(...this.breakpoints)}}
_setKeyboardBehaviors(){this.component.addEventListener('keydown',(event)=>{const keyCode=event.code
switch(keyCode){case'Escape':event.preventDefault()
if(this.trigger){this._closeMenu()}
break
case'ArrowDown':event.preventDefault()
this._navigateToNextElment(event.target,1)
break
case'ArrowUp':event.preventDefault()
this._navigateToNextElment(event.target,-1)
break
default:break}})
if(this.scrim){}}
_navigateToNextElment(element,operator){const parentFolder=element.parentNode.closest('.side-menu.active')?element.parentNode.closest('.side-menu.active'):element.closest('.br-menu')
const elementSiblings=parentFolder.classList.contains('br-menu')||parentFolder.classList.contains('menu-body')?parentFolder.querySelectorAll('.menu-body > .menu-item, .menu-body > .menu-folder > .menu-item,.menu-body > .menu-folder.active > .side-menu.active, .menu-body > .menu-folder.active > ul > li > .menu-item'):parentFolder.querySelectorAll('.side-menu.active > .menu-item,.side-menu.active > ul > li > .menu-item')
const posicao=Array.from(elementSiblings).findIndex((el)=>{return el===element})
const soma=posicao+operator
if(soma>=0&&soma<elementSiblings.length){const nextElement=elementSiblings[soma]
if(nextElement.getAttribute('role')==='group'||nextElement.getAttribute('role')==='tree'){const nextSibling=elementSiblings[soma+operator]
nextSibling.focus()}else{nextElement.focus()}}else{const lastIndex=elementSiblings.length-1
const targetElement=operator===1?0:lastIndex
const target=elementSiblings[targetElement]
target.focus()}}
_toggleMenu(){const trigger=this.contextual?this.contextual:this.trigger
if(trigger){trigger.addEventListener('keydown',(event)=>{if(event.code==='Enter'||event.code==='Space'){event.preventDefault()
if(this.component.classList.contains('active')){this._closeMenu()}else{this._openMenu()
this._focusOnFirstVisibleItem()}}})
trigger.addEventListener('click',()=>{if(this.component.classList.contains('active')){this._closeMenu()}else{this._openMenu()
this._focusOnFirstVisibleItem()}})}
for(const close of this.dismiss){close.addEventListener('click',()=>{return this._closeMenu()})}}
_focusOnFirstVisibleItem(){const activeMenu=this.component.querySelector('.menu-body .menu-item:not([hidden]):not(.inactive)')
if(activeMenu){activeMenu.focus()
activeMenu.scrollIntoView({block:'nearest'})
return}
const firstVisibleItem=this.component.querySelector('.menu-body > .menu-item:not([hidden]):not(.inactive)')
if(firstVisibleItem){firstVisibleItem.focus()
firstVisibleItem.scrollIntoView({block:'nearest'})}}
_openMenu(){this.elementOpenMenu=document.activeElement
this.component.classList.add('active')
this.component.setAttribute('aria-expanded','true')
if(this.component.classList.contains('push')){this.component.classList.add(...this.breakpoints,'px-0')}}
_closeMenu(){this.component.classList.remove('active')
if(this.component.classList.contains('push')){this.component.classList.remove(...this.breakpoints,'px-0')}}
_setDropMenu(){for(const item of this.component.querySelectorAll('.menu-folder > a.menu-item')){this._createIcon(item,'fa-chevron-down')
item.parentNode.classList.add('drop-menu')
item.setAttribute('aria-expanded','false')
this._handleMenuInteraction(item)}}
_focusNextElement(){const focussableElements='a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
if(document.activeElement){const focussable=Array.prototype.filter.call(this.component.querySelectorAll(focussableElements),(element)=>{return element.offsetWidth>0||element.offsetHeight>0||element===document.activeElement})
const index=focussable.indexOf(document.activeElement)
const nextElement=focussable[index+1]||focussable[0]
nextElement.focus()}}
_setSideMenu(){for(const ul of this.component.querySelectorAll('a.menu-item + ul')){if(!ul.parentNode.classList.contains('menu-folder')){this._createIcon(ul.previousElementSibling,'fa-angle-right')
ul.parentNode.classList.add('side-menu')
ul.parentNode.setAttribute('role','none')
this._handleSideMenuInteraction(ul.previousElementSibling)}}}
_handleMenuInteraction(element){if(!element.hasAttribute('data-click-listener')){element.addEventListener('click',()=>{this._toggleDropMenu(element)})
element.addEventListener('keydown',(event)=>{const menuFolder=element.closest('.menu-folder')
const menuItem=menuFolder.querySelector('a.menu-item')
if(menuFolder){if(event.key===' '||event.key==='Spacebar'){if(menuItem&&menuItem.classList.contains('focus-visible')){event.preventDefault()
this._toggleDropMenu(element)}}
if(event.key==='2'){this._toggleDropMenu(element)}}})
element.setAttribute('data-click-listener','true')}}
_toggleDropMenu(element){if(element.parentNode.classList.contains('active')){this._closeMenuElement(element)}else{element.parentNode.classList.add('active')
element.setAttribute('aria-expanded','true')
this.inSubmenu=true
element.parentElement.querySelectorAll('ul li ul a').forEach((menuItem)=>{this.triggerParent=menuItem.parentElement
menuItem.addEventListener('keydown',(event)=>{const{parentElement}=menuItem.parentElement
const keyCode=event.code
switch(keyCode){case'Escape':event.preventDefault()
this._backMenu(parentElement)
break
case'Backspace':event.preventDefault()
this._backMenu(parentElement)
break
case'ArrowLeft':event.preventDefault()
this._backMenu(parentElement)
break
default:break}})})}}
_backMenu(parentElement){parentElement.parentElement.querySelector('[data-click-listener]').click()}
_closeMenuElement(element){element.parentNode.classList.remove('active')
element.setAttribute('aria-expanded','false')}
_handleSideMenuInteraction(element){if(!element.hasAttribute('data-click-listener')){element.addEventListener('click',()=>{this.inSubmenu=false
this._toggleSideMenu(element)})
element.addEventListener('keydown',(event)=>{const sideMenu=element.closest('.side-menu')
const menuItem=sideMenu.querySelector('a.menu-item')
if(sideMenu){if(event.key===' '||event.key==='Spacebar'){if(menuItem&&menuItem.classList.contains('focus-visible')){event.preventDefault()
this._toggleSideMenu(element)}}}})
element.setAttribute('data-click-listener','true')}}
_toggleSideMenu(element){this._hideItems(element)
element.setAttribute('aria-expanded','true')
this._showItems(element.parentNode)
if(element.parentNode.classList.contains('active')){this._closeSideMenu(element)
element.focus()
return}
element.parentNode.classList.add('active')
const submenu=element.nextElementSibling
if(submenu){const firstMenuItem=submenu.querySelector('.menu-item')
if(firstMenuItem){firstMenuItem.focus()}}}
_closeSideMenu(element){element.parentNode.classList.remove('active')
element.setAttribute('aria-expanded','false')
const parentFolder=element.parentNode.closest('.side-menu.active')?element.parentNode.closest('.side-menu.active'):element.closest('.menu-body')
this._showItems(parentFolder)}
_hideItems(element){for(const item of element.closest('.menu-body').querySelectorAll('.menu-item')){item.setAttribute('hidden','')}}
_showItems(element){for(const item of element.querySelectorAll('.menu-item')){item.removeAttribute('hidden')}}
_createIcon(element,icon){if(!element.querySelectorAll('span.support').length){const menuIconContainer=document.createElement('span')
menuIconContainer.classList.add('support')
const menuIcon=document.createElement('i')
menuIcon.classList.add('fas')
menuIcon.classList.add(icon)
menuIcon.setAttribute('aria-hidden','true')
menuIconContainer.appendChild(menuIcon)
element.appendChild(menuIconContainer)}}
_addARIAAttributes(){const menuBody=this.component.querySelector('.menu-body')
menuBody.setAttribute('role','tree')
if(this.contextual){menuBody.setAttribute('role','menubar')}
const nonDropdownItems=this.component.querySelectorAll('.menu-folder:not(.drop-menu) > .menu-item')
nonDropdownItems.forEach((item)=>{item.setAttribute('role','tree')
if(this.contextual){item.setAttribute('role','menubar')}})
const menuItems=this.component.querySelectorAll('.menu-folder.drop-menu > a.menu-item, li > a.menu-item')
menuItems.forEach((item)=>{item.setAttribute('role','treeitem')
if(this.contextual){item.setAttribute('role','menuitem')}})
const sideMenuLists=this.component.querySelectorAll('.side-menu > ul')
sideMenuLists.forEach((list)=>{const menuItem=list.parentNode.querySelector('.menu-item .content')
const menuItemText=menuItem.textContent.trim()
list.setAttribute('role','group')
list.setAttribute('aria-label',menuItemText)})
const menuFolderLists=this.component.querySelectorAll('.menu-folder > ul')
menuFolderLists.forEach((list)=>{const menuItem=list.parentNode.querySelector('.menu-item .content')
const menuItemText=menuItem.textContent.trim()
list.setAttribute('role','tree')
if(this.contextual){list.setAttribute('role','menubar')}
list.setAttribute('aria-label',menuItemText)})
const sideMenuItems=this.component.querySelectorAll('li.side-menu > .menu-item')
for(const submenu of sideMenuItems){submenu.setAttribute('aria-haspopup','true')
submenu.setAttribute('aria-expanded','false')}
const folderMenuItems=this.component.querySelectorAll('.menu-folder.drop-menu > .menu-item')
for(const submenu of folderMenuItems){submenu.setAttribute('aria-haspopup','true')
submenu.setAttribute('aria-expanded','false')}}}
BRMenu
class BRAlert{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){for(const button of this.component.querySelectorAll('.br-message .close')){button.addEventListener('click',()=>{this._dismiss(this.component)})}}
_dismiss(component){component.parentNode.removeChild(component)}}
BRAlert
class BRScrim{constructor(name,component){this.name=name
this.component=component
this._setType()
this._setBehavior()}
_setType(){if(this.component.classList.contains('foco')){this._type='foco'}
if(this.component.classList.contains('legibilidade')){this._type='legibilidade'}
if(this.component.classList.contains('inibicao')){this._type='inibicao'}}
_setBehavior(){if(this.component.classList.contains('foco')){this.component.addEventListener('click',(event)=>{this.outsideclick=true
if(event.target.classList.contains('br-scrim')){this.hideScrim(event)}})
const allComp=this.component.querySelectorAll(`[data-dismiss=${this.component.id}]`)
for(const buttonComponent of allComp){buttonComponent.addEventListener('click',()=>{this.component.classList.remove('active')})}}}
hideScrim(event){event.currentTarget.classList.remove('active')}
showScrim(){if(this._type==='foco'){this.component.classList.add('active')}}}
BRScrim
for(const buttonBloco1 of window.document.querySelectorAll('.scrimexemplo button')){buttonBloco1.addEventListener('click',()=>{const scrscrim=window.document.querySelector('#scrimexample')
const scrimfoco=new BRScrim('br-scrim',scrscrim)
scrimfoco.showScrim()})}
for(const scrimexamplebig of window.document.querySelectorAll('#scrimexemplo-big')){scrimexamplebig.addEventListener('click',()=>{const scrscrim=window.document.querySelector('#scrimfocobig')
const scrimfoco=new BRScrim('br-scrim',scrscrim)
scrimfoco.showScrim()})}
class BRModal{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){for(const brScrim of window.document.querySelectorAll('.br-scrim')){const scrim=new BRScrim('br-scrim',brScrim)
for(const button of window.document.querySelectorAll('.br-scrim + button')){button.addEventListener('click',()=>{scrim.showScrim()})}}}}
BRModal
class BRNotification{constructor(name,component){this.name=name
this.component=component
this.menuBtns=component.querySelectorAll('.contextual-btn')
this.hideEvents=['mouseleave','blur']
this._setBehavior()}
_hideNotification(action){const notification=action.parentNode.parentNode
notification.setAttribute('hidden','')}
_hideAllNotifications(action){const notifications=action.parentNode.parentNode.parentNode.querySelectorAll('.br-item')
notifications.forEach((notification)=>{notification.setAttribute('hidden','')})}
_setBehavior(){for(const button of this.component.querySelectorAll('.br-notification .close')){button.addEventListener('click',()=>{this._dismiss(this.component)})}
this._notificationTooltip()}
_notificationTooltip(){const TooltipExampleList=[]
window.document.querySelectorAll(':not(.br-header) .notification-tooltip').forEach((TooltipNotification)=>{const elementTooltip=TooltipNotification.querySelector('[data-tooltip-text]')
let texttooltip=''
if(elementTooltip){texttooltip=elementTooltip.getAttribute('data-tooltip-text')
if(texttooltip===null){return}
if(typeof texttooltip==='undefined'){return}
if(texttooltip.trim()===''){return}}else{return}
const config={activator:TooltipNotification,placement:'top',textTooltip:texttooltip,}
for(parent=TooltipNotification.parentNode;parent;parent=parent.parentNode){if(parent.classList)
if(parent.classList.contains('header-avatar')){return}}
TooltipExampleList.push(new Tooltip(config))
return})}
_dismiss(component){component.classList.add('close')}}
BRNotification
class BRPagination{constructor(name,component){this.name=name
this.component=component
this.currentPage=1
this._setBehaviors()
this._adaptSelectAccessibility()}
_setBehaviors(){this._setKeybordBehavior()
this._setActive()
this._dropdownBehavior()}
_setKeybordBehavior(){this._setDefaultPaginationKeybordBehavior()
this._setContextualPaginationKeyboardBehavior()}
_setDefaultPaginationKeybordBehavior(){this.component.querySelectorAll('li *:first-child').forEach((element)=>{element.addEventListener('keydown',(event)=>{if(event.key==='ArrowLeft'&&!element.hasAttribute('data-previous-page')){element.parentElement.previousElementSibling.children[0].focus()}
if(event.key==='ArrowRight'&&!element.hasAttribute('data-next-page')){element.parentElement.nextElementSibling.children[0].focus()}
if(event.key==='ArrowDown'&&element.nextElementSibling?.classList.contains('br-list')){element.nextElementSibling.children[0].focus()}})})}
_setContextualPaginationKeyboardBehavior(){this.component.querySelectorAll('.pagination-per-page .br-list').forEach((element)=>{element.addEventListener('keydown',(event)=>{if(event.key==='Escape'){event.currentTarget.parentElement.focus()}})})}
_setLayout(){const ul=this.component.querySelector('ul')
const pages=this.component.querySelectorAll('.page')
pages.forEach((page)=>{if(page.classList.contains('active')){this.currentPage=parseInt(page.innerText)}
page.classList.remove('d-none')})
if(this.currentPage===1){ul.querySelector('[data-previous-page]').setAttribute('disabled','')}else{ul.querySelector('[data-previous-page]').removeAttribute('disabled')}
if(this.currentPage===pages.length){ul.querySelector('[data-next-page').setAttribute('disabled','')}else{ul.querySelector('[data-next-page]').removeAttribute('disabled')}
if(pages.length>9){if(this.currentPage<6){if(ul.querySelector('[data-previous-interval]')){ul.querySelector('[data-previous-interval]').remove()}
for(let page=7;page<pages.length-1;page++){pages[page].classList.add('d-none')}
if(!ul.querySelector('[data-next-interval]')){ul.insertBefore(this._createIntervalElement('next'),ul.children[ul.children.length-2])}}
if(this.currentPage>=6&&this.currentPage<pages.length-4){for(let page=this.currentPage-4;page>0;page--){pages[page].classList.add('d-none')}
if(!ul.querySelector('[data-previous-interval]')){ul.insertBefore(this._createIntervalElement('previous'),ul.children[2])}
for(let page=this.currentPage+2;page<pages.length-1;page++){pages[page].classList.add('d-none')}
if(!ul.querySelector('[data-next-interval]')){ul.insertBefore(this._createIntervalElement('next'),ul.children[ul.children.length-2])}}
if(this.currentPage>=pages.length-4){if(ul.querySelector('[data-next-interval]')){ul.querySelector('[data-next-interval]').remove()}
for(let page=pages.length-8;page>0;page--){pages[page].classList.add('d-none')}
if(!ul.querySelector('[data-previous-interval]')){ul.insertBefore(this._createIntervalElement('previous'),ul.children[2])}}}}
_createIntervalElement(type){const interval=document.createElement('li')
interval.setAttribute(`data-${type}-interval`,'')
const a=document.createElement('a')
a.setAttribute('href','javascript:void(0)')
const icon=document.createElement('i')
icon.classList.add('fas','fa-ellipsis-h')
a.appendChild(icon)
interval.appendChild(a)
return interval}
_setActive(){for(const page of this.component.querySelectorAll('.page')){if(this.currentPage===Number(page.innerText)){page.setAttribute('aria-current','page')}else{page.removeAttribute('aria-current')}
page.addEventListener('click',(event)=>{this._selectPage(event.currentTarget)})}
for(const page of this.component.querySelectorAll('.pagination-ellipsis .br-item')){page.addEventListener('click',(event)=>{this._selectPage(event.currentTarget)})}}
_initializeDropdownItems(){this.component.querySelectorAll('.br-list').forEach((list)=>{const dropdownItems=Array.from(list.querySelectorAll('.br-item'))
dropdownItems.forEach((item)=>{item.addEventListener('keydown',(event)=>{const{key}=event
const currentIndex=dropdownItems.indexOf(item)
const lastIndex=dropdownItems.length-1
switch(key){case'ArrowUp':event.preventDefault()
const prevIndex=(currentIndex-1+dropdownItems.length)%dropdownItems.length
dropdownItems[prevIndex].focus()
break
case'ArrowDown':event.preventDefault()
const nextIndex=(currentIndex+1)%dropdownItems.length
dropdownItems[nextIndex].focus()
break
default:break}})})})}
_dropdownBehavior(){for(const dropdown of this.component.querySelectorAll('[data-toggle="dropdown"]')){this._dropdownInit(dropdown)
this._dropdownToggle(dropdown)}}
_dropdownToggle(element){element.addEventListener('click',()=>{if(element.getAttribute('aria-expanded')==='false'){this._dropdownOpen(element)
return}
this._dropdownClose(element)})
window.document.addEventListener('click',(event)=>{if(!this.component.contains(event.target)){this._dropdownClose(element)}})
element.nextElementSibling.addEventListener('keydown',(event)=>{if(event.key==='Escape'){this._dropdownClose(element)
const buttonInsideLi=element.parentElement.querySelector('button')
if(buttonInsideLi){buttonInsideLi.focus()}}
if(event.key==='Tab'){const items=event.currentTarget.querySelectorAll('.br-item')
if(items[items.length-1].hasAttribute('data-focus-visible-added')){this._dropdownClose(element)}}})}
_dropdownInit(element){element.parentElement.classList.add('dropdown')
element.nextElementSibling.setAttribute('role','menu')
element.setAttribute('aria-haspopup','true')
this._dropdownClose(element)
this._initializeDropdownItems()}
_dropdownOpen(element){element.setAttribute('aria-expanded','true')
element.nextElementSibling.removeAttribute('hidden')}
_dropdownClose(element){element.setAttribute('aria-expanded','false')
element.nextElementSibling.setAttribute('hidden','')}
_selectPage(currentPage){this.component.querySelectorAll('.page').forEach((page)=>{page.classList.remove('active')
page.removeAttribute('aria-current')})
this.component.querySelectorAll('.br-item').forEach((page)=>{page.classList.remove('active')
page.removeAttribute('aria-current')})
currentPage.classList.add('active')
currentPage.setAttribute('aria-current','page')
this._setLayout()}
_adaptSelectAccessibility(){window.addEventListener('load',()=>{this.component.querySelectorAll('.pagination-per-page .br-select .br-list').forEach((element)=>{element.setAttribute('role','menu')
element.querySelectorAll('.br-item').forEach((item)=>{item.setAttribute('role','menuitem')})})})}}
BRPagination
class BRSelect{constructor(name,component,notFound){this.name=name
this.component=component
this.notFound=notFound
this.multiple=component.hasAttribute('multiple')
this._setOptionsList()
this._setBehavior()}
get selected(){return this._optionSelected('value')}
get selectedValue(){return this._optionSelected('inputValue')}
_optionSelected(strOption){let selected=[]
for(const[index,option]of this.optionsList.entries()){if(!this.multiple){if(option.selected){selected=option[strOption]
break}}else{if(index>0&&option.selected){selected.push(option[strOption])}}}
return selected}
_removeNotFoundElement(){const list=this.component.querySelector('.br-list')
if(list.querySelector('.br-item.not-found')){list.removeChild(list.querySelector('.br-item.not-found'))}}
_addNotFoundElement(){const image='data:image/png;base64,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'
const notFoundElement=`
      <div class="br-item not-found">
        <div class="container pl-0 pr-0">
          <div class="row">
            <div class="col-auto">
              <img src="${image}">
            </div>
            <div class="col">
              <p>Não encontramos o que você está procurando!</p>
            </div>
          </div>
        </div>
      </div>
    `
const list=this.component.querySelector('.br-list')
list.insertAdjacentHTML('beforeend',this.notFound?this.notFound:notFoundElement)}
_setOptionsList(){this.optionsList=[]
for(const item of this.component.querySelectorAll('.br-list .br-item')){for(const input of item.querySelectorAll('.br-radio input, .br-checkbox input')){const option={element:item,focus:false,inputValue:input.value,selected:false,value:input.nextElementSibling.innerText,visible:true,}
this.optionsList.push(option)}}}
resetOptionsList(){this._unsetSelectionBehavior()
this._setOptionsList()
this._setSelectionBehavior()
this._setAria()}
_setBehavior(){this._setSearchIcon()
this._setDropdownBehavior()
this._setKeyboardBehavior()
this._setSelectionBehavior()
this._setFilterBehavior()
this._prepareComponent()}
_setDropdownBehavior(){for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.addEventListener('focus',()=>{this._resetFocus()})
input.addEventListener('click',()=>{this._openSelect()
this._resetFocus()})}
for(const trigger of this.component.querySelectorAll('.br-input .br-button[data-trigger]')){trigger.addEventListener('click',()=>{for(const list of this.component.querySelectorAll('.br-list')){if(list.hasAttribute('expanded')){this._closeSelect()}else{this._openSelect()}}})}
window.document.addEventListener('click',(event)=>{if(!this.component.contains(event.target)){this._closeSelect()}})}
_setKeyboardBehavior(){for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.addEventListener('keydown',this._handleKeydownOnInput.bind(this))}
for(const list of this.component.querySelectorAll('.br-list')){list.addEventListener('keydown',this._handleKeydownOnList.bind(this))}}
_prepareComponent(){const inputElement=this.component.querySelector('.br-input')
const buttonElement=this.component.querySelector('.br-input .br-button')
const listElement=this.component.querySelector('.br-list')
listElement.setAttribute('id',`list-${Math.floor(Math.random() * 10000)}`)
listElement.setAttribute('role','listbox')
listElement.setAttribute('tabindex','-1')
listElement.setAttribute('aria-label','Lista de Opções')
inputElement.setAttribute('role','combobox')
inputElement.setAttribute('aria-expanded',false)
inputElement.setAttribute('aria-controls',`${listElement.id}`)
inputElement.setAttribute('aria-autocomplete','list')
buttonElement.setAttribute('aria-controls',`${listElement.id}`)
buttonElement.setAttribute('aria-expanded',false)
buttonElement.setAttribute('aria-label','Exibir lista')
this.component.querySelectorAll('.br-list .br-item').forEach((item)=>{item.setAttribute('role','option')})
if(this.multiple){inputElement.setAttribute('aria-multiselectable',true)}}
_unsetKeyboardBehavior(){for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.removeEventListener('keydown',this._handleKeydownOnInput,false)}
for(const list of this.component.querySelectorAll('.br-list')){list.addEventListener('keydown',this._handleKeydownOnList.bind(this))}}
_handleKeydownOnInput(event){switch(event.key){case'Tab':this._closeSelect()
this._resetFocus()
break
case'ArrowDown':event.preventDefault()
this._openSelect()
this._getNextItem().focus()
break
case'ArrowUp':event.preventDefault()
this._openSelect()
this._getPreviousItem().focus()
break
case'Escape':this._closeSelect()
break
case'Enter':this.component.querySelector('.br-list').hasAttribute('expanded')?this._closeSelect():this._openSelect()
break
default:}}
_handleKeydownOnList(event){event.preventDefault()
switch(event.key){case'Tab':this._closeSelect()
this._resetFocus()
break
case'Escape':for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.focus()}
this._closeSelect()
break
case'Enter':this._setKeyClickOnOption(event.currentTarget)
break
case' ':this._setKeyClickOnOption(event.currentTarget)
break
case'ArrowUp':this._getPreviousItem().focus()
break
case'ArrowDown':this._getNextItem().focus()
break
default:break}}
_setKeyClickOnOption(list){for(const[index,item]of list.querySelectorAll('.br-item').entries()){if(this.optionsList[index].focus){for(const check of item.querySelectorAll('.br-radio input[type="radio"], .br-checkbox input[type="checkbox"]')){check.click()
this._sendEvent()}}}}
_sendEvent(){const clickEvent=new CustomEvent('onChange',{bubbles:true,detail:this.component,})
this.component.dispatchEvent(clickEvent)}
_setDefaultSelected(){this.component.querySelectorAll('.br-list .br-item').forEach((item)=>{const itemIsSelected=item.classList.contains('selected')||item.querySelector('input').hasAttribute('checked')
if(itemIsSelected){this._setSelected(this._positionSelected(item),item)}})}
_positionSelected(component){for(const[index,componente]of this.component.querySelectorAll('.br-list .br-item').entries()){if(componente===component){return index}}
return 0}
_handleClickOnCheck(index,item,event){if(!this.multiple){for(const[index2,item2]of this.component.querySelectorAll('.br-list .br-item').entries()){this._removeSelected(index2,item2)}
this._setSelected(index,item)
this._closeSelect()}else if(event.currentTarget.hasAttribute('checked')){this._removeSelected(index,item)}else{this._setSelected(index,item)}
if(item.hasAttribute('data-all')){for(const check of item.querySelectorAll('.br-checkbox input[type="checkbox"]')){if(!check.hasAttribute('checked')){this._setAttribute()
item.querySelectorAll('label')[0].innerText='Selecionar Todos'}else{for(const item2 of this.component.querySelectorAll('.br-list .br-item')){for(const check2 of item2.querySelectorAll('.br-checkbox input[type="checkbox"]')){if(!check2.hasAttribute('checked')){check2.click()}}}
item.querySelectorAll('label')[0].innerText='Deselecionar Todos'}}}
this._sendEvent()}
_setSelectionBehavior(){this.selectionHandler=[]
this._setDefaultSelected()
for(const[index,item]of this.component.querySelectorAll('.br-list .br-item').entries()){for(const check of item.querySelectorAll('.br-radio input[type="radio"], .br-checkbox input[type="checkbox"]')){this.selectionHandler.push({element:check,handler:this._handleClickOnCheck.bind(this,index,item),})
check.addEventListener('click',this.selectionHandler[index].handler)}}}
_unsetSelectionBehavior(){this.selectionHandler.forEach((item)=>{item.element.removeEventListener('click',item.handler,false)})}
_setFilterBehavior(){const list=this.component.querySelector('.br-list')
for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.addEventListener('input',(event)=>{if(!list.hasAttribute('expanded')){const{value}=event.currentTarget
this._openSelect()
event.currentTarget.value=value}
let allHidden=true
this._filter(event.currentTarget.value)
for(const option of this.optionsList){if(option.visible){allHidden=false}}
if(allHidden){this._filter(event.currentTarget.value)}})}}
_filter(value){let hasVisible=false
for(const[index,item]of this.component.querySelectorAll('.br-list .br-item').entries()){this._removeNotFoundElement()
if(!this.optionsList[index]){continue}
if(this.optionsList[index].value.toUpperCase().indexOf(value.toUpperCase())===-1){item.classList.add('d-none')
this.optionsList[index].visible=false}else{item.classList.remove('d-none')
this.optionsList[index].visible=true
hasVisible=true}}
if(hasVisible===false){this._addNotFoundElement()}else{this._removeNotFoundElement()}}
_setAttribute(){for(const item2 of this.component.querySelectorAll('.br-list .br-item')){for(const check2 of item2.querySelectorAll('.br-checkbox input[type="checkbox"]')){if(check2.hasAttribute('checked')){check2.click()}}}}
_setSelected(index,item){item.classList.add('selected')
item.setAttribute('aria-selected',true)
for(const check of item.querySelectorAll('.br-radio, .br-checkbox')){for(const input of check.querySelectorAll('input[type="radio"], input[type="checkbox"]')){input.setAttribute('checked','')}}
this.optionsList[index].selected=true
this._setInput()}
_removeSelected(index,item){item.classList.remove('selected')
item.removeAttribute('aria-selected')
for(const check of item.querySelectorAll('.br-radio, .br-checkbox')){for(const input of check.querySelectorAll('input[type="radio"], input[type="checkbox"')){input.removeAttribute('checked')}
this.optionsList[index].selected=false
this._setInput()}}
_setInput(){for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){if(!this.multiple){input.value=this.selected}else if(this.selected.length===0){input.value=''}else{this.mountSelectedValues(input)}}}
mountSelectedValues(input){this.amountE=this.amountE>0?this.amountE:0
const amount=this.amountE
const value=this.selected.toString().replaceAll(',',', ')
const tempSpan=document.createElement('span')
tempSpan.innerHTML=value
document.querySelector('body').insertAdjacentElement('beforeend',tempSpan)
const maxCharacterCount=this.getMaxCharacterCountBeforeOverflow(input)
this.amountE=amount
input.title=this.selected.toString().replaceAll(',',', ')
const ct=this.encontrarPosicaoPorTamanho(this.selected,maxCharacterCount-6)
input.value=ct
tempSpan.remove()}
getPixelSize(value){const span=document.createElement('span')
span.style.visibility='hidden'
span.style.position='absolute'
span.style.left='-9999px'
span.style.top='-9999px'
span.style.whiteSpace='nowrap'
span.textContent=value
document.body.appendChild(span)
const size=span.getBoundingClientRect().width
document.body.removeChild(span)
return size}
encontrarPosicaoPorTamanho(array,maxCharacterCount){let account=0
let value=''
let acountVisible=0
let posUltimoArray=0
for(const element of array){const posicaoArray=array.indexOf(element)
account+=1
if(element.length>=maxCharacterCount&&array.length===1){return`${element.substring(0, maxCharacterCount)}... `}
if(value.length>=maxCharacterCount){value+=`${element}, `
value=`${value.substring(0, maxCharacterCount)}...`
acountVisible=acountVisible===0?1:acountVisible
let contOverflow=posicaoArray-acountVisible
contOverflow=acountVisible===0?array.length-1:array.length-acountVisible
posUltimoArray=contOverflow}else{const tmpValue=posicaoArray>0?`, ${element}`:`${element}`
value+=`${tmpValue}`
acountVisible+=1}}
value=posUltimoArray<=0?`${value}`:`${value} + (${posUltimoArray})`
return value}
getMaxCharacterCountBeforeOverflow(input){const style=window.getComputedStyle(input)
const padding=parseFloat(style.paddingLeft)+parseFloat(style.paddingRight)
const border=parseFloat(style.borderLeftWidth)+parseFloat(style.borderRightWidth)
const availableWidth=input.clientWidth-padding-border
const averageCharacterWidth=this.getAverageCharacterWidth(input)
return Math.floor(availableWidth/averageCharacterWidth)}
getAverageCharacterWidth(input){const tempSpan=document.createElement('span')
tempSpan.style.visibility='hidden'
tempSpan.style.position='absolute'
tempSpan.style.whiteSpace='nowrap'
tempSpan.textContent='X'
document.body.appendChild(tempSpan)
const averageWidth=tempSpan.offsetWidth
document.body.removeChild(tempSpan)
return averageWidth}
filterArrayByInputSize(array,input){const maxLength=getMaxCharacterCountBeforeOverflow(input)
const filteredArray=array.filter((element)=>{const elementText=element.toString()
if(getPixelSize(elementText)<=input.offsetWidth){return true}else{const truncatedText=`${elementText.substring(0, maxLength - 3)}...`
input.value=truncatedText
return false}})
return filteredArray}
_getNextItem(){const list=this.component.querySelectorAll('.br-list .br-item')
let iFocused
let iVisible
for(iFocused=0;iFocused<this.optionsList.length;iFocused++){if(this.optionsList[iFocused].focus){for(iVisible=iFocused+1;iVisible<this.optionsList.length;iVisible++){if(this.optionsList[iVisible].visible){break}}
break}}
if(iFocused===this.optionsList.length){for(let index=0;index<this.optionsList.length;index++){if(this.optionsList[index].visible){this.optionsList[index].focus=true
return list[index]}}}else if(iVisible<this.optionsList.length){this.optionsList[iFocused].focus=false
this.optionsList[iVisible].focus=true
return list[iVisible]}else{return list[iFocused]}
return''}
_getPreviousItem(){const list=this.component.querySelectorAll('.br-list .br-item')
let iFocused
let iVisible
for(iFocused=0;iFocused<this.optionsList.length;iFocused++){if(this.optionsList[iFocused].focus){for(iVisible=iFocused-1;iVisible>0;iVisible--){if(this.optionsList[iVisible].visible){break}}
break}}
if(iFocused===this.optionsList.length){for(let index=this.optionsList.length-1;index>=0;index--){if(this.optionsList[index].visible){this.optionsList[index].focus=true
return list[index]}}}else if(iFocused===0){return list[iFocused]}else{this.optionsList[iFocused].focus=false
this.optionsList[iVisible].focus=true
return list[iVisible]}
return''}
_resetInput(){for(const input of this.component.querySelectorAll('.br-input input[type="text"]')){input.value=''}}
_resetFocus(){for(const option of this.optionsList){option.focus=false}}
_resetVisible(){this._removeNotFoundElement()
const list=this.component.querySelectorAll('.br-list .br-item')
for(const[index,option]of this.optionsList.entries()){option.visible=true
list[index].classList.remove('d-none')}}
_openSelect(){const inputElement=this.component.querySelector('.br-input')
const buttonElement=this.component.querySelector('.br-input .br-button')
for(const list of this.component.querySelectorAll('.br-list')){list.setAttribute('expanded','')}
for(const icon of this.component.querySelectorAll('.br-input .br-button i')){icon.classList.remove('fa-angle-down')
icon.classList.add('fa-angle-up')}
inputElement.setAttribute('aria-expanded',true)
buttonElement.setAttribute('aria-expanded',true)
buttonElement.setAttribute('aria-label','Ocultar lista')
this._resetInput()}
_closeSelect(){const inputElement=this.component.querySelector('.br-input')
const buttonElement=this.component.querySelector('.br-input .br-button')
for(const list of this.component.querySelectorAll('.br-list')){list.removeAttribute('expanded')}
for(const icon of this.component.querySelectorAll('.br-input .br-button i')){icon.classList.remove('fa-angle-up')
icon.classList.add('fa-angle-down')}
inputElement.setAttribute('aria-expanded',false)
buttonElement.setAttribute('aria-expanded',false)
buttonElement.setAttribute('aria-label','Exibir lista')
this._setInput()
this._resetFocus()
this._resetVisible()}
_setSearchIcon(){const brInput=this.component.querySelector('.br-input')
const dropButton=this.component.querySelector('[data-trigger]')
const searchIcon=document.createElement('i')
searchIcon.classList.add('fas','fa-search')
searchIcon.setAttribute('aria-hidden','true')
const inputIcon=document.createElement('div')
inputIcon.classList.add('input-icon')
inputIcon.appendChild(searchIcon)
const inputGroup=document.createElement('div')
inputGroup.classList.add('input-group')
inputGroup.appendChild(inputIcon)
inputGroup.appendChild(brInput.querySelector('input'))
brInput.appendChild(inputGroup)
brInput.appendChild(dropButton)}
_setAria(){const inputElement=this.component.querySelector('.br-input')
const listElement=this.component.querySelector('.br-list')
inputElement.setAttribute('role','combobox')
inputElement.setAttribute('aria-expanded',false)
inputElement.setAttribute('aria-controls',`${listElement.id}`)
listElement.setAttribute('role','listbox')}}
BRSelect
class BRTab{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){for(const ancor of this.component.querySelectorAll('.tab-nav')){this.height=ancor.clientHeight
this.scollsizes=ancor.scrollHeight-ancor.clientHeight
this.scrollHeight=Math.max(this.component.scrollWidth,document.documentElement.scrollWidth,this.component.offsetWidth,document.documentElement.offsetWidth,this.component.clientWidth,document.documentElement.clientWidth)
this.leftPosition=this.component.offsetWidth-1
ancor.style.setProperty('--height-nav',`${this.height}px`)
ancor.style.setProperty('--right-gradient-nav',`${this.leftPosition}px`)
this.positionScroll(ancor)
this.navigationRight=this.navigationRight+4
if(this.navigationRight<=this.lastItempos-5){ancor.classList.add('tab-nav-right')}
ancor.onscroll=()=>{this.positionScroll(ancor)
if(this.navigationLeft<=0){ancor.classList.add('tab-nav-left')}else{ancor.classList.remove('tab-nav-left')}
if(this.navigationRight<=this.lastItempos-5){ancor.classList.add('tab-nav-right')}else{ancor.classList.remove('tab-nav-right')}}}
for(const ancor of this.component.querySelectorAll('.tab-nav .tab-item:not([not-tab="true"]) button')){ancor.addEventListener('click',(event)=>{event.currentTarget.setAttribute('aria-selected','false')
this._switchTab(event.currentTarget.parentElement)
this._switchContent(event.currentTarget.parentElement)},false)
ancor.addEventListener('keyup',(e)=>{e.preventDefault()
this.positionKeyboard(e)})
ancor.addEventListener('blur',()=>{this.hiddenTooltips()})}
this.tabitems=this.component.querySelectorAll('tab-item')}
positionKeyboard(event){const keys={end:35,home:36,left:37,right:39,space:32,tab:9,}
const key=event.keyCode
this.tabitems=this.component.querySelectorAll('.tab-item')
this.buttons=this.component.querySelectorAll('button')
switch(key){case keys.end:event.preventDefault()
this.clean()
this._switchTab(this.tabitems[this.tabitems.length-1])
this._switchContent(this.tabitems[this.tabitems.length-1])
this.tabitems[this.tabitems.length-1].focus()
break
case keys.home:event.preventDefault()
this.clean()
this._switchTab(this.tabitems[0])
this._switchContent(this.tabitems[0])
this.tabitems[0].focus()
event.stopPropagation()
break
case keys.left:event.preventDefault()
this.position(event.target,-1)
event.stopPropagation()
break
case keys.right:event.preventDefault()
this.position(event.target,1)
event.stopPropagation()
break
case keys.tab:event.preventDefault()
this.position(event.target,0)
event.stopPropagation()
break
case 32:event.preventDefault()
this.hiddenTooltips()
event.target.click()
event.stopPropagation()
break
default:break}}
hiddenTooltips(){const tooltips=document.querySelectorAll('.br-tooltip')
tooltips.forEach((element)=>{element.hidden=true
element.style.visbility='hidden'
element.removeAttribute('data-show')})}
positionActive(target,direction){let contComponent=0
let contComponentActive=0
const tabItems2=target.parentElement.parentElement.querySelectorAll('.tab-item')
for(const component of tabItems2){if(component.classList.contains('is-active')||component.classList.contains('active')){contComponentActive=contComponent}
contComponent+=1}
if(tabItems2.length>contComponentActive+direction&&contComponentActive+direction>=0){this._switchTab(tabItems2[contComponentActive+direction])
tabItems2[contComponentActive+direction].focus()
let x=''
if(tabItems2[contComponentActive+direction].querySelector('button')){x=tabItems2[contComponentActive+direction].querySelector('button')
x.focus()}}}
position(target,direction){this.positionQuery(target,direction,'.tab-item')}
positionQuery(target,direction,query){let contComponent=0
let contComponentFocus=0
const tabItems2=target.parentElement.parentElement.querySelectorAll(query)
for(const component of tabItems2){if(component.querySelector('.focus-visible')){contComponentFocus=contComponent}
contComponent+=1}
tabItems2[contComponentFocus+direction].querySelector('button').focus()
if(tabItems2.length>contComponentFocus+direction&&contComponentFocus+direction>=0){if(tabItems2[contComponentFocus+direction].querySelector('button')){tabItems2[contComponentFocus+direction].querySelector('button').focus()}}}
setPosition(target){let contComponent=0
let contComponentActive=0
const tabItems2=target.parentElement.parentElement.querySelectorAll('.tab-item')
for(const component of tabItems2){if(component.classList.contains('is-active')||component.classList.contains('active')){contComponentActive=contComponent}
contComponent+=1}
if(tabItems2.length>contComponentActive&&contComponentActive>=0){this.clean()
this._switchContent(tabItems2[contComponentActive])}}
clean(){for(const ancor of event.currentTarget.parentElement.querySelectorAll('button')){ancor.classList.remove('focus-visible')
ancor.classList.remove('is-active')
ancor.classList.remove('active')}
for(const ancor of event.currentTarget.parentElement.querySelectorAll('tab-item')){ancor.classList.remove('is-active')
ancor.classList.remove('active')}}
positionScroll(ancor){this.navItems=ancor.querySelectorAll('.tab-item')
this.lastItempos=Math.ceil(this.navItems[this.navItems.length-1].getBoundingClientRect().right)
this.navigationLeft=Math.floor(this.navItems[0].getBoundingClientRect().left)
this.navigationRight=Math.floor(ancor.getBoundingClientRect().right)}
_switchTab(currentTab){for(const tabItem of this.component.querySelectorAll('.tab-nav .tab-item:not([not-tab="true"])')){if(tabItem===currentTab){tabItem.classList.add('active')
this._selectTab(tabItem,true)}else{tabItem.classList.remove('is-active')
tabItem.classList.remove('active')
this._selectTab(tabItem,false)}}}
_selectTab(tabItem,value){tabItem.querySelector('button').setAttribute('aria-selected',value)}
_switchContent(currentTab){for(const button of currentTab.querySelectorAll('button')){for(const tabPanel of this.component.querySelectorAll('.tab-content .tab-panel')){if(button.getAttribute('data-panel')===tabPanel.getAttribute('id')||button.getAttribute('data-target')===tabPanel.getAttribute('id')){tabPanel.classList.add('active')}else{tabPanel.classList.remove('is-active')
tabPanel.classList.remove('active')}}}}}
BRTab
class Dropdown extends Collapse{constructor({trigger,iconToShow='fa-chevron-down',iconToHide='fa-chevron-up',useIcons=true}){super({iconToHide,iconToShow,trigger,useIcons})}
_setUp(){super._setUp()
this._hideDropdown()
this._initializeDropdownItems()}
_hideDropdown(){document.addEventListener('mousedown',(event)=>{if(!this.trigger.contains(event.target)&&!this.target.hasAttribute('hidden')&&!this.target.contains(event.target)){this.trigger.click()}})}
_setTargetVisibilityStatus(){super._setTargetVisibilityStatus()
if(this.target.hasAttribute('hidden')){this.target.removeAttribute('data-dropdown')}else{this.target.setAttribute('data-dropdown','')}}
_setParentsTargetVisibilityStatus(){if(this.target.hasAttribute('hidden')){this.target.parentElement.classList.remove('dropdown')}else{this.target.parentElement.classList.add('dropdown')}}
_initializeDropdownItems(){this.dropdownItems=Array.from(this.target.querySelectorAll('[role="menuitem"]'))
this.dropdownItems.forEach((item)=>{item.addEventListener('keydown',(event)=>{const key=event.key
const currentIndex=this.dropdownItems.indexOf(item)
const lastIndex=this.dropdownItems.length-1
switch(key){case'ArrowUp':event.preventDefault()
const prevIndex=(currentIndex-1+this.dropdownItems.length)%this.dropdownItems.length
this.dropdownItems[prevIndex].focus()
break
case'ArrowDown':event.preventDefault()
const nextIndex=(currentIndex+1)%this.dropdownItems.length
this.dropdownItems[nextIndex].focus()
break
default:break}})})}
_handleTriggerClickBehavior(){super._handleTriggerClickBehavior()
this._setParentsTargetVisibilityStatus()}
setBehavior(){super.setBehavior()}}
class BRTable{constructor(name,component,sequence){this.name=name
this.component=component
this._header=this.component.querySelector('.header, .table-header')
this._table=this.component.querySelector('table')
this._sequence=sequence
this._setBehaviors()}
_setBehaviors(){this._makeResponsiveTable()
this._setHeaderWidth()
this._searchBehavior()
this._dropdownBehavior()
this._collpaseBehavior()
this._densityBehavior()
this._setClickActions()}
_makeResponsiveTable(){const responsiveClass='responsive'
if(!this.component.querySelector(`.${responsiveClass}`)){const responsiveElement=document.createElement('div')
responsiveElement.classList.add(responsiveClass)
responsiveElement.appendChild(this._table)
this._header.after(responsiveElement)}}
_makeScroller(){const scrollerTag=document.createElement('div')
scrollerTag.classList.add('scroller')
for(const header of this._table.querySelectorAll('thead tr th')){const clonedHeader=document.createElement('div')
clonedHeader.classList.add('item')
clonedHeader.innerHTML=header.innerHTML
if(header.offsetWidth){clonedHeader.style.flex=`1 0 ${header.offsetWidth}px`}
scrollerTag.appendChild(clonedHeader)
const checkbox=clonedHeader.querySelector('.br-checkbox')
if(checkbox){const input=checkbox.querySelector('input')
const label=checkbox.querySelector('label')
input.id=`${input.id}-clone`
label.setAttribute('for',input.id)}}
return scrollerTag}
_setHeaderWidth(){for(const clonedHeader of this.component.querySelectorAll('.headers > div')){for(const[index,header]of this.component.querySelectorAll('table thead tr th').entries()){clonedHeader.children[index].style.flex=`1 0 ${header.offsetWidth}px`}}}
_dropdownBehavior(){this.component.querySelectorAll('[data-toggle="dropdown"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
this.dropdown=new Dropdown(config)
this.dropdown.setBehavior()})}
_collpaseBehavior(){this.component.querySelectorAll('[data-toggle="collapse"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const collapse=new Collapse(config)
collapse.setBehavior()})}
_searchBehavior(){if(this.component.dataset.search){const trigger=this.component.querySelector('[data-toggle="search"]')
const target=this.component.querySelector('.search-bar')
const dismiss=this.component.querySelector('[data-dismiss="search"]')
const inputField=target?target.querySelector('input'):null
if(trigger&&target&&dismiss&&inputField){this._searchInit(trigger)
trigger.addEventListener('click',()=>{return this._searchOpen(trigger,target)})
dismiss.addEventListener('click',()=>{return this._searchClose(trigger,target)})
inputField.addEventListener('keydown',(event)=>{if(event.key==='Escape'){this._searchClose(trigger,target)}})}else{console.error('Um ou mais elementos necessários para a busca não foram encontrados.')}}}
_searchInit(trigger){trigger.setAttribute('aria-expanded','false')}
_searchOpen(trigger,target){trigger.setAttribute('aria-expanded','true')
target.classList.add('show')
target.parentElement.classList.add('show')
target.querySelector('input').focus()}
_searchClose(trigger,target){target.querySelector('input').value=''
target.classList.remove('show')
target.parentElement.classList.remove('show')
trigger.focus()
trigger.setAttribute('aria-expanded','false')}
_densityBehavior(){const desityTriggers=this.component.querySelectorAll('[data-density]')
for(const desityTrigger of desityTriggers){desityTrigger.addEventListener('click',(element)=>{this.component.classList.remove('small','medium','large')
this.component.classList.add(desityTrigger.dataset.density)
this._hideDensityDropdown()})}}
_hideDensityDropdown(idTarget){var element=this.component.querySelector('.actions-trigger ')
if(element&&element.classList.contains('dropdown')){element.classList.remove('dropdown')}
var elementList=this.component.querySelector('.actions-trigger .br-list')
elementList.setAttribute('data-visible',false)
elementList.setAttribute('aria-expanded',false)
elementList.setAttribute('hidden','')}
_setClickActions(){const headerCheckbox=this.component.querySelector('.headers [type="checkbox"]')
const tableCheckboxes=this.component.querySelectorAll('tbody [type="checkbox"]')
const selectedBar=this.component.querySelector('.selected-bar')
const checkAlls=this.component.querySelectorAll('[data-toggle="check-all"]')
for(const checkAll of checkAlls){checkAll.addEventListener('click',()=>{this._checkAllTable(selectedBar,tableCheckboxes,headerCheckbox)
if(checkAll.parentElement.classList.contains('br-list')){}})}
if(tableCheckboxes){for(const checkbox of tableCheckboxes){checkbox.addEventListener('change',()=>{this._checkRow(checkbox,selectedBar,tableCheckboxes,headerCheckbox)})}}}
_setRow(checkbox,check){const tr=checkbox.parentNode.parentNode.parentNode
if(check){tr.classList.add('is-selected')
checkbox.parentNode.classList.add('is-inverted')
checkbox.checked=true}else{tr.classList.remove('is-selected')
checkbox.parentNode.classList.remove('is-inverted')
checkbox.checked=false}}
_checkRow(checkbox,selectedBar,tableCheckboxes,headerCheckbox){const check=checkbox.checked
this._setRow(checkbox,check)
this._setSelectedBar(check?1:-1,selectedBar,tableCheckboxes,headerCheckbox)}
_checkAllRows(tableCheckboxes){for(const checkbox of tableCheckboxes){this._setRow(checkbox,true)}}
_uncheckAllRows(tableCheckboxes){for(const checkbox of tableCheckboxes){this._setRow(checkbox,false)}}
_checkAllTable(selectedBar,tableCheckboxes,headerCheckbox){let count=tableCheckboxes.length
const infoCount=selectedBar.querySelector('.info .count')
const total=parseInt(infoCount.innerHTML,10)
if(total===count){this._uncheckAllRows(tableCheckboxes)
count=-1*count}else{this._checkAllRows(tableCheckboxes)}
this._setSelectedBar(count,selectedBar,tableCheckboxes,headerCheckbox)}
_setSelectedBar(count,selectedBar,tableCheckboxes,headerCheckbox){const infoCount=selectedBar.querySelector('.info .count')
const infoText=selectedBar.querySelector('.info .text')
const total=count<2?parseInt(infoCount.innerHTML,10)+count:count
if(total>0){selectedBar.classList.add('show')
infoCount.innerHTML=total
infoText.innerHTML=total>1?'itens selecionados':'item selecionado'
if(headerCheckbox)headerCheckbox.parentNode.classList.add('is-checking')
if(total===tableCheckboxes.length){if(headerCheckbox){headerCheckbox.checked=true
headerCheckbox.parentNode.classList.remove('is-checking')}}}else{infoCount.innerHTML=0
if(headerCheckbox){headerCheckbox.checked=false
headerCheckbox.parentNode.classList.remove('is-checking')}
selectedBar.classList.remove('show')}}}
BRTable
class BRTag{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){if(this.component.classList.contains('interaction-select')){if(this.component.querySelector('input').getAttribute('checked')){this.component.classList.add('selected')}
this._setSelection()}
this._closeTag()
this._dismissTag()}
_setSelection(){const input=this.component.querySelector('input')
input.addEventListener('change',(event)=>{this._toggleSelection(input,event)})}
_toggleRadio(input){if(this.component.querySelector('[type="radio"')){const nameTag=input.getAttribute('name')
for(const tagRadio of window.document.querySelectorAll(`[name=${nameTag}]`)){this._removeCheck(tagRadio)}}}
_toggleSelection(input,event){event.preventDefault()
this._toggleRadio(input)
if(input.getAttribute('checked')){this._removeCheck(input)
return}
this._setCheck(input)}
_setCheck(input){input.setAttribute('checked','checked')
input.parentElement.classList.add('selected')}
_removeCheck(input){input.removeAttribute('checked')
input.parentElement.classList.remove('selected')}
_closeTag(){const closeBtn=this.component.querySelector('.br-button.close')
if(closeBtn){const brTag=closeBtn.closest('.br-tag')
brTag.addEventListener('click',()=>{closeBtn.closest('.br-tag').remove()})}}
_dismissTag(){this.component.querySelectorAll('[data-dismiss]').forEach((closeBtn)=>{closeBtn.addEventListener('click',()=>{const target=document.querySelector(`#${closeBtn.getAttribute('data-dismiss')}`)
if(target)target.remove()})})}}
const tagList=[]
for(const brTag of window.document.querySelectorAll('.br-tag')){tagList.push(new BRTag('br-tab',brTag))}
BRTag
class BRTextArea{constructor(name,component){this.name=name
this.component=component
this._setBehavior()
this._setKeyup()}
_setBehavior(){this.limit=this.component.querySelector('.limit')
this.current=this.component.querySelector('.current')
if(this.component.querySelector('textarea')!==null){this.maximum=this.component.querySelector('textarea').getAttribute('maxlength')}
this.characters=this.component.querySelector('.characters')
this.currentValue=this.component.querySelector('.current')}
_setKeyup(){this.component.addEventListener('keyup',()=>{this.updateAssist()})
this.component.querySelector('textarea').addEventListener('focus',()=>{this.updateAssist()})}
updateAssist(){const characterCount=this.component.querySelector('textarea').textLength
if(characterCount<=this.maximum&&!this.characters){if(this.limit){this.limit.innerHTML=''}
const limitemax=this.maximum-characterCount
const mensagemRestam=`Restam ${limitemax}caracteres `
const mensagemRestamInner=`<span aria-live="polite">Restam  <strong >${limitemax}</strong > caracteres</span>`
if(this.currentValue){this.currentValue.innerHTML=mensagemRestamInner}}
if(!this.characters&&this.limit){if(characterCount===0&&this.limit.innerHTML===''){this.limit.innerHTML=`<span aria-live="polite">Limite máximo de <strong >${this.maximum}</strong> caracteres</span>`
this.currentValue.innerHTML=''}}
else{if(this.characters){this.characters.innerHTML=`<span ><strong >${characterCount}</strong> caracteres digitados</span>`}}}}
BRTextArea
class BRTooltip{constructor(name,component){this.name=name
this.component=component
this.activator=component.previousSibling.previousSibling
const place=component.getAttribute('place')
const positions=['top','right','bottom','left']
this.popover=component.hasAttribute('popover')
this.notification=component.classList.contains('br-notification')
this.timer=component.getAttribute('timer')
const positionNotification=this.notification?'bottom':'top'
this.active=component.hasAttribute('active')
this.placement=positions.includes(place)?place:positionNotification
this.popperInstance=null
this.showEvents=['mouseenter','click','focus']
this.hideEvents=['mouseleave','blur']
this.closeTimer=null
this._create()
this._setBehavior()}
_setBehavior(){if(this.activator){this.showEvents.forEach((event)=>{this.activator.addEventListener(event,(otherEvent)=>{this._show(otherEvent)})})}
if(this.popover){const closeBtn=this.component.querySelector('.close')
closeBtn.addEventListener('click',(event)=>{this._hide(event,this.component)
this._toggleActivatorIcon()})}else{this.hideEvents.forEach((event)=>{this.activator.addEventListener(event,(otherEvent)=>{this._hide(otherEvent,this.component)})})}}
_create(){this._setLayout()
if(this.notification){this.component.setAttribute('notification','')
this.popperInstance=createPopper(this.activator,this.component,{modifiers:[{name:'offset',options:{offset:[0,10],},},{name:'preventOverflow',options:{altAxis:false,mainAxis:true,},},],placement:this.placement,strategy:'fixed',})}else{let ac=new DOMRect()
const tt=new DOMRect()
ac=this.activator.getBoundingClientRect()
const bw=document.body.clientWidth
if(this.placement==='right'){this.placement=ac.x+ac.width+tt.width>bw?'top':this.placement}
if(this.placement==='left'){this.placement=ac.x-tt.width>0?this.placement:'top'}
this.popperInstance=createPopper(this.activator,this.component,{modifiers:[{name:'offset',options:{offset:[0,8],},},{name:'preventOverflow',options:{altAxis:true,mainAxis:true,tether:false,},},],placement:this.placement,})}}
_show(event){this.component.style.display='unset'
this.component.setAttribute('data-show','')
this.component.style.zIndex=99
this._fixPosition()
this.component.style.visibility='visible'
if(this.timer){clearTimeout(this.closeTimer)
this.closeTimer=setTimeout(this._hide,this.timer,event,this.component)}}
_hide(event,component){component.removeAttribute('data-show')
component.style.zIndex=-1
component.style.visibility='hidden'
clearTimeout(component.closeTimer)}
_setLayout(){const arrow=document.createElement('div')
arrow.setAttribute('data-popper-arrow','')
if(this.component.querySelectorAll('.arrow').length<1){arrow.classList.add('arrow')}
this.component.appendChild(arrow)
if(this.popover){const close=document.createElement('button')
close.setAttribute('type','button')
close.classList.add('close')
const ico=document.createElement('i')
ico.classList.add('fas','fa-times')
close.appendChild(ico)
this.component.appendChild(close)}}
_toggleActivatorIcon(){const icon=this.activator.querySelector('button svg')
if(icon){icon.classList.toggle('fa-angle-down')
icon.classList.toggle('fa-angle-up')}
this.activator.toggleAttribute('active')}
_fixPosition(){if(this.notification){setTimeout(()=>{const ac=this.activator.getBoundingClientRect()
this.component.style=`position: fixed !important; top: ${
          ac.top + ac.height + 10
        }px !important; left: auto; right: 8px; display: unset; bottom: auto;`
this.component.querySelector('.arrow').style=`position: absolute; left: auto; right: ${
          document.body.clientWidth - ac.right + ac.width / 5
        }px !important;`},10)}}}
BRTooltip
class BRUpload{constructor(name,component,uploadFiles){this.name=name
this.component=component
this._inputElement=this.component.querySelector('.upload-input')
this._fileList=this.component.querySelector('.upload-list')
this._btnUpload=this.component.querySelector('.upload-button')
this._label=this.component.querySelector('label')
this._textHelp=document.querySelector('.text-base')
this._fileArray=[]
this._uploadFiles=uploadFiles
this._setBehavior()}
_setBehavior(){if(this._inputElement){const button=document.createElement('button')
button.className='upload-button'
button.setAttribute('type','button')
button.setAttribute('aria-hidden','true')
if(this._inputElement.getAttribute('multiple'))
button.innerHTML='<i class="fas fa-upload" aria-hidden="true"></i><span>Selecione o(s) arquivo(s)</span>'
else button.innerHTML='<i class="fas fa-upload" aria-hidden="true"></i><span>Selecione o arquivo</span>'
this.component.append(this._label)
this.component.append(this._inputElement)
this.component.appendChild(button)
this.component.append(this._fileList)
this._btnUpload=this.component.querySelector('.upload-button')
this._btnUpload.addEventListener('click',()=>{this._clickUpload()},false)
if(this.component.getAttribute('disabled')){button.setAttribute('disabled','disabled')
const message=document.createElement('span')
message.classList.add('feedback','warning','mt-1')
message.setAttribute('role','alert')
message.innerHTML='<i class="fas fa-exclamation-triangle" aria-hidden="true"></i>Upload desabilitado'
this.component.after(message)}
this._fileArray=Array.from(this._inputElement.files)
this._inputElement.addEventListener('change',(event)=>{this._handleFiles(event)},false)}
this._setDragAndDropBehavior()}
_setDragAndDropBehavior(){const uploadButton=this.component.querySelector('.upload-button');['dragenter','dragover','dragleave','drop'].forEach((eventName)=>{uploadButton.addEventListener(eventName,this._preventDefaults)});['dragenter','dragover'].forEach((eventName)=>{uploadButton.addEventListener(eventName,this._hightLight.bind(this))});['dragleave','drop'].forEach((eventName)=>{uploadButton.addEventListener(eventName,this._unHightLight.bind(this))})
uploadButton.addEventListener('drop',this._handleDrop.bind(this))}
_preventDefaults(event){event.preventDefault()
event.stopPropagation()}
_hightLight(){this.component.classList.add('dragging')}
_unHightLight(){this.component.classList.remove('dragging')}
_handleDrop(event){this.component.classList.remove('dragging')
const dt=event.dataTransfer
const{files}=dt
this._handleFiles(files)}
_isDisabled(event){const isDisabled=event.target.getAttribute('disabled')
if(isDisabled){return true}else{return false}}
_clickUpload(){this._inputElement.click()}
_removeMessage(){for(const message of this.component.querySelectorAll('.feedback')){message.parentNode.removeChild(message)
message.innerHTML=''}}
_removeStatus(){const remStatus=['danger','warning','info','success']
remStatus.forEach((el)=>{if(this.component.dataset.hasOwnProperty(el))this.component.removeAttribute(`data-${el}`)})}
_feedback(status,text){const icone=`<i class="fas fa-times-circle" aria-hidden="true"></i>${text}`
const dataStatus=`data-${status}`
const message=document.createElement('div')
message.classList.add('feedback',status,'mt-1')
message.setAttribute('role','alert')
message.setAttribute('aria-live','assertive')
message.setAttribute('aria-label',text)
switch(status){case'danger':message.innerHTML=icone
break
case'info':message.innerHTML=icone.replace('fa-times-circle','fa-info-circle')
break
case'success':message.innerHTML=icone.replace('fa-times-circle','fa-check-circle')
break
case'warning':message.innerHTML=icone.replace('fa-times-circle','fa-exclamation-triangle')
break
default:message.innerHTML=''}
this._removeStatus()
this.component.setAttribute(dataStatus,dataStatus)
this._fileList.before(message)}
_concatFiles(files){const newFiles=!files.length?Array.from(this._inputElement.files):Array.from(files)
this._fileArray=this._fileArray.concat(newFiles)}
_handleFiles(files){this._removeMessage()
if(!this._inputElement.multiple&&files.length>1){this._feedback('danger','É permitido o envio de somente 1 arquivo.')}else if(!this._inputElement.multiple&&this._fileArray.length>0){this._fileArray=[]
this._concatFiles(files)
this._updateFileList()
this._feedback('warning','O arquivo enviado anteriormente foi substituído')}else{this._concatFiles(files)
this._updateFileList()}}
_updateFileList(){this._removeStatus()
if(this.component.nextElementSibling===this._textHelp){this._textHelp.style.display='none'}
if(!this._fileArray.length){this._fileList.innerHTML=''
if(this.component.nextElementSibling===this._textHelp){this._textHelp.style.display=''}}else{this._fileList.innerHTML=''
for(let i=0;i<this._fileArray.length;i++){if('nowait'in this._fileArray[i]){if(this._fileArray[i].nowait){this._renderItem(i)}}else if(!this._fileArray[i].requested){this.uploadLoading()
this.uploadingFile(i)}}}}
uploadLoading(){const loading=document.createElement('div')
const carga=document.createElement('span')
carga.classList.add('cargas')
carga.innerText='Carregando...'
loading.setAttribute('sm','')
loading.classList.add('my-3')
loading.setAttribute('loading','')
loading.appendChild(carga)
this._fileList.appendChild(loading)}
uploadingFile(position){if(this._uploadFiles){this._fileArray[position].requested=true
this._uploadFiles().then(()=>{this._fileArray[position].nowait=true
this._updateFileList()})}}
_renderItem(position){const li=document.createElement('div')
li.className='br-item d-flex'
this._fileList.appendChild(li)
li.innerHTML=''
const name=document.createElement('div')
name.className='name'
li.appendChild(name)
this._fileList.appendChild(li)
const info=document.createElement('div')
info.className='content'
info.innerHTML=this._fileArray[position].name
this._alertAddItemA11y(info,this._fileArray[position].name)
const tooltip=document.createElement('div')
tooltip.classList.add('br-tooltip')
tooltip.setAttribute('role','tooltip')
tooltip.setAttribute('place','top')
tooltip.setAttribute('info','info')
const textTooltip=document.createElement('span')
textTooltip.classList.add('text')
textTooltip.setAttribute('role','tooltip')
textTooltip.innerHTML=this._fileArray[position].name
tooltip.appendChild(textTooltip)
li.appendChild(info)
li.appendChild(name)
li.appendChild(tooltip)
info.classList.add('text-primary-default','mr-auto')
const del=document.createElement('div')
del.className='support mr-n2'
const btndel=document.createElement('button')
const spanSize=document.createElement('span')
spanSize.className='mr-1'
spanSize.innerHTML=this._calcSize(this._fileArray[position].size)
del.appendChild(spanSize)
btndel.className='br-button'
btndel.type='button'
btndel.setAttribute('circle','')
btndel.setAttribute('aria-label','apagar arquivo'+this._fileArray[position].name)
btndel.addEventListener('click',(event)=>{this._removeFile(position,event)},false)
const img=document.createElement('i')
img.className='fa fa-trash'
btndel.appendChild(img)
del.appendChild(btndel)
li.appendChild(del)
this._fileArray[position].nowait=true
const tooltipList=[]
for(const brTooltip of this.component.querySelectorAll('.br-tooltip')){tooltipList.push(new BRTooltip('br-tooltip',brTooltip))}}
_alertAddItemA11y(elem,fileName){}
_calcSize(nBytes){if(nBytes<1024){return`${nBytes} bytes`}
let sOutput=''
let aMultiples=['KB','MB','GB','TB']
let nMultiple=0
let nApprox=nBytes/1024
while(nApprox>=1&&nMultiple<aMultiples.length){sOutput=`${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`
nApprox/=1024
nMultiple++}
return sOutput}
_removeFile(index,event){event.stopPropagation()
event.preventDefault()
this._removeStatus()
this._removeMessage()
this._fileArray.splice(index,1)
this._updateFileList()
if(this._inputElement.multiple)this._inputElement.files=this._updateFileListItems(this._fileArray)
if(!this._inputElement.multiple)this._inputElement.value=''}
_updateFileListItems(files){const fileInput=new ClipboardEvent('').clipboardData||new DataTransfer()
for(let i=0,len=files.length;i<len;i++)fileInput.items.add(files[i])
return fileInput.files}}
BRUpload
class BRWizard{constructor(name,component){this.name=name
this.component=component
this.DOMstrings={stepFormPanelClass:'wizard-panel',stepFormPanels:this.component.querySelectorAll('.wizard-panel'),stepNextBtnClass:'wizard-btn-next',stepPrevBtnClass:'wizard-btn-prev',stepsBar:this.component.querySelector('.wizard-progress'),stepsBarClass:'wizard-progress',stepsBtnClass:'wizard-progress-btn',stepsBtns:this.component.querySelectorAll('.wizard-progress-btn'),stepsForm:this.component.querySelector('.wizard-form'),}
this.removeAttributes=(elemSet,attrName)=>{elemSet.forEach((elem)=>{elem.removeAttribute(attrName)})}
this.setAttributes=(elemSet,attrName,value)=>{elemSet.forEach((elem)=>{elem.setAttribute(attrName,value)})}
this.findParent=(elem,parentClass)=>{let currentNode=elem
while(!currentNode.classList.contains(parentClass)){currentNode=currentNode.parentNode}
return currentNode}
this.getActiveStep=(elem)=>{return Array.from(this.DOMstrings.stepsBtns).indexOf(elem)}
this.setActiveStep=function(activeStepNum){this.removeAttributes(this.DOMstrings.stepsBtns,'active')
this.setAttributes(this.DOMstrings.stepsBtns,'aria-selected','false')
this.DOMstrings.stepsBtns.forEach((elem,index)=>{if(index===activeStepNum){elem.removeAttribute('disabled')
elem.setAttribute('active','')
elem.setAttribute('aria-selected','true')}})}
this.setFocusOnFirstElementPanel=(actualNumber)=>{if(actualNumber){const panelToFind=this.DOMstrings.stepFormPanels[actualNumber]
panelToFind.querySelectorAll('.wizard-panel-content *').forEach((item)=>{if(item.tabIndex>=0)item.focus()})}}
this.getActivePanel=()=>{let activePanel
this.DOMstrings.stepFormPanels.forEach((elem)=>{if(elem.hasAttribute('active')){activePanel=elem}})
return activePanel}
this.setActivePanel=(activePanelNum)=>{this.removeAttributes(this.DOMstrings.stepFormPanels,'active')
this.DOMstrings.stepFormPanels.forEach((elem,index)=>{if(index===activePanelNum){elem.setAttribute('active','')}})}
this.setStepsNum=()=>{this.DOMstrings.stepsBtns.forEach((elem,index)=>{elem.setAttribute('step',index+1)})}
this.setStep=(num)=>{const activeStep=num<=this.DOMstrings.stepsBtns.length?num-1:0
this.setActivePanel(activeStep)
this.setFocusOnFirstElementPanel(activeStep)
this.setActiveStep(activeStep)}
this.collapseSteps=()=>{this.component.setAttribute('collapsed','')}
this.expandSteps=()=>{this.component.removeAttribute('collapsed')}
this._setBehavior()}
_setBehavior(){this.DOMstrings.stepsBar.addEventListener('click',(e)=>{const eventTarget=e.target
if(!eventTarget.classList.contains(`${this.DOMstrings.stepsBtnClass}`)){e.target.parentNode.click()
return}
const activeStep=this.getActiveStep(eventTarget)
this.setActiveStep(activeStep)
this.setActivePanel(activeStep)
this.setFocusOnFirstElementPanel(activeStep)})
this.DOMstrings.stepsForm.addEventListener('click',(e)=>{const eventTarget=e.target
if(!(eventTarget.classList.contains(`${this.DOMstrings.stepPrevBtnClass}`)||eventTarget.classList.contains(`${this.DOMstrings.stepNextBtnClass}`))){return}
const activePanel=this.findParent(eventTarget,`${this.DOMstrings.stepFormPanelClass}`)
let activePanelNum=Array.from(this.DOMstrings.stepFormPanels).indexOf(activePanel)
if(eventTarget.classList.contains(`${this.DOMstrings.stepPrevBtnClass}`)){activePanelNum-=1
activePanel.style.left='1%'}else{activePanelNum+=1
activePanel.style.left='-1%'}
this.setActiveStep(activePanelNum)
this.setActivePanel(activePanelNum)
this.setFocusOnFirstElementPanel(activePanelNum)})
this.setStepsNum()
if(this.component.hasAttribute('step')){this.setStep(this.component.getAttribute('step'))}
if(this.component.hasAttribute('scroll')&&!this.component.hasAttribute('vertical')){const stepsWidth=Math.round(100/this.DOMstrings.stepsBtns.length)-0.5
this.DOMstrings.stepsBar.style.gridTemplateColumns=`repeat(auto-fit, minmax(100px, ${stepsWidth}% ))`}
const dispatcher=new Swipe(this.DOMstrings.stepsBar)
if(this.component.hasAttribute('vertical')){dispatcher.on('SWIPE_LEFT',()=>{this.collapseSteps()})
dispatcher.on('SWIPE_RIGHT',()=>{this.expandSteps()})
this.DOMstrings.stepsForm.ontouchstart=()=>{this.collapseSteps()}}else{this.DOMstrings.stepsBar.ontouchstart=()=>{this.expandSteps()}
this.DOMstrings.stepsForm.ontouchstart=()=>{this.collapseSteps()}}}}
BRWizard
class Accordion extends Collapse{constructor({trigger,iconToShow='fa-chevron-down',iconToHide='fa-chevron-up',useIcons=true}){super({iconToHide,iconToShow,trigger,useIcons})
this._setUp()}
_setUp(){super._setUp()
this._setPriorityVisibility()}
_setPriorityVisibility(){for(let i=0;i<this._getGroup().length;i+=1){if(this._getGroup()[i].dataset.visible==='true'){this._synchronizeAccordion(this._getGroup()[i])
break}}}
_handleTriggerKeyPress(event){super._handleTriggerKeyPress(event)}
_setVisibilityStatus(){super._setVisibilityStatus()}
_getGroup(){return document.querySelectorAll(`[data-group="${this.trigger.getAttribute('data-group')}"]`)}
_handleTriggerChangeBehavior(event){if(!event.currentTarget.hasAttribute('data-sync')){this._synchronizeAccordion(event.currentTarget)}else{event.currentTarget.removeAttribute('data-sync')}}
_synchronizeAccordion(currentTrigger){this._getGroup().forEach((trigger)=>{if(trigger!==currentTrigger&&trigger.dataset.visible==='true'){trigger.setAttribute('data-sync','')
trigger.click()}})}
setBehavior(){super.setBehavior()
this.trigger.addEventListener('change',this._handleTriggerChangeBehavior.bind(this))}}
class Scrim{constructor({trigger,closeElement='',escEnable=false,limitTabKey=false}){this.trigger=trigger
this.escEnable=escEnable
this.limitTabKey=limitTabKey
this.closeElement=this.elementHideScrim(closeElement)
if(this.trigger){this.setBehavior()}}
showScrim(){if(this.trigger){this.trigger.classList.add('active')
if(this.trigger.children.length>0){const firstChild=this.trigger.children[0]
firstChild.setAttribute('aria-modal','true')
firstChild.setAttribute('role','dialog')
firstChild.setAttribute('data-visible','true')}
this._setFocusFirstElement()
if(this.limitTabKey){this.limitTabNavigation()}}}
_setFocusFirstElement(){const internalElments=this._getInternalElementsFocusable()
if(internalElments.length>0){internalElments[0].focus()}}
limitTabNavigation(){document.addEventListener('focusin',function(e){let elementfocus=e.target
var isInternalElemnt=false
const internalElments=this._getInternalElementsFocusable()
internalElments.forEach(function(element){if(elementfocus==element){isInternalElemnt=true}})
if(!isInternalElemnt){e.preventDefault()
this._setFocusFirstElement()}}.bind(this))}
_getInternalElementsFocusable(){return Array.from(this.trigger.querySelectorAll('*')).filter((element)=>{return element.tabIndex>=0})}
hideScrim(){this.trigger.classList.remove('active')
this.trigger.setAttribute('data-visible',false)}
elementHideScrim(element){this.hideElements(element)
this.addEscapeListener()}
hideElements(element){if(element){this.trigger.querySelectorAll([element]).forEach((element)=>{this.closeElement=element
this._setCloseClick()})}
this.trigger.querySelectorAll('[data-dismiss=true]').forEach((item)=>{this.closeElement=item
this._setCloseClick()})}
addEscapeListener(){if(this.escEnable){document.addEventListener('keydown',(event)=>{if(event.key==='Escape'){this.hideScrim()}})}}
_setCloseClick(){this.closeElement.addEventListener('click',()=>{this.hideScrim()})}
setBehavior(){this.trigger.addEventListener('click',(event)=>{if(event.target.getAttribute('data-scrim')){this.hideScrim()}})}}
class AccordionExample{constructor(element){this.element=element
this._setBehavior()}
_setBehavior(){this._setAccordionBehavior()}
_setAccordionBehavior(){this.element.querySelectorAll('[data-toggle="accordion"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const accordion=new Accordion(config)
accordion.setBehavior()})}}
AccordionExample
class CheckgroupExample{constructor(element){this.element=element
this._setBehavior()}
_setBehavior(){this._setCheckgroupBehavior()}
_setCheckgroupBehavior(){this.element.querySelectorAll('input[type="checkbox"][data-parent]').forEach((trigger)=>{const checkgroup=new Checkgroup(trigger)
checkgroup.setBehavior()})}}
CheckgroupExample
class CollapseExample{constructor(element){this.element=element
this._setBehavior()}
_setBehavior(){this._setCollapseBehavior()}
_setCollapseBehavior(){this.element.querySelectorAll('[data-toggle="collapse"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const collapse=new Collapse(config)
collapse.setBehavior()})}}
CollapseExample
class DropdownExample{constructor(element){this.element=element
this._setBehavior()}
_setBehavior(){this._setDropdownBehavior()}
_setDropdownBehavior(){this.element.querySelectorAll('[data-toggle="dropdown"]').forEach((trigger)=>{const config={iconToHide:'fa-chevron-up',iconToShow:'fa-chevron-down',trigger,useIcons:true,}
const dropdown=new Dropdown(config)
dropdown.setBehavior()})}}
DropdownExample
class ScrimExample{constructor({arrayConfigScrim=[]}){this.arrayConfigScrim=arrayConfigScrim
this._setBehavior()}
_setBehavior(){this._setScrimBehavior()}
_setScrimBehavior(){this.arrayConfigScrim.forEach((item)=>{for(const buttonActionScrim of window.document.querySelectorAll(item.trigger_open_scrim)){buttonActionScrim.addEventListener('click',()=>{this.openScrimExample(item)})}})}
openScrimExample(item){const scrscrim=window.document.querySelector(item.scrimid)
const scrimfoco=new Scrim({closeElement:item.trigger_close_scrim,trigger:scrscrim,escEnable:true,limitTabKey:true,})
scrimfoco.showScrim()}}
ScrimExample
class TooltipExample{constructor(element){this.element=element}
_setBehavior(){this.TooltipExampleList=[]}
run(){this.TooltipExampleList=[]
window.document.querySelectorAll('[data-tooltip-text]:not(.notification-tooltip)').forEach((TooltipExample)=>{const texttooltip=TooltipExample.getAttribute('data-tooltip-text')
const config={activator:TooltipExample,place:'top',textTooltip:texttooltip,}
this.TooltipExampleList.push(new Tooltip(config))})
document.querySelectorAll('[data-tooltip-target]').forEach((trigger)=>{const targets=document.querySelectorAll(trigger.getAttribute('data-tooltip-target'))
targets.forEach((target)=>{const place=target.getAttribute('place')!==null?target.getAttribute('place'):'left'
const config={activator:trigger,component:target,place:place,type:'warning',}
new Tooltip(config)})})}}
TooltipExample
class Behavior{initInstanceAll(){this._initInstanceAccordionExample()
this._initInstanceCheckGroupExemple()
this._initInstanceCollapseExample()
this._initInstanceDropdownExample()
this._initInstanceTooltipExample()
this._initInstanceScrimExample()}
_initInstanceCollapseExample(){const collapseExampleList=[]
window.document.querySelectorAll('.collapse-example').forEach((collapseExample)=>{collapseExampleList.push(new CollapseExample(collapseExample))})}
_initInstanceAccordionExample(){const accordionExampleList=[]
window.document.querySelectorAll('.accordion-example').forEach((accordionExample)=>{accordionExampleList.push(new AccordionExample(accordionExample))})}
_initInstanceCheckGroupExemple(){const checkgroupExampleList=[]
window.document.querySelectorAll('.checkgroup-example').forEach((checkgroupExample)=>{checkgroupExampleList.push(new CheckgroupExample(checkgroupExample))})}
_initInstanceDropdownExample(){const dropdownExampleList=[]
window.document.querySelectorAll('.dropdown-example').forEach((dropdownExample)=>{dropdownExampleList.push(new DropdownExample(dropdownExample))})}
_initInstanceScrimExample(){const initializeScrim=[{trigger_open_scrim:'#idbuttonscrimutil',scrimid:'#scrimutilexample',},{trigger_open_scrim:'#idbuttonscrimutil1',trigger_close_scrim:'#scrimfechar',scrimid:'#scrimutilfocobig',},]
const scrimExample=new ScrimExample({arrayConfigScrim:initializeScrim})}
_initInstanceTooltipExample(){const tooltipExample=new TooltipExample()
tooltipExample.run()}}
class BRAvatar{constructor(name,component){this.name=name
this.component=component
this._setBehavior()}
_setBehavior(){this._setDropdownBehavior()}
_setDropdownBehavior(){if(this.component.parentElement.dataset.toggle==='dropdown'){const config={iconToHide:'fa-caret-up',iconToShow:'fa-caret-down',trigger:this.component.parentElement,useIcons:true,}
const dropdown=new Dropdown(config)
dropdown.setBehavior()}}}
BRAvatar
const jsonData=`[
  {
    "lang": "pt-br",
    "allOptOut": true,
    "acceptButton": "Aceitar",
    "optOutButton": "Definir Cookies",
    "optInButton": "Ver Política de Cookies",
    "infoText": "Minim pariatur amet laboris sint consectetur enim do voluptate",
    "mainTitle": "Exercitation et proident",
    "lastUpdate": "01/02/2021",
    "entryText": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus aspernatur neque culpa nisi alias. Voluptatem dicta nihil magnam, cumque voluptatum animi distinctio molestias recusandae ipsam, sapiente unde error repellendus quibusdam?",
    "selectAll": false,
    "allAlertMessage": "Ao desativar qualquer Cookie, sua navegação poderá ser comprometida",
    "closeLabel": "fechar tela de seleção de cookies",
    "lastUpdateLabel": "Última atualização",
    "cookieGroupsLabel": "Classes de cookies",
    "selectAllLabel": "Selecionar tudo",
    "unselectAllLabel": "Desselecionar tudo",
    "selectAllGroupLabel": "Selecionar toda classe",
    "unselectAllGroupLabel": "Desselecionar toda classe",
    "onLabel": "Ligado",
    "offLabel": "Desligado",
    "alwaysActiveLabel": "Sempre ativo",
    "cookieNameLabel": "Cookies",
    "expiresLabel": "Vencimento",
    "domainLabel": "Domínio",
    "enterpriseLabel": "Empresa",
    "purposeLabel": "Finalidade",
    "descriptionLabel": "Descrição",
    "cookieGroups": [
      {
        "groupId": "necessarios",
        "groupName": "Estritamente necessários",
        "groupOptOut": false,
        "groupSelected": false,
        "groupAlertMessage": "Alerta group 0",
        "groupText": "Descrição do Grupo de Cookies.",
        "cookieList": [
          {
            "cookieId": "necessario-1",
            "cookieOptOut": false,
            "cookieSelected": false,
            "alertMessage": "Alerta group 0 - cookie 0",
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          },
          {
            "cookieId": "necessario-2",
            "cookieOptOut": false,
            "cookieSelected": false,
            "alertMessage": "Alerta group 0 - cookie 1",
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          }
        ]
      },
      {
        "groupId": "desempenho",
        "groupName": "Desempenho, funcionamento, marketing e personalização",
        "groupOptOut": true,
        "groupSelected": true,
        "groupAlertMessage": "Ao desativar um Cookie do grupo Desempenho, o desempenho do site pode ser comprometido.",
        "groupText": "Descrição do Grupo de Cookies.",
        "cookieList": [
          {
            "cookieId": "desempenho-2",
            "cookieOptOut": true,
            "cookieSelected": false,
            "alertMessage": "Ao desativar o Cookie desempenho 2, o desempenho do site pode ser comprometido.",
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          },
          {
            "cookieId": "desempenho-3",
            "cookieOptOut": true,
            "cookieSelected": false,
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          }
        ]
      },
      {
        "groupId": "experiencia",
        "groupName": "Experiência do site",
        "groupOptOut": true,
        "groupSelected": false,
        "groupAlertMessage": "Ao desativar algum Cookie do Grupo Experiência do site, sua navegação ficará comprometida.",
        "groupText": "Descrição do Grupo de Cookies.",
        "cookieList": [
          {
            "cookieId": "experiencia-1",
            "cookieOptOut": true,
            "cookieSelected": false,
            "alertMessage": "Ao desativar o Cookie experiencia-1, sua navegação ficará comprometida.",
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          },
          {
            "cookieId": "experiencia-2",
            "cookieOptOut": true,
            "cookieSelected": false,
            "alertMessage": "Ao desativar o Cookie experiencia-1, sua navegação ficará comprometida.",
            "cookieName": "optimizelyEndUserId",
            "expires": "30 minutos",
            "domain": "serpro.gov.br",
            "enterprise": "Serpro",
            "purpose": "Autorização",
            "description": "Descrição do Cookie"
          }
        ]
      }
    ],
    "noteTitle": "Aviso sobre cookies",
    "noteList": [
      {
        "question": "O que são cookies?",
        "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius distinctio rerum ad, maxime alias vel minima, asperiores sequi eveniet non optio officiis quaerat reiciendis quae odio explicabo ut debitis?"
      },
      {
        "question": "Durabilidade?",
        "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius distinctio rerum ad, maxime alias vel minima, asperiores sequi eveniet non optio officiis quaerat reiciendis quae odio explicabo ut debitis?"
      },
      {
        "question": "Proveniência?",
        "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius distinctio rerum ad, maxime alias vel minima, asperiores sequi eveniet non optio officiis quaerat reiciendis quae odio explicabo ut debitis?"
      },
      {
        "question": "Finalidade?",
        "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eius distinctio rerum ad, maxime alias vel minima, asperiores sequi eveniet non optio officiis quaerat reiciendis quae odio explicabo ut debitis?"
      }
    ],
    "links": [
      {
        "name": "Declaração de Conformidade com os Princípios de Proteção de Dados",
        "url": "#"
      }
    ]
  }
]`
jsonData
const inputData=['Afeganistão','África do Sul','Albânia','Alemanha','Andorra','Angola','Anguilla','Antártida','Antígua e Barbuda','Antilhas Holandesas','Arábia Saudita','Argélia','Argentina','Armênia','Aruba','Austrália','Áustria','Azerbaijão','Bahamas','Bahrein','Bangladesh','Barbados','Belarus','Bélgica','Belize','Benin','Bermudas','Bolívia','Bósnia-Herzegóvina','Botsuana','Brasil','Brunei','Bulgária','Burkina Fasso','Burundi','Butão','Cabo Verde','Camarões','Camboja','Canadá','Cazaquistão','Chade','Chile','China','Chipre','Cingapura','Colômbia','Congo','Coréia do Norte','Coréia do Sul','Costa do Marfim','Costa Rica','Croácia (Hrvatska)','Cuba','Dinamarca','Djibuti','Dominica','Egito','El Salvador','Emirados Árabes Unidos','Equador','Eritréia','Eslováquia','Eslovênia','Espanha','Estados Unidos','Estônia','Etiópia','Fiji','Filipinas','Finlândia','França','Gabão','Gâmbia','Gana','Geórgia','Gibraltar','Grã-Bretanha (Reino Unido, UK)','Granada','Grécia','Groelândia','Guadalupe','Guam (Território dos Estados Unidos)','Guatemala','Guernsey','Guiana','Guiana Francesa','Guiné','Guiné Equatorial','Guiné-Bissau','Haiti','Holanda','Honduras','Hong Kong','Hungria','Iêmen','Ilha Bouvet (Território da Noruega)','Ilha do Homem','Ilha Natal','Ilha Pitcairn','Ilha Reunião','Ilhas Aland','Ilhas Cayman','Ilhas Cocos','Ilhas Comores','Ilhas Cook','Ilhas Faroes','Ilhas Falkland (Malvinas)','Ilhas Geórgia do Sul e Sandwich do Sul','Ilhas Heard e McDonald (Território da Austrália)','Ilhas Marianas do Norte','Ilhas Marshall','Ilhas Menores dos Estados Unidos','Ilhas Norfolk','Ilhas Seychelles','Ilhas Solomão','Ilhas Svalbard e Jan Mayen','Ilhas Tokelau','Ilhas Turks e Caicos','Ilhas Virgens (Estados Unidos)','Ilhas Virgens (Inglaterra)','Ilhas Wallis e Futuna','índia','Indonésia','Irã','Iraque','Irlanda','Islândia','Israel','Itália','Jamaica','Japão','Jersey','Jordânia','Kênia','Kiribati','Kuait','Laos','Látvia','Lesoto','Líbano','Libéria','Líbia','Liechtenstein','Lituânia','Luxemburgo','Macau','Macedônia (República Yugoslava)','Madagascar','Malásia','Malaui','Maldivas','Mali','Malta','Marrocos','Martinica','Maurício','Mauritânia','Mayotte','México','Micronésia','Moçambique','Moldova','Mônaco','Mongólia','Montenegro','Montserrat','Myanma','Namíbia','Nauru','Nepal','Nicarágua','Níger','Nigéria','Niue','Noruega','Nova Caledônia','Nova Zelândia','Omã','Palau','Panamá','Papua-Nova Guiné','Paquistão','Paraguai','Peru','Polinésia Francesa','Polônia','Porto Rico','Portugal','Qatar','Quirguistão','República Centro-Africana','República Democrática do Congo','República Dominicana','República Tcheca','Romênia','Ruanda','Rússia (antiga URSS) - Federação Russa','Saara Ocidental','Saint Vincente e Granadinas','Samoa Americana','Samoa Ocidental','San Marino','Santa Helena','Santa Lúcia','São Bartolomeu','São Cristóvão e Névis','São Martim','São Tomé e Príncipe','Senegal','Serra Leoa','Sérvia','Síria','Somália','Sri Lanka','St. Pierre and Miquelon','Suazilândia','Sudão','Suécia','Suíça','Suriname','Tadjiquistão','Tailândia','Taiwan','Tanzânia','Território Britânico do Oceano índico','Territórios do Sul da França','Territórios Palestinos Ocupados','Timor Leste','Togo','Tonga','Trinidad and Tobago','Tunísia','Turcomenistão','Turquia','Tuvalu','Ucrânia','Uganda','Uruguai','Uzbequistão','Vanuatu','Vaticano','Venezuela','Vietnã','Zâmbia','Zimbábue',]
inputData
class Globals{initInstanceAll(){this.initInstanceAccordion()
this.initInstanceAvatar()
this.initInstanceBreadcrumb()
this.initInstanceCard()
this.initInstanceCarousel()
this.initInstanceCheckbox()
this.initInstanceCookiebar()
this.initInstanceDateTimePicker()
this.initInstanceFooter()
this.initInstanceInput()
this.initInstanceHeader()
this.initInstanceItem()
this.initInstanceList()
this.initInstanceMenu()
this.initInstanceMessage()
this.initInstanceModal()
this.initInstanceNotification()
this.initInstancePagination()
this.initInstanceScrim()
this.initInstanceSelect()
this.initInstanceStep()
this.initInstanceTable()
this.initInstanceTabs()
this.initInstanceTextarea()
this.initInstanceUpload()
this.initInstanceWizard()
this.initInstanceTooltip()}
initInstanceAccordion(){const accordionList=[]
for(const brAccordion of window.document.querySelectorAll('.br-accordion')){accordionList.push(new BRAccordion('br-accordion',brAccordion))}}
initInstanceAvatar(){const avatarList=[]
for(const brAvatar of window.document.querySelectorAll('.br-avatar')){avatarList.push(new BRAvatar('br-avatar',brAvatar))}}
initInstanceBreadcrumb(){const breadcrumbList=[]
for(const brBreadcrumb of window.document.querySelectorAll('.br-breadcrumb')){breadcrumbList.push(new BRBreadcrumb('br-breadcrumb',brBreadcrumb))}}
initInstanceDateTimePicker(){const datetimepickerList=[]
for(const brDateTimePicker of window.document.querySelectorAll('.br-datetimepicker')){datetimepickerList.push(new BRDateTimePicker('br-datetimepicker',brDateTimePicker,{}))}}
initInstanceHeader(){const headerList=[]
for(const brHeader of window.document.querySelectorAll('.br-header')){headerList.push(new BRHeader('br-header',brHeader))}}
initInstanceFooter(){const listFooter=[]
for(const brFooter of window.document.querySelectorAll('.br-footer')){listFooter.push(new BRFooter('br-footer',brFooter))}}
initInstanceInput(){const inputList=[]
for(const brInput of window.document.querySelectorAll('.br-input')){inputList.push(new BRInput('br-input',brInput))}
for(const brInput of inputList){brInput.component.querySelectorAll('input.search-autocomplete').forEach(()=>{brInput.setAutocompleteData(inputData)})}}
initInstanceItem(){const itemList=[]
for(const brItem of window.document.querySelectorAll('.br-item')){itemList.push(new BRItem('br-item',brItem))}}
initInstanceList(){const listList=[]
for(const brList of window.document.querySelectorAll('.br-list:not([data-sub])')){listList.push(new BRList('br-list',brList))}}
initInstanceMenu(){const menuList=[]
for(const brMenu of window.document.querySelectorAll('.br-menu')){menuList.push(new BRMenu('br-menu',brMenu))}}
initInstanceMessage(){const alertList=[]
for(const brMessage of window.document.querySelectorAll('.br-message')){alertList.push(new BRMessage('br-message',brMessage))}}
initInstanceModal(){const buttonActivateModalScrim=window.document.querySelector('#buttonactivatemodal')
if(buttonActivateModalScrim){const scrscrim=window.document.querySelector('#scrimutilexamplemodal')
const scrimfoco=new Scrim({trigger:scrscrim,escEnable:true,limitTabKey:true,})
buttonActivateModalScrim.addEventListener('click',(event)=>{scrimfoco.showScrim()})}}
initInstanceNotification(){const notificationList=[]
for(const brNotification of window.document.querySelectorAll('.br-notification')){notificationList.push(new BRNotification('br-notification',brNotification))}}
initInstancePagination(){const paginationList=[]
for(const brPagination of window.document.querySelectorAll('.br-pagination')){paginationList.push(new BRPagination('br-pagination',brPagination))}}
initInstanceScrim(){const scrimList=[]
for(const brScrim of window.document.querySelectorAll('.br-scrim')){scrimList.push(new BRScrim('br-scrim',brScrim))}
for(const buttonBloco1 of window.document.querySelectorAll('.bloco1 button')){buttonBloco1.addEventListener('click',()=>{for(const brScrim of scrimList){brScrim.showScrim()}})}}
initInstanceSelect(){const selectList=[]
for(const brSelect of window.document.querySelectorAll('.br-select')){const brselect=new BRSelect('br-select',brSelect)
selectList.push(brselect)}}
initInstanceTable(){const tableList=[]
for(const[index,brTable]of window.document.querySelectorAll('.br-table').entries()){tableList.push(new BRTable('br-table',brTable,index))}}
initInstanceTag(){const tagList=[]
for(const brTag of window.document.querySelectorAll('.br-tag')){tagList.push(new BRTag('br-tag',brTag))}}
initInstanceTabs(){const abasList=[]
for(const brTab of window.document.querySelectorAll('.br-tab')){abasList.push(new BRTab('br-tab',brTab))}}
initInstanceTooltip(){const tooltipList=[]
for(const brTooltip of window.document.querySelectorAll('.br-tooltip')){tooltipList.push(new BRTooltip('br-tooltip',brTooltip))}}
initInstanceUpload(){const uploadList=[]
function uploadTimeout(){return new Promise((resolve)=>{return setTimeout(resolve,500)})}
for(const brUpload of window.document.querySelectorAll('.br-upload')){uploadList.push(new BRUpload('br-upload',brUpload,uploadTimeout))}}
initInstanceStep(){const stepList=[]
for(const brStep of window.document.querySelectorAll('.br-step')){stepList.push(new BRStep('br-step',brStep))}}
initInstanceCard(){const listCard=[]
for(const brCard of window.document.querySelectorAll('.br-card')){listCard.push(new BRCard('br-card',brCard))}}
initInstanceCarousel(){const carouselList=[]
for(const brCarousel of window.document.querySelectorAll('.br-carousel')){carouselList.push(new BRCarousel('br-carousel',brCarousel))}}
initInstanceCheckbox(){const checkboxList=[]
for(const brCheckbox of window.document.querySelectorAll('.br-checkbox')){checkboxList.push(new BRCheckbox('br-checkbox',brCheckbox))}}
initInstanceCookiebar(){const cookiebarList=[]
for(const brCookiebar of window.document.querySelectorAll('.br-cookiebar')){const params={component:brCookiebar,json:jsonData,lang:'pt-br',mode:'default',name:'br-cookiebar',}
cookiebarList.push(new BRCookiebar(params))}}
initInstanceTextarea(){const textareaList=[]
for(const brTextarea of window.document.querySelectorAll('.br-textarea')){textareaList.push(new BRTextarea('br-textarea',brTextarea))}}
initInstanceWizard(){const wizardList=[]
for(const brWizard of window.document.querySelectorAll('.br-wizard')){wizardList.push(new BRWizard('br-wizard',brWizard))}}}
const globals=new Globals()
globals.initInstanceAll()
const behavior=new Behavior()
behavior.initInstanceAll();