const puppeteer = require("puppeteer")

class RecipeScraper {

  async init() {
    this.browser = await puppeteer.launch({ headless: "new" })
    this.page = await this.browser.newPage()
  }

  async getFoodNetworkRecipe(link) {
    await this.page.goto(link)
    const ingredients = await this.page.evaluate(() => Array.from(document.querySelectorAll(".o-Ingredients__a-Ingredient--CheckboxLabel"), (e) => e.innerHTML.replace("&nbsp;", "")))
    ingredients.shift()
    let steps = await this.page.evaluate(() => Array.from(document.querySelectorAll(".o-Method__m-Step"), (e) => e.innerHTML.trimStart().trimEnd().replace(/\n/g, "")))

    const name = await this.page.evaluate(() =>
    document.querySelector(".o-AssetTitle__a-HeadlineText").innerHTML
  );
    return { name: name,ingredients: ingredients, steps: steps}
  }
}

// (async () => {
//   let rs = new RecipeScraper();
//   await rs.init();
//   const ingredients = await rs.getFoodNetworkRecipe("https://www.foodnetwork.com/recipes/anne-burrell/chicken-enchiladas-3598928");
//   console.log(ingredients)
// })();

export default RecipeScraper