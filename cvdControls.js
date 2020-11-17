var txtAgeToolTipOn = 1;
var bpSysToolTipOn = 1;
var bpDiaToolTipOn = 1;
var totCholToolTipOn = 1;
var HDLToolTipOn = 1;
var LDLToolTipOn = 1;

$(function () {
    $(".controlgroup").controlgroup()
    $(".controlgroup-vertical").controlgroup({
        "direction": "vertical"
    });
});
// get selection
$('.colors input[type=radio]').on('change', function () {
    console.log(this.value);
});
$("input:radio[name='thename']").each(function (i) {
    this.checked = false;
});
$(document).ready(function () {
    $("#txtAge").focus();
    $("#txtAge").tooltip({title: "Please enter an age between 20 and 79", placement: "bottom", trigger: "manual"});
    $("#sexMark").tooltip({title: "Please choose either Male or Female", placement: "bottom", trigger: "manual"});
    $("#raceMark").tooltip({title: "Please choose White or African American", placement: "bottom", trigger: "manual"});
    $("#BP_Sys").tooltip({title: "Please enter a systolic blood pressure between 80 and 300 mm HG", placement: "right", trigger: "manual"});
    $("#diabMark").tooltip({title: "Please choose either yes or no", placement: "bottom", trigger: "manual"});
    $("#smokeMark").tooltip({title: "Please choose either yes or no", placement: "bottom", trigger: "manual"});
    $("#hyperMark").tooltip({title: "Please choose either yes or no", placement: "bottom", trigger: "manual"});
    $("#statinMark").tooltip({title: "Please choose either yes or no", placement: "bottom", trigger: "manual"});
    $("#BP_Dia").tooltip({title: "Please enter a diastolic blood pressure between 50 and 180 mm HG", placement: "right", trigger: "manual"});
    $("#TotChol").tooltip({title: "Please enter total cholesterol between 1 and 500 mg/dL", placement: "bottom", trigger: "manual"});
    $("#HDL").tooltip({title: "Please enter HDL cholesterol between 1 and 150 mg/dL", placement: "bottom", trigger: "manual"});
    $("#LDL").tooltip({title: "Please enter LDL cholesterol between 1 and 400 mg/dL", placement: "bottom", trigger: "manual"});
    $("#eGFR").tooltip({title: "Please enter an eGFR value greater than zero.", placement: "bottom",trigger: "manual"});
    $("#insMark").tooltip({title: "Please choose either yes or no",placement: "bottom", trigger: "manual"});
    $("#othmedMark").tooltip({title: "Please choose either yes or no",placement: "bottom", trigger: "manual"});
    $("#sulfMark").tooltip({title: "Please choose either yes or no",placement: "bottom", trigger: "manual"});
    $("#A1C").tooltip({title: "Please enter an A1C value between 1 and 100%", placement: "bottom", trigger: "manual"});
    $("#mcAlb").tooltip({title: "Please enter a value greater than 0", placement: "bottom", trigger: "manual"});
    $(".diabetesFields").hide();
    /*$('#myForm').on('submit', function(e){
     e.preventDefault();
     this.submit();
     calc_risk();
     });*/
    $('#sub').on('click', function (event) {
        var isvalidate = $("#myForm")[0].checkValidity();
        var diabFlds = false;
        if ($("input[name = 'Diabetes']:checked").val() === "Yes")
        {
            diabFlds = true;
        }   
        if ((isvalidate) && ((!diabFlds && txtAge_Val() && bpSys_Val() && bpDia_Val() && totChol_Val() && HDL_Val() && LDL_Val()) 
                || (diabFlds && txtAge_Val() && bpSys_Val() && bpDia_Val() && totChol_Val() && HDL_Val() && LDL_Val() && mcAlb_Val() && A1C_Val() && eGFR_Val()))) {
            event.preventDefault();
             if ($("input[name = 'Diabetes']:checked").val() === "Yes")
             {
                 $('#message').html('Your 5-year ASCVD risk is: ' + calc_ASCVD()+"%"+"<br/>"
                         +'Your MI risk is: ' +calc_MI()+"%<br/>"+
                         "Your AIS risk is: "+calc_AIS()+"%<br/>"+
                         "Your CVD Death risk is: "+calc_Death()+"%<br/>");
             }
             else
             {
                  $('#message').html('Your 5-year ASCVD risk is: ' + calc_risk()+"%");
             }
           
            $('#myModal').modal('show');
        } else
        {
            if (txtAge_Val())
            {
                txtAgeToolTipOn = 1;
                $("#txtAge").tooltip("hide");
                if (($("input[name = 'Sex']:checked").val() != 'Male') && ($("input[name = 'Sex']:checked").val() != 'Female'))
                {
                    $("#sexMark").tooltip("show");
                    $("#Sex").focus();
                } else
                {
                    $("#sexMark").tooltip("hide");
                    if (($("input[name = 'Race']:checked").val() != 'White') && ($("input[name = 'Race']:checked").val() != 'AfrAm')
                            && ($("input[name = 'Race']:checked").val() != 'Hisp') && ($("input[name = 'Race']:checked").val() != 'Other'))
                    {
                        $("#raceMark").tooltip("show");
                        $("#Race").focus();
                    } else
                    {
                        $("#raceMark").tooltip("hide");
                        if (($("input[name = 'Diabetes']:checked").val() != 'Yes') && ($("input[name = 'Diabetes']:checked").val() != 'No'))
                        {
                            $("#diabMark").tooltip("show");
                            $("#diab").focus();
                        } else
                        {
                            $("#diabMark").tooltip("hide");
                            if (($("input[name = 'Smoker']:checked").val() != 'Yes') && ($("input[name = 'Smoker']:checked").val() != 'No'))
                            {
                                $("#smokeMark").tooltip("show");
                                $("#smoker").focus();
                            } else
                            {
                                $("#smokeMark").tooltip("hide");
                                if (($("input[name = 'Hypertension']:checked").val() != 'Yes') && ($("input[name = 'Hypertension']:checked").val() != 'No'))
                                {
                                    $("#hyperMark").tooltip("show");
                                    $("#Hypertension").focus();
                                } else
                                {
                                    $("#hyperMark").tooltip("hide");
                                    if (($("input[name = 'Statin']:checked").val() !== 'Yes') && ($("input[name = 'Statin']:checked").val() !== 'No'))
                                    {
                                        $("#statinMark").tooltip("show");
                                        $("#Statin").focus();
                                    } else
                                    {
                                        $("#statinMark").tooltip("hide");
                                        if (!(bpSys_Val()))
                                        {
                                            $("#bpSys").tooltip("show");
                                            $("#bpSys").focus();
                                        } else
                                        {
                                            $("#bpSys").tooltip("hide");
                                            bpSysToolTipOn = 1;
                                            if (!(bpDia_Val()))
                                            {
                                                $("#bpDia").tooltip("show");
                                                $("#bpDia").focus();
                                            } else
                                            {
                                                $("#bpDia").tooltip("hide");
                                                bpDiaToolTipOn = 1;
                                                if (!(totChol_Val()))
                                                {
                                                    $("#totChol").tooltip("show");
                                                    $("#totChol").focus();
                                                } else
                                                {
                                                    $("#totChol").tooltip("hide");
                                                    totCholToolTipOn = 1;
                                                    if (!(HDL_Val()))
                                                    {
                                                        $("#HDL").tooltip("show");
                                                        $("#HDL").focus();
                                                    } else
                                                    {
                                                        $("#HDL").tooltip("hide");
                                                        HDLToolTipOn  = 1;
                                                        if (!(LDL_Val()))
                                                        {
                                                            $("#LDL").tooltip("show");
                                                            $("#LDL").focus();
                                                        } else
                                                        {
                                                            $("#LDL").tooltip("hide");
                                                            /*now check diabetic labs only if diabetes was set to yes */
                                                            if ($("input[name = 'Diabetes']:checked").val() === 'Yes')
                                                            {
                                                                /*check all diabetes fields*/
                                                                if (!(eGFR_Val()))
                                                                {
                                                                    $("#eGFR").tooltip("show");
                                                                    $("#eGFR").focus();
                                                                }
                                                                else
                                                                {
                                                                     $("#eGFR").tooltip("hide");
                                                                     if (($("input[name = 'Insulin']:checked").val() !== 'Yes') && ($("input[name = 'Insulin']:checked").val() !== 'No'))
                                                                     {
                                                                         $("#insMark").tooltip("show");
                                                                         $("#insMark").focus();
                                                                     }
                                                                     else
                                                                     {
                                                                         $("#insMark").tooltip("hide");
                                                                         if (($("input[name = 'OtherDMeds']:checked").val() !== 'Yes') && ($("input[name = 'OtherDMeds']:checked").val() !== 'No')) 
                                                                         {
                                                                            $("#othmedMark").tooltip("show");
                                                                            $("#othmedMark").focus();
                                                                         }
                                                                         else
                                                                         {
                                                                            $("#othmedMark").tooltip("hide");
                                                                            
                                                                            if (($("input[name = 'SulfonlyUrea']:checked").val() !== 'Yes') && ($("input[name = 'SulfonlyUrea']:checked").val() !== 'No')) 
                                                                             {
                                                                                $("#sulfMark").tooltip("show");
                                                                                $("#sulfMark").focus(); 
                                                                             }
                                                                             else
                                                                             {
                                                                                 $("#sulfMark").tooltip("hide");
                                                                                 if (!(mcAlb_Val()))
                                                                                 {
                                                                                    $("#mcAlb").tooltip("show");
                                                                                    $("#mcAlb").focus();  
                                                                                 }
                                                                                 else
                                                                                 {
                                                                                     $("#mcAlb").tooltip("hide");
                                                                                     if (!(A1C_Val()))
                                                                                        {
                                                                                            $("#A1C").tooltip("show");
                                                                                            $("#A1C").focus();
                                                                                        } else
                                                                                        {
                                                                                            $("#A1C").tooltip("hide");
                                                                                        }
                                                                                 }
                                                                                 
                                                                             }
                                                                         }
                                                                     }
                                                                         
                                                                }

                                                                                        
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            
                        
                    
             
    });
    $("#txtAge").blur(function () {
        if (txtAge_Val())
        {
            txtAgeToolTipOn = 1;
        }
    });

    $("input[name='Sex']").change(function () {
        $("#sexMark").tooltip("hide");
        if ($("input[name='Sex']:checked").val()==="Male")
        {
            $("#sexMark").addClass("btn-selected");
            $("#maleGlyph").show();
            $("#femaleGlyph").hide();            
            $("#sexMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#sexMark1").addClass("btn-selected");
            $("#femaleGlyph").show();
            $("#maleGlyph").hide();
            $("#sexMark").removeClass("btn-selected");
        }
        $("#Race").focus();
    });

    $("input[name='Race']").change(function () {
        $("#raceMark").tooltip("hide");
        if ($("input[name='Race']:checked").val()==="White")
        {
            $("#raceMark").addClass("btn-selected");
            $("#whiteGlyph").show();
            $("#afrAmGlyph").hide();            
            $("#raceMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#raceMark1").addClass("btn-selected");
            $("#afrAmGlyph").show();
            $("#whiteGlyph").hide();
            $("#raceMark").removeClass("btn-selected");
        }
        $("#Diabetes").focus();
    });
    $("input[name='Diabetes']").change(function () {
        $("#diabMark").tooltip("hide");
        if ($("input[name='Diabetes']:checked").val()==="Yes")
        {
            $("#diabMark").addClass("btn-selected");
            $("#diabYGlyph").show();
            $("#diabNGlyph").hide();            
            $("#diabMark1").removeClass("btn-selected");
            $(".diabetesFields").show();
            $(".diabetesFields").attr('required', '');
        }
        else
        {
            
            $("#diabMark1").addClass("btn-selected");
            $("#diabNGlyph").show();
            $("#diabYGlyph").hide();
            $("#diabMark").removeClass("btn-selected");
            $(".diabetesFields").hide();
            $(".diabetesFields").removeAttr('required');
        }
        $("#Smoker").focus();
    });
    $("input[name='Smoker']").change(function () {
        $("#smokeMark").tooltip("hide");
       if ($("input[name='Smoker']:checked").val()==="Yes")
        {
            $("#smokeMark").addClass("btn-selected");
            $("#smokeYGlyph").show();
            $("#smokeNGlyph").hide();            
            $("#smokeMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#smokeMark1").addClass("btn-selected");
            $("#smokeNGlyph").show();
            $("#smokeYGlyph").hide();
            $("#smokeMark").removeClass("btn-selected");
        }
        $("#Hypertension").focus();
    });
    $("input[name='Hypertension']").change(function (){
       $("#hyperMark").tooltip("hide");
       if ($("input[name='Hypertension']:checked").val()==="Yes")
        {
            $("#hyperMark").addClass("btn-selected");
            $("#hyperYGlyph").show();
            $("#hyperNGlyph").hide();            
            $("#hyperMark1").removeClass("btn-selected");
        }
        else
        {

            $("#hyperMark1").addClass("btn-selected");
            $("#hyperNGlyph").show();
            $("#hyperYGlyph").hide();
            $("#hyperMark").removeClass("btn-selected");
        }
       $("Statin").focus();
    });
    $("input[name='Statin']").change(function () {
        $("#statinMark").tooltip("hide");
       if ($("input[name='Statin']:checked").val()==="Yes")
        {
            $("#statinMark").addClass("btn-selected");
            $("#statinYGlyph").show();
            $("#statinNGlyph").hide();            
            $("#statinMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#statinMark1").addClass("btn-selected");
            $("#statinNGlyph").show();
            $("#statinYGlyph").hide();
            $("#statinMark").removeClass("btn-selected");
        }
        $("#BP_Sys").focus();
    });
    
    $("#BP_Sys").blur(function () {
        if (bpSys_Val())
        {
            bpSysToolTipOn = 1;
        }
    });
    $("#BP_Dia").blur(function () {
       
       if (bpDia_Val())
       {
        bpDialToolTipOn = 1;
       }
    });
    $("#BP_Dia").change(function () {
     
        if (bpDia_Val())
        {
            bpDialToolTipOn = 1;
        }
    });
    $("#TotChol").blur(function () {
       if (totChol_Val())
       {
        totCholToolTipOn = 1;
       }
    });
    $("#HDL").blur(function () {
        if (HDL_Val())
        {
            HDLToolTipOn = 1;
        }
    });
    $("#LDL").blur(function () {
       if (LDL_Val())
       {
        LDLToolTipOn = 1;
       }
    });
    /*don't think that we need to check if diabetes if yes here*/
   
       $("#egfr").blur(function () {
       if (egfr_Val())
       {
        egfrToolTipOn = 1;
       }
    });
   
       $("input[name='Statin']").change(function () {
        $("#statinMark").tooltip("hide");
       if ($("input[name='Statin']:checked").val()==="Yes")
        {
            $("#statinMark").addClass("btn-selected");
            $("#statinYGlyph").show();
            $("#statinNGlyph").hide();            
            $("#statinMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#statinMark1").addClass("btn-selected");
            $("#statinNGlyph").show();
            $("#statinYGlyph").hide();
            $("#statinMark").removeClass("btn-selected");
        }
        $("#BP_Sys").focus();
    });
    $("#mcAlb").blur(function () {
        mcAlb_Val();
    });

    $("#A1C").blur(function () {
        A1C_Val();
    });
    $("input[name='Insulin']").change(function () {
        $("#insMark").tooltip("hide");
       if ($("input[name='Insulin']:checked").val()==="Yes")
        {
            $("#insMark").addClass("btn-selected");
            $("#insYGlyph").show();
            $("#insNGlyph").hide();            
            $("#insMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#insMark1").addClass("btn-selected");
            $("#insNGlyph").show();
            $("#insYGlyph").hide();
            $("#insMark").removeClass("btn-selected");
        }
        $("#OtherDMeds").focus();
    });
    $("input[name='OtherDMeds']").change(function () {
       $("#othmedMark").tooltip("hide");
       if ($("input[name='OtherDMeds']:checked").val()==="Yes")
        {
            $("#othmedMark").addClass("btn-selected");
            $("#omYGlyph").show();
            $("#omNGlyph").hide();            
            $("#othmedMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#othmedMark1").addClass("btn-selected");
            $("#omNGlyph").show();
            $("#omYGlyph").hide();
            $("#othmedMark").removeClass("btn-selected");
        }
        $("#SulfonlyUrea").focus();
    });
    $("input[name='SulfonlyUrea']").change(function () {
       $("#sulfMark").tooltip("hide");
       if ($("input[name='SulfonlyUrea']:checked").val()==="Yes")
        {
            $("#sulfMark").addClass("btn-selected");
            $("#sulfYGlyph").show();
            $("#sulfNGlyph").hide();            
            $("#sulfMark1").removeClass("btn-selected");
        }
        else
        {
            
            $("#sulfMark1").addClass("btn-selected");
            $("#sulfNGlyph").show();
            $("#sulfYGlyph").hide();
            $("#sulfMark").removeClass("btn-selected");
        }
        $("#mcAlb").focus();
    });
    
    
});

function txtAge_Val() {
    var input = $("#txtAge");
    if ((parseInt(input.val()) < 20 || parseInt(input.val()) > 79) || (input.val() === ''))
    {
            if (txtAgeToolTipOn===1)
            {
        $("#txtAge").tooltip("show");
        input.removeClass("valid").addClass("invalid");
                $("#myForm input").prop("disabled",true);
                $("#myForm button").prop("disabled",true);
                $("#txtAge").prop("disabled",false);
        $("#txtAge").focus();
                txtAgeToolTipOn = 0;
            }
        return false;
        }
        else
    {
        $("#txtAge").tooltip("hide");
        input.removeClass("invalid").addClass("valid");
            $("#myForm input").prop("disabled",false);
            $("#myForm button").prop("disabled",false);
            $("#Sex").focus();
        return true;
    }
}
function bpSys_Val() {
    var input = $("#BP_Sys");

    if (parseInt(input.val()) < 80 || parseInt(input.val()) > 300 || input.val() === "")
    {

        if (bpSysToolTipOn ===1)
        {
        $("#BP_Sys").tooltip("show");
        $("#BP_Sys").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#BP_Sys").prop("disabled",false);
        $("#BP_Sys").focus();
            bySysToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#BP_Sys").tooltip("hide");
        $("#BP_Sys").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        $("#BP_Dia").focus();
        return true;
    }
}

function bpDia_Val() {
    var input = $("#BP_Dia");

    if (parseInt(input.val()) < 50 || parseInt(input.val()) > 180 || input.val() === "")
    {

        if (bpDiaToolTipOn ===1)
        {
        $("#BP_Dia").tooltip("show");
        $("#BP_Dia").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#BP_Dia").prop("disabled",false);
        $("#BP_Dia").focus();
            bpDiaToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#BP_Dia").tooltip("hide");
        $("#BP_Dia").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        $("#TotChol").focus();
        return true;
    }
}

function totChol_Val() {
    var input = $("#TotChol");

    if (parseInt(input.val()) < 1 || parseInt(input.val()) > 500 || input.val() === "")
    {

        if (totCholToolTipOn === 1)
        {
        $("#TotChol").tooltip("show");
        $("#TotChol").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#TotChol").prop("disabled",false); 
        $("#TotChol").focus();
            totCholToolTipOn = 0;            
        }
        return false;
    }
    else
    {
        $("#TotChol").tooltip("hide");
        $("#TotChol").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        $("#HDL").focus();
        return true;
    }
}

function HDL_Val() {
    var input = $("#HDL");

    if (parseInt(input.val()) < 1 || parseInt(input.val()) > 150 || input.val() === "")
    {

        if (HDLToolTipOn  ===1) 
        {
        $("#HDL").tooltip("show");
        $("#HDL").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#HDL").prop("disabled",false);
        $("#HDL").focus();
            HDLToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#HDL").tooltip("hide");
        $("#HDL").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        $("#LDL").focus();
        return true;
    }
}

function LDL_Val() {
    var input = $("#LDL");

    if (parseInt(input.val()) < 1 || parseInt(input.val()) > 400 || input.val() === "")
    {

        if (LDLToolTipOn ===1)
        {
        $("#LDL").tooltip("show");
        $("#LDL").removeClass("valid").addClass("invalid");
            $("#myForm input").prop("disabled",true);
            $("#myForm button").prop("disabled",true);
            $("#LDL").prop("disabled",false);
        $("#LDL").focus();
            LDLToolTipOn = 0;
        }
        return false;
    }
    else
    {
        $("#LDL").tooltip("hide");
        $("#LDL").removeClass("invalid").addClass("valid");
        $("#myForm input").prop("disabled",false);
        $("#myForm button").prop("disabled",false);
        return true;
    }
}

function mcAlb_Val()
{
    var input = $("#mcAlb");

    if (parseFloat(input.val()) < 1 || parseFloat(input.val()) > 300 || input.val() === "")
    {

        $("#mcAlb").tooltip("show");
        $("#mcAlb").removeClass("valid").addClass("invalid");
        $("#mcAlb").focus();
        return false;
    } else
    {
        $("#mcAlb").tooltip("hide");
        $("#mcAlb").removeClass("invalid").addClass("valid");
        return true;
    }
}

function A1C_Val() {
    var input = $("#A1C");

    if (parseFloat(input.val()) < 1 || parseFloat(input.val()) > 100 || input.val() === "")
    {

        $("#A1C").tooltip("show");
        $("#A1C").removeClass("valid").addClass("invalid");
        $("#A1C").focus();
        return false;
    } else
    {
        $("#A1C").tooltip("hide");
        $("#A1C").removeClass("invalid").addClass("valid");
        return true;
    }
}

function eGFR_Val() {
    var input = $("#eGFR");
    if (parseFloat(input.val()) < 1 || parseFloat(input.val()) > 300 || input.val() === "")
    {

        $("#eGFR").tooltip("show");
        $("#eGFR").removeClass("valid").addClass("invalid");
        $("#eGFR").focus();
        return false;
    } else
    {
        $("#eGFR").tooltip("hide");
        $("#eGFR").removeClass("invalid").addClass("valid");
        return true;
    }
}
