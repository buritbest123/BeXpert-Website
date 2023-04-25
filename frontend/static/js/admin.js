let id_delete = 0;
$(function () {
  search();
});

function search() {
  let search_option = "";
  let searchKey = $("#filter").val();
  $("#search-option option:selected").each(function () {
    if ($(this).val() !== "") {
      search_option = $(this).val().toLowerCase();
    }
  });

  let url = "http://localhost:3000/admin?filter=username,fname,lname&search=";

  fetch(url, {
    method: "GET",
  }).then((res) => {
    const boxAdmin = $("#admin-wrapper");
    boxAdmin.html("");

    res.json().then((data) => {
      if (data.datas.length > 0) {
        data.datas.forEach((admin) => {
          const adminElement = document.createElement("tr");
          adminElement.className = "column";
          adminElement.innerHTML = `
                <td>${admin.id}</td>
	    	    <td>${admin.fname}  ${admin.lname}</td>
		    	<td>${admin.email}</td>
			    <td>${admin.role}</td>
			    <td>${admin.phone}</td>
			    <td>
				    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    				<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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

function deleteModel(id, name) {
  id_delete = id;
  $("#deleteName").html(name);
  $("#conformDeleteModal").modal("show");
}

function closeModal() {
  $("#conformDeleteModal").modal("hide");
}

function deleteadmin() {
  fetch("http://localhost:3000/admin/" + id_delete, {
    method: "DELETE",
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        window.open("/admin/", "_self");
      } else {
        alert(data.message);
      }
    });
  });
}
