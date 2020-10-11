const postsContainer = document.getElementById("post-container");
const filter = document.getElementById("filter");
const loading = document.querySelector(".loader");
const text = document.getElementById("text");

let limit = 5;
let page = 1;

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //已滚动内容的高度 + 视口内容高度 >= 整个滚动条的高度 - 5
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMore();
  }
});

filter.addEventListener("input", filterPosts);

async function showPosts() {
  const posts = await fetchPosts();
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

async function fetchPosts() {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  return data;
}

async function loadMore() {
  page++;
  text.style.display = "none";
  loading.classList.add("show");
  await showPosts();
  loading.classList.remove("show");
  text.style.display = "block";
}

function filterPosts(e) {
  text.style.display = "none";
  const term = e.target.value;
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toLowerCase();
    const body = post.querySelector(".post-body").innerText.toLowerCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
  if (!term) text.style.display = "block";
}
