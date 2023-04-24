let id_delete = 0;
$(function () {
  search();
});

function search() {
  let search_option = "";
  let searchKey = $("#filter").val();
  $("#search-option option:selected").each(function () {
    if ($(this).val() !== "") {
      search_option = $(this).text().toLowerCase();
    }
  });

  let url = "http://localhost:3000/expert";
  if (search_option !== "") {
    url += "?filter=" + search_option;
  }
  if (search_option !== "" && filter !== "") {
    url += "&search=" + searchKey;
  }

  fetch(url, {
    method: "GET",
  }).then((res) => {
    const boxexpert = $("#expert-wrapper");
    boxexpert.html("");

    res.json().then((data) => {
      if (data.datas.length > 0) {
        data.datas.forEach((expert) => {
          const expertElement = document.createElement("article");
          expertElement.className = "column";
          expertElement.innerHTML = `
          <div class="rounded"><img src="${expert.pic_link}" width="50px"></div>
          <h3>${expert.fname}  ${expert.lname}</h3>
          <section>${expert.about}</section>
          <a href="/experties_in_detail/${expert.id}">Learn More</a> 
          <a class="text-danger" onclick="deleteModel(${expert.id}, '${expert.fname} ${expert.lname}')" style="cursor: pointer;">Delete</a>`;
          boxexpert.append(expertElement);
        });
      } else {
        const expertElement = document.createElement("article");
        expertElement.className = "column text-center";
        expertElement.innerHTML = `ไม่พบข้อมูล`;
        boxexpert.append(expertElement);
      }
    });
  });
}

function addexpert() {
  window.location.href = "/product_management";
}

function deleteModel(id, name) {
  id_delete = id;
  $("#deleteName").html(name);
  $("#conformDeleteModal").modal("show");
}

function closeModal() {
  $("#conformDeleteModal").modal("hide");
}

function deleteExpert() {
  fetch("http://localhost:3000/expert/" + id_delete, {
    method: "DELETE",
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        window.open("/expert/", "_self");
      } else {
        alert(data.message);
      }
    });
  });
}
