import Markdown from "react-markdown";

export default function AiRecipe(props) {
  return (
    <section
      className="suggested-recipe-container container"
      aria-live="polite"
    >
      <h1 className="suggested-recipe">Suggested recipe:</h1>
      <Markdown>{props.recipe}</Markdown>
    </section>
  );
}
