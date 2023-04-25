// Define a variable to keep track of the id of the admin to delete
let id_delete = 0;

// Extract the admin id from the URL
let id = location.pathname.split("/")[2];

// Define variables to keep track of the admin to update and delete
let idToDelete = null;
let idToUpdate = null;

// Define an empty list to store all admin users
const listAdminUsers = []

// When the page loads, execute the search function
$(function () {
  search();
});

// Define a function to search for admin users
function search() {
  // Extract the search key and option from the DOM
  let searchKey = $("#filter").val();
  $("#search-option option:selected").each(function () {
    if ($(this).val() !== "") {
      search_option = $(this).val().toLowerCase();
    }
  });

  // Define the URL for the search request
  let url = "http://localhost:3000/admin?filter=username,fname,lname&search=" + searchKey;

  // Send a GET request to search for admin users
  fetch(url, {
    method: "GET",
  }).then((res) => {
    const boxAdmin = $("#admin-wrapper");
    boxAdmin.html("");

    res.json().then((data) => {
      if (data.datas.length > 0) {
        // If data is found, create a table row for each admin user and append it to the DOM
        data.datas.forEach((admin) => {
          listAdminUsers.push(admin);
          const adminElement = document.createElement("tr");
          adminElement.className = "column";
          adminElement.innerHTML = `
                <td>${admin.id}</td>
	    	    <td>${admin.fname}  ${admin.lname}</td>
		    	<td>${admin.email}</td>
			    <td>${admin.role}</td>
			    <td>${admin.phone}</td>
			    <td>
				    <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="setEditAdminInfo(${admin.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    				<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="setIdToDelete(${admin.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
	    		</td>
          `;
          boxAdmin.append(adminElement);
        });
      } else {
        // If no data is found, display a message on the DOM
        const adminElement = document.createElement("article");
        adminElement.className = "column text-center";
        adminElement.innerHTML = `No data found`;
        boxAdmin.append(adminElement);
      }
    });
  });
}

// Define a function to set the id of the admin to delete
function setIdToDelete(id){
    idToDelete = id
}

// Define a function to delete the admin with the specified id
function deleteadmin() {
    if(idToDelete === null){
        return;
    }

  // Send a DELETE request to delete the admin
  fetch("http://localhost:3000/admin/" + idToDelete, {
    method: "DELETE",
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        setIdToDelete(null)
        window.location.reload()
      } else {
        alert(data.message);
      }
    });
  });
}


// Define a function to set the information of the admin to edit
function setEditAdminInfo(adminId) {
    // find the admin user by id in the listAdminUsers array
    const adminInfo = listAdminUsers.find((admin)=> admin.id === adminId)
    // console.log(adminInfo);
    // if adminInfo is not found, return
    if(!adminInfo){
        return;
    }
    // set the values of the form fields to the admin user's information
    document.getElementById("edit_fname").value = adminInfo.fname;
    document.getElementById("edit_lname").value = adminInfo.lname;
    document.getElementById("edit_email").value = adminInfo.email;
    document.getElementById("edit_address").value = adminInfo.Address;
    document.getElementById("edit_phone").value = adminInfo.phone;
    document.getElementById("edit_psw").value = adminInfo.psw;
    
    // set idToUpdate variable to adminId for later use in updating the admin information
    idToUpdate = adminId;
}

function updateAdminInfo() {
    let formData = {
        firstName: $("#edit_fname").val(),
        lastName: $("#edit_lname").val(),
        email: $("#edit_fname").val(),
        address: $("#edit_address").val(),
        phone: $("#edit_phone").val(),
        password: $("#edit_psw").val(),
    };

    // send a PUT request to update the admin info
    fetch(`http://localhost:3000/admin/${idToUpdate}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(response => {
        response.json().then((data) => {
            // if the update is successful, reload the page
            if (data.success) {
              window.location.reload();
            } else {
              alert(data.message);
            }
          });
    })
}

// This function validates the form using the jQuery Validation Plugin and sends a POST request to the server if the form is valid.
$("#form_id").validate({
    submitHandler: function (form) {
      postData();
    },
  });
  
  function postData() {
    console.log("HIIIIIIIIIIIIIII DATA POST?!");
    // If the form is not valid, it returns false and does not send the request.
    if (!$("#form_id").valid()) {
      return false;
    }

    // The formData object is created by getting the values of the form inputs with jQuery, and is sent as the request body using the fetch API.
    let formData = {
        firstName: $("#firstname").val(),
        lastName: $("#lastname").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        phone: $("#phone").val(),
        password: $("#psw").val(),
    };
    fetch("http://localhost:3000/admin/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      res.json().then((data) => {
        if (data.success) {
          // If the property is true, the page is reloaded.
          window.location.reload()
        } else {
          // Otherwise, an alert with the error message is shown.
          alert(data.message);
        }
      });
    });
  }