import { useParams } from "react-router-dom";

export default function ShowPage() {
  const { id } = useParams();

  return <div>Movie ID: {id}</div>;
}
