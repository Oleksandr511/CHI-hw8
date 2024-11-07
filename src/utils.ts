import { useNavigate } from "react-router-dom";

export const handleCardClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string,
  navigate: ReturnType<typeof useNavigate>
) => {
  const target = e.target as HTMLDivElement;
  if (target.tagName === "BUTTON") return;
  navigate(`/post/${id}`);
};
