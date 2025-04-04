import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromHuggingface } from "../services/huggingFace";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    // "chicken",
    // "all the main spices",
    // "corn",
    // "heavy cream",
    // "pasta",
  ]);

  const [fetching, setFetching] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  function addIngredient(formData) {
    if (formData.get("ingredient") === "") {
      return;
    } else {
      const newIngredient = formData.get("ingredient");
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    setFetching(true);
    const recipeMarkdown = await getRecipeFromHuggingface(ingredients);
    setFetching(false);
    setRecipe(recipeMarkdown);
  }

  return (
    <main className="main">
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          type="text"
          placeholder="e.g. Chicken"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>+ Add ingredient</button>
      </form>
      {ingredients.length > 0 ? (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          fetching={fetching}
        />
      ) : null}
      {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
    </main>
  );
}
