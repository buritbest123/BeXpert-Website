// Declare a variable to store the ID of the expert to be deleted
let id_delete = 0;

// Call the search function on page load
$(function () {
  search();
});

// Define a function to search for experts
function search() {
  let search_option = "";
  let searchKey = $("#filter").val();
  // Loop through selected search option and assign it to a variable
  $("#search-option option:selected").each(function () {
    if ($(this).val() !== "") {
      search_option = $(this).val().toLowerCase();
    }
  });

  // Create the base URL for the expert search
  let url = "http://localhost:3000/expert";
  
  // Append the search option to the URL if it exists
  if (search_option !== "") {
    url += "?filter=" + search_option;
  }
  // Append the search key to the URL if both search option and key exist
  if (search_option !== "" && filter !== "") {
    url += "&search=" + searchKey;
  }

  // If no search option is selected, search by name, skills, and about
  if (search_option === "") {
    url += "?filter=name,skills,about&search="; // IS BLOCKED
  }

  // Fetch the experts using the constructed URL
  fetch(url, {
    method: "GET",
  }).then((res) => {
    // Select the element where the search results will be displayed and clear any previous data
    const boxexpert = $("#expert-wrapper");
    boxexpert.html("");
  
    // Parse the fetched data as JSON and loop through the expert data
    res.json().then((data) => {
      if (data.datas.length > 0) {
        data.datas.forEach((expert) => {
          // Create an article element to display each expert
          const expertElement = document.createElement("article");
          expertElement.className = "column";
          expertElement.innerHTML = `
          <div class="rounded"><img src="${expert.pic_link}" width="50px"></div>
          <h3>${expert.fname}  ${expert.lname}</h3>
          <section>${expert.about}</section>
          <a href="/experties_in_detail/${expert.id}">Learn More</a> &nbsp;&nbsp;
          <a class="text-danger" onclick="deleteModel(${expert.id}, '${expert.fname} ${expert.lname}')" style="cursor: pointer;">Delete</a>`;
          boxexpert.append(expertElement);
        });
      } else {
        // If no data is found, create a message element to display this
        const expertElement = document.createElement("article");
        expertElement.className = "column text-center";
        expertElement.innerHTML = `No data found`;
        boxexpert.append(expertElement);
      }
    });
  });
}

// Define a function to navigate to the page for adding a new expert
function addexpert() {
  window.location.href = "/product_management";
}

// Define a function to prepare the expert to be deleted
function deleteModel(id, name) {
  id_delete = id;
  $("#deleteName").html(name);
  $("#conformDeleteModal").modal("show");
}

// Define a function to close the delete confirmation modal
function closeModal() {
  $("#conformDeleteModal").modal("hide");
}

// Define a function to delete the selected expert
function deleteExpert() {
  fetch("http://localhost:3000/expert/" + id_delete, {
    method: "DELETE",
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        // open the same windows (another method)
        window.open("/expert/", "_self");
      } else {
        alert(data.message);
      }
    });
  });
}
