import {useEffect, useRef} from "react";

/**
 * Аналог хука жизненного цикла componentDidMount
 * @param effect эффект
 * @param deps зависимости при которых срабатывает эффект
 * @param cleanup Очистка зависимостей при анмаунте
 */
export const useDidMountEffect = (
  effect: () => void,
  deps: any[],
  cleanup?: () => void
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effect();
    } else didMount.current = true;

    return cleanup;
  }, deps);
};
