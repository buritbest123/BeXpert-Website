let id_delete = 0;
let id = location.pathname.split("/")[2];
let idToDelete = null;
let idToUpdate = null;
const listAdminUsers = []
$(function () {
  search();
});

function search() {
  let searchKey = $("#filter").val();
  $("#search-option option:selected").each(function () {
    if ($(this).val() !== "") {
      search_option = $(this).val().toLowerCase();
    }
  });

  let url = "http://localhost:3000/admin?filter=username,fname,lname&search=" + searchKey;

  fetch(url, {
    method: "GET",
  }).then((res) => {
    const boxAdmin = $("#admin-wrapper");
    boxAdmin.html("");

    res.json().then((data) => {
      if (data.datas.length > 0) {
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
        const adminElement = document.createElement("article");
        adminElement.className = "column text-center";
        adminElement.innerHTML = `No data found`;
        boxAdmin.append(adminElement);
      }
    });
  });
}

function setIdToDelete(id){
    idToDelete = id
}


function deleteadmin() {
    if(idToDelete === null){
        return;
    }

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



function setEditAdminInfo(adminId) {
    const adminInfo = listAdminUsers.find((admin)=> admin.id === adminId)
    // console.log(adminInfo);
    if(!adminInfo){
        return;
    }
    document.getElementById("edit_fname").value = adminInfo.fname;
    document.getElementById("edit_lname").value = adminInfo.lname;
    document.getElementById("edit_email").value = adminInfo.email;
    document.getElementById("edit_address").value = adminInfo.Address;
    document.getElementById("edit_phone").value = adminInfo.phone;
    document.getElementById("edit_psw").value = adminInfo.psw;
    
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
            if (data.success) {
              window.location.reload();
            } else {
              alert(data.message);
            }
          });
    })
}

$("#form_id").validate({
    submitHandler: function (form) {
      postData();
    },
  });
  
  function postData() {
    console.log("HIIIIIIIIIIIIIII DATA POST?!");
    if (!$("#form_id").valid()) {
      return false;
    }
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
          window.location.reload()
        } else {
          alert(data.message);
        }
      });
    });
  }