$(function () {
  // Get the id of the expert from the URL path
  let id = location.pathname.split("/")[2];
  // Set the href attribute of the edit button to the URL for editing this expert
  $("#edit").attr("href", "/product_management/" + id);
  // Fetch expert details from the server
  fetch("http://localhost:3000/expert/" + id).then((res) => {
    res.json().then((data) => {
      // If the fetch was successful
      if (data.success) {
        // Extract skill data from the fetched expert details
        let detail = data.datas[0];
        let skillData = {
          // Categorize each skill into the appropriate skill type
          SoftSkills: [],
          LanguageSkills: [],
          ComputerSkills: [],
          DataArea: [],
        };
        let skills = detail.skills.split(";");
        skills.forEach((skill) => {
          let list = skill.trim().split(":");
          switch (list[0].trim()) {
            case "Soft Skills":
              list[1].split(",").forEach((s) => {
                skillData["SoftSkills"].push(s.trim());
              });
              break;
            case "Language Skills":
            case "Technical Skills":
              list[1].split(",").forEach((s) => {
                skillData["LanguageSkills"].push(s.trim());
              });
              break;
            case "Computer Skills":
            case "Programming":
              list[1].split(",").forEach((s) => {
                skillData["ComputerSkills"].push(s.trim());
              });
              break;
            case "Data Area":
              list[1].split(",").forEach((s) => {
                skillData["DataArea"].push(s.trim());
              });
              break;

            default:
              break;
          }
        });

        // Update the expert details in the HTML
        $("#bannerimage").attr(
          "style",
          "background-image: url(" +
            (detail.bg_link
              ? detail.bg_link
              : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80") +
            ");"
        );
        $("#fullname").html(detail.fname + " " + detail.lname);
        $("#pic_link").attr("src", detail.pic_link);
        $("#license").html(detail.license || "-");
        $("#edu_uni").html(detail.edu_uni);
        $("#edu_highschool").html(detail.edu_highschool);
        $("#about").html(detail.about);
        $("#linkedin").html(detail.fname + " " + detail.lname);
        $("linkedin-href").attr("href", detail.linkedin);
        $("#email").html(detail.email);
        $("#mobile_num").html(detail.mobile_num);

        // Update the skill table in the HTML - top 3 skills
        let maxlen = 3;
        for (let index = 0; index < maxlen; index++) {
          let str = `<tr>`;
          str += `<td>${index + 1}</td>`;
          // The table row consists of five columns: the skill number, SoftSkills, LanguageSkills, ComputerSkills, and DataArea.
          str += `<td>${skillData["SoftSkills"][index] || ""}</td>`;
          str += `<td>${skillData["LanguageSkills"][index] || ""}</td>`;
          str += `<td>${skillData["ComputerSkills"][index] || ""}</td>`;
          str += `<td>${skillData["DataArea"][index] || ""}</td>`;
          str += `</tr>`;
          if (
            // The table rows are appended to the table with index 'table'.
            skillData["SoftSkills"][index] ||
            skillData["LanguageSkills"][index] ||
            skillData["ComputerSkills"][index] ||
            skillData["DataArea"][index]
          )
            $("#table").append(str);
        }
      }
    });
  });
});

// The cancel() function redirects the user to the expert page.
function cancel() {
  window.open("/expert", "_self");
}
