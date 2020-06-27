var courseName;
var ID;
firebase.auth().onAuthStateChanged(function(user){
    var userName;
    if(user){
    userName = user.email
    userName = userName.split("@");
    ID = userName[0];
    }
    else
    console.log("user not found")
    /* if(user)
    {
        makeVisible = document.getElementById("main");
        makeVisible.style.display = "block"    
    }
 */
 })

 function runfreecourses(){
    var promise2 = checkCourse(ID);
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
    
    function BreakTimings(classTimings){ //breaks all the timings into half hour slots
        
        noOfClasses = classTimings.length;
        brokenTimings = [];
        //console.log(classTimings); //shows 15:30-17:00
        for(i=0;i<noOfClasses;++i){
            if(classTimings[i].length ==1){
                //console.log("peep1");
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
           {       for(j=0;j<classTimings[i].length;++j){
                   time = classTimings[i][j].split("-");
                   start = time[0];
                   end = time[1];
                   while(start!=end) 
                   {   prevStart = start;
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
    
       function BreakTimingsNew(classTimings){
    // can be used when array is like ["15:30-17:00","16:00-17:00"]
    // breaktimings is used when array is like [["15:00-17:00"],["15:00-17:00","15:00-17:00"]]
        noOfClasses = classTimings.length;
        brokenTimings = [];
        
        for(i=0;i<noOfClasses;++i){
         
         time = classTimings[i].split("-");
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
    
    function checkCourse(user){
        return new Promise(function(resolve,reject){
        courselist=[];
        coursedays=[]; 
        m=[],t=[],w=[],th=[],f=[]; //busy timings
        mt=[],tt=[],wt=[],tht=[],ft=[]; //free timings
        firebase.database().ref("/Students/" + user).once("value").then(function(snapshot){
            snapshot.forEach(function(snapshot){ // finds busy and free times of all days of the week of the student
                if(snapshot.val().Monday!=null)
                m.push(snapshot.val().Monday);
                if(snapshot.val().Tuesday!=null)
                t.push(snapshot.val().Tuesday);
                if(snapshot.val().Wednesday!=null)
                w.push(snapshot.val().Wednesday);
                if(snapshot.val().Thursday!=null)
                th.push(snapshot.val().Thursday);
                if(snapshot.val().Friday!=null)
                f.push(snapshot.val().Friday);
                mt = findFreeTime(m);
                tt = findFreeTime(t);
                wt = findFreeTime(w);
                tht = findFreeTime(th);
                ft = findFreeTime(f);
              })
            }).then(function(){
                //console.log(mt); 
                //console.log("found free Times")
                coursedaycount = 0;
                days =[];
                //labs=[]; //lab timings
    
                firebase.database().ref("/CourseList").once("value",function(snapshot){
                    console.log(snapshot.val())
                snapshot.forEach(function(snapshot){ 
                    console.log(snapshot.val())
                    mct=[], tct=[], wct=[], thct=[], fct=[];
                    //console.log(snapshot.key);
                    coursedaycount = 0;
                    days = [];         
                    
                    //For each Course
                
                if(snapshot.val().Monday!=null){ 
                    coursedaycount++;
                    mct.push(snapshot.val().Monday); 
                    flag = course_compare(mt,mct);
                    if(flag==0){
                        days.push("Monday");
                    }
                }
                if(snapshot.val().Tuesday!=null){
                    coursedaycount++;
                    tct.push(snapshot.val().Tuesday);
                    flag = course_compare(tt,tct);
                    if(flag==0){
                        days.push("Tuesday");
                        ;
                    }
                }
                if(snapshot.val().Wednesday!=null){
                    coursedaycount++;
                    wct.push(snapshot.val().Wednesday);
                    flag = course_compare(wt,wct);
                    if(flag==0){
                        days.push("Wednesday");
                    }
                }
                if(snapshot.val().Thursday!=null){
                    coursedaycount++;
                    thct.push(snapshot.val().Thursday);
                    flag = course_compare(tht,thct);
                    if(flag==0){
                        days.push("Thursday");
                    }
                }
                if(snapshot.val().Friday!=null){
                    coursedaycount++;
                    fct.push(snapshot.val().Friday);
                    flag = course_compare(ft,fct);
                    if(flag==0){
                        days.push("Friday");
                        }
                }
                
                check1=0;//lecture
                check2=0;//lab
                check3=0;//tut
                
                if(days.length==coursedaycount)  {
                  //courselist.push(snapshot.key);
                  check1++;
                  console.log("match")  
                  console.log(snapshot.key);
                  if(check1>0){
                  if(snapshot.val().Labs!=null){
                    labs=[];
                    labs.push(snapshot.key+ " = ");
                    snapshot.forEach(function(snap){ //for each day under child lab
                        if(snap.val().P1!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().P1.Monday!=null){
                                //console.log("check");
                                lm.push(snap.val().P1.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                //console.log("P1 - Monday:"+snap.val().P1.Monday);
                                labs.push("P1 - Monday: "+snap.val().P1.Monday);
                            }
                        }
                        if(snap.val().P1.Tuesday!=null){
                                lt.push(snap.val().P1.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                labs.push("P1 - Tuesday: "+snap.val().P1.Tuesday);
                            }
                        }
                        if(snap.val().P1.Wednesday!=null){
                                lw.push(snap.val().P1.Wednesday);
                            f = course_compare(wt,lw);
                            if(flag==0){
                                labs.push("P1 - Wednesday: "+snap.val().P1.Wednesday);
                            }
                        }
                        if(snap.val().P1.Thursday!=null){
                                lth.push(snap.val().P1.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                labs.push("P1 - Thursday: "+snap.val().P1.Thursday);
                            }
                        }
                        if(snap.val().P1.Friday!=null){
                                lf.push(snap.val().P1.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                labs.push("P1 - Friday: "+snap.val().P1.Friday);
                            }
                        }
    
    
                        }
    
                        if(snap.val().P2!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().P2.Monday!=null){
                                lm.push(snap.val().P2.Monday);
                            f= course_compare(mt,lm);
                            if(f==0){
                                labs.push("P2 - Monday: "+snap.val().P2.Monday);
                            }
                        }
                        if(snap.val().P2.Tuesday!=null){
                                lt.push(snap.val().P2.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                labs.push("P2 - Tuesday: "+snap.val().P2.Tuesday);
                            }
                        }
                        if(snap.val().P2.Wednesday!=null){
                                lw.push(snap.val().P2.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                labs.push("P2 - Wednesday: "+snap.val().P2.Wednesday);
                            }
                        }
                        if(snap.val().P2.Thursday!=null){
                                lth.push(snap.val().P2.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                labs.push("P2 - Thursday: "+snap.val().P2.Thursday);
                            }
                        }
                        if(snap.val().P2.Friday!=null){
                                lf.push(snap.val().P2.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                labs.push("P2 - Friday: "+snap.val().P2.Friday);
                            }
                        }
    
                        }
    
                        if(snap.val().P3!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().P3.Monday!=null){
                                lm.push(snap.val().P3.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                labs.push("P3 - Monday: "+snap.val().P3.Monday);
                            }
                        }
                        if(snap.val().P3.Tuesday!=null){
                                lt.push(snap.val().P3.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                labs.push("P3 - Tuesday: "+snap.val().P3.Tuesday);
                            }
                        }
                        if(snap.val().P3.Wednesday!=null){
                                lw.push(snap.val().P3.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                labs.push("P3 - Wednesday: "+snap.val().P3.Wednesday);
                            }
                        }
                        if(snap.val().P3.Thursday!=null){
                                lth.push(snap.val().P3.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                labs.push("P3 - Thursday: "+snap.val().P3.Thursday);
                            }
                        }
                        if(snap.val().P3.Friday!=null){
                                lf.push(snap.val().P3.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                labs.push("P3 - Friday: "+snap.val().P3.Friday);
                            }
                        }
    
                        }
                        if(snap.val().P4!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().P4.Monday!=null){
                                lm.push(snap.val().P4.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                labs.push("P4 - Monday: "+snap.val().P4.Monday);
                            }
                        }
                        if(snap.val().P4.Tuesday!=null){
                                lt.push(snap.val().P4.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                labs.push("P4 - Tuesday: "+snap.val().P4.Tuesday);
                            }
                        }
                        if(snap.val().P4.Wednesday!=null){
                                lw.push(snap.val().P4.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                labs.push("P4 - Wednesday: "+snap.val().P4.Wednesday);
                            }
                        }
                        if(snap.val().P4.Thursday!=null){
                                lth.push(snap.val().P4.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                labs.push("P4 - Thursday: "+snap.val().P4.Thursday);
                            }
                        }
                        if(snap.val().P4.Friday!=null){
                                lf.push(snap.val().P4.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                labs.push("P4 - Friday: "+snap.val().P4.Friday);
                            }
                        }
    
                        }
                        if(snap.val().P5!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().P5.Monday!=null){
                                lm.push(snap.val().P5.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                labs.push("P5 - Monday: "+snap.val().P5.Monday);
                            }
                        }
                        if(snap.val().P5.Tuesday!=null){
                                lt.push(snap.val().P5.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                labs.push("P5 - Tuesday: "+snap.val().P5.Tuesday);
                            }
                        }
                        if(snap.val().P5.Wednesday!=null){
                                lw.push(snap.val().P5.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                labs.push("P5 - Wednesday: "+snap.val().P5.Wednesday);
                            }
                        }
                        if(snap.val().P5.Thursday!=null){
                                lth.push(snap.val().P5.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                labs.push("P5 - Thursday: "+snap.val().P5.Thursday);
                            }
                        }
                        if(snap.val().P5.Friday!=null){
                                lf.push(snap.val().P5.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                labs.push("P5 - Friday: "+snap.val().P5.Friday);
                            }
                        }
    
                        }
                        
                    })
                    if(labs.length>1)
                    {  check2++;
                    console.log(labs);
                    
                    }
    
                }  
                else
                check2++;  
                    if(snapshot.val().Tuts!=null){ //TUTS
                        tuts=[];
                        //console.log("tut check");
                        tuts.push(snapshot.key+ " = ");
                        snapshot.forEach(function(snap){ //for each day under child tuts
                        if(snap.val().T1!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //tut days
                            if(snap.val().T1.Monday!=null){
                                lm.push(snap.val().T1.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                tuts.push("T1 - Monday: "+snap.val().T1.Monday);
                            }
                        }
                        if(snap.val().T1.Tuesday!=null){
                                lt.push(snap.val().T1.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                tuts.push("T1 - Tuesday: "+snap.val().T1.Tuesday);
                            }
                        }
                        if(snap.val().T1.Wednesday!=null){
                                lw.push(snap.val().T1.Wednesday);
                            f = course_compare(wt,lw);
                            if(flag==0){
                                tuts.push("T1 - Wednesday: "+snap.val().T1.Wednesday);
                            }
                        }
                        if(snap.val().T1.Thursday!=null){
                                lth.push(snap.val().T1.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                tuts.push("T1 - Thursday: "+snap.val().T1.Thursday);
                            }
                        }
                        if(snap.val().T1.Friday!=null){
                                lf.push(snap.val().T1.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                tuts.push("T1 - Friday: "+snap.val().T1.Friday);
                            }
                        }
    
    
                        }
    
                        if(snap.val().T2!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().T2.Monday!=null){
                                lm.push(snap.val().T2.Monday);
                            f= course_compare(mt,lm);
                            if(f==0){
                                tuts.push("T2 - Monday: "+snap.val().T2.Monday);
                            }
                        }
                        if(snap.val().T2.Tuesday!=null){
                                lt.push(snap.val().T2.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                tuts.push("T2 - Tuesday: "+snap.val().T2.Tuesday);
                            }
                        }
                        if(snap.val().T2.Wednesday!=null){
                                lw.push(snap.val().T2.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                tuts.push("T2 - Wednesday: "+snap.val().T2.Wednesday);
                            }
                        }
                        if(snap.val().T2.Thursday!=null){
                                lth.push(snap.val().T2.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                tuts.push("T2 - Thursday: "+snap.val().T2.Thursday);
                            }
                        }
                        if(snap.val().T2.Friday!=null){
                                lf.push(snap.val().T2.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                tuts.push("T2 - Friday: "+snap.val().T2.Friday);
                            }
                        }
    
                        }
    
                        if(snap.val().T3!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().T3.Monday!=null){
                                lm.push(snap.val().T3.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                tuts.push("T3 - Monday: "+snap.val().T3.Monday);
                            }
                        }
                        if(snap.val().T3.Tuesday!=null){
                                lt.push(snap.val().T3.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                tuts.push("T3 - Tuesday: "+snap.val().T3.Tuesday);
                            }
                        }
                        if(snap.val().T3.Wednesday!=null){
                                lw.push(snap.val().T3.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                tuts.push("T3 - Wednesday: "+snap.val().T3.Wednesday);
                            }
                        }
                        if(snap.val().T3.Thursday!=null){
                                lth.push(snap.val().T3.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                tuts.push("T3 - Thursday: "+snap.val().T3.Thursday);
                            }
                        }
                        if(snap.val().T3.Friday!=null){
                                lf.push(snap.val().T3.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                tuts.push("T3 - Friday: "+snap.val().T3.Friday);
                            }
                        }
    
                        }
                        if(snap.val().T4!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().T4.Monday!=null){
                                lm.push(snap.val().T4.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                tuts.push("T4 - Monday: "+snap.val().T4.Monday);
                            }
                        }
                        if(snap.val().T4.Tuesday!=null){
                                lt.push(snap.val().T4.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                tuts.push("T4 - Tuesday: "+snap.val().T4.Tuesday);
                            }
                        }
                        if(snap.val().T4.Wednesday!=null){
                                lw.push(snap.val().T4.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                tuts.push("T4 - Wednesday: "+snap.val().T4.Wednesday);
                            }
                        }
                        if(snap.val().T4.Thursday!=null){
                                lth.push(snap.val().T4.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                tuts.push("T4 - Thursday: "+snap.val().T4.Thursday);
                            }
                        }
                        if(snap.val().T4.Friday!=null){
                                lf.push(snap.val().T4.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                tuts.push("T4 - Friday: "+snap.val().T4.Friday);
                            }
                        }
    
                        }
                        if(snap.val().T5!=null){
                            lm=[],lt=[],lw=[],lth=[],lf=[]; //lab days
                            if(snap.val().T5.Monday!=null){
                                lm.push(snap.val().T5.Monday);
                            f = course_compare(mt,lm);
                            if(f==0){
                                tuts.push("T5 - Monday: "+snap.val().T5.Monday);
                            }
                        }
                        if(snap.val().T5.Tuesday!=null){
                                lt.push(snap.val().T5.Tuesday);
                            f = course_compare(tt,lt);
                            if(f==0){
                                tuts.push("T5 - Tuesday: "+snap.val().T5.Tuesday);
                            }
                        }
                        if(snap.val().T5.Wednesday!=null){
                                lw.push(snap.val().T5.Wednesday);
                            f = course_compare(wt,lw);
                            if(f==0){
                                tuts.push("T5 - Wednesday: "+snap.val().T5.Wednesday);
                            }
                        }
                        if(snap.val().T5.Thursday!=null){
                                lth.push(snap.val().T5.Thursday);
                            f = course_compare(tht,lth);
                            if(f==0){
                                tuts.push("T5 - Thursday: "+snap.val().T5.Thursday);
                            }
                        }
                        if(snap.val().T5.Friday!=null){
                                lf.push(snap.val().T5.Friday);
                            f = course_compare(ft,lf);
                            if(f==0){
                                tuts.push("T5 - Friday: "+snap.val().T5.Friday);
                            }
                        }
    
                        }
                        
                    })
                    if(tuts.length>1){
                        check3++;
                        console.log(tuts);
                        
                    }
                    
    
                    } //tut close
                    else check3++;
    
                  }

                if(check1>0 && check2>0 && check3>0){
                    courselist.push(snapshot.key);
                    if(labs.length>1)
                    {console.log(labs)
                    document.getElementById("labs").value = labs;
                    }
                    if(tuts.length>1){
                        console.log(tuts)
                    document.getElementById("tut").value = tuts;
                    }
                }
                
                }
                //console.log(snapshot.key);
                //console.log(labs);
    
            })
        }).then(function(){
        console.log(courselist);
        if(courselist.length>0){
            console.log(courselist)
        document.getElementById("coursesss").value = courselist;
        }
        else 
        {
            window.alert("No courses found for current timetable");
            
            return;
        }
    })
              })
        
    
    })//Promise end
    }
    
    function course_compare(freetime, coursetime){ //for each day, checks and matches course timings with free timings
        if(coursetime.filter(Array.isArray).length > 0)
        brokencoursetime=BreakTimings(coursetime);
        else
        brokencoursetime=BreakTimingsNew(coursetime);
        flag=0; // count intervals and check if it matches with course timings
        for(i=0; i<freetime.length; i++)
            for(j=0;j<brokencoursetime.length;j++)
                if(freetime[i]==brokencoursetime[j]){
                    flag++;
                }
        if(flag==brokencoursetime.length)  
                flag1 =0; // can take course
        else
                flag1=1; // can't take course
        return flag1; 
    }