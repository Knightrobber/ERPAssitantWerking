
var courseName;
var ID;
var date1;
firebase.auth().onAuthStateChanged(function(user){
    var userName;
    if(user){
    userName = user.email
    userName = userName.split("@");
    ID = userName[0];
    }
    else
    console.log("user not found")
    if(user)
    {
        makeVisible = document.getElementById("main");
        makeVisible.style.display = "block"    
        courses = [];
        firebase.database().ref("/Courses/"  + ID).once('value').then(function(snap){
            courses = snap.val().courses;
            coursesDisplay = document.getElementById("coursesDisplay");
            coursesDisplay.value = courses
        })
}


 })


function logout(){
    window.location.href= "login.html";
}

function MoveToAttendance(){
    window.location.href = "Attendance.html";
}


function saveToDatabase(){    
tempCourses = [];
date1 = new Date().getTime();
console.log(date1);
courseName = document.getElementById("courseName").value
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

    
startDate= document.getElementById("startDate").value;
endDate = document.getElementById("endDate").value;
if(startDate){
startDate= new Date(startDate);
month = startDate.getMonth();
day=startDate.getDate();
year=startDate.getYear() + 1900;
Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
startDate = Months[month] + " " + day + " " + year;
}
else
startDate = new Date("January 2 2020");

endDate=document.getElementById("endDate");
endDate = getSelectedOption(endDate);
endDate = endDate.value;
if(endDate == "Select duration")
{
    window.alert("You haven't seleted end date for the course");
    return;
}
else if(endDate=="MidSem")
endDate = new Date("February 22 2020");
else if(endDate=="EndSem")
endDate = new Date("April 29 2020");




firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/Dates").set({
    StartDate:new Date(startDate).getTime(),
    EndDate:new Date(endDate).getTime()
}).then(function(){
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/Dates").once('value').then(function(snap){
        console.log(new Date(snap.val().StartDate).getDay());
        console.log(new Date(snap.val().EndDate).getDay());
    })
})


var Monday = [];
var Tuesday = [];
var Wednesday = [];
var Thursday = [];
var Friday = [];
var MondayO = new Object();
var TuesdayO = new Object();
var WednesdayO = new Object();
var ThursdayO = new Object();
var FridayO = new Object();
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
firebase.database().ref("/Students/" + ID + "/" + courseName).set({
    Monday:Monday,
    Tuesday:Tuesday,
    Wednesday:Wednesday,
    Thursday:Thursday,
    Friday:Friday
})

if(true){
if(MondayStart!="time" && MondayEnd!="time"){
    MondayO.Lecture = MondayStart + "-" + MondayEnd;
    
}

if(MondayStartTut!="time" && MondayEndTut!="time"){
        MondayO.Tute = MondayStartTut + "-" + MondayEndTut
}

if(MondayStartLab!="time" && MondayEndLab!="time"){
        MondayO.Lab = MondayStartLab + "-" + MondayEndLab
}
if(TuesdayStart!="time" && TuesdayEnd!="time"){
    TuesdayO.Lecture = TuesdayStart + "-" + TuesdayEnd;
    
}

if(TuesdayStartTut!="time" && TuesdayEndTut!="time"){
        TuesdayO.Tute = TuesdayStartTut + "-" + TuesdayEndTut
}

if(TuesdayStartLab!="time" && TuesdayEndLab!="time"){
        TuesdayO.Lab = TuesdayStartLab + "-" + TuesdayEndLab
}
if(WednesdayStart!="time" && WednesdayEnd!="time"){
    WednesdayO.Lecture = WednesdayStart + "-" + WednesdayEnd;
    
}

if(WednesdayStartTut!="time" && WednesdayEndTut!="time"){
        WednesdayO.Tute = WednesdayStartTut + "-" + WednesdayEndTut
}

if(WednesdayStartLab!="time" && WednesdayEndLab!="time"){
        WednesdayO.Lab = WednesdayStartLab + "-" + WednesdayEndLab
}
if(ThursdayStart!="time" && ThursdayEnd!="time"){
    ThursdayO.Lecture = ThursdayStart + "-" + ThursdayEnd;
    
}

if(ThursdayStartTut!="time" && ThursdayEndTut!="time"){
        ThursdayO.Tute = ThursdayStartTut + "-" + ThursdayEndTut
}

if(ThursdayStartLab!="time" && ThursdayEndLab!="time"){
        ThursdayO.Lab = ThursdayStartLab + "-" + ThursdayEndLab
}
if(FridayStart!="time" && FridayEnd!="time"){
    FridayO.Lecture = FridayStart + "-" + FridayEnd;
    
}

if(FridayStartTut!="time" && FridayEndTut!="time"){
        FridayO.Tute = FridayStartTut + "-" + FridayEndTut
}

if(FridayStartLab!="time" && FridayEndLab!="time"){
        FridayO.Lab = FridayStartLab + "-" + FridayEndLab
}

}
firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).set({
    Monday:MondayO,
    Tuesday:TuesdayO,
    Wednesday:WednesdayO,
    Thursday:ThursdayO,
    Friday:FridayO
}).then(function(){
    countLLT(ID,courseName,startDate,endDate).then(function(){
        missableClasses(ID,courseName)
      })
})









}
function  getSelectedOption(endDate){
    var opt;
for ( var i = 0;i<endDate.options.length; i++ ) {
    opt = endDate.options[i];
    if ( opt.selected === true ) {
        break;
    }
}
return opt;
}

function countLLT(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){
    var classTypesCount = new Object();
    countLectures(ID,courseName,startDate,endDate).then(function(lectureCount){
        classTypesCount.lectures=lectureCount;
    }).then(function(){
        countLabs(ID,courseName,startDate,endDate).then(function(labCount){
            classTypesCount.labs=labCount;
        }).then(function(){
            countTutes(ID,courseName,startDate,endDate).then(function(tuteCount){
                classTypesCount.tutes = tuteCount;
            }).then(function(){
                firebase.database().ref("/Attendance/" + ID +  "/" + courseName + "/" + "TotalClasses").set({
                  Lecture:classTypesCount.lectures,
                  Lab:classTypesCount.labs,
                  Tute:classTypesCount.tutes
                }).then(function(){
                    console.log("count resolved")
                    resolve();
                })
            })
        })
    })
})
}
function countLectures(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Lecture!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
       if(!startDate)
       startDate = new Date("January 2 2020");
        if(!endDate)
        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        lectures = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() )
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                        
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++lectures;
                        }
                    }
                    
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        
        resolve(lectures);
    })

});
    

}
function countLabs(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Lab!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
        if(!startDate)
        startDate = new Date("January 2 2020");
        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        labs = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() )
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                        
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++labs;
                        }
                    }
                    
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        resolve(labs)
    })
    
})
}
function countTutes(ID,courseName,startDate,endDate){
    return new Promise(function(resolve,reject){

    
    daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    days = [];
    firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            if(subSnap.val().Tute!=null){
                days.push(subSnap.key)
            }
        })
    }).then(function(){
        if(!startDate)
        startDate = new Date("January 2 2020");
        endDate = new Date("April 29 2020");
        
        holidays = setHolidays();
        Tutes = 0;
        while(new Date(startDate).getTime()!=new Date(endDate).getTime() )
        {   startDay = convertToDay(startDate)
            i=0;
            if(startDay!="Sunday"){
                for(i=0;i<holidays.length;++i){
                    if(new Date(startDate).getTime() == holidays[i].getTime())
                    {
                       
                    break;
                    }
                }
                if(i==holidays.length)
                {
                    for(j=0;j<days.length;++j){
                        if(startDay == days[j]){
                            ++Tutes;
                        }
                    }
                    
                }
                
            }
            startDate = new Date(startDate).setDate(new Date(startDate).getDate() + 1)
            
        }
        resolve(Tutes);
       
    })
    
})
}
function setHolidays(){
    //start= 2-1-2020, end - 29-5-2020
    // 28-1-2020, 24-28(feb), 9-13(march)
    holidays = [];
    holidays.push(new Date(2020,0,26));

    startTemp = new Date(2020,1,24);
    endTemp = new Date(2020,1,28);

    while(new Date(startTemp).getTime()!=new Date(endTemp).getTime() )
    {
        holidays.push(new Date(startTemp));
        startTemp = new Date(startTemp).setDate(new Date(startTemp).getDate()+1);
        
        
    }
    holidays.push(new Date(endTemp));
    startTemp = new Date(2020,2,9)
    endTemp = new Date(2020,2,13)
    
    while(new Date(startTemp).getTime()!=new Date(endTemp).getTime() )
    {
        holidays.push(new Date(startTemp));
        startTemp = new Date(startTemp).setDate(new Date(startTemp).getDate()+1);
     
    }
    holidays.push(new Date(endTemp));
   
    return holidays;
}
function convertToDay(date){
    date = new Date(date);
    if(date.getDay()==0)
        return "Sunday";
    else if(date.getDay()==1)
    return "Monday";
    else if(date.getDay()==2)
    return "Tuesday";
    else if(date.getDay()==3)
    return "Wednesday";
    else if(date.getDay()==4)
    return "Thursday";
    else if(date.getDay()==5)
    return "Friday";
    else if(date.getDay()==6)
    return "Saturday";
    
    

}
function missableClasses(ID,courseName){
    var lectures,tutes,labs,totalPoints,newTotal;
    var lecturesInitial,tutesInitial,labsInitial;
    var weightLecture,weightLab,weightTute;
    var flagL=0;var flagLab=0; var flagT=0;var flagTest = 0
    console.log("in missable classes");
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TotalClasses").once('value').then(function(snap){
      lectures = snap.val().Lecture;lecturesInitial=lectures
      labs = snap.val().Lab;labsInitial=labs;
      tutes = snap.val().Tute;tutesInitial=tutes;
      console.log(lectures + " " + labs + " " + tutes);
    }).then(function(){
        checkWeight("Lecture",courseName).then(function(lectureWeight){
            weightLecture=lectureWeight;
        }).then(function(){
            checkWeight("Lab",courseName).then(function(labWeight){
                weightLab=labWeight;
            }).then(function(){
                checkWeight("Tute",courseName).then(function(tuteWeight){
                    weightTute=tuteWeight;
                }).then(function(){
                    
                console.log("after checking weights")
                totalPoints = findTotal(lectures,labs,tutes);
                console.log(totalPoints)
                newTotal = totalPoints;
                attendance = (newTotal/totalPoints)*100;
                console.log(attendance);
                while((flagL!=1 || flagLab!=1 || flagT!=1) && flagTest<15)
                {
                    if(lectures!=0 && attendance>=75 && flagL!=1){
                        var tempAttendance;
                        lectures = lectures-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        tempAttendance = attendance;
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            attendance = tempAttendance;
                            lectures = lectures+1;flagL=1;
                            console.log(flagL)
                        }
                    }
                    else 
                    flagL=1;
                    
                    
                    if(labs!=0 && attendance>=75 && flagLab!=1){
                        var tempAttendance;
                        labs = labs-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        tempAttendance = attendance;
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            attendance = tempAttendance;
                            labs = labs+1;flagLab=1;
                        }
                    }
                    else 
                    flagLab=1;
                    
                    if(tutes!=0 && attendance>=75 && flagT!=1){
                        var tempAttendance;
                        tutes = tutes-1;
                        newTotal = findTotal(lectures,labs,tutes);
                        tempAttendance = attendance;
                        attendance = findAttendance(newTotal);
                        if(attendance<75){
                            attendance = tempAttendance;
                            tutes = tutes+1;flagT=1;
                        }
                    }
                    else 
                    flagT=1
        
                    ++flagTest;
                }
                console.log(flagTest);console.log(flagL);console.log(flagLab);console.log(flagT)
                console.log((lecturesInitial - lectures) + " " + (labsInitial - labs) + " "  + (tutesInitial - tutes))
                missableClasses = [lecturesInitial - lectures,labsInitial - labs,tutesInitial - tutes]
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableClasses[0],
                    Lab:missableClasses[1],
                    Tute:missableClasses[2]

                }).then(function(){
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").set({
                        AvailablePts:0
                    }).then(function(){
                        firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissedClasses").set({
                            Lecture:0,
                            Lab:0,
                            Tute:0
                        }).then(function(){
                            firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "CondonedClasses").set({
                                Lecture:0,
                                Lab:0,
                                Tute:0
                            }).then(function(){
                                var date2 = new Date().getTime();
                                console.log(date2-date1);
                                window.alert("Done saving " + courseName);
                                window.location.reload();

                                
                            })
                        })

                    })
                })
            })
            })
        })
        })
    function findTotal(lectures,labs,tutes){
        return lectures*weightLecture + labs*weightLab + tutes*weightTute;
    }
    function findAttendance(newTotal){
        return (newTotal/totalPoints)*100;
    }
}

function checkWeight(subject,courseName){
    var subjectTimings,brokenSlots;
    var subject = subject;
    console.log("in check weight")
return new Promise(function(resolve,reject){
    firebase.database().ref("/StudentsLLT/" + ID  + "/" + courseName).once('value').then(function(snap){
        snap.forEach(function(subSnap){
            
            if(subject=="Lecture"){
            
            if(subSnap.val().Lecture!=null){
                subjectTimings = subSnap.val().Lecture;
                
              }
            }
            else if(subject=="Lab"){
                if(subSnap.val().Lab!=null){
                    subjectTimings = subSnap.val().Lab;
                    
                  }
            }
            else if(subject=="Tute"){
                if(subSnap.val().Tute!=null){
                    subjectTimings = subSnap.val().Tute;
                    
                  }
            }
            
        })
        
    }).then(function(){
        if(subjectTimings!=null){
            
        brokenSlots = BreakTimings(subjectTimings)
        resolve(brokenSlots/2);
        }
        else
        resolve(0);
    })
})
}

function BreakTimings(timings){
    var totalLength = 0;
    time = timings.split("-");
 start = time[0];
 end = time[1];
 while(start!=end)
 {
     prevStart = start;
     tempSplit = start.split(':');
     if(tempSplit[1]=="00"){
         tempSplit[1] = "30"
        start = tempSplit[0] +":" + tempSplit[1];
        ++totalLength;
        }
        else if(tempSplit[1]=="30"){
            tempSplit[1] = "00";
            tempSplit[0] = (parseInt(tempSplit[0]) + 1).toString();
           start = tempSplit[0] +":" + tempSplit[1];
          ++totalLength;
           }
 }

 return totalLength;
}

function pushCourse(courseName){
   
    firebase.database().ref("/Courses/" + ID).once('value').then(function(snap){
        var i=0;
        if(snap.val()==null)
        {tempArray = [courseName];
            firebase.database().ref("/Courses/" + ID).set({
                courses:tempArray
            })
        }
        else{
            tempArray = [];
            firebase.database().ref("/Courses/"+ID).once('value').then(function(snap){
                tempArray = snap.val().courses;
                for(i=0;i<tempArray.length;++i){
                    if(tempArray[i]==courseName)
                    break;
                }
                if(i==tempArray.length){
                tempArray.push(courseName)
                firebase.database().ref("/Courses/"+ID).set({
                    courses:tempArray
                })
            }
            else
            firebase.database().ref("/Courses/"+ID).set({
                courses:tempArray
            })
            })
        }
       
    })
}

function deleteCourse(){
    courseName = document.getElementById("delete").value;
    if(courseName==null)
    {
        window.alert("No course name")
        return;
    }
    firebase.database().ref("/Attendance/" + ID + "/" + courseName).remove().then(function(){
        firebase.database().ref("/Students/" + ID + "/" + courseName).remove().then(function(){
            firebase.database().ref("/StudentsLLT/" + ID + "/" + courseName).remove().then(function(){
                tempArray =[]; var i=0;
                firebase.database().ref("/Courses/" + ID).once('value').then(function(snap){
                    tempArray = snap.val().courses;
                    for(i=0;i<tempArray.length;++i){
                        if(tempArray[i]==courseName)
                        break;
                    }
                    if(i!=tempArray.length){
                        tempArray.splice(i,1);
                    }
                    firebase.database().ref("/Courses/" + ID).set({
                        courses:tempArray
                    }).then(function(){
                        window.alert("Removal of " + courseName + " Done" );
                    })
                })
            })
        })
    })
    

}











