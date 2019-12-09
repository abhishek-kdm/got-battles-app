import React, { useState, useContext, useEffect, useMemo } from 'react';
import './searchSection.style.css';

import AutoComplete from '../__pure__/AutoComplete/autocomplete.component';
import { AppContext } from '../../context';
import {
  fetchJson,
  constructString,
  refreshableCallback
} from '../../utils';
import { GENERIC_SEARCH_URL } from '../../configs';
import { useComponentMountRef } from '../../utils/hooks';


export interface SearchSectionProps { }
 
const SearchSection: React.FC<SearchSectionProps> = () => {
  const componentMounted = useComponentMountRef();

  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<any>([]);
  const { battle, setBattle } = useContext(AppContext);

  const searchInputProps = useMemo(() => ({
    value,
    type: 'search',
    placeholder: 'Search for battles.',
    onChange: ({ target }: any) => { setValue(target.value) },
  }), [value]);

  useEffect(() => { setValue('') }, [battle]);

  useEffect(() => {
    if (value.length) {
      // for smoother typing and avoiding unnecessary API calls.
      refreshableCallback(async () => {
        const url = GENERIC_SEARCH_URL(value);

        // only setState if component is still mounted.
        if (componentMounted.current)
          setOptions(await fetchJson(url));
      }, 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (<>
    <section id={'search-section'} className={'container'}>
      <div className='main-title'>
        <img
          src='https://cdn.shopify.com/s/files/1/2954/7938/articles/GOT_Logo_20_1024x.png?v=1555543754'
          alt=''
        />
      </div>
      <AutoComplete
        inputProps={searchInputProps}
        onSelect={setBattle}
      >
        {(isOpen, optionProps) => (
          isOpen(options) ? (
            <ul>
              {options.map((option: any, key: number) => (
                <li {...optionProps(option, key)}>
                  {constructString(option)}
                </li>
              ))}
            </ul>
          ) : (null)
        )}
      </AutoComplete>
    </section>
  </>);
}

export default SearchSection;
