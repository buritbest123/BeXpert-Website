let id = location.pathname.split("/")[2];
$(function () {
  $("#form_id").attr("action", "http://localhost:3000/expert/" + id);
  fetch("http://localhost:3000/expert/" + id).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        let detail = data.datas[0];
        let skills = detail.skills.split(";");
        skills.forEach((skill) => {
          let list = skill.trim().split(":");
          switch (list[0].trim()) {
            case "Soft Skills":
              list[1].split(",").forEach((s, i) => {
                $("#soft-skill" + (i + 1)).val(s.trim());
              });
              break;
            case "Language Skills":
            case "Technical Skills":
              list[1].split(",").forEach((s, i) => {
                $("#business-area" + (i + 1)).val(s.trim());
              });
              break;
            case "Computer Skills":
            case "Programming":
              list[1].split(",").forEach((s, i) => {
                $("#computer-area" + (i + 1)).val(s.trim());
              });
              break;
            case "Data Area":
              list[1].split(",").forEach((s, i) => {
                $("#art-area" + (i + 1)).val(s.trim());
              });
              break;

            default:
              break;
          }
        });
        $("#bannerimage").attr(
          "style",
          "background-image: url(" +
            (detail.bg_link
              ? detail.bg_link
              : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80") +
            ");"
        );
        $("#about").val(detail.about);
        $("#license").val(detail.license);
        $("#bg_link").val(detail.bg_link);
        $("#pic_link").val(detail.pic_link);

        $("#firstname").val(detail.fname);
        $("#lastname").val(detail.lname);
        $("#edu_highschool").val(detail.edu_highschool);
        $("#edu_uni").val(detail.edu_uni);

        $("#linkedin").val(detail.linkedin);
        $("#email").val(detail.email);
        $("#mobile_num").val(detail.mobile_num);
      }
    });
  });
});
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
  fetch("http://localhost:3000/expert/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    res.json().then((data) => {
      if (data.success) {
        window.open("/experties_in_detail/" + id, "_self");
      } else {
        alert(data.message);
      }
    });
  });
}
function cancel() {
  window.open("/experties_in_detail/" + id, "_self");
}
