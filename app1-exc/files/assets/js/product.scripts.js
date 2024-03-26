$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/products',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    // console.log(">>", response);
    let data = response.data;
    // let status = response.status
    if (data.length>0) { 
        createTbody(data);
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
        // console.log(data);
    }
  });

  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let product = $("#product").val();
    let cost = $("#cost").val();
    let descr = $("#descr").val();
    let quantity = $("#quantity").val();

    const item = {
      'username': product,
      'password': cost,
      'descr': descr,
      'quantity': quantity
    }

    console.log($('.btnSubmit').val(), item);
    $.ajax({
      url: "http://localhost:3000/api/products",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {
      // console.log(">>", response);
      
      let data = response.data;
      let status = response.status
  
      if (data) { 
          console.log(true,'Επιτυχής εισαγωγή του προϊόντος');
          alert(true,'Επιτυχής εισαγωγή του προϊόντος');
          $('#frmProduct')[0].reset();
          window.location.replace("http://localhost:3000/product/find.html")
      } else {
          console.log(false,'Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
          alert(false,'Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
          $('#frmProduct')[0].reset();
          // console.log(data.message);
      }
    });

    return false
  });

});

function createTbody(data){

  $("#productTable > tbody").empty();

  // console.log("CreateTBody", data);
  const len = data.length;
  for (let i=0; i<len; i++){
    let product = data[i].product;
    let cost = data[i].cost;
    let descr = data[i].descr;
    let quantity = data[i].quantity;  
  
    
    // console.log("product: ", product);

    let tr_str = "<tr>" +
      "<td>" + product + "</td>" +
      "<td>" + cost + "</td>" +
      "<td>" + descr + "</td>" +
      "<td>" + quantity + "</td>" +         
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
      "</td>" + 
      "</tr>";

    $("#productTable tbody").append(tr_str);
  }
}


function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}