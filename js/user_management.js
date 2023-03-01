// Check or Uncheck All checkboxes
$(document).ready(function(){
    $("#selectAll").change(function(){
        var checked = $(this).is(':checked');
        if(checked){
            $(".table tbody .custom-checkbox input[type='checkbox']").prop('checked',true);
        }else{
            $(".table tbody .custom-checkbox input[type='checkbox']").prop('checked',false);
        }
    });
});

// // Get the button element
// const addButton = document.querySelector('a[data-toggle="modal"]');

// // Add an event listener to the button
// addButton.addEventListener('click', function() {
//   // Get the modal element
//   const addEmployeeModal = document.querySelector('#addEmployeeModal');
//   // Show the modal
//   addEmployeeModal.style.display = 'block';
// });

// // Get the Save button in the Add Employee modal
// const saveButton = document.querySelector('#addEmployeeModal .modal-footer .btn-primary');

// // Add an event listener to the button
// saveButton.addEventListener('click', function() {
//   // Get the values of the inputs in the modal
//   const nameInput = document.querySelector('#addEmployeeModal #name');
//   const emailInput = document.querySelector('#addEmployeeModal #email');
//   const roleInput = document.querySelector('#addEmployeeModal #role');
//   const phoneInput = document.querySelector('#addEmployeeModal #phone');

//   // Create a new row for the employee in the table
//   const table = document.querySelector('table tbody');
//   const newRow = table.insertRow();

//   // Add the cells to the row
//   const checkboxCell = newRow.insertCell();
//   const nameCell = newRow.insertCell();
//   const emailCell = newRow.insertCell();
//   const roleCell = newRow.insertCell();
//   const phoneCell = newRow.insertCell();
//   const actionsCell = newRow.insertCell();

//   // Add the data to the cells
//   checkboxCell.innerHTML = '<span class="custom-checkbox"><input type="checkbox" id="checkbox1" name="options[]" value="1"><label for="checkbox1"></label></span>';
//   nameCell.innerHTML = nameInput.value;
//   emailCell.innerHTML = emailInput.value;
//   roleCell.innerHTML = roleInput.value;
//   phoneCell.innerHTML = phoneInput.value;
//   actionsCell.innerHTML = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a> <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';

//   // Clear the input values in the modal
//   nameInput.value = '';
//   emailInput.value = '';
//   roleInput.value = '';
//   phoneInput.value = '';

//   // Hide the modal
//   const addEmployeeModal = document.querySelector('#addEmployeeModal');
//   addEmployeeModal.style.display = 'none';
// });

// // Get the Delete button
// const deleteButton = document.querySelector('a[href="#deleteEmployeeModal"]');

// // Add an event listener to the button
// deleteButton.addEventListener('click', function() {
//   // Get the selected checkboxes
//   const checkboxes = document.querySelectorAll('table tbody input[type="checkbox"]:checked');

//   // Loop through the checkboxes and delete the corresponding rows
//   checkboxes.forEach(function(checkbox) {
//     const row = checkbox.parentNode.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//   });
// });
