$.ajax({
  url: "../api/lists-transfered-products",
  type: "GET",
  dataType: "json",
  data: {
    location: 'CSS 1'
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

    $("#pproduct").empty().append(`
      <option value="" hidden selected>Select Product</option>
    `);
    $.each(data.products, (i, e) => {
        $("#pproduct").append(`
          <option value="${e.id}">${e.product}</option>
          `);
    })

    $("#css2-body").empty();

    $.each(data.transfered, (i, e) => {
      $("#css2-body").append(`
        <tr>
          <td><img src="../${e.img}" style="height: 100px; width: 100px;"></td>
          <td>${e.product}</td>
          <td>${e.description}</td>
          <td>${e.quantity}</td>
          <td>${e.status}</td>
          <td>${e.date_inserted}</td>
          <td>
            <button class="btn btn-primary edit"
              data-id="${e.id}"
              data-name="${e.product}"
              data-des="${e.description}"
              data-qty="${e.quantity}"
              data-status="${e.status}"
              >
              Edit
            </button>
            <button class="btn btn-danger delete"
              data-id="${e.id}"
              >Delete</button>
          </td>
        </tr>
      `);
    });

    $(".dataTable").DataTable();
  },
});


$(document).on("click", ".delete", (e)=>{

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "../api/delete-product-location",
        type: "POST",
        dataType: "json",
        data: {
          id: e.target.dataset.id,
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

          Swal.fire({
            icon: "success",
            title: "Deleted succesfully.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        },
      });
    }
  });

});



$(document).on("click", "#update-product", (e) => {
  $.ajax({
    url: "../api/update-product-location",
    type: "POST",
    dataType: "json",
     location: 'CSS 1',
    data: {
      id: $("#edit-modal").data("id"),
      image: $("#edit-modal").data("url"), 
      product: $("#ename").val(),
      description: $("#edes").val(),
      quantity: $("#eqty").val(),
      status: $("#estatus").val(),
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

      Swal.fire({
        icon: "success",
        title: "Updated successfully.",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    },
  });
});


$(document).on("click", ".edit", (e) => {
  $("#edit-modal").modal("show");
  $("#edit-modal").data("id", e.target.dataset.id);
  $("#ename").val(e.target.dataset.name);
  $("#edes").val(e.target.dataset.des);
  $("#eqty").val(e.target.dataset.qty);
  $("#estatus").val(e.target.dataset.status);
  $("#title").text("Update Product " + e.target.dataset.name);

  FilePond.registerPlugin(
    // encodes the file as base64 data
    FilePondPluginFileEncode,
    
    // validates files based on input type
    FilePondPluginFileValidateType,
    
    // corrects mobile image orientation
    FilePondPluginImageExifOrientation,
    
    // previews the image
    
    // crops the image to a certain aspect ratio
    FilePondPluginImageCrop,
    
    // resizes the image to fit a certain size
    FilePondPluginImageResize,
    
    // applies crop and resize information on the client
    FilePondPluginImageTransform
  );

      // Select the file input and use create() to turn it into a pond
  var specupload = FilePond.create(
    document.querySelector('.filepond-233'),
    {
    labelIdle: `Drag & Drop your files or <span class="filepond--label-action">Browse</span>`
    }
  );

   FilePond.setOptions({
    server: {
    url: "",
    timeout: 60000,
    process: {
          url: '../api/insert-image',
          method: 'POST',
          withCredentials: false,
          onload: (response) => {

          let obj = JSON.parse(response); 

          $("#edit-modal").data("url", obj.dir);



          },
      },
      
  },
  });

  document.addEventListener('FilePond:processfiles', (e) => {

  

  });

});



$(document).on("click", "#insert-product", () => {
  $.ajax({
    url: "../api/insert-to-location",
    type: "POST",
    dataType: "json",
    data: {
      product_id: $("#pproduct").val(),
      quantity: $("#pqty").val(),
      location: 'CSS 1',
      status: $("#pstatus").val(),
      name: $("#pname").val(),
      description: $("#pdescription").val(),
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

      Swal.fire({
        icon: "success",
        title: "Added successfully.",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    },
  });
});

$(document).on("click", "#add-product", () => {
  $("#add-modal").modal("show");
});


// Function to open the print modal
function openPrintModal() {
  $("#print-modal").modal("show");
}

// Function to print data
function printData(data, selectedDate) {
  // Clear previous data in the print modal
  $("#print-data-container").empty();

  if (data.transfered.length === 0) {
    // Display message if no data is found
    $("#print-data-container").append(`
        <p>No data found for the selected date: ${selectedDate}</p>
    `);
    return;
  }

  // Append table structure with enhanced styling
  $("#print-data-container").append(`
      <table class="table table-bordered table-striped custom-table">
          <thead class="table-dark">
              <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Item</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date Inserted</th>
              </tr>
          </thead>
          <tbody id="print-table-body"></tbody>
      </table>
  `);

  // Append data to the table
  data.transfered.forEach(function(item) {
      $("#print-table-body").append(`
          <tr>
              <td><img src="../${item.img}" style="height: 100px; width: 100px;" class="img-thumbnail"></td>
              <td>${item.product}</td>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.status}</td>
              <td>${item.date_inserted}</td>
          </tr>
      `);
  });
}

// Event listener for the "Print" button
$("#print-button").click(function() {
  // Open the print modal
  openPrintModal();
});

// Event listener for the "Print" confirmation button
$("#confirm-print").click(function() {
  // Fetch data for selected date
  var selectedDate = $("#print-date").val();
  $.ajax({
    url: "../api/lists-transfered-products",
    type: "GET",
    dataType: "json",
    data: {
      location: 'CSS 1',
      date: selectedDate  // Add selected date to the data
    },
    beforeSend: function() {
      Swal.fire({
        html: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    success: function(data) {
      Swal.close();
      // Print the data
      printData(data, selectedDate);
      // Print the modal content
      printJS({
        printable: 'print-data-container',
        type: 'html',
        css: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
      });
    },
    error: function(xhr, status, error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error fetching the data.',
      });
      console.error(error);
    }
  });
});
// Event listener for the navbar button click
$('.navbar-toggler').on('click', function() {
  $('.pagination-container').toggleClass('collapsing');
});

// Event listener for search button click
$('#search-button').on('click', function() {
  // Handle search functionality
});
