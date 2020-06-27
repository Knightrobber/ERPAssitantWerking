var userName;
var ID;
function signout(){
window.location.href= "login.html";
}
firebase.auth().onAuthStateChanged(function(user){
userName = user.email
})
function saveToDatabase(){
username = userName.split("@");
ID = username[0]
tempCourses = [];

courseName = document.getElementById("courseNameForDatabase").value
console.log(courseName)
pushCourse(courseName);
if(courseName==null)
{
window.alert("Course Name hasn't been entered");
}
MondayStart = document.getElementById("MondayStart").value
MondayEnd = document.getElementById("MondayEnd").value
MondayStartTut = document.getElementById("MondayStartTut").value
MondayEndTut = document.getElementById("MondayEndTut").value
MondayStartLab = document.getElementById("MondayStartLab").value
MondayEndLab = document.getElementById("MondayEndLab").value

TuesdayStart = document.getElementById("TuesdayStart").value
TuesdayEnd = document.getElementById("TuesdayEnd").value
TuesdayStartTut = document.getElementById("TuesdayStartTut").value
TuesdayEndTut = document.getElementById("TuesdayEndTut").value
TuesdayStartLab = document.getElementById("TuesdayStartLab").value
TuesdayEndLab = document.getElementById("TuesdayEndLab").value

WednesdayStart = document.getElementById("WednesdayStart").value
WednesdayEnd = document.getElementById("WednesdayEnd").value
WednesdayStartTut = document.getElementById("WednesdayStartTut").value
WednesdayEndTut = document.getElementById("WednesdayEndTut").value
WednesdayStartLab = document.getElementById("WednesdayStartLab").value
WednesdayEndLab = document.getElementById("WednesdayEndLab").value

ThursdayStart = document.getElementById("ThursdayStart").value
ThursdayEnd = document.getElementById("ThursdayEnd").value
ThursdayStartTut = document.getElementById("ThursdayStartTut").value
ThursdayEndTut = document.getElementById("ThursdayEndTut").value
ThursdayStartLab = document.getElementById("ThursdayStartLab").value
ThursdayEndLab = document.getElementById("ThursdayEndLab").value

FridayStart = document.getElementById("FridayStart").value
FridayEnd = document.getElementById("FridayEnd").value
FridayStartTut = document.getElementById("FridayStartTut").value
FridayEndTut = document.getElementById("FridayEndTut").value
FridayStartLab = document.getElementById("FridayStartLab").value
FridayEndLab = document.getElementById("FridayEndLab").value
var Monday = [];
var Tuesday = [];
var Wednesday = [];
var Thursday = [];
var Friday = [];

if(true){
if(MondayStart!="time" && MondayEnd!="time"){
Monday =[MondayStart + "-" + MondayEnd] 
}

if(MondayStartTut!="time" && MondayEndTut!="time"){
Monday.push(MondayStartTut + "-" + MondayEndTut)
}

if(MondayStartLab!="time" && MondayEndLab!="time"){
Monday.push(MondayStartLab + "-" + MondayEndLab)
}
if(MondayStart=="time" && MondayEnd=="time" && MondayStartTut=="time" && MondayEndTut=="time" && MondayStartTut=="time" && MondayEndTut=="time")
Monday.push(null);
if(TuesdayStart!="time" && TuesdayEnd!="time"){
    Tuesday =[TuesdayStart + "-" + TuesdayEnd] 
}

if(TuesdayStartTut!="time" && TuesdayEndTut!="time"){
    Tuesday.push(TuesdayStartTut + "-" + TuesdayEndTut)
}

if(TuesdayStartLab!="time" && TuesdayEndLab!="time"){
    Tuesday.push(TuesdayStartLab + "-" + TuesdayEndLab)
}
if(TuesdayStart=="time" && TuesdayEnd=="time" && TuesdayStartTut=="time" && TuesdayEndTut=="time" && TuesdayStartTut=="time" && TuesdayEndTut=="time")
Tuesday.push(null);
    if(WednesdayStart!="time" && WednesdayEnd!="time"){
        Wednesday =[WednesdayStart + "-" + WednesdayEnd] 
    }
    
    if(WednesdayStartTut!="time" && WednesdayEndTut!="time"){
        Wednesday.push(WednesdayStartTut + "-" + WednesdayEndTut)
    }
    
    if(WednesdayStartLab!="time" && WednesdayEndLab!="time"){
        Wednesday.push(WednesdayStartLab + "-" + WednesdayEndLab)
    }
    if(WednesdayStart=="time" && WednesdayEnd=="time" && WednesdayStartTut=="time" && WednesdayEndTut=="time" && WednesdayStartTut=="time" && WednesdayEndTut=="time")
Wednesday.push(null);
        if(ThursdayStart!="time" && ThursdayEnd!="time"){
            Thursday =[ThursdayStart + "-" + ThursdayEnd] 
        }
        
        if(ThursdayStartTut!="time" && ThursdayEndTut!="time"){
            Thursday.push(ThursdayStartTut + "-" + ThursdayEndTut)
        }
        
        if(ThursdayStartLab!="time" && ThursdayEndLab!="time"){
            Thursday.push(ThursdayStartLab + "-" + ThursdayEndLab)
        }
        if(ThursdayStart=="time" && ThursdayEnd=="time" && ThursdayStartTut=="time" && ThursdayEndTut=="time" && ThursdayStartTut=="time" && ThursdayEndTut=="time")
Thursday.push(null);
            if(FridayStart!="time" && FridayEnd!="time"){
                Friday =[FridayStart + "-" + FridayEnd] 
            }
            
            if(FridayStartTut!="time" && FridayEndTut!="time"){
                Friday.push(FridayStartTut + "-" + FridayEndTut)
            }
            
            if(FridayStartLab!="time" && FridayEndLab!="time"){
                Friday.push(FridayStartLab + "-" + FridayEndLab)
            }
            if(FridayStart=="time" && FridayEnd=="time" && FridayStartTut=="time" && FridayEndTut=="time" && FridayStartTut=="time" && FridayEndTut=="time")
Friday.push(null);
}
firebase.database().ref("/Teacher/" + ID + "/" + courseName).set({
Monday:Monday,
Tuesday:Tuesday,
Wednesday:Wednesday,
Thursday:Thursday,
Friday:Friday
})
}
function start(){
    var date = new Date().getTime();
    console.log(date)
user = userName.split('@');
user = user[0];
courseName = document.getElementById("courseName").value
dayOfTheWeek = document.getElementById("dayOfTheWeek").value
 
var promise = runAllStudentsPromise(courseName);
var freeTimesArray = [];
var overallFreeTime = []
promise.then(function(allStudents){

findAllFreeTimes(allStudents,dayOfTheWeek).then(function(freeTimes){
freeTimesArray = freeTimes;
console.log("free times of all students " + freeTimesArray);
var teacherProm = runTeacherFreeTimePromise(user,dayOfTheWeek)
teacherProm.then(function(teachersFreeTime){
 console.log("free times of teacher " +  teachersFreeTime)
 overallFreeTime = cmpFreeTimes(freeTimesArray,teachersFreeTime)
}).then(function(){
 console.log("overall free time "  + overallFreeTime)
 temp = joinSlots(overallFreeTime);
 freeSlotDisplay = document.getElementById("freeSlotDisplay");
 freeSlotDisplay.value = temp;
var date2 = new Date().getTime();
console.log(date2-date)
 console.log(temp);
})
})

})

}

function runAllStudentsPromise(courseName){
return new Promise(function(resolve,reject){
 var studentsEnrolled = []


firebase.database().ref("/Courses").once('value',function(snap){
snap.forEach(function(subSnap){
 courses = subSnap.val().courses;
for(i=0;i<courses.length;++i){
if(courses[i]==courseName){
studentsEnrolled.push(subSnap.key);
break;}
}
})

}).then(function(){
console.log(studentsEnrolled);
resolve(studentsEnrolled)
})
})
}

function runFreeTimePromise(user,dayOfTheWeek){
return new Promise(function(resolve,reject){

var timings = [];
var freeTimings = []


if(dayOfTheWeek == "Monday"){  

firebase.database().ref("/Students/" + user).once("value",function(snapshot){

snapshot.forEach(function(snapshot){ // for each child (each course in this case)
if(snapshot.val().Monday!=null) // all timings on monday(lecture lab and tute) are pushed into timings array
timings.push(snapshot.val().Monday);
})
}).then(function(){

freeTimings = findFreeTime(timings); // gives free timings of monday
resolve(freeTimings);
})
}
else if(dayOfTheWeek == "Tuesday"){  
firebase.database().ref("/Students/" + user).once("value",function(snapshot){
 snapshot.forEach(function(snapshot){
 if(snapshot.val().Tuesday!=null)
 timings.push(snapshot.val().Tuesday);
})
}).then(function(){

console.log("busy times of " + user + " " + timings);
 freeTimings = findFreeTime(timings);
 console.log(" free timings of " + user + " " + freeTimings);
resolve(freeTimings);
})
}
else if(dayOfTheWeek == "Wednesday"){  
firebase.database().ref("/Students/" + user).once("value",function(snapshot){
 snapshot.forEach(function(snapshot){
 if(snapshot.val().Wednesday!=null)
 timings.push(snapshot.val().Wednesday);
})
}).then(function(){
 freeTimings = findFreeTime(timings);
resolve(freeTimings);
})
}
else if(dayOfTheWeek == "Thursday"){  
firebase.database().ref("/Students/" + user).once("value",function(snapshot){
 snapshot.forEach(function(snapshot){
 if(snapshot.val().Thursday!=null)
 timings.push(snapshot.val().Thursday);
})
}).then(function(){
 console.log(timings);
 freeTimings = findFreeTime(timings);
resolve(freeTimings);
})
}
else if(dayOfTheWeek == "Friday"){  
firebase.database().ref("/Students/" + user).once("value",function(snapshot){
 snapshot.forEach(function(snapshot){
 if(snapshot.val().Friday!=null)
 timings.push(snapshot.val().Friday);
})
}).then(function(){
 freeTimings = findFreeTime(timings);
resolve(freeTimings);
})
}


});
}

function findFreeTime(timings){
TotalSlots = 20;
FreeTimings = [];

BusyTimings = BreakTimings(timings); // breaks all the timings of the user into 1/2 hour slots

start = "8:00"; end = "8:30";
for(i=0;i<=20;++i){ // 20 strings of the form "8:00-8:30", "8:30-9:00" are compared with all the 1/2 hour slots of the user
tempSlotString = start + "-" + end; // form a string to compare 
busyTimingsCount = 0;
for(j=0;j<BusyTimings.length;++j){
if(tempSlotString!=BusyTimings[j]) 
++busyTimingsCount;
else
break;
}
if(busyTimingsCount==BusyTimings.length){ // if the 1/2 hour slot doesn't match wiht any of users slots its pushed into a freetime array
FreeTimings.push(tempSlotString)
}

start = newTime(start); // increments start time for looping

end = newTime(end);  // increments end time for looping


}

return FreeTimings;
}

function BreakTimings(classTimings){

noOfClasses = classTimings.length;
brokenTimings = [];

for(i=0;i<noOfClasses;++i){
if(classTimings[i].length ==1){
time = classTimings[i][0].split("-");
start = time[0];
end = time[1];
while(start!=end)
{
 prevStart = start;
 tempSplit = start.split(':');
 if(tempSplit[1]=="00"){
     tempSplit[1] = "30"
    start = tempSplit[0] +":" + tempSplit[1];
    tempString = prevStart+"-"+start;
    brokenTimings.push(tempString);
    }
    else if(tempSplit[1]=="30"){
        tempSplit[1] = "00";
        tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
       start = tempSplit[0] +":" + tempSplit[1];
       tempString = prevStart+"-"+start;
       brokenTimings.push(tempString);
       }
}
}
else if(classTimings[i].length>1)
{
for(j=0;j<classTimings[i].length;++j){
    time = classTimings[i][j].split("-");
    start = time[0];
    end = time[1];
    while(start!=end)
    {
        prevStart = start;
        tempSplit = start.split(':');
        if(tempSplit[1]=="00"){
            tempSplit[1] = "30"
           start = tempSplit[0] +":" + tempSplit[1];
           tempString = prevStart+"-"+start;
           brokenTimings.push(tempString);
           }
           else if(tempSplit[1]=="30"){
               tempSplit[1] = "00";
               tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
              start = tempSplit[0] +":" + tempSplit[1];
              tempString = prevStart+"-"+start;
              brokenTimings.push(tempString);
              }
    }
}
}
}
return brokenTimings;
}

function newTime(time){

tempSplit = time.split(':');
if(tempSplit[1]=="00"){
tempSplit[1] = "30"
timeNew = tempSplit[0] +":" + tempSplit[1];
return timeNew;
}
else if(tempSplit[1]=="30"){
tempSplit[1] = "00";
tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
timeNew= tempSplit[0] +":" + tempSplit[1];
return timeNew;
}
return
}

function cmpFreeTimes(freeTimeArray1,freeTimeArray2){
var newFreeTimeArray = []
for(i=0;i<freeTimeArray1.length;++i){
for(j=0;j<freeTimeArray2.length;++j){
     if(freeTimeArray1[i]==freeTimeArray2[j]){
         newFreeTimeArray.push(freeTimeArray2[j])
         break;
     }
}
}
return newFreeTimeArray;


}

function pushCourse(courseName){

firebase.database().ref("/TeachersCourses/" + ID).once('value').then(function(snap){
   var i=0;
   if(snap.val()==null)
   {tempArray = [courseName];
       firebase.database().ref("/TeachersCourses/" + ID).set({
           courses:tempArray
       })
   }
   else{
       tempArray = [];
       firebase.database().ref("/TeachersCourses/"+ID).once('value').then(function(snap){
           tempArray = snap.val().courses;
           for(i=0;i<tempArray.length;++i){
               if(tempArray[i]==courseName)
               break;
           }
           if(i==tempArray.length){
           tempArray.push(courseName)
           firebase.database().ref("/TeachersCourses/"+ID).set({
               courses:tempArray
           })
       }
       else
       firebase.database().ref("/TeachersCourses/"+ID).set({
           courses:tempArray
       })
       })
   }
  
})
}

function runTeacherFreeTimePromise(user,dayOfTheWeek){
return new Promise(function(resolve,reject){

var timings = [];
var freeTimings = []


if(dayOfTheWeek == "Monday"){  

firebase.database().ref("/Teacher/" + user).once("value",function(snapshot){
 
 snapshot.forEach(function(snapshot){ // for each child (each course in this case)
 if(snapshot.val().Monday!=null) // all timings on monday(lecture lab and tute) are pushed into timings array
 timings.push(snapshot.val().Monday);
})
}).then(function(){
 
 freeTimings = findFreeTime(timings); // gives free timings of monday
 resolve(freeTimings);
})
}
else if(dayOfTheWeek == "Tuesday"){  
 firebase.database().ref("/Teacher/" + user).once("value",function(snapshot){
     snapshot.forEach(function(snapshot){
     if(snapshot.val().Tuesday!=null)
     timings.push(snapshot.val().Tuesday);
 })
 }).then(function(){
     freeTimings = findFreeTime(timings);
 resolve(freeTimings);
 })
}
else if(dayOfTheWeek == "Wednesday"){  
 firebase.database().ref("/Teacher/" + user).once("value",function(snapshot){
     snapshot.forEach(function(snapshot){
     if(snapshot.val().Wednesday!=null)
     timings.push(snapshot.val().Wednesday);
 })
 }).then(function(){
     freeTimings = findFreeTime(timings);
 resolve(freeTimings);
 })
}
else if(dayOfTheWeek == "Thursday"){  
 firebase.database().ref("/Teacher/" + user).once("value",function(snapshot){
     snapshot.forEach(function(snapshot){
     if(snapshot.val().Thursday!=null)
     timings.push(snapshot.val().Thursday);
 })
 }).then(function(){
     freeTimings = findFreeTime(timings);
 resolve(freeTimings);
 })
}
else if(dayOfTheWeek == "Friday"){  
 firebase.database().ref("/Teacher/" + user).once("value",function(snapshot){
     snapshot.forEach(function(snapshot){
     if(snapshot.val().Friday!=null)
     timings.push(snapshot.val().Friday);
 })
 }).then(function(){
     freeTimings = findFreeTime(timings);
 resolve(freeTimings);
 })
}


});
}

function findAllFreeTimes(allStudents,dayOfTheWeek){
var FreeTimesArray =[];
return new Promise(function(resolve,reject){
    if(allStudents!=null){
    runFreeTimePromise(allStudents[0],dayOfTheWeek).then(function(freeTimes){
       FreeTimesArray = freeTimes;
       console.log(allStudents.length);
       var p=0;
       for(i=1;i<allStudents.length;++i){
        console.log(i);
           runFreeTimePromise(allStudents[i],dayOfTheWeek).then(function(tempFreeTime){
               ++p;
            FreeTimesArray = cmpFreeTimes(FreeTimesArray,tempFreeTime);
            if(p==allStudents.length-1)
            resolve(FreeTimesArray);
           })
       }
       if(allStudents.length ==1){
           runFreeTimePromise(allStudents[0],dayOfTheWeek).then(function(freeTime){
               resolve(freeTime);
           })
       }
    })
}
else
{
    window.alert("No Studetns enrolled in the Course ");
    resolve();
}
})
}
function joinSlots(data){
output=[];
let prev = data[0];
for (let i = 1; i < data.length; i++) {
    curr = data[i];
    mer = slotMerge(prev, curr);
    if (mer) {
      output.push(mer);
      prev = i + 1 < data.length ? data[i + 1] : undefined;
      i += 1;
    } else {
      output.push(prev);
      prev = curr;
    }
  }
  if (prev) {
    output.push(prev);
  }
  return output;
}
function slotMerge(str1,str2){
    [start1, end1] = str1.split("-");
    [start2, end2] = str2.split("-");
    return end1 === start2 ? `${start1}-${end2}` : "";
}