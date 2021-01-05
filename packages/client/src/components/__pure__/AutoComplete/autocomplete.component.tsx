import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import styles from './autocomplete.module.css';

import { useKeyPress } from '../../../utils/hooks';
import { autocompleteNavigate } from '../../../utils';


interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading: boolean,
  onSelect: (option: any) => void,
  children: (
    isOpen: (a: any[]) => boolean,
    optionProps: (options: any, key: number) => React.HTMLAttributes<HTMLElement>,
    containerProps: () => React.HTMLAttributes<HTMLUListElement> & React.ClassAttributes<HTMLUListElement>,
  ) => JSX.Element | null
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  loading,
  onSelect,
  children,
  className,
  ...inputProps
}) => {
  // hook tracking keypress.
  const upArrowPressed = useKeyPress(38);
  const downArrowPressed = useKeyPress(40);

  const auInput = useRef<HTMLInputElement>(null);
  const auContainer = useRef<HTMLElement>(null);

  const isOpen = useCallback((options) => (
    (inputProps.value as string).length > 0 && options.length > 0
  ), [inputProps.value]);

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

  const classes = useMemo(() => (
    ([styles.autocomplete])
    .concat(className || '')
    .concat(loading ? styles.loading : '')
  ), [className, loading]);

  return (<>
    <div className={classes.join(' ').trim()}>
      <input {...inputProps} className={styles.autocompleteinput} tabIndex={1} ref={auInput} />
      {children(isOpen, optionProps, containerProps)}
    </div>
  </>);
}

export default AutoComplete;

