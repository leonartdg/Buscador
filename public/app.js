//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()
var url = "data.json";

/* Mostrar Resultados*/
function appendHTML(){
  $('.lista').empty()
  if ($('#personalizada').hasClass('invisible')) {
    $.get(url, function(response){
        $.each(response, function(i){
          $('.lista').append(`<div class="card horizontal"><div class="card-image"><img src="img/home.jpg"></div><div class="card-stacked"><div class="card-content"><div><b>Direccion: ${response[i].Direccion}</b><p></p></div>
            <div><b>Ciudad: ${response[i].Ciudad}</b><p></p></div><div><b>Telefono: ${response[i].Telefono}</b><p></p></div><div><b>Código postal: ${response[i].Codigo_Postal}</b><p></p></div><div><b>Precio: ${response[i].Precio}</b><p></p></div><div><b>Tipo: ${response[i].Tipo}</b><p></p></div></div><div class="card-action right-align"><a href="#">Ver más</a></div></div></div>`);
        })
      })
  }else{
    $.get(url, function(response){
      var precioArray = [],
          valorCiudad = $('select#ciudad option:checked').val(),
          valorTipo = $('select#tipo option:checked').val(),
          preciomin= ($('span.irs-from').text()).replace(/[$]|[ ]/gi,''),
          preciomax= ($('span.irs-to').text()).replace(/[$]|[ ]/gi,'');
        
      $.each(response, function(i){
        var precio = response[i].Precio.replace(/[$]|,/gi,''),
            tipo = response[i].Tipo,
            ciudad = response[i].Ciudad;
          if (precio >= preciomin && precio <= preciomax){
            if (valorTipo == '' && valorCiudad == ''){
              precioArray.push(response[i]);
            }else if(valorTipo == '' && valorCiudad == ciudad){
              precioArray.push(response[i]);
            }else if(valorCiudad == '' && valorTipo == tipo){
              precioArray.push(response[i]);
            }else if (valorTipo == tipo && valorCiudad == ciudad) {              
              precioArray.push(response[i]);
            }
          }else{
            return;
          }
      })
        $.each(precioArray, function(i){
          $('.lista').append(`<div class="card horizontal"><div class="card-image"><img src="img/home.jpg"></div><div class="card-stacked"><div class="card-content"><div><b>Direccion: ${precioArray[i].Direccion}</b><p></p></div>
            <div><b>Ciudad: ${precioArray[i].Ciudad}</b><p></p></div><div><b>Telefono: ${precioArray[i].Telefono}</b><p></p></div><div><b>Código postal: ${precioArray[i].Codigo_Postal}</b><p></p></div><div><b>Precio: ${precioArray[i].Precio}</b><p></p></div><div><b>Tipo: ${precioArray[i].Tipo}</b><p></p></div></div><div class="card-action right-align"><a href="#">Ver más</a></div></div></div>`);
        })
    })
  }
}

/* Mostrar Resultados*/
function menuCiudad(){
$.get(url, function(response){
  var hash = {};
  array = response.filter(function(current) {
    var exists = !hash[current.Ciudad] || false;
    hash[current.Ciudad] = true;
    return exists;
  });
  $.each(array, function(i){
    $('#ciudad').append(`<option value="${array[i].Ciudad}">${array[i].Ciudad}</option>`);
    i++
  })
})
}

function menuTipos(){
$.get(url, function(response){
  var hash = {};
  array = response.filter(function(current) {
    var exists = !hash[current.Tipo] || false;
    hash[current.Tipo] = true;
    return exists;
  });
  $.each(array, function(i){
    $('#tipo').append(`<option value="${array[i].Tipo}">${array[i].Tipo}</option>`);
    i++
  })
})
}


  /* Iniciar funciones */
$(function(){
  $(menuCiudad);
  $(menuTipos);
  $('#buscar').click(appendHTML);
})
