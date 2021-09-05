var searchUrl = document.getElementsByName("url")[0];
var searchKey = document.getElementsByName("search")[0];
const resultQuality = document.getElementById("resultQuality");
const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
const table = document.getElementsByClassName("table")[0];
const loadingGif = document.getElementsByClassName("loading")[0];
const videoInfoCard = document.getElementsByClassName("videoInfo")[0];
const cardColumns = document.getElementsByClassName("card-columns")[0];

const downloadButton = () => {
  const control = searchUrl.value.match(
    /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/
  );
  if (control) {
    window.location.href = `/video/${control[6]}`;
  } else {
    Swal.fire("We Are Sad", "Please Paste A Valid Youtube Link", "error");
  }
};

const searchButton = async () => {
  if (searchKey.value != "") {
    cardColumns.classList.add("d-none");
    loadingGif.classList.remove("d-none");
    const request = {
      method: "POST",
      body: JSON.stringify({ key: searchKey.value }),
      headers: { "X-CSRFToken": csrftoken },
    };
    const response = await fetch("/searchapi/", request);
    const result = await response.json();
    await cardColumns.classList.remove("d-none");
    await loadingGif.classList.add("d-none");
    result?.map((item, key) => {
      cardColumns.innerHTML += `<div class="card">
      <img
        class="card-img-top"
        src="${item.info.thumbnail}"
        alt=""
      />
      <div class="card-body">
        <h4 class="card-title text-center">${item.info.title}</h4>
        <a href="/video/${item.info.id}" class="btn btn-dark w-100">Detail</a>
      </div>
    </div>`;
    });
  }

  const generateVideoInfoCard = (info) => {
    videoInfoCard.innerHTML = `
    <div class="col-sm-8">
                      <img src="${info.thumbnail}" style="height: 250px" alt="">
                  </div>
                  <div class="col-sm-4 ">
                      <h4>${info.title} </h4>
                      <div class="row">
                          <div class="col-sm-6 text-muted">Yükleyen:</div>
                          <div class="col-sm-6">${info.author}</div>
                      </div>
                       <div class="row">
                          <div class="col-sm-6 text-muted">Süre:</div>
                          <div class="col-sm-6">${info.length}</div>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 text-muted">Görüntüleme:</div>
                          <div class="col-sm-6">${info.views}</div>
                      </div>
                  </div>
`;
    videoInfoCard.classList.remove("d-none");
  };
};
