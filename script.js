var monthsInformations = [
{name:"January",day:31},
{name:"February",day:28},
{name:"March",day:31},
{name:"April",day:30},
{name:"May",day:31},
{name:"June",day:30},
{name:"July",day:31},
{name:"August",day:31},
{name:"September",day:30},
{name:"October",day:31},
{name:"November",day:30},
{name:"December",day:31}
]
var week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const data = new Date() 

var chosedWeek = data.getDay()
var chosedMonth = data.getMonth()
var chosedYear = data.getFullYear()

const actuallyDay = data.getDate()
const actuallyWeek = data.getDay()
const actuallyMonth = data.getMonth()
const actuallyYear = data.getFullYear()

const usedDaysOfMonthDiv = document.getElementsByClassName('days-field')[0]
const usedDaysOfWeekDiv = document.getElementsByClassName('week-field')[0]
const usedMonthDiv = document.getElementsByClassName('month-informations')[0]
const usedYearDiv = document.getElementsByClassName('year-informations')[0]

const dayText = document.querySelector('.day-information')
const weekText = document.querySelector('.week-information')
const yearText = document.querySelector('.year-information')

var startedWeekDay
var completedChosedData = `${actuallyYear}-${actuallyMonth}-${actuallyDay}`
const today = `${actuallyYear}-${actuallyMonth}-${actuallyDay}`

var btnBackYear = document.getElementsByClassName('back-year')[0]
var btnNextYear = document.getElementsByClassName('next-year'[0])

const span = document.getElementsByClassName('close')[0]
const modal = document.getElementsByClassName('modal')[0]
const btnOpenModal = document.getElementsByClassName('create-events-informations')[0]

const spanInformations = document.querySelector('.close-informations')
const modalInformations = document.querySelector('.modal-informations')
const btnOpenModalInformations = document.querySelector('.all-events-informations')

const spanEdit = document.querySelector('.close-edit')
const modalEdit = document.querySelector('.modal-edit')
const btnCloseEdit = document.querySelector('.close-edit-event')
const btnSaveEdit = document.querySelector('.save-event-edit')

var seeAllInformationsDiv = document.querySelector('.modal-informations-content')

var individualElementDiv = document.querySelector('.events-informations')

document.querySelector('.save-event').addEventListener('click',()=>{
    let title = document.querySelector('.title')
    if(title.value == "" ) {
        title.style.borderColor = 'red'
        alert('Please put the title')
    }
    else {
        createEvent()
        seeAllEventsInformations()
        modal.style.display = 'none'
    }
})

document.querySelector('.close-btn').addEventListener('click',()=>{modal.style.display = 'none'})

yearText.textContent = actuallyYear

btnBackYear = document.querySelector('.back-year')
btnNextYear = document.querySelector('.next-year')

btnBackToToday = document.querySelector('.back-to-today')

btnBackYear.addEventListener('click',()=>{
    chosedYear-=1 
    
    yearText.textContent  = chosedYear
    chosedYear % 4 == 0 &&  chosedYear % 100 != 0 ||  chosedYear % 400 == 0 ? monthsInformations[1].day = 29: monthsInformations[1].day = 28
    if( chosedYear < actuallyYear) {
        document.querySelector('.create-events').style.display = 'none' 
        document.querySelector('.events').style.display = 'none'
    }
    else {
        document.querySelector('.create-events').style.display = 'block'
        document.querySelector('.events').style.display = 'block'
    }
    buildingCalendarInformations()
})

btnNextYear.addEventListener('click',()=>{
    chosedYear+=1
    yearText.textContent  = chosedYear
    chosedYear % 4 == 0 &&  chosedYear % 100 != 0 ||  chosedYear % 400 == 0 ? monthsInformations[1].day = 29: monthsInformations[1].day = 28
    if( chosedYear < actuallyYear) {
        document.querySelector('.create-events').style.display = 'none' 
        document.querySelector('.events').style.display = 'none'
    }
    else {
        document.querySelector('.create-events').style.display = 'block'
        document.querySelector('.events').style.display = 'block'
    }
    buildingCalendarInformations()
})

btnBackToToday.addEventListener('click',()=>{
    chosedMonth = actuallyMonth
    chosedYear = chosedYear
    buildingCalendarInformations()
})

for(var i=0;i<week.length;i++) {
    const pos = i
    var newSpan = document.createElement('span')
    var newSpanText = document.createTextNode(week[i])
    newSpan.appendChild(newSpanText)
    newSpan.setAttribute('id',`span-${week[pos]}`)
    newSpan.setAttribute('class','week-days')
    usedDaysOfWeekDiv.appendChild(newSpan)
}

for(var i=0;i<monthsInformations.length;i++) {
    const pos = i
    
    var newSpan = document.createElement('span')
    var newSpanText = document.createTextNode(monthsInformations[pos].name)
    newSpan.setAttribute('class','month-names')

    newSpan.appendChild(newSpanText)
    usedMonthDiv.appendChild(newSpan)
    
    newSpan.addEventListener('click',()=>{
        chosedMonth = pos
       buildingCalendarInformations()
    })

    newSpan.addEventListener('click',e=>{
        colorSelected(e)
    })

    if(pos == actuallyMonth) {
        newSpan.style.color = "#cacaca"
    }
}

pullEventInformations(completedChosedData)
chosedMonth = parseInt(chosedMonth)

for(var i= 0;i<monthsInformations[chosedMonth].day;i++) {
    const dayNumber = i + 1
    var newButton = document.createElement('button')
    var newContentButton = document.createTextNode(dayNumber)

    newButton.addEventListener('click',()=>{showInformations(dayNumber,chosedMonth,chosedYear)})
    newButton.addEventListener('click',()=>{
        completedChosedData = `${chosedYear}-${chosedMonth}-${dayNumber}`
    })
    newButton.addEventListener('click',()=>{pullEventInformations(completedChosedData)})
    
    newButton.setAttribute('id',`${chosedYear}-${chosedMonth}-${dayNumber}`)
    newButton.setAttribute('class','days-number')
    
    newButton.appendChild(newContentButton)
    usedDaysOfMonthDiv.appendChild(newButton)
}
window.onload = highlightToday(),highlightEvents()


btnOpenModal.addEventListener('click',function() {
    modal.style.display = 'block'
})

span.addEventListener('click',function() { 
    modal.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


btnOpenModalInformations.addEventListener('click',function() {
    modalInformations.style.display = 'block'
    seeAllEventsInformations()
})

window.onclick = function(event) {
    if (event.target == modalInformations) {
      if(modalInformations.style.display == 'none') {
            spanInformations.style.display = 'none'
            modalInformations.style.display = "none";
      }
    }
}
window.onclick = function(event) { 
    if(event.target == modalEdit) {
        modalInformations.style.display = 'block'
        modalEdit.style.display = 'none'
    }
}


spanInformations.addEventListener('click',function() { 
    modalInformations.style.display = 'none'
})

spanEdit.addEventListener('click',function() { 
    modalInformations.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == modalEdit) {
      modalEdit.style.display = "none";
    }
}

btnCloseEdit.addEventListener('click',function() {
    modalInformations.style.display = "blocl"
    modalEdit.style.display = "none";
})

showInformations(actuallyDay,actuallyMonth,actuallyYear)
keepEventsUptaded()
rememberEvents()

function buildingCalendarInformations() {
    var days = document.querySelectorAll(".days-number")
    for(var i=0;i<days.length;i++) {
        days[i].remove()
    }
    
    for(var i = 0;i<monthsInformations[chosedMonth].day;i++) {
        const pos = i + 1
        var newBtn = document.createElement('button')
        var newBtnText = document.createTextNode(pos)

        newBtn.setAttribute('id',`${chosedYear}-${chosedMonth}-${pos}`)
        newBtn.setAttribute('class','days-number')

        newBtn.appendChild(newBtnText)
        usedDaysOfMonthDiv.appendChild(newBtn)

        newBtn.addEventListener('click',()=>{showInformations(pos,chosedMonth,chosedYear)})
        newBtn.addEventListener('click',()=>{
            completedChosedData = `${chosedYear}-${chosedMonth}-${pos}`
        })
        newBtn.addEventListener('click',()=>{pullEventInformations(completedChosedData)})
    }

    if(actuallyYear != chosedYear || actuallyMonth != chosedMonth) {
        btnBackToToday.style.display = 'block'
    }

    highlightToday()
    highlightEvents()
}

function showInformations(day,month,year) {
    dayText.textContent = day
    var dataSpefic = new Date(year,month,day)
    weekText.textContent = week[dataSpefic.getDay()].toUpperCase()
    yearText.textContent = year
}

function createEvent() {

    var titleEvent = document.querySelector('.title').value
    var colorEvent = document.querySelector('.color-event').value
    var peopleEvent = document.querySelector('.people').value
    var locationEvent = document.querySelector('.location').value
    var descriptionEvent = document.querySelector('.description') .value

    var informationsRegistred = JSON.parse(localStorage.getItem(completedChosedData))
    
    if (informationsRegistred == null) {
        var informationsDefined = []
        informationsDefined.push({
            title:titleEvent,
            color:colorEvent,
            people: peopleEvent,
            location: locationEvent,
            description: descriptionEvent
        });
        localStorage.setItem(completedChosedData,JSON.stringify(informationsDefined))
        console.log(informationsDefined)
        return
    }
    informationsRegistred.push({
        title:titleEvent,
        color:colorEvent,
        people: peopleEvent,
        location: locationEvent,
        description: descriptionEvent
    });
    localStorage.setItem(completedChosedData, JSON.stringify(informationsRegistred));
    
}

function pullEventInformations(e) {
    var eventInformations = JSON.parse(localStorage.getItem(e))
    var newLi = document.createElement('li')
    var element = document.getElementsByClassName(`${completedChosedData}-task`)[0]
    var individualtasks = document.getElementsByClassName('individual-tasks')
   for(var i = 0;i<individualtasks.length;i++) {
       individualtasks[i].remove()
   }

    if(eventInformations === null) {
        if(document.getElementById('empty-schedule') == undefined) {
            newLi.appendChild(document.createTextNode("There is not events in your schedule"))
            newLi.setAttribute('id','empty-schedule')
            newLi.setAttribute('class','individual-tasks')
            individualElementDiv.appendChild(newLi)
        }
    }
    else {
        if( typeof(element) == 'undefined' && element == null) {
            var title ;
            eventInformations[0] == null?title = eventInformations.title:title = eventInformations[0].title
            newLi.appendChild(document.createTextNode(title))
            newLi.setAttribute('class','individual-tasks')
            newLi.setAttribute('id',`${completedChosedData}-task`)
            individualElementDiv.appendChild(newLi)
            if(eventInformations.length !== undefined) {
                if(eventInformations.length > 1) {
                    var newLiMore = document.createElement('li')
                    newLiMore.appendChild(document.createTextNode(`More ${eventInformations.length -1} events`))
                    individualElementDiv.appendChild(newLiMore)
                }
            }
        }
    }
}

function seeAllEventsInformations() {
    if(document.querySelector('.general-information') != null) {
        document.querySelector('.general-information').remove()
        return
    }
    var allEventsInformations = localStorage.getItem(completedChosedData)
    
    if(allEventsInformations == null) {
        var newDiv = document.createElement('div')
        newDiv.setAttribute('class','general-information')
        seeAllInformationsDiv.appendChild(newDiv)

        var newPTitle = document.createElement('p')
        newPTitle.setAttribute('class','title-modal-informations')
        newDiv.appendChild(newPTitle.appendChild(document.createTextNode('There isnt nothing information')))
        return false
    }
    allEventsInformations = JSON.parse(allEventsInformations)
    if(allEventsInformations.length == undefined) {
        var arrayInfos = [allEventsInformations]
        allEventsInformations = arrayInfos
    }
    var newDiv = document.createElement('div')
    newDiv.setAttribute('class','general-information')
    seeAllInformationsDiv.appendChild(newDiv)

    var newH1Title = document.createElement('h1')
    newH1Title.appendChild(document.createTextNode(''))
    
    for(var i =0;i< allEventsInformations.length;i++) {
        const pos = i
        var newDivIndividual = document.createElement('div')
        newDivIndividual.setAttribute('class','individual-events')
        newDiv.appendChild(newDivIndividual)

        var btnEdit = document.createElement('button')
        var btnDelete = document.createElement('button')
        
        btnEdit.appendChild(document.createTextNode('Edit'))
        btnDelete.appendChild(document.createTextNode('Delete'))

        btnEdit.setAttribute('class','btn-edit')
        btnDelete.setAttribute('class','btn-delete')

        var newPTitle = document.createElement('p')
        newPTitle.setAttribute('class','title-modal-informations')
        newDivIndividual.appendChild(newPTitle.appendChild(document.createTextNode(allEventsInformations[i].title)))

        newDivIndividual.appendChild(btnEdit)
        newDivIndividual.appendChild(btnDelete)

        var newPColor = document.createElement('p')
        newPColor.appendChild(document.createTextNode(`color:`))
        newDivIndividual.appendChild(newPColor)

        btnDelete.addEventListener('click',()=>{deleteEvent(completedChosedData,pos)})
        btnEdit.addEventListener('click',()=>{modalEdit.style.disply ='none'})
        btnEdit.addEventListener('click',()=>{openEditInformation(completedChosedData,pos)})

        
        if(allEventsInformations[i].people.length !=0) {
            var newPPeople = document.createElement('p')
            newPPeople.appendChild(document.createTextNode(`people:${allEventsInformations[i].people}`))
            newDivIndividual.appendChild(newPPeople)
        }

        if(allEventsInformations[i].location.length !=0) {
            var newPLocation = document.createElement('p')
            newPLocation.appendChild(document.createTextNode(`location:${allEventsInformations[i].location}`))
            newDivIndividual.appendChild(newPLocation)
        }

        if(allEventsInformations[i].description.length !=0) {
            var newPdescription = document.createElement('p')
            newPdescription.appendChild(document.createTextNode(`description:${allEventsInformations[i].description}`))
            newDivIndividual.appendChild(newPdescription)
        }

    }
}

function deleteEvent(key,position) {
    var eventDeleted = JSON.parse(localStorage.getItem(key))
    eventDeleted.splice(position, 1)
    localStorage.removeItem(key)
    console.log(eventDeleted)
    localStorage.setItem(key,JSON.stringify(eventDeleted))
    if(localStorage.getItem(key) == []) {localStorage.removeItem(key)}
    seeAllEventsInformations()
}

function openEditInformation(key,position) {
    modalEdit.style.display = 'block'
    var chosedEditInformations = JSON.parse(localStorage.getItem(key))
    var selected = chosedEditInformations[position]

    let title = document.querySelector('.title-edit-event')
    let people = document.querySelector('.people-event-edit')
    let location = document.querySelector('.location-event-edit')
    let description = document.querySelector('.description-event-edit')
    let color = document.querySelector('.color-edit-event')

    title.value = selected.title
    color.value = selected.color
    people.value = selected.people
    location.value = selected.location
    description.value = selected.description

    var allEventInformations = [title,color,people,location,description]

    btnSaveEdit('.save-event-edit')

    btnSaveEdit.addEventListener('click',()=>{
        for(var i=0;i<allEventInformations.length;i++) {
            if(i<2 && allEventInformations[i]== "") {
                return alert('There is empty field')
            }
                if(allEventInformations[i] == undefined) {
                    allEventInformations[i] = ""
                }
        }
        modalEdit.style.display = 'none'
        modalInformations.style.display = 'block'
       editEvent(key,position)
    })
}

function editEvent(key,position) {
    
    let titleEdit= document.querySelector('.title-edit-event')
    let peopleEdit = document.querySelector('.people-event-edit')
    let locationEdit = document.querySelector('.location-event-edit')
    let descriptionEdit = document.querySelector('.description-event-edit')

    var eventEdit = JSON.parse(localStorage.getItem(key))
    var newEventChosed = {
        title:titleEdit.value,
        people: peopleEdit.value,
        location: locationEdit.value,
        description: descriptionEdit.value
    }

    eventEdit.splice(position, 1,newEventChosed)
    localStorage.removeItem(key)
    localStorage.setItem(key,JSON.stringify(eventEdit))
    
}

function highlightEvents() {
    for (i=0; i<localStorage.length; i++)  {  
        var key = localStorage.key(i);  
        var days = document.getElementsByClassName('days-number')
        for(var j=0;j<days.length;j++) {
            if(days[j].id == key) {
                days[j].style.backgroundColor = JSON.parse(localStorage.getItem(key))[0].color
            }
        }
    }
}

function rememberEvents() {
    for(var i=0;i<localStorage.length;i++) {
        var key = localStorage.key(i)
        if(key == today) {
            var event = JSON.parse(localStorage.getItem(key))
            if(event == null) return 
            var alertText
            if(event.length == undefined) {
                return alertText = `You have a 1 event today:${event.title}`
            }
            alertText = `You have a ${event.length} events today :`
            event.forEach(e =>{
                alertText+=`${e.title},`
            })
            //alert(alertText)
        }
    }
}

function keepEventsUptaded() {
    for (var i=0;i<localStorage.length;i++) {
        var key = localStorage.key(i)
        var date = key.split('-')
        
        var year = parseInt(date[0])
        var month = parseInt(date[1])
        var day = parseInt(date[2])
        
        if(day <actuallyDay && month <= actuallyMonth && year <= actuallyYear) {
            // localStorage.removeItem(key)
        }
    }
}

function highlightToday() {
    var today = document.getElementById(`${actuallyYear}-${actuallyMonth}-${actuallyDay}`)
    if( today == undefined) {
        return false
    }
    else {
        today.style.backgroundColor = "bisque"
    }
}

function colorSelected(element) {
    var elements = document.querySelectorAll('.month-names')
    for(var i=0; i<elements.length; i++) {
        if(elements[i] == element.target) {
            element.target.style.color ="#cacaca"
            element.target.style.transition = ".1s"
        }
        else {
            elements[i].style.color= "#f8f8f8"
            elements[i].style = ".month-names:hover {color: #cacaca;}"
        }
    }
}