function numberFormat(val, decimalPlaces) {

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
