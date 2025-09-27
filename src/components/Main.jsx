import React from "react";
import IngredientsList from "./IngredientsList";
import AiRecipe from "./AiRecipe";
import { getRecipeFromGemini } from "../services/gemini";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [fetching, setFetching] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);
  const [isEditing, setIsEditing] = React.useState(false);

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
    const recipeMarkdown = await getRecipeFromGemini(ingredients);
    setFetching(false);
    setRecipe(recipeMarkdown);
  }

  function stopEditing() {
    setIsEditing((prev) => prev === true && false);
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
        <button onClick={stopEditing}>+ Add ingredient</button>
      </form>
      {ingredients.length > 0 ? (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          setIngredients={setIngredients}
          getRecipe={getRecipe}
          fetching={fetching}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          stopEditing={stopEditing}
        />
      ) : null}
      {recipe ? <AiRecipe recipe={recipe} /> : null}
    </main>
  );
}
