const displayCard = document.getElementById("displayCard");
const searchValue = document.getElementById("search");

const fetchData = () => {
  const url = "https://openapi.programming-hero.com/api/retro-forum/posts";

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPost(data))
    .catch((err) => console.log(err));
};

fetchData();

document.getElementById("searchBtn").addEventListener("click", () => {
  displayCard.innerHTML = `<div id="load" class="flex justify-center items-center">
  <span class="loading loading-ring loading-lg"></span>
</div>`;

  const value = searchValue.value;
  const url2 = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`;

  setTimeout(() => {
    displayCard.innerText = "";
    fetch(url2)
      .then((response) => response.json())
      .then((data) => displayPost(data))
      .catch((err) => console.log(err));
  }, 2000);
  searchValue.value = "";
});

// show all post
const displayPost = (data) => {
  let myData = data.posts;

  for (const p of myData) {
    const newDiv = document.createElement("div");
    const dot = p.isActive ? "bg-green-700" : "bg-red-700";
    newDiv.innerHTML = `   <div
        class="bg-[#F3F3F5] flex sm:flex-row flex-col rounded-md box-border p-8 gap-4 mb-5 shadow-md"
      >
        <div>
          <div class="avatar">
          <div class="sm:w-[72px] sm:h-[72px] w-14 h-14 mask rounded-xl">
              <div class=" border-white  absolute h-4 w-4 ${dot} -right-1 -top-1 rounded-full border"></div>
              <img src=${p.image}>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="flex text-sm font-medium gap-4">
            <p># ${p.category}</p>
            <p>Author: ${p.author.name}</p>
          </div>
          <h1 class="text-2xl font-bold">
            ${p.title}
          </h1>
          <p class="text-base py-1">
           ${p.description}
          </p>
          <div class="border-t-[1px] border-dashed my-2"></div>
          <div class="flex justify-between pt-2 ">
            <div class="flex gap-4">
              <div class="flex items-center gap-3">
                <div><img src="./images/Vector.png" alt="" /></div>
                <span>${p.comment_count}</span>
              </div>
              <div class="flex items-center gap-3">
                <div><img src="./images/Vector (1).png" alt="" /></div>
                <span>${p.view_count}</span>
              </div>
              <div class="flex items-center gap-3">
                <div>
                  <img
                    src="./images/tabler-icon-clock-hour-9.png"
                    alt=""
                  />
                </div>
                <span>${p.posted_time} min</span>
              </div>
            </div>
            <div>
              <img
              onclick="handleReadButton(&quot;${p.title}&quot;,'${p.view_count}')"
                class="cursor-pointer"
                src="./images/email 1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>`;
    displayCard.appendChild(newDiv);
  }
};

const readMail = [];
const readMailLength = document.getElementById("readMailLength");
const handleReadButton = (title, view_count) => {
  readMail.push({ title, view_count });
  readMailLength.innerText = readMail.length;
  handlereadItem();
};

function handlereadItem() {
  const readedItem = document.getElementById("readedItem");
  const newitem = document.createElement("div");

  readMail.map((p) => {
    return (newitem.innerHTML = ` <div class="bg-white rounded-md box-border shadow-xl p-4 flex justify-between mb-2">
    <h1 class="text-sm font-semibold">${p.title}</h1>
    <div class="flex items-center gap-1">
      <div><img src="./images/Vector (1).png" alt="" /></div>
      <span>${p.view_count}</span>
    </div>
    </div>`);
  });
  readedItem.appendChild(newitem);
}

const latestPost = () => {
  const url =
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts";

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLatestPost(data))
    .catch((err) => console.log(err));
};

latestPost();

const displayLatestPost = (data) => {
  const latestDiv = document.getElementById("latestDiv");
  console.log(data);

  for (const p of data) {
    const newDiv = document.createElement("div");
    let date = p.author.posted_date ? p.author.posted_date : "No publish Date";
    newDiv.innerHTML = `     <a
    href="#"
    class="flex flex-col gap-4 rounded-2xl border border-solid shadow-xl bg-[#f5f8ff] p-6 font-bold text-black transition"
  >
    <img
      src=${p.cover_image}
      alt=""
      class="inline-block h-60 w-full object-cover"
    />
    <div class="w-full pt-4">
      <p
        class="mb-4 flex items-center gap-2 text-xs font-semibold uppercase text-[#636262]"
      >
        <img src="./images/Vector.png"/>
        ${date}
      <p class="mb-2 text-xl font-semibold">
        ${p.title}
      </p>
      <p class="mb-3 font-normal text-[#636262] lg:mb-8">
       ${p.description}
      </p>
      <div
        class="mx-auto flex max-w-[480px] flex-row items-center text-left"
      >
        <img
          src=${p.profile_image}
          alt=""
          class="mr-4 inline-block h-16 w-16 rounded-full object-cover"
        />
        <div class="flex flex-col items-start">
          <h6 class="text-base font-semibold">${p.author.name}</h6>
          <div
            class="flex items-start max-[991px]:flex-col lg:items-center"
          >
            <p class="text-sm text-[#636262]">${p.author.designation ? p.author.designation : "unknown"}</p>
            <p
              class="ml-2 mr-2 text-sm text-[#636262] max-[991px]:hidden"
            >
              
            </p>
           
          </div>
        </div>
      </div>
    </div>
  </a>`;
    latestDiv.appendChild(newDiv);
  }
};

