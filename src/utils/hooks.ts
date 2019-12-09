import { useRef, useEffect } from 'react'


export const useComponentMountRef = () => {
  const componentMounted = useRef<boolean>(true);
  // cDM
  useEffect(() => (() => { componentMounted.current = false }), []);
  return componentMounted;
}
