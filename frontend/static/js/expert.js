fetch('http://localhost:3000/expert', { method: 'GET' }).then((res) => {
  const wrapper = document.getElementById('expert-wrapper');
  res.json().then((data) => {
    console.log(data);
    data.datas.forEach((expert) => {
      console.log(expert);
      const expertElement = document.createElement('article');
      expertElement.className = 'column';
      expertElement.innerHTML = `
      <div class="rounded">
        <img src="${expert.pic_link}"  width="50px">
        </div>
       <h3>${expert.fname}  ${expert.lname}</h3>
       <section>${expert.about}</section>
       <a href="experties_in_detail.html?id=${expert.id}">Learn More</a>`;
      wrapper.append(expertElement);
    });
  });
});