import React, { useCallback } from 'react';

import './autocomplete.style.css';


interface AutoCompleteProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  onSelect: (option: any) => void
  children: (
    isOpen: (a: any[]) => boolean,
    optionProps: any
  ) => JSX.Element | null
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  inputProps,
  onSelect,
  children,
}) => {
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

  return (<>
    <div className='autocomplete'>
      <input {...inputProps} tabIndex={1} />
      {children(isOpen, optionProps)}
    </div>
  </>);
}

export default AutoComplete;

