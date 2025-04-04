import React from "react";
import LoadingGif from "../assets/images/Spinner@1x-1.2s-200px-200px.gif";
import DotIcon from "../assets/images/icons8-dot-30.png";
import EditIcon from "../assets/images/edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import CheckIcon from "../assets/images/check_24dp_FAFAF8_FILL0_wght400_GRAD0_opsz24.svg";
import CrossIcon from "../assets/images/close_32dp_D17557_FILL0_wght400_GRAD0_opsz40.png";

export default function IngredientsList(props) {
  const [isEditing, setIsEditing] = React.useState(false);

  const ingredientListItems = props.ingredients.map((ingredient) =>
    isEditing ? (
      <li className="cross-list" key={ingredient}>
        <button className="cross-button">
          <img className="cross-icon" src={CrossIcon} alt="Cross Icon" />
        </button>
        {ingredient}
      </li>
    ) : (
      <li key={ingredient}>
        <span className="icon-wrap">
          <img className="dot-icon" src={DotIcon} alt="dot icon" />
        </span>
        {ingredient}
      </li>
    )
  );

  function handleEditBtn() {
    setIsEditing((prev) => !prev);
  }

  return (
    <section className="ingredients-container container">
      <h2>
        Ingredients on hand:
        <button className="edit-button" onClick={handleEditBtn}>
          <img src={isEditing ? CheckIcon : EditIcon} alt="Edit Icon" />
        </button>
      </h2>

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
