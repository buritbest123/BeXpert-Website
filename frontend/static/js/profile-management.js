$("#form_id").validate({
  submitHandler: function (form) {
    postData();
  },
});
function postData() {
  if (!$("#form_id").valid()) {
    return false;
  }
  let formData = {
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    about: $("#about").val(),
    edu_highschool: $("#edu_highschool").val(),
    edu_uni: $("#edu_uni").val(),
    "soft-skill1": $("#soft-skill1").val(),
    "business-area1": $("#business-area1").val(),
    "computer-area1": $("#computer-area1").val(),
    "art-area1": $("#art-area1").val(),
    "soft-skill2": $("#soft-skill2").val(),
    "business-area2": $("#business-area2").val(),
    "computer-area2": $("#computer-area2").val(),
    "art-area2": $("#art-area2").val(),
    "soft-skill3": $("#soft-skill3").val(),
    "business-area3": $("#business-area3").val(),
    "computer-area3": $("#computer-area3").val(),
    "art-area3": $("#art-area3").val(),
    license: $("#license").val(),
    email: $("#email").val(),
    linkedin: $("#linkedin").val(),
    mobile_num: $("#mobile_num").val(),
    pic_link: $("#pic_link").val(),
    bg_link: $("#bg_link").val(),
  };
  fetch("http://localhost:3000/expert", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        window.open("/expert", "_self");
      } else {
        alert(data.message);
      }
    });
  });
}

function cancel() {
  window.open("/expert", "_self");
}
