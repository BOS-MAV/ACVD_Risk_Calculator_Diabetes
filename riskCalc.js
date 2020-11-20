/*riskCalc.js
 * Author: John P. Russo
 * Description: This performs calculations for ACVD for diabetes fields
 * Date: August-September 2019
 * 
 * Functions:   numberFormat    - used to format a number a certain number of decimal places
 *              calc_risk       - calculate ASCVD without diabetes variables
 *              calc_ASCVD      - calculates the ASCVD risk and returns a value
 *              calc_AIS         - calculates AIS risk and returns a value
 *              calc_MI         - calculates MI risk and returns a value
 *              calc_Death      - calculates death risk and returns a value
 *              
 */
function numberFormat(val, decimalPlaces) {
/*
 * function: numberFormat 
 * Description: returns a number to the passed number of decimal places
 */
    var multiplier = Math.pow(10, decimalPlaces);
    return (Math.round(val * multiplier) / multiplier).toFixed(decimalPlaces);
}

function calc_risk() {
                //declare a totscore variable

                var totScore;
                //declare variables to hold the rest
                var age, age5,age5Weight, sex, sexWeight,race, race_t, raceWeight,diabetes, diabetesWeight, smoker, smokerWeight, hypertension, hypertension_t, statin, statin_t, systolic, diastolic,
                        totchl, hdl, ldl;
                age = parseInt($("#txtAge").val());
                age5 = age/5;
                age5Weight = age5*.18860;
                if ($("input[name = 'Sex']:checked").val() === "Male")
                    sex = 0;
                else
                    sex = 1;
                sexWeight = sex * -0.44487;
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    race = 0;
                else if (race_t === 'African American')
                    race = 1;
                else
                    race = 0;
                raceWeight = race * 0.19447;
                if ($("input[name = 'Diabetes']:checked").val() === "Yes")
                    diabetes = 1;
                else
                    diabetes = 0;
                diabetesWeight = diabetes * 0.46548;
                if ($("input[name = 'Smoker']:checked").val() === "Yes")
                    smoker = 1;
                else
                    smoker = 0;
                smokerWeight = smoker * 0.23196;
                if (parseInt($("#TotChol").val()) > 150 && parseInt($("#TotChol").val()) < 201)
                {
                    totchl = 0.00575;
                }
                else if (parseInt($("#TotChol").val()) > 200 && parseInt($("#TotChol").val()) < 251)
                {
                    totchl = 0.14601;
                }
                else if (parseInt($("#TotChol").val()) > 250)
                {
                    totchl = 0.45042;
                }
                else
                {
                    totchl = 0;
                }
                hdlc=parseInt($("#HDL").val());
                hdlc10 = hdlc/10;
                hdlcWeight = hdlc10 * -0.07217;
                bpSys = parseInt($("#BP_Sys").val());
                bpSys10 = bpSys/10;
                bpSysWeight = bpSys10*0.08816;
                if ($("input[name = 'Hypertension']:checked").val() === "No")
                    hypertensionWeight = -0.31039;
                else
                    hypertensionWeight = 0;
                if ($("input[name = 'Statin']:checked").val() === "Yes")
                    statinWeight = -0.08891;
                else
                    statinWeight = 0;

                xbeta = age5Weight + sexWeight + raceWeight + diabetesWeight + smokerWeight + totchl+hdlcWeight+bpSysWeight+hypertensionWeight+statinWeight;
                eXbeta = Math.exp(xbeta-3.055209856);
                risk = 1 - Math.pow(0.970787977,eXbeta);
                return numberFormat(risk*100,2);
                }   

function calc_ASCVD() 
/*
 * function:    calc_ASCVD()
 * Description: calculates the risk of ASCVD using diabetes fields
 */
{
                //declare a totscore variable
                var totScore;
                //declare variables to hold the rest
                var age, ageWeight, ageLogSQWeight,sex, sexWeight,race,  raceWeight, smoker, smokerWeight, hypertension, hypertension_t, statin, statin_t,
                        systolic, totchl,totchlWeight, chlAgeWeight, hdlc, hdlcWeight,ageHdlWeight,bpMed, bpSysbpMedWeight,bpSysbpAgeWeight,ageSmokeWeight,
                        a1c, a1cWeight,egfr,egfrWeight,insulin, insulinWeight,sulfonyl, sulfonylWeight,otherDiab, otherDiabWeight,microAlb, 
                        microAlbWeight;
                age = parseInt($("#txtAge").val());
                ageWeight = Math.log(age)*18.9496
                ageLogSQWeight = Math.log(age)*Math.log(age)*-1.82065;
                if ($("input[name = 'Sex']:checked").val() === "Male")
                    sex = 0;
                else
                    sex = 1;
                sexWeight = sex * -0.21382
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    race = 0;
                else if (race_t === 'African American')
                    race = 1;
                else
                    race = 0;
                raceWeight = race * 0.003490576;
                if ($("input[name = 'Smoker']:checked").val() === "Yes")
                    smoker = 1;
                else
                    smoker = 0;
                smokerWeight = smoker * 3.90106;
                totchl = parseInt($("#TotChol").val());
                totchlWeight = Math.log(totchl)*1.38594;
                chlAgeWeight = Math.log(totchl)*Math.log(age)*-0.17667;
                hdlc=parseInt($("#HDL").val());
                hdlcWeight = Math.log(hdlc) * 0.42114;
                ageHdlWeight = Math.log(hdlc)*Math.log(age)*-0.17799;
                if ($("input[name = 'Hypertension']:checked").val() === "No")
                    bpMed = 0;
                else
                    bpMed = 1;
                bpSys = parseInt($("#BP_Sys").val());
                bpSysbpMedWeight = Math.log(bpSys)*bpMed*0.62768;
                bpSysbpAgeWeight = Math.log(age)*Math.log(bpSys)*bpMed*-0.14554;
                ageSmokeWeight = Math.log(age)*smoker*-0.92560;        
                if ($("input[name = 'Statin']:checked").val() === "Yes")
                    statinWeight = -0.033734;
                else
                    statinWeight = 0;
                
                if ($("input[name = 'Diabetes']:checked").val() === "Yes")
                {
                    a1c = parseInt($("#A1C").val());
                    a1cWeight = Math.log(a1c)*0.92618;
                    egfr = parseInt($("#eGFR").val());
                    egfrWeight = Math.log(egfr)*-0.35818;
                    if ($("input[name = 'Insulin']:checked").val() === "No")
                        insulin = 0;
                    else
                        insulin = 1;
                    insulinWeight = insulin * 0.28100;
                    if ($("input[name = 'SulfonlyUrea']:checked").val() === "No")
                        sulfonyl = 0;
                    else
                        sulfonyl = 1;
                    sulfonylWeight = sulfonyl * 0.10185;
                    if ($("input[name = 'OtherDMeds']:checked").val() === "No")
                        otherDiab = 0;
                    else
                        otherDiab = 1;
                    otherDiabWeight = otherDiab * -0.080862;
                    microAlb = parseInt($("#mcAlb").val());
                    microAlbWeight = microAlb * 0.002264563;   
                }
                else
                {
                    a1cWeight = 0;
                    egfrWeight = 0;
                    insulinWeight=0;
                    sulfonylWeight = 0;
                    otherDiabWeight = 0;
                    microAlbWeight = 0;
                }
                 xbeta = ageWeight + ageLogSQWeight+sexWeight + raceWeight + smokerWeight + totchlWeight+ chlAgeWeight+ hdlcWeight+ageHdlWeight+
                         bpSysbpMedWeight+bpSysbpAgeWeight+ageSmokeWeight+ statinWeight+ a1cWeight+egfrWeight+ insulinWeight+sulfonylWeight+
                         otherDiabWeight+microAlbWeight;
                eXbeta = Math.exp(xbeta-49.7547);
                risk = 1 - Math.pow(0.94992,eXbeta);
                return numberFormat(risk*100,2);
                }   

//now calculate mi
function calc_MI() 
/*
 * function:    calc_MI()
 * Description: calculates the risk of MI using diabetes fields
 */
{
                //declare a totscore variable
                var totScore;
                //declare variables to hold the rest
                var age, ageWeight, ageLogSQWeight,sex, sexWeight,race,  raceWeight, smoker, smokerWeight, hypertension, hypertension_t, statin, statin_t,
                        systolic, totchl,totchlWeight, chlAgeWeight, hdlc, hdlcWeight,ageHdlWeight,bpMed, bpSysbpMedWeight,bpSysbpAgeWeight,ageSmokeWeight,
                        a1c, a1cWeight,egfr,egfrWeight,insulin, insulinWeight,sulfonyl, sulfonylWeight,otherDiab, otherDiabWeight,microAlb, 
                        microAlbWeight;
                age = parseInt($("#txtAge").val());
                ageWeight = Math.log(age)*33.5917;
                ageLogSQWeight = Math.log(age)*Math.log(age)*-3.95840;
                if ($("input[name = 'Sex']:checked").val() === "Male")
                    sex = 0;
                else
                    sex = 1;
                sexWeight = sex * -0.14536;
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    race = 0;
                else if (race_t === 'African American')
                    race = 1;
                else
                    race = 0;
                raceWeight = race * -0.26031;
                if ($("input[name = 'Smoker']:checked").val() === "Yes")
                    smoker = 1;
                else
                    smoker = 0;
                smokerWeight = smoker * 2.15214;
                totchl = parseInt($("#TotChol").val());
                totchlWeight = Math.log(totchl)*1.70872;
                chlAgeWeight = Math.log(totchl)*Math.log(age)*-0.22920;
                hdlc=parseInt($("#HDL").val());
                hdlcWeight = Math.log(hdlc) * -1.78410;
                ageHdlWeight = Math.log(hdlc)*Math.log(age)*0.29576;
                if ($("input[name = 'Hypertension']:checked").val() === "No")
                    bpMed = 0;
                else
                    bpMed = 1;
                bpSys = parseInt($("#BP_Sys").val());
                bpSysbpMedWeight = Math.log(bpSys)*bpMed*0.87932;
                bpSysbpAgeWeight = Math.log(age)*Math.log(bpSys)*bpMed*-0.21101;
                ageSmokeWeight = Math.log(age)*smoker*-0.47557;        
                if ($("input[name = 'Statin']:checked").val() === "Yes")
                    statinWeight = 0.037998;
                else
                    statinWeight = 0;
                
                if ($("input[name = 'Diabetes']:checked").val() === "Yes")
                {
                    a1c = parseInt($("#A1C").val());
                    a1cWeight = Math.log(a1c)*0.86555;
                    egfr = parseInt($("#eGFR").val());
                    egfrWeight = Math.log(egfr)*-0.43044;
                    if ($("input[name = 'Insulin']:checked").val() === "No")
                        insulin = 0;
                    else
                        insulin = 1;
                    insulinWeight = insulin * 0.27731;
                    if ($("input[name = 'SulfonlyUrea']:checked").val() === "No")
                        sulfonyl = 0;
                    else
                        sulfonyl = 1;
                    sulfonylWeight = sulfonyl * 0.082256;
                    if ($("input[name = 'OtherDMeds']:checked").val() === "No")
                        otherDiab = 0;
                    else
                        otherDiab = 1;
                    otherDiabWeight = otherDiab * -0.059207;
                    microAlb = parseInt($("#mcAlb").val());
                    microAlbWeight = microAlb * 0.001920131;   
                }
                else
                {
                    a1cWeight = 0;
                    egfrWeight = 0;
                    insulinWeight=0;
                    sulfonylWeight = 0;
                    otherDiabWeight = 0;
                    microAlbWeight = 0;
                }
                 xbeta = ageWeight + ageLogSQWeight+sexWeight + raceWeight + smokerWeight + totchlWeight+ chlAgeWeight+ hdlcWeight+ageHdlWeight+
                         bpSysbpMedWeight+bpSysbpAgeWeight+ageSmokeWeight+ statinWeight+ a1cWeight+egfrWeight+ insulinWeight+sulfonylWeight+
                         otherDiabWeight+microAlbWeight;
                eXbeta = Math.exp(xbeta-72.9997);
                risk = 1 - Math.pow(0.97855,eXbeta);
                return numberFormat(risk*100,2);
                }   
                
   //calc AIS
   function calc_AIS() 
/*
 * function:    calc_AIS()
 * Description: calculates the risk of AIS using diabetes fields
 */
{
                //declare a totscore variable
                var totScore;
                //declare variables to hold the rest
                var age, ageWeight, ageLogSQWeight,sex, sexWeight,race,  raceWeight, smoker, smokerWeight, hypertension, hypertension_t, statin, statin_t,
                        systolic, totchl,totchlWeight, chlAgeWeight, hdlc, hdlcWeight,ageHdlWeight,bpMed, bpSysbpMedWeight,bpSysbpAgeWeight,ageSmokeWeight,
                        a1c, a1cWeight,egfr,egfrWeight,insulin, insulinWeight,sulfonyl, sulfonylWeight,otherDiab, otherDiabWeight,microAlb, 
                        microAlbWeight;
                age = parseInt($("#txtAge").val());
                ageWeight = Math.log(age)*25.7558;
                ageLogSQWeight = Math.log(age)*Math.log(age)*-2.67664;
                if ($("input[name = 'Sex']:checked").val() === "Male")
                    sex = 0;
                else
                    sex = 1;
                sexWeight = sex * -0.13267;
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    race = 0;
                else if (race_t === 'African American')
                    race = 1;
                else
                    race = 0;
                raceWeight = race * 0.26215;
                if ($("input[name = 'Smoker']:checked").val() === "Yes")
                    smoker = 1;
                else
                    smoker = 0;
                smokerWeight = smoker * 4.29949;
                totchl = parseInt($("#TotChol").val());
                totchlWeight = Math.log(totchl)*-0.17577;
                chlAgeWeight = Math.log(totchl)*Math.log(age)*0.19084;
                hdlc=parseInt($("#HDL").val());
                hdlcWeight = Math.log(hdlc) * 1.88671;
                ageHdlWeight = Math.log(hdlc)*Math.log(age)*-0.50053;
                if ($("input[name = 'Hypertension']:checked").val() === "No")
                    bpMed = 0;
                else
                    bpMed = 1;
                bpSys = parseInt($("#BP_Sys").val());
                bpSysbpMedWeight = Math.log(bpSys)*bpMed*0.81686;
                bpSysbpAgeWeight = Math.log(age)*Math.log(bpSys)*bpMed*-0.18904;
                ageSmokeWeight = Math.log(age)*smoker*-1.01281;        
                if ($("input[name = 'Statin']:checked").val() === "Yes")
                    statinWeight = -0.053618;
                else
                    statinWeight = 0;
                
                if ($("input[name = 'Diabetes']:checked").val() === "Yes")
                {
                    a1c = parseInt($("#A1C").val());
                    a1cWeight = Math.log(a1c)*1.08183;
                    egfr = parseInt($("#eGFR").val());
                    egfrWeight = Math.log(egfr)*-0.16523;
                    if ($("input[name = 'Insulin']:checked").val() === "No")
                        insulin = 0;
                    else
                        insulin = 1;
                    insulinWeight = insulin * 0.17974;
                    if ($("input[name = 'SulfonlyUrea']:checked").val() === "No")
                        sulfonyl = 0;
                    else
                        sulfonyl = 1;
                    sulfonylWeight = sulfonyl * 0.080476;
                    if ($("input[name = 'OtherDMeds']:checked").val() === "No")
                        otherDiab = 0;
                    else
                        otherDiab = 1;
                    otherDiabWeight = otherDiab * -0.074728;
                    microAlb = parseInt($("#mcAlb").val());
                    microAlbWeight = microAlb * 0.002229916;   
                }
                else
                {
                    a1cWeight = 0;
                    egfrWeight = 0;
                    insulinWeight=0;
                    sulfonylWeight = 0;
                    otherDiabWeight = 0;
                    microAlbWeight = 0;
                }
                 xbeta = ageWeight + ageLogSQWeight+sexWeight + raceWeight + smokerWeight + totchlWeight+ chlAgeWeight+ hdlcWeight+ageHdlWeight+
                         bpSysbpMedWeight+bpSysbpAgeWeight+ageSmokeWeight+ statinWeight+ a1cWeight+egfrWeight+ insulinWeight+sulfonylWeight+
                         otherDiabWeight+microAlbWeight;
                eXbeta = Math.exp(xbeta-64.6638);
                risk = 1 - Math.pow(0.98002,eXbeta);
                return numberFormat(risk*100,2);
                }  
                
   //cvd deaths
   function calc_Death() 
/*
 * function:    calc_Death()
 * Description: calculates the CVD deaths using diabetes fields
 */
{
                //declare a totscore variable
                var totScore;
                //declare variables to hold the rest
                var age, ageWeight, ageLogSQWeight,sex, sexWeight,race,  raceWeight, smoker, smokerWeight, hypertension, hypertension_t, statin, statin_t,
                        systolic, totchl,totchlWeight, chlAgeWeight, hdlc, hdlcWeight,ageHdlWeight,bpMed, bpSysbpMedWeight,bpSysbpAgeWeight,ageSmokeWeight,
                        a1c, a1cWeight,egfr,egfrWeight,insulin, insulinWeight,sulfonyl, sulfonylWeight,otherDiab, otherDiabWeight,microAlb, 
                        microAlbWeight;
                age = parseInt($("#txtAge").val());
                ageWeight = Math.log(age)*-15.5846;
                ageLogSQWeight = Math.log(age)*Math.log(age)*3.01077;
                if ($("input[name = 'Sex']:checked").val() === "Male")
                    sex = 0;
                else
                    sex = 1;
                sexWeight = sex * -0.31028;
                race_t = $("input[name = 'Race']:checked").val();
                if (race_t === 'White')
                    race = 0;
                else if (race_t === 'African American')
                    race = 1;
                else
                    race = 0;
                raceWeight = race * 0.016973;
                if ($("input[name = 'Smoker']:checked").val() === "Yes")
                    smoker = 1;
                else
                    smoker = 0;
                smokerWeight = smoker * 3.06123;
                totchl = parseInt($("#TotChol").val());
                totchlWeight = Math.log(totchl)*0.40314;
                chlAgeWeight = Math.log(totchl)*Math.log(age)*-0.009322967;
                hdlc=parseInt($("#HDL").val());
                hdlcWeight = Math.log(hdlc) * 5.91861;
                ageHdlWeight = Math.log(hdlc)*Math.log(age)*-1.44213;
                if ($("input[name = 'Hypertension']:checked").val() === "No")
                    bpMed = 0;
                else
                    bpMed = 1;
                bpSys = parseInt($("#BP_Sys").val());
                bpSysbpMedWeight = Math.log(bpSys)*bpMed*-0.13179;
                bpSysbpAgeWeight = Math.log(age)*Math.log(bpSys)*bpMed*0.0373375;
                ageSmokeWeight = Math.log(age)*smoker*-0.76306;        
                if ($("input[name = 'Statin']:checked").val() === "Yes")
                    statinWeight = -0.16998;
                else
                    statinWeight = 0;
                
                if ($("input[name = 'Diabetes']:checked").val() === "Yes")
                {
                    a1c = parseInt($("#A1C").val());
                    a1cWeight = Math.log(a1c)*0.74074;
                    egfr = parseInt($("#eGFR").val());
                    egfrWeight = Math.log(egfr)*-0.59522;
                    if ($("input[name = 'Insulin']:checked").val() === "No")
                        insulin = 0;
                    else
                        insulin = 1;
                    insulinWeight = insulin * 0.44208;
                    if ($("input[name = 'SulfonlyUrea']:checked").val() === "No")
                        sulfonyl = 0;
                    else
                        sulfonyl = 1;
                    sulfonylWeight = sulfonyl * 0.19415;
                    if ($("input[name = 'OtherDMeds']:checked").val() === "No")
                        otherDiab = 0;
                    else
                        otherDiab = 1;
                    otherDiabWeight = otherDiab * -0.13477;
                    microAlb = parseInt($("#mcAlb").val());
                    microAlbWeight = microAlb * 0.003061906;   
                }
                else
                {
                    a1cWeight = 0;
                    egfrWeight = 0;
                    insulinWeight=0;
                    sulfonylWeight = 0;
                    otherDiabWeight = 0;
                    microAlbWeight = 0;
                }
                 xbeta = ageWeight + ageLogSQWeight+sexWeight + raceWeight + smokerWeight + totchlWeight+ chlAgeWeight+ hdlcWeight+ageHdlWeight+
                         bpSysbpMedWeight+bpSysbpAgeWeight+ageSmokeWeight+ statinWeight+ a1cWeight+egfrWeight+ insulinWeight+sulfonylWeight+
                         otherDiabWeight+microAlbWeight;
                eXbeta = Math.exp(xbeta+12.3901);
                risk = 1 - Math.pow(0.98686,eXbeta);
                return numberFormat(risk*100,2);
                }   
