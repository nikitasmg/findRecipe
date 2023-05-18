import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNoMatchNavigation = () => {
  const history = useNavigate();

  const redirect404 = useCallback(() => history("/404"), [history]);

  return redirect404;
};
