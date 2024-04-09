
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var v_tyle = "";
var flag = 0;
$("#car").click(function () {
  $(this).css({ 'opacity': 1.0 });

  $("#plane").css({ 'opacity': 0.5 });
  $(".plane").css({ 'display': 'none' });
  $(".car").css({ 'display': 'block' });
  v_tyle = $("#car").attr("data_name");
  $("#t_button").removeClass("dis_button");
  $("#t_button").removeAttr("disabled");
});

$("#plane").click(function () {
  $(this).css({ 'opacity': 1.0 });
  $("#car").css({ 'opacity': 0.5 });
  $(".car").css({ 'display': 'none' });
  $(".plane").css({ 'display': 'block' });
  v_tyle = $("#plane").attr("data_name");
  $("#t_button").removeClass("dis_button");
  $("#t_button").removeAttr("disabled");
});

$(".next").click(function () {
  if (v_tyle != "") {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50) + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale(' + scale + ')',
          'position': 'absolute'
        });
        next_fs.css({ 'left': left, 'opacity': opacity });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  }
});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({ opacity: 0 }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1 - now) * 50) + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({ 'left': left });
      previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});
flatpickr('.datepicker', {
  // put options here if your don't want to add them via data- attributes
});

$(".final").click(function () {
  if (v_tyle == "Flughafentransfer") {
    var html = "";
    var obj = {
      Vorname: $("#fist_name").val(),
      Nachname: $("#last_name").val(),
      "E-Mail": $("#email").val(),
      Abholdatum: $("#datepicker").val().split(" ")[0],
      Abholzeit: $("#datepicker").val().split(" ")[1],
      Abflugort: $("#dep_location").val(),
      Flugnummer: $("#fli_number").val(),
      adresse: $("#address_p").val(),
      "Fahrten-Typ": v_tyle,
      "Personen": $("#person").val(),
      "Gepack GroB": $("#large").val(),
      "Gepack Klein": $("#small").val(),
      "Anmerkunge": $("#remarks").val(),
    };
    Object.keys(obj).forEach((val, key) => {
      if (val == "adresse") {
        if ($("#drive").find(":selected").text() == "Vom Flughafen")
          html += `<tr><td>Zieladresse</td><td>${obj[val]}</td ></tr>`;
        else html += `<tr><td>Abholadresse</td><td>${obj[val]}</td ></tr>`;
      }
      else if (val == "Abflugort" || val == "Flugnummer") {
        if ($("#drive").find(":selected").text() != "Zum Flughafen")
          html += `<tr><td>${val}</td><td>${obj[val]}</td ></tr>`;
      }
      else html += `<tr><td>${val}</td><td>${obj[val]}</td ></tr>`;
    });

    $(".summary").html(html);
  }
  else {
    var html = "";
    var obj = {
      Vorname: $("#fist_name").val(),
      Nachname: $("#last_name").val(),
      "E-Mail": $("#email").val(),
      Abholdatum: $("#datepicker1").val().split(" ")[0],
      Abholzeit: $("#datepicker1").val().split(" ")[1],

      Abholadresse: $("#p_address").val(),
      Zieladresse: $("#d_address").val(),
      "Fahrten-Typ": v_tyle,
      "Personen": $("#person").val(),
      "Gepack GroB": $("#large").val(),
      "Gepack Klein": $("#small").val(),
      "Anmerkunge": $("#remarks").val(),
    };
    Object.keys(obj).forEach((val, key) => {
      html += `<tr><td>${val}</td><td>${obj[val]}</td ></tr>`;
    });

    $(".summary").html(html);
  }

});

