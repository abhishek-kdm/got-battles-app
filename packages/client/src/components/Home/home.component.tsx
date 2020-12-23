import React, { useState, useEffect, useMemo, useContext } from 'react';
import { PageProps as GatsbyPageProps, navigate, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import styles from './home.module.css';
import globalStyle from '../../styles/global.module.css';

import AutoComplete from '../__pure__/AutoComplete/autocomplete.component';
import { fetchJson, constructString, refreshableCallback } from '../../utils';

import { SERVER_URI } from '../../configs';
import { AppContext } from '../../context';

export interface SearchSectionProps extends GatsbyPageProps { }

const SearchSection: React.FC<SearchSectionProps> = () => {
  const { GotBanner } = useStaticQuery(gqlQuery);

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
    <section className={[globalStyle.container, styles.home].join(' ')}>
      <div className={styles.title}>
        <Image
          className={styles.title__img}
          fluid={{ ...GotBanner.childImageSharp.fluid }}
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

const gqlQuery = graphql`
  query {
    GotBanner: file(relativePath: { eq: "got-banner.png" }) {
      childImageSharp {
        fluid {
          src
          srcSet
          sizes
          aspectRatio
        }
      }
    }
  }
`;

export default SearchSection;

