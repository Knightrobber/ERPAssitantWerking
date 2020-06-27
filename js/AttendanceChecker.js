var ID;
function TradeForLecture(){
    var date =new Date().getTime();
    courseName=document.getElementById("courseName").value;
    missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    var tradePts = 0;
    var AvailablePts = 0;
    
    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                if(weightLecture==0)
                {
                    window.alert(courseName + " " + "does not have a lecture")
                    return;
                }
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").once('value').then(function(snap){
                            AvailablePts = snap.val().AvailablePts;
                        
                        if(missableLabs!=0){
                        if(weightLab >= weightLecture){
                            trade = Math.floor(weightLab/weightLecture);
                            missableLectures = missableLectures + trade;
                            missableLabs = missableLabs -1;
                            
                                tradePts = AvailablePts + (weightLab - trade*weightLecture);
                                
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    
                                    if(tradePts >=weightTute){
                                        if(weightTute!=0){
                                            trade = Math.floor(tradePts/weightTute);
                                            tradePts = tradePts - trade*weightTute;
                                            missableTutes = missableTutes + trade;
                                        }
                                    }
                                    if(tradePts >=weightLab){
                                        
                                        if(weightLab!=0){
                                        trade = Math.floor(tradePts/weightLab);
                                        tradePts = tradePts - trade*weightLab;
                                        missableLabs = missableLabs + trade;
                                        
                                        }
                                    }
                                    
                                }
                            
                        }
                        else{
                            trade = Math.ceil(weightLecture/weightLab)
                            if(missableLabs >=trade){
                                missableLabs = missableLabs - trade
                                missableLectures = missableLectures + 1
                                
                                    tradePts = AvailablePts + (trade*weightLab - weightLecture);
                                    if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                        
                                        if(tradePts >=weightTute){
                                            if(weightTute!=0){
                                                trade = Math.floor(tradePts/weightTute);
                                                tradePts = tradePts - trade*weightTute;
                                                missableTutes = missableTutes + trade;
                                            }
                                        }
                                        if(tradePts >=weightLab){
                                            if(weightLab!=0){
                                            trade = Math.floor(tradePts/weightLab);
                                            tradePts = tradePts - trade*weightLab;
                                            missableLabs = missableLabs + trade;
                                            }
                                        }
                                        


                                    }
                                
                            }
                            else{
                                weight1 = weightLab*missableLabs;
                                if(missableTutes==0){
                                    finalCheck("Lecture",courseName,lectureWeight,labWeight,tuteWeight);
                                    return;
                            }
                                else{
                                    if(weightTute >=weightLecture){
                                        trade = Math.floor(weightTute/weightLecture);
                                        missableLectures = missableLectures + trade;
                                        missableTutes = missableTutes -1;
                                        
                                            tradePts = AvailablePts + (weightTute - trade*weightLecture);
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                            if(tradePts >=weightLab){
                                                if(weightLab!=0){
                                                trade = Math.floor(tradePts/weightLab);
                                                tradePts = tradePts - trade*weightLab;
                                                missableLabs = missableLabs + trade;
                                                }
                                            }
                                            if(tradePts >=weightTute){
                                                if(weightTute!=0){
                                                    trade = Math.floor(tradePts/weightTute);
                                                    tradePts = tradePts - trade*weightTute;
                                                    missableTutes = missableTutes + trade;
                                                }
                                            }
                                        }
                                        
    
                                    }
                                    else if(weightTute < weightLecture){
                                        trade = Math.ceil(weightLecture/weightTute);
                                        if(missableTutes >= trade){
                                            missableTutes = missableTutes - trade;
                                            missableLectures = missableLectures + 1;
                                           
                                                tradePts = AvailablePts + (trade*weightTute - weightLecture);
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightLab){
                                                    if(weightLab!=0){
                                                    trade = Math.floor(tradePts/weightLab);
                                                    tradePts = tradePts - trade*weightLab;
                                                    missableLabs = missableLabs + trade;
                                                    }
                                                }
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                            }

                                            
                                        }
                                        else {
                                            if(missableTutes*weightTute + weight1 >= weightLecture){
                                            var i;
                                            for(i=1;i<=missableTutes;++i){
                                                trade = Math.ceil(weightLecture/(weight1 + i*weightTute))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableTutes = missableTutes - i;
                                            missableLabs = 0;
                                            missableLectures = missableLectures +1;
                                            
                                                tradePts = AvailablePts + (i*weightTute  + weight1) - weightLecture;
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightLab){
                                                    if(weightLab!=0){
                                                    trade = Math.floor(tradePts/weightLab);
                                                    tradePts = tradePts - trade*weightLab;
                                                    missableLabs = missableLabs + trade;
                                                    }
                                                }
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                            }
                                            


                                        }
                                        else{
                                            finalCheck("Lecture",courseName,lectureWeight,labWeight,tuteWeight);
                                            return;
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableTutes==0){
                        finalCheck("Lecture",courseName,lectureWeight,labWeight,tuteWeight);
                        return;
                    }
                    else{
                        if(weightTute >=weightLecture){
                            trade = Math.floor(weightTute/weightLecture);
                            missableLectures = missableLectures + trade;
                            missableTutes = missableTutes -1;
                          
                                       
                                            tradePts = AvailablePts + (weightTute - trade*weightLecture);
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                            if(tradePts >=weightLab){
                                                if(weightLab!=0){
                                                trade = Math.floor(tradePts/weightLab);
                                                tradePts = tradePts - trade*weightLab;
                                                missableLabs = missableLabs + trade;
                                                }
                                            }
                                            if(tradePts >=weightTute){
                                                if(weightTute!=0){
                                                    trade = Math.floor(tradePts/weightTute);
                                                    tradePts = tradePts - trade*weightTute;
                                                    missableTutes = missableTutes + trade;
                                                }
                                            }
                                        }
                                        
        
                        }
                        else if(weightTute < weightLecture){
                            trade = Math.ceil(weightLecture/weightTute);
                            if(missableTutes >= trade){
                                missableTutes = missableTutes - trade;
                                missableLectures = missableLectures + 1;
                              
                                            
                                                tradePts = AvailablePts + (trade*weightTute - weightLecture);
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightLab){
                                                    if(weightLab!=0){
                                                    trade = Math.floor(tradePts/weightLab);
                                                    tradePts = tradePts - trade*weightLab;
                                                    missableLabs = missableLabs + trade;
                                                    }
                                                }
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                            }
                                                

                                            
                            }
                            else {
                                finalCheck("Lecture",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                }).then(function(){
                    console.log(tradePts);
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").set({
                        AvailablePts:tradePts
                    }).then(function(){
                        missableLecturesD.value=missableLectures;
                        missableTutesD.value=missableTutes;
                        missableLabsD.value = missableLabs;
                        var date2 = new Date().getTime();
                        console.log(date2- date + " traded date");
                    })
                })

            })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })
}

function TradeForLab(){
    courseName=document.getElementById("courseName").value;
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    var tradePts = 0;
    var AvailablePts = 0;
    missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");

    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        console.log(ID+ "  ");console.log(courseName);
        console.log("wait - " + snapshot.val())
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    if(weightLab == 0){
                        window.alert(courseName + " " + "does not have a lab")
                    return;
                    }
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").once('value').then(function(snap){
                            AvailablePts = snap.val().AvailablePts
                            
                        if(missableLectures!=0){
                        var trade;
                        if(weightLecture >= weightLab){
                            trade = Math.floor(weightLecture/weightLab);
                            missableLabs = missableLabs + trade;
                            missableLectures = missableLectures -1;

                            tradePts = AvailablePts + (weightLecture - trade*weightLab);
                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                if(tradePts >=weightTute){
                                    if(weightTute!=0){
                                        trade = Math.floor(tradePts/weightTute);
                                        tradePts = tradePts - trade*weightTute;
                                        missableTutes = missableTutes + trade;
                                    }
                                }
                                if(tradePts>=weightLecture){
                                    if(weightLecture!=0){
                                        trade = Math.floor(tradePts/weightLecture);
                                        tradePts = tradePts - trade*weightLecture;
                                        missableLectures = missableLectures + trade;
                                    }
                                }

                            }
                            
                        }
                        else{
                            trade = Math.ceil(weightLab/weightLecture)
                            if(missableLectures >=trade){
                                missableLectures = missableLectures - trade
                                missableLabs = missableLabs + 1
                                tradePts = AvailablePts + (trade*weightLecture - weightLab);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts >=weightTute){
                                        if(weightTute!=0){
                                            trade = Math.floor(tradePts/weightTute);
                                            tradePts = tradePts - trade*weightTute;
                                            missableTutes = missableTutes + trade;
                                        }
                                    }
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
                                }

                            }
                            else{
                                weight1 = weightLecture*missableLectures;
                                if(missableTutes==0){
                                    finalCheck("Lab",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                            }
                                else{
                                    if(weightTute >=weightLab){
                                        trade = Math.floor(weightTute/weightLab);
                                        missableLabs = missableLabs + trade;
                                        missableTutes = missableTutes -1;

                                        tradePts = AvailablePts + (weightTute - trade*weightLab);
                                        if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                            if(tradePts >=weightTute){
                                                if(weightTute!=0){
                                                    trade = Math.floor(tradePts/weightTute);
                                                    tradePts = tradePts - trade*weightTute;
                                                    missableTutes = missableTutes + trade;
                                                }
                                            }
                                            if(tradePts>=weightLecture){
                                                if(weightLecture!=0){
                                                    trade = Math.floor(tradePts/weightLecture);
                                                    tradePts = tradePts - trade*weightLecture;
                                                    missableLectures = missableLectures + trade;
                                                }
                                            }
                                        }
    
                                    }
                                    else if(weightTute < weightLab){
                                        trade = Math.ceil(weightLab/weightTute);
                                        if(missableTutes >= trade){
                                            missableTutes = missableTutes - trade;
                                            missableLabs = missableLabs + 1;

                                            tradePts = AvailablePts + (trade*weightTute - weightLab);
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                                if(tradePts>=weightLecture){
                                                    if(weightLecture!=0){
                                                        trade = Math.floor(tradePts/weightLecture);
                                                        tradePts = tradePts - trade*weightLecture;
                                                        missableLectures = missableLectures + trade;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if(missableTutes*weightTute + weight1 >= weightLab){
                                            var i;
                                            for(i=1;i<=missableTutes;++i){
                                                trade = Math.ceil(weightLab/(weight1 + i*weightTute))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableTutes = missableTutes - i;
                                            missableLectures = 0;
                                            missableLabs = missableLabs +1

                                            tradePts = AvailablePts + (i*weightTute  + weight1) - weightLab;
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts >=weightTute){
                                                    if(weightTute!=0){
                                                        trade = Math.floor(tradePts/weightTute);
                                                        tradePts = tradePts - trade*weightTute;
                                                        missableTutes = missableTutes + trade;
                                                    }
                                                }
                                                if(tradePts>=weightLecture){
                                                    if(weightLecture!=0){
                                                        trade = Math.floor(tradePts/weightLecture);
                                                        tradePts = tradePts - trade*weightLecture;
                                                        missableLectures = missableLectures + trade;
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            finalCheck("Lab",courseName,lectureWeight,labWeight,tuteWeight);
                                            return;
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableTutes==0){
                        finalCheck("Lab",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                    }
                    else{
                        if(weightTute >=weightLab){
                            
                            trade = Math.floor(weightTute/weightLab);
                            missableLabs = missableLabs + trade;
                            missableTutes = missableTutes -1;

                            tradePts = AvailablePts + (weightTute - trade*weightLab);
                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                if(tradePts>=weightLecture){
                                    if(weightLecture!=0){
                                        trade = Math.floor(tradePts/weightLecture);
                                        tradePts = tradePts - trade*weightLecture;
                                        missableLectures = missableLectures + trade;
                                    }
                                }
                                if(tradePts >=weightTute){
                                    if(weightTute!=0){
                                        trade = Math.floor(tradePts/weightTute);
                                        tradePts = tradePts - trade*weightTute;
                                        missableTutes = missableTutes + trade;
                                    }
                                }
                            }
        
                        }
                        else if(weightTute < weightLab){
                            trade = Math.ceil(weightLab/weightTute);
                            if(missableTutes >= trade){
                                missableTutes = missableTutes - trade;
                                missableLabs = missableLabs + 1;

                                tradePts = AvailablePts + (trade*weightTute - weightLab);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
                                    if(tradePts >=weightTute){
                                        if(weightTute!=0){
                                            trade = Math.floor(tradePts/weightTute);
                                            tradePts = tradePts - trade*weightTute;
                                            missableTutes = missableTutes + trade;
                                        }
                                    }
                                }


                            }
                            else {
                                finalCheck("Lab",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                }).then(function(){
                    console.log(tradePts);
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").set({
                        AvailablePts:tradePts
                    }).then(function(){
                        missableLecturesD.value=missableLectures;
                        missableTutesD.value=missableTutes;
                        missableLabsD.value = missableLabs;
                    })
                })
            })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })

}

function TradeForTute(){
    courseName=document.getElementById("courseName").value;
    missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");
    var missableLectures, missableLabs, missableTutes;
    var weightLecture, weightLab, weightTute;
    var tradePts = 0;
    var AvailablePts = 0;

    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").once('value').then(function(snapshot){
        missableLectures = snapshot.val().Lecture;  missableLabs = snapshot.val().Lab;   missableTutes = snapshot.val().Tute;
        
            checkWeight("Lecture",courseName).then(function(lectureWeight){
                weightLecture = lectureWeight;
                checkWeight("Lab",courseName).then(function(labWeight){
                    weightLab = labWeight;
                    checkWeight("Tute",courseName).then(function(tuteWeight){
                        weightTute = tuteWeight;
                        if(weightTute==0){
                            window.alert(courseName + " " + "does not have a Tute")
                            return;
                        }
                        firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").once('value').then(function(snap){
                            AvailablePts = snap.val().AvailablePts;

                        if(missableLectures!=0){
                        var trade;
                        if(weightLecture >= weightTute){
                            trade = Math.floor(weightLecture/weightTute);
                            missableTutes = missableTutes + trade;
                            missableLectures = missableLectures -1;

                            tradePts = AvailablePts + (weightLecture - trade*weightTute);
                                
                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                if(tradePts >=weightLab){
                                    
                                    if(weightLab!=0){
                                    trade = Math.floor(tradePts/weightLab);
                                    tradePts = tradePts - trade*weightLab;
                                    missableLabs = missableLabs + trade;
                                    }
                                }
                                if(tradePts>=weightLecture){
                                    if(weightLecture!=0){
                                        trade = Math.floor(tradePts/weightLecture);
                                        tradePts = tradePts - trade*weightLecture;
                                        missableLectures = missableLectures + trade;
                                    }
                                }

                            }
                        }
                        else{
                            trade = Math.ceil(weightTute/weightLecture)
                            if(missableLectures >=trade){
                                missableLectures = missableLectures - trade
                                missableTutes = missableTutes + 1

                                tradePts = AvailablePts + (trade*weightLecture - weightTute);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts >=weightLab){
                                    
                                        if(weightLab!=0){
                                        trade = Math.floor(tradePts/weightLab);
                                        tradePts = tradePts - trade*weightLab;
                                        missableLabs = missableLabs + trade;
                                        }
                                    }
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
                            }
                        }
                            else{
                                weight1 = weightLecture*missableLectures;
                                if(missableLabs==0){
                                finalCheck("Tute",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                            }
                                else{
                                    if(weightLab >=weightTute){
                                        trade = Math.floor(weightLab/weightTute);
                                        missableTutes = missableTutes + trade;
                                        missableLabs = missableLabs -1;

                                        tradePts = AvailablePts + (weightLab - trade*weightTute);
                                        if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                            if(tradePts>=weightLecture){
                                                if(weightLecture!=0){
                                                    trade = Math.floor(tradePts/weightLecture);
                                                    tradePts = tradePts - trade*weightLecture;
                                                    missableLectures = missableLectures + trade;
                                                }
                                            }
                                            if(tradePts >=weightLab){
                                    
                                                if(weightLab!=0){
                                                trade = Math.floor(tradePts/weightLab);
                                                tradePts = tradePts - trade*weightLab;
                                                missableLabs = missableLabs + trade;
                                                console.log(missableLabs);
                                                }
                                            }

                                        }
    
                                    }
                                    else if(weightLab < weightTute){
                                        trade = Math.ceil(weightTute/weightLab);
                                        if(missableLabs >= trade){
                                            missableLabs = missableLabs - trade;
                                            missableTutes = missableTutes + 1;

                                            tradePts = AvailablePts + (trade*weightLab - weightTute);
                                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                    if(tradePts>=weightLecture){
                                                        if(weightLecture!=0){
                                                            trade = Math.floor(tradePts/weightLecture);
                                                            tradePts = tradePts - trade*weightLecture;
                                                            missableLectures = missableLectures + trade;
                                                        }
                                                    }
                                                    if(tradePts >=weightLab){
                                            
                                                        if(weightLab!=0){
                                                        trade = Math.floor(tradePts/weightLab);
                                                        tradePts = tradePts - trade*weightLab;
                                                        missableLabs = missableLabs + trade;
                                                        }
                                                    }
                                                }
                                        }
                                        else {
                                            if(missableLabs*weightLab + weight1 >= weightTute){
                                            var i;
                                            for(i=1;i<=missableLabs;++i){
                                                trade = Math.ceil(weightTute/(weight1 + i*weightLab))
                                                if(trade ==1)
                                                break;
                                            }
                                            missableLabs = missableLabs - i;
                                            missableLectures = 0;
                                            missableTutes = missableTutes +1

                                            tradePts = AvailablePts + (i*weightLab  + weight1) - weightTute;
                                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                                if(tradePts>=weightLecture){
                                                    if(weightLecture!=0){
                                                        trade = Math.floor(tradePts/weightLecture);
                                                        tradePts = tradePts - trade*weightLecture;
                                                        missableLectures = missableLectures + trade;
                                                    }
                                                }
                                                if(tradePts >=weightLab){
                                        
                                                    if(weightLab!=0){
                                                    trade = Math.floor(tradePts/weightLab);
                                                    tradePts = tradePts - trade*weightLab;
                                                    missableLabs = missableLabs + trade;
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            finalCheck("Tute",courseName,lectureWeight,labWeight,tuteWeight);
                                            return;
                                        }
                                        }
                                    }
                                    
                                    
                                }
                            }
    
                        }
                       
                    
                        
                }
                else {
                    if(missableLabs==0){
                        finalCheck("Tute",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                    }
                    else{
                        if(weightLab >=weightTute){
                            
                            trade = Math.floor(weightLab/weightTute);
                            missableTutes = missableTutes + trade;
                            missableLabs = missableLabs -1;

                            tradePts = AvailablePts + (weightLab - trade*weightTute);
                            if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                if(tradePts>=weightLecture){
                                    if(weightLecture!=0){
                                        trade = Math.floor(tradePts/weightLecture);
                                        tradePts = tradePts - trade*weightLecture;
                                        missableLectures = missableLectures + trade;
                                    }
                                }
                                if(tradePts >=weightLab){
                        
                                    if(weightLab!=0){
                                    trade = Math.floor(tradePts/weightLab);
                                    tradePts = tradePts - trade*weightLab;
                                    missableLabs = missableLabs + trade;
                                    }
                                }
                            }
        
                        }
                        else if(weightLab < weightTute){
                            trade = Math.ceil(weightTute/weightLab);
                            if(missableLabs >= trade){
                                missableLabs = missableLabs - trade;
                                missableTutes = missableTutes + 1;
                                tradePts = AvailablePts + (trade*weightLab - weightTute);
                                if(tradePts >=weightLab || tradePts >= weightTute || tradePts >= weightLecture){
                                    if(tradePts>=weightLecture){
                                        if(weightLecture!=0){
                                            trade = Math.floor(tradePts/weightLecture);
                                            tradePts = tradePts - trade*weightLecture;
                                            missableLectures = missableLectures + trade;
                                        }
                                    }
                                    if(tradePts >=weightLab){
                            
                                        if(weightLab!=0){
                                        trade = Math.floor(tradePts/weightLab);
                                        tradePts = tradePts - trade*weightLab;
                                        missableLabs = missableLabs + trade;
                                        
                                        }
                                    }
                             }
                               
                            }
                            else {
                                finalCheck("Tute",courseName,lectureWeight,labWeight,tuteWeight);
                                return;
                            }
                        }
                        
                    }
                }
                console.log(missableLectures + " " + missableLabs + " " + missableTutes);
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
                    Lecture:missableLectures,
                    Lab:missableLabs,
                    Tute:missableTutes
                }).then(function(){
                    console.log(tradePts);
                    firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "TradePts").set({
                        AvailablePts:tradePts
                    }).then(function(){
                        missableLecturesD.value=missableLectures;
                        missableTutesD.value=missableTutes;
                        missableLabsD.value = missableLabs;
                    })
                })
            })
            })
                    
                })
            })
        
        
        
        /*firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/" + "MissableClasses").set({
            Lecture:missableLectures,
            Lab:missableLabs,
            Tute:missableTutes
        }).then(function(){
            console.log()
        })
        */
    })
}

firebase.auth().onAuthStateChanged(function(user){
    temp = user.email.split("@");
    ID = temp[0];
    if(user)
    {
    makeVisible = document.getElementById("main");
    makeVisible.style.display = "block"  
    console.log(ID);  
}
})

function check(){
    var date = new Date().getTime();
courseName = document.getElementById("courseName").value;
currentAttendance = document.getElementById("currentAttendance")
endOfCourseAttendance = document.getElementById("endOfCourseAttendance");
missableLectures = document.getElementById("missableLectures");
missableLabs = document.getElementById("missableLabs");
missableTutes = document.getElementById("missableTutes");
courseName = document.getElementById("courseName").value;
var Total = new Object(); var Missed = new Object(); var Condoned = new Object();var Missable = new Object(); var Attended = new Object(); var startDate; var endDate; var soFar = new Object();
var Weight = new Object();
var AttendanceSofar; var AttendanceTotal;
Total.Lecture = 0;Total.Lab =0; Total.Tute=0;
Missable.Lecture = 0;Missable.Lab=0;Missable.Tute=0;
Missed.Lecture =0; Missed.Lab=0;Missed.Tute=0
Condoned.Lecture=0; Condoned.Lab=0; Condoned.Tute=0;
Attended.Lecture=0;Attended.Lab=0;Attended.Tute=0;
soFar.Lecture=0;soFar.Lab=0;soFar.Tute=0;
Weight.Lecture = 0; Weight.Lab = 0; Weight.Tute = 0;
firebase.database().ref("/Attendance/" + ID + "/" + courseName).once('value').then(function(snap){
    TotalClasses = snap.val().TotalClasses;MissableClasses = snap.val().MissableClasses;
    Total.Lecture = TotalClasses.Lecture;Total.Lab = TotalClasses.Lab;Total.Tute = TotalClasses.Tute;
    Missable.Lecture = MissableClasses.Lecture ; Missable.Lab=MissableClasses.Lab ; Missable.Tute=MissableClasses.Tute;
    if(snap.val().MissedClasses!=null){
    MissedClasses = snap.val().MissedClasses
    Missed.Lecture = MissedClasses.Lecture; Missed.Lab = MissedClasses.Lab ;Missed.Tute = MissedClasses.Tute;
    }
    if(snap.val().CondonedClasses!=null){
        CondonedClasses = snap.val().CondonedClasses;
        Condoned.Lecture=CondonedClasses.Lecture; Condoned.Lab = CondonedClasses.Lab ; Condoned.Tute = CondonedClasses.Tute;
    }
    startDate = new Date(snap.val().Dates.StartDate);
    endDate = new Date("February 22 2020");
checkWeight("Lecture",courseName).then(function(lectureWeight){
    Weight.Lecture = lectureWeight;
    checkWeight("Lab",courseName).then(function(labWeight){
        Weight.Lab = labWeight
        checkWeight("Tute",courseName).then(function(tuteWeight){
            Weight.Tute = tuteWeight;
            countLectures(ID,courseName,startDate,endDate).then(function(lectures){
                soFar.Lecture = lectures
                countLabs(ID,courseName,startDate,endDate).then(function(labs){
                    soFar.Lab = labs;
                    countTutes(ID,courseName,startDate,endDate).then(function(tutes){
                    soFar.Tute = tutes;
                        soFar.Lecture = soFar.Lecture - Condoned.Lecture;
                        soFar.Lab = soFar.Lab - Condoned.Lab;
                        soFar.Tute = soFar.Tute - Condoned.Tute;
                        
                        Attended.Lecture = soFar.Lecture - Missed.Lecture; Attended.Lab = soFar.Lab - Missed.Lab; Attended.Tute = soFar.Tute - Missed.Tute;
                        console.log(Attended.Lecture);console.log(Attended.Lab);console.log(Attended.Tute);
                        AttendanceSofar = ((Attended.Lecture*Weight.Lecture + Attended.Lab * Weight.Lab + Attended.Tute*Weight.Tute)/(soFar.Lecture*Weight.Lecture + soFar.Lab*Weight.Lab + soFar.Tute*Weight.Tute))*100;
                        console.log(AttendanceSofar);
                        currentAttendance.value = AttendanceSofar
                        temp = new Object();
                        temp.Lecture = Total.Lecture - Missed.Lecture; temp.Lab = Total.Lab - Missed.Lab; temp.Tute = Total.Tute - Missed.Tute;
                        console.log(temp.Lecture + " " + temp.Lab + " " + temp.Tute);
                        AttendanceTotal = ((temp.Lecture*Weight.Lecture + temp.Lab*Weight.Lab + temp.Tute*Weight.Tute)/(Total.Lecture*Weight.Lecture + Total.Lab * Weight.Lab + Total.Tute * Weight.Tute))*100;
                        console.log(AttendanceTotal);
                        console.log(Weight.Lecture + " " + Weight.Lab + " " + Weight.Tute);
                        endOfCourseAttendance.value = AttendanceTotal;
                        missableLectures.value = Missable.Lecture; missableLabs.value = Missable.Lab; missableTutes.value = Missable.Tute;
                        var date2 = new Date().getTime()
                        console.log(date2-date + " just checking");
                    })
                })
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
        if(!endDate)
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
        if(!endDate)
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
function finalCheck(subject,courseName,lectureWeight,labWeight,tuteWeight){
    console.log("in here")
    missableLecturesD = document.getElementById("missableLectures");
    missableLabsD = document.getElementById("missableLabs");
    missableTutesD = document.getElementById("missableTutes");
    var Total = new Object(); var Missed = new Object(); var Attended = new Object(); var tradePts; var attendance = 0; var Missable = new Object();
    Attended.Lecture = 0; Attended.Lab =0; Attended.Tute=0;
    firebase.database().ref("/Attendance/" + ID  +"/" + courseName).once('value').then(function(snap){
        Total.Lecture = snap.val().TotalClasses.Lecture; Total.Lab = snap.val().TotalClasses.Lab; Total.Tute = snap.val().TotalClasses.Tute;
        Missed.Lecture = snap.val().MissedClasses.Lecture; Missed.Lab = snap.val().MissedClasses.Lab; Missed.Tute = snap.val().MissedClasses.Tute;
        Missable.Lecture = snap.val().MissableClasses.Lecture; Missable.Lab = snap.val().MissableClasses.Lab; Missable.Tute = snap.val().MissableClasses.Tute;
        tradePts = snap.val().TradePts.AvailablePts;
       
        if(subject == "Lecture"){
            Attended.Lecture = Total.Lecture - Missed.Lecture - Missable.Lecture; Attended.Lab = Total.Lab - Missed.Lab ; Attended.Tute = Total.Tute - Missed.Tute ;
            Missable.Lab =0; Missable.Tute=0;
            temp = Attended.Lecture -1;
            console.log(temp);
            attendance = ((temp*lectureWeight + Attended.Lab * labWeight + Attended.Tute*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
            console.log(attendance);
            if(attendance>=75){
                Missable.Lecture = Missable.Lecture +1;
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/MissableClasses").set({
                    Lecture:Missable.Lecture,
                    Lab:Missable.Lab,
                    Tute:Missable.Tute
                }).then(function(){
                    missableLecturesD.value=Missable.Lecture;
                    missableLabsD.value=Missable.Lab;
                    missableTutesD.value = Missable.Tute;
                })
            }
            else{
                window.alert("Nigga F");
                return;
            }
        }
        else if(subject == "Lab"){
            Attended.Lecture = Total.Lecture - Missed.Lecture ; Attended.Lab = Total.Lab - Missed.Lab - Missable.Lab; Attended.Tute = Total.Tute - Missed.Tute;
            Missable.Lecture =0; Missable.Tute = 0;
            temp = Attended.Lab -1;
            console.log(temp);
            attendance = ((Attended.Lecture*lectureWeight + temp * labWeight + Attended.Tute*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
            console.log(attendance);
            if(attendance>=75){
                Missable.Lab = Missable.Lab +1;
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/MissableClasses").set({
                    Lecture:Missable.Lecture,
                    Lab:Missable.Lab,
                    Tute:Missable.Tute
                }).then(function(){
                    missableLecturesD.value=Missable.Lecture;
                    missableLabsD.value=Missable.Lab;
                    missableTutesD.value = Missable.Tute;
                })
            }
            else{
                window.alert("Nigga F");
                return;
            }
        }
        else if(subject =="Tute"){
            Attended.Lecture = Total.Lecture - Missed.Lecture ; Attended.Lab = Total.Lab - Missed.Lab; Attended.Tute = Total.Tute - Missed.Tute - Missable.Tute;
            Missable.Lecture =0; Missable.Lab = 0;
            temp = Attended.Tute -1;
            console.log(temp);
            attendance = ((Attended.Lecture*lectureWeight + Attended.Lab * labWeight + temp*tuteWeight )/(Total.Lecture*lectureWeight + Total.Lab*labWeight + Total.Tute *tuteWeight))*100;
            console.log(attendance);
            if(attendance>=75){
                Missable.Tute = Missable.Tute +1;
                firebase.database().ref("/Attendance/" + ID + "/" + courseName + "/MissableClasses").set({
                    Lecture:Missable.Lecture,
                    Lab:Missable.Lab,
                    Tute:Missable.Tute
                }).then(function(){
                    missableLecturesD.value=Missable.Lecture;
                    missableLabsD.value=Missable.Lab;
                    missableTutesD.value = Missable.Tute;
                })
            }
            else{
                window.alert("Nigga F");
                return;
            }
        }

    })
}
