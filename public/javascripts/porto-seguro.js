var value = 0;
function mudarImage(){

    value = 0;
  //  $("#progress-bar").show();
  //  $("#div-img-boneco").hide();
    
//    barAnim();
 
    var qualidadeAlimentacao = $("#qualidade-alimentacao").val();
    var frequenciaExercicioFisico = $("#frequencia-exercidio").val();
    
    if(qualidadeAlimentacao == "0" && frequenciaExercicioFisico == "0"){
        $("#img-boneco").attr('src', 'img/gordo2.png');
    }
    if(qualidadeAlimentacao == "0" && frequenciaExercicioFisico == "1"){
        $("#img-boneco").attr('src', 'img/normal2.png');
    }
    if(qualidadeAlimentacao == "0" && frequenciaExercicioFisico == "2"){
        $("#img-boneco").attr('src', 'img/magro2.png');
    }
    if(qualidadeAlimentacao == "1" && frequenciaExercicioFisico == "0"){
        $("#img-boneco").attr('src', 'img/normal2.png');
    }
    if(qualidadeAlimentacao == "1" && frequenciaExercicioFisico == "1"){
        $("#img-boneco").attr('src', 'img/normal2.png');
    }
    if(qualidadeAlimentacao == "1" && frequenciaExercicioFisico == "2"){
        $("#img-boneco").attr('src', 'img/magro2.png');
    }
    if(qualidadeAlimentacao == "2" && frequenciaExercicioFisico == "0"){
        $("#img-boneco").attr('src', 'img/normal2.png');
    }
    if(qualidadeAlimentacao == "2" && frequenciaExercicioFisico == "1"){
        $("#img-boneco").attr('src', 'img/magro2.png');
    }
    if(qualidadeAlimentacao == "2" && frequenciaExercicioFisico == "2"){
        $("#img-boneco").attr('src', 'img/magro2.png');
    }
      
 //   setTimeout(showImage, 3200);
}

function progressaBar(){

     $('.progress .progress-bar').progressbar({
                display_text: 'fill',
     });
}



function barAnim(){

    value += 5;
    $( ".progress-bar" ).css( "width", value + "%" ).attr( "aria-valuenow", value ); 
    
    $( "#text-progress").html(value + "% processando...");
    if ( value == 25 || value == 55 || value == 85 ) { 
        return setTimeout(barAnim, 500); 
    }
    
    return value >= 100 || setTimeout(barAnim, 50);
    
}

function showImage(){

    $("#div-img-boneco").show();
    $("#progress-bar").hide();
    
}
