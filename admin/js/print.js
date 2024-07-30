$.ajax({
  url: "../api/lists-locations",
  type: "GET",
  dataType: "json",
  beforeSend: (e) => {
    Swal.fire({
      html: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },
  success: (data) => {
    Swal.close();

    $("#locations").empty().append(`
      <option value="1" hidden selected>Select Location</option>
    `);
    $.each(data.locations, (i, e) => {
        $("#locations").append(`
          <option value="${e.location}">${e.location}</option>
          `);
    })

  },
});

$(document).on("click", "#printing", ()=>{

window.jsPDF = window.jspdf.jsPDF;

var doc = new jsPDF();
  
// Source HTMLElement or a string containing HTML.
var elementHTML = document.querySelector("#printJS-form2");

doc.html(elementHTML, {
    callback: function(doc) {
        // Save the PDF
        doc.save('Labels.pdf');
    },
    x: 15,
    y: 15,
    width: 170, //target width in the PDF document
    windowWidth: 650 //window width in CSS pixels
});

});

$(document).on("click", ".printall", ()=>{

$.ajax({
  url: "../api/lists-transfered-products-print",
  type: "GET",
  dataType: "json",
  data: {
    location: $("#locations").val()
  },
  beforeSend: (e) => {
    Swal.fire({
      html: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },
  success: (data) => {
    Swal.close();

    $("#print2-modal").modal("show");

    $("#row").empty();

    $.each(data.transfered, (i, e) => {

      $("#row").append(`
        <div class="col-md-5" style="padding: 10px;">

        <div class="card" style="border: 1px dashed gray "> 

          <div class="card-body">
        <img src="../img/icon.jpg" style="height: 50px; width: 70px; float: left;">
            <center><h3 style="font-size: 12px;">Inventory Tag</h3></center>

            <br>
            <br>
            <br>

            <table class="table">
              <tbody>
              <tr>
                <td colspan="2">
                  <label id="description" style="font-size: 10px;"><b style="color: blue;">Description: </b> ${e.description}</label>
                </td>

              </tr>
              <tr>
                <td colspan="2">
                  <label id="serialno" style="font-size: 10px;"><b style="color: blue;">Serial #: </b> ${e.serial_no}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="issue" style="font-size: 10px;"><b style="color: blue;">Issued Date: </b> ${e.date_inserted}</label>
                </td>
                <td>
                  <label id="amount" style="float: right; font-size: 10px;"><b style="color: blue;">Amount: </b> ${e.amount}</label>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <label id="invent" style="font-size: 10px;"><b style="color: blue;">Inventory No.: </b> ${e.id}</label>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <label id="location" style="font-size: 10px;"><b style="color: blue;">Location: </b> ${e.location}</label>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

        </div>
      `);

    });

  },
});


});

$(document).on("change", "#locations", (e)=>{

$.ajax({
  url: "../api/lists-transfered-products",
  type: "GET",
  dataType: "json",
  data: {
    location: $("#locations").val()
  },
  beforeSend: (e) => {
    Swal.fire({
      html: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },
  success: (data) => {
    Swal.close();

    $("#css2-body").empty();

    $.each(data.transfered, (i, e) => {
      $("#css2-body").append(`
        <tr>
          <td>${e.id}</td>
          <td>${e.product}</td>
          <td>${e.description}</td>
          <td>${e.location}</td>
          <td>${e.date_inserted}</td>
          <td>${e.amount}</td>
          <td>
            <button class="btn btn-primary print"
              data-name="${e.product}"
              data-id="${e.id}"
              data-qty="${e.quantity}"
              data-desc="${e.description}"
              data-date="${e.date_inserted}"
              data-amount="${e.amount}"
              data-serial="${e.serial_no}"
              data-location="${e.location}"
              >
              Print
            </button>

          </td>
        </tr>
      `);
    });

    $(".dataTable").DataTable();
  },
});


});


$(document).on("click", ".print", (e)=>{

  $("#print-modal").modal("show");

  $("#description").empty().append(`
    <b style="color: blue;">Description: </b> ${e.target.dataset.desc}
  `);
  $("#serialno").empty().append(`
    <b style="color: blue;">Serial #: </b> ${e.target.dataset.serial}
  `);
  $("#issue").empty().append(`
    <b style="color: blue;">Issued Date: </b> ${e.target.dataset.date}
  `);
  $("#amount").empty().append(`
    <b style="color: blue;">Amount: </b> ${e.target.dataset.amount}
  `);
  $("#invent").empty().append(`
    <b style="color: blue;">Inventory No.: </b> ${e.target.dataset.id}
  `);

  $("#location").empty().append(`
    <b style="color: blue;">Location: </b> ${e.target.dataset.location}
  `);
})

