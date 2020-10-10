const searchElement = document.getElementById("search");
const submitElement = document.getElementById("submit");
const randomButton = document.getElementById("random");
const mealsElement = document.getElementById("meals");
const resultHeadingElement = document.getElementById("result-heading");
const singleMealElement = document.getElementById("single-meal");

submitElement.addEventListener("submit", searchMeal);
randomButton.addEventListener("click", getRandomMeal);

getRandomMeal();

async function searchMeal(e) {
  e.preventDefault();
  //如果有点击查询某个食物则清除其信息
  singleMealElement.innerHTML = "";
  //检验输入是否有效
  const term = searchElement.value.trim();
  if (term) {
    const { data } = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    if (data.meals == null) {
      resultHeadingElement.innerHTML = `
        <p>There are no search results. Try again! 😭</p>
      `;
    } else {
      resultHeadingElement.innerHTML = `
      <h3>Search results for '${term}':</h3>
    `;
      mealsElement.innerHTML = data.meals
        .map(
          (meal) => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      `
        )
        .join("");
    }

    searchElement.value = "";
  } else {
    alert("Please enter a search term. 😊");
  }
}

//给食物列表绑定点击事件
mealsElement.addEventListener("click", (e) => {
  const mealInfo = e
    .composedPath()
    .find((item) =>
      item.classList ? item.classList.contains("meal-info") : false
    );
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealByID(mealID);
  }
});

async function getMealByID(id) {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const meal = data.meals[0];
  addMealToDOM(meal);
}

async function getRandomMeal() {
  mealsElement.innerHTML = "";
  resultHeadingElement.innerHTML = "";

  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  const meal = data.meals[0];
  addMealToDOM(meal);
}

//将通过 ID 搜索到的结果挂载到 DOM
function addMealToDOM(meal) {
  const ingredients = [];
  //由于该 API 没有将材料的字段弄成数组的形式，所以需要自己加工
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  //点击显示的单个食物信息
  singleMealElement.innerHTML = `
    <div class="single-meal">
      <h1 class="meal-title">${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>Area: ${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>🥘Ingredients🥘</h2>
        <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
  singleMealElement.scrollIntoView();
}
