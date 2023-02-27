import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigationBack = () => {
  const history = useNavigate();

  const handleBackClick = useCallback(() => history(-1), [history]);

  return handleBackClick;
};
