import { useEffect, useState, useCallback } from 'react'

export const useKeyPress = (targetKeyCode: number) => {
  const [keyEvent, setKeyEvent] = useState<boolean>(false);

  const downHandler = useCallback(function (e: KeyboardEvent) {
    if (e.which === targetKeyCode) {
      e.preventDefault();
      setKeyEvent(true);
    }
  }, [targetKeyCode]);


  const upHandler = useCallback(function (e: KeyboardEvent) {
    if (e.which === targetKeyCode) {
      e.preventDefault();
      setKeyEvent(false);
    }
  }, [targetKeyCode]);

  // cDM
  useEffect(() => {
    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);

    return () => {
      document.removeEventListener('keydown', downHandler)
      document.removeEventListener('keyup', upHandler)
    };
  }, [downHandler, upHandler]);

  return keyEvent;
}

