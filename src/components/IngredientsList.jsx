import LoadingGif from "../assets/images/Spinner@1x-1.2s-200px-200px.gif";

export default function IngredientsList(props) {
  const ingredientListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <section className="ingredients-container container">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientListItems}
      </ul>
      {props.ingredients.length > 3 ? (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>

          {props.fetching ? (
            <img
              className="spinner"
              src={LoadingGif}
              alt="loading"
              width={50}
              height={50}
            />
          ) : (
            <button onClick={props.getRecipe} className="get-recipe-button">
              {" "}
              Get a recipe
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}
