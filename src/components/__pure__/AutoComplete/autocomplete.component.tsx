import React, { useCallback, useEffect, useRef } from 'react';
import style from './autocomplete.module.css';

import { useKeyPress } from '../../../utils/hooks';
import { autocompleteNavigate } from '../../../utils';


interface AutoCompleteProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  onSelect: (option: any) => void
  children: (
    isOpen: (a: any[]) => boolean,
    optionProps: any,
    containerProps: any
  ) => JSX.Element | null
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  inputProps,
  onSelect,
  children,
}) => {
  // hook tracking keypress.
  const upArrowPressed = useKeyPress(38);
  const downArrowPressed = useKeyPress(40);

  const auInput = useRef<HTMLInputElement>(null);
  const auContainer = useRef<HTMLElement>(null);

  const { value } = inputProps;
  
  const isOpen = useCallback((options) => {
    return (value as string).length > 0 && options.length > 0
  }, [value]);

  const optionProps = (option: any, key: string | number) => ({
    key,
    /**
     * @TODO need a better way to do this.
     * currently assuming the key would [0..]
     */
    tabIndex: Number(key) + 2,
    onClick: () => { onSelect(option) },
    onKeyPress: ({ which }: any) => { which === 13 && onSelect(option) },
  });

  const containerProps = () => ({ ref: auContainer });

  // arrow navigation side effect hooks.
  useEffect(() => {
    if (downArrowPressed) {
      autocompleteNavigate.next(auInput.current, auContainer.current);
    }
  }, [downArrowPressed]);

  useEffect(() => {
    if (upArrowPressed) {
      autocompleteNavigate.previous(auContainer.current);
    }
  }, [upArrowPressed]);

  return (<>
    <div className={style.autocomplete}>
      <input {...inputProps} tabIndex={1} ref={auInput} />
      {children(isOpen, optionProps, containerProps)}
    </div>
  </>);
}

export default AutoComplete;

