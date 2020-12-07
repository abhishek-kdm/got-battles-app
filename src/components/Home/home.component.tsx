import React, { useState, useEffect, useMemo, useContext } from 'react';
import style from './home.module.css';
import globalStyle from '../../styles/global.module.css';

import { PageProps as GatsbyPageProps, navigate } from 'gatsby';

import AutoComplete from '../__pure__/AutoComplete/autocomplete.component';
import { fetchJson, constructString, refreshableCallback } from '../../utils';

import { SERVER_URI } from '../../configs';
import { AppContext } from '../../context';

export interface SearchSectionProps extends GatsbyPageProps { }

const SearchSection: React.FC<SearchSectionProps> = () => {
  const { setBattle } = useContext(AppContext)
  const [value, setValue]     = useState<string>('');
  const [options, setOptions] = useState<any>([]);

  const searchInputProps = useMemo(() => ({
    value,
    type: 'search',
    placeholder: 'Search for battles.',
    onChange: ({ target }: any) => { setValue(target.value) },
  }), [value]);

  useEffect(() => {
    if (value.length) {
      // for smoother typing and avoiding unnecessary API calls.
      refreshableCallback(async () => {
        const url = `${SERVER_URI}/battle/search?param=${value}`;
        setOptions(await fetchJson(url));
      }, 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (<>
    <section
      id={'home'}
      className={[globalStyle.container, style.home].join(' ')}
    >
      <div className={style.title}>
        <img
          src='https://cdn.shopify.com/s/files/1/2954/7938/articles/GOT_Logo_20_1024x.png?v=1555543754'
          alt=''
        />
      </div>
      <AutoComplete
        inputProps={searchInputProps}
        onSelect={(battle) => {
          setBattle(battle);
          navigate(`/battle?id=${battle._id}`);
        }}
      >
        {(isOpen, optionProps, containerProps) => (
          isOpen(options) ? (
            <ul {...containerProps()}>
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

