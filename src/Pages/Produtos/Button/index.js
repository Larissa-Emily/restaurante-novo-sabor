import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Button() {
  return (
    <Link to="/cadastro">
      <button>
        <FaPlus /> Novo Produto
      </button>
    </Link>
  );
}
