$(document).ready(function () {

//Variables Globales//
  var VerticalSearch=0;

  var newCandys=0;

  var Col=["","","","","","",""];

  var Rest=["","","","","","",""];

  var nuevosDulces=0;

  var cronos=0;

  var Max=0;

  var nuevosDulces=0;

  var matriz=0;

  var intervalo=0;

  var eliminar=0;

  var i=0;

  var contadorTotal=0;

  var espera=0;

  var score=0;

  var mov=0;

  var min=2;

  var seg=0;

  var HoriSearch=0;
//Variables Globales//

  //Animacion Titulo Principal//
  setInterval(function(){
    var Cprincipal=$(".main-titulo").css("color");
    if(Cprincipal=="rgb(220, 255, 14)"){
      $(".main-titulo").css("color","white");
    }else{
      $(".main-titulo").css("color","#DCFF0E");
    }
  },1000);
//Animacion Titulo Principal//

  //Boton Iniciar y Reiniciar//
  $(".btn-reinicio").on("click",function(){
  	  $(".panel-tablero").show();

  	  $(".time").show();

  	  $("#score-text").html("0");

  	  $("#movimientos-text").html("0");

  	  $(this).html("Reiniciar")

  	clearInterval(intervalo);
    
  	clearInterval(eliminar);
  	clearInterval(nuevosDulces);
  	clearInterval(cronos);
  	min=2;
  	seg=0;
  	DeleteAll();
  	intervalo=setInterval(function(){
  		randomCandys()
  	},600);
  	cronos=setInterval(function(){
  		crono()
  	},1000);
  });
  //Boton Iniciar y Reiniciar//

  //Empezar//
  function randomCandys(){
  	i=i+1
  	var numero=0;
  	var imagen=0;
  	$(".elemento").draggable({disabled:true});
  	if(i<8){
  		for(var j=1;j<8;j++){

  			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){

  				numero=Math.floor(Math.random()*4)+1;
  				imagen="image/"+numero+".png";
  				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")

  			}}}

  	if(i==8){

  	clearInterval(intervalo);

  	eliminar=setInterval(function(){
  		DeleteCandys()
  	},150);}

  };
//Empezar//
  //Cronometro//
  function crono(){

  	if(seg!=0){

  		seg=seg-1;}

  	if(seg==0){

  		if(min==0){
  			clearInterval(eliminar);
  			clearInterval(nuevosDulces);
  			clearInterval(intervalo);
  			clearInterval(cronos);
  			$(".panel-tablero").hide("drop","slow",movmentandCandys);
  			$(".time").hide();

      }
  		seg=59;
  		min=min-1;
    }

  	$("#crono").html("0"+min+":"+seg);
  };
  //Cronometro//

  //Movments and Points//
  function movmentandCandys(){
  	$( ".panel-score" ).animate({width:'100%'},3000);
  	$(".termino").css({"display":"block","text-align":"center"});
  };
    //Movments and Points//

  //Delete All//
  function DeleteAll(){
  	for(var j=1;j<8;j++){
  		$(".col-"+j).children("img").detach();}
  };
  //Delete All//

  //Eliminar Dulces//
  function DeleteCandys(){
  	matriz=0;
  	HoriSearch=horizontal();
  	VerticalSearch=vertical();
  	for(var j=1;j<8;j++){
  		matriz=matriz+$(".col-"+j).children().length;}
  	if(HoriSearch==0 && VerticalSearch==0 && matriz!=49){
  		clearInterval(eliminar);
  		newCandys=0;
  		nuevosDulces=setInterval(function(){
  			nuevosdulces()
  		},600);}

  	if(HoriSearch==1||VerticalSearch==1){
  		$(".elemento").draggable({disabled:true});
  		$("div[class^='col']").css("justify-content","flex-end");
  		$(".activo").hide("pulsate",1000,function(){
  			var scoretmp=$(".activo").length;
  			$(".activo").remove("img");
  			score=score+scoretmp*10;
  			$("#score-text").html(score);
  		});
  	}
  	if(HoriSearch==0 && VerticalSearch==0 && matriz==49){
  		$(".elemento").draggable({
  			disabled:false,
  			containment:".panel-tablero",
  			revert:true,
  			revertDuration:0,
  			snap:".elemento",
  			snapMode:"inner",
  			snapTolerance:40,
  			start:function(event,ui){
  				mov=mov+1;
  				$("#movimientos-text").html(mov);}
  		});
  	}
  	$(".elemento").droppable({
  		drop:function (event,ui){
  			var dropped=ui.draggable;
  			var droppedOn=this;
  			espera=0;
  			do{
  				espera=dropped.swap($(droppedOn));}

  			while(espera==0);

  			HoriSearch=horizontal();

  			VerticalSearch=vertical();
  			if(HoriSearch==0 && VerticalSearch==0){

  				dropped.swap($(droppedOn));}

  			if(HoriSearch==1 || VerticalSearch==1){

  				clearInterval(nuevosDulces);

  				clearInterval(eliminar);

  				eliminar=setInterval(function(){

  					DeleteCandys()
  				},150);}},
  	});
  };
//Eliminar Dulces//

  jQuery.fn.swap=function(b){
  	b=jQuery(b)[0];

  	var a=this[0];
  	var t=a.parentNode.insertBefore(document.createTextNode(''),a);

  	b.parentNode.insertBefore(a,b);
  	t.parentNode.insertBefore(b,t);
  	t.parentNode.removeChild(t);


  	return this;
  };


  //BusquedaVerticarl Dulces//
  function vertical(){
  	var Verti=0;
  	for(var i=1;i<6;i++){
  		for(var j=1;j<8;j++){
  			var res1=$(".col-"+j).children("img:nth-child("+i+")").attr("src");
  			var res2=$(".col-"+j).children("img:nth-child("+(i+1)+")").attr("src");
  			var res3=$(".col-"+j).children("img:nth-child("+(i+2)+")").attr("src");
  			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
  				$(".col-"+j).children("img:nth-child("+(i)+")").attr("class","elemento activo");
  				$(".col-"+j).children("img:nth-child("+(i+1)+")").attr("class","elemento activo");
  				$(".col-"+j).children("img:nth-child("+(i+2)+")").attr("class","elemento activo");
  				Verti=1;
  			}
  		}
  	}
  	return Verti;
  };
  //BusquedaVerticarl Dulces//

  //BusquedaHorizontal Dulces//
  function horizontal(){
    var busHori=0;
    for(var j=1;j<8;j++){
      for(var k=1;k<6;k++){
        var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
        var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
        var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
        if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
          $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
          $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
          $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
          busHori=1;
        }
      }
    }
    return busHori;
  };
  //BusquedaHorizontal Dulces//

//Crear Caramelos//
function nuevosdulces(){
  $(".elemento").draggable({disabled:true});
  $("div[class^='col']").css("justify-content","flex-start")
  for(var j=1;j<8;j++){
    Col[j-1]=$(".col-"+j).children().length;}
  if(newCandys==0){
    for(var j=0;j<7;j++){
      Rest[j]=(7-Col[j]);}
    Max=Math.max.apply(null,Rest);
    contadorTotal=Max;}
  if(Max!=0){
    if(newCandys==1){
      for(var j=1;j<8;j++){
        if(contadorTotal>(Max-Rest[j-1])){
          $(".col-"+j).children("img:nth-child("+(Rest[j-1])+")").remove("img");}}
    }
    if(newCandys==0){
      newCandys=1;
      for(var k=1;k<8;k++){
        for(var j=0;j<(Rest[k-1]-1);j++){
          $(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
    }
    for(var j=1;j<8;j++){
      if(contadorTotal>(Max-Rest[j-1])){
        numero=Math.floor(Math.random()*4)+1;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
    }
  }
  if(contadorTotal==1){
    clearInterval(nuevosDulces);
    eliminar=setInterval(function(){
      DeleteCandys()
    },150);
  }
  contadorTotal=contadorTotal-1;
};
  //Crear Caramelos//

});
