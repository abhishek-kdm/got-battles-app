import React, { useState, useEffect, useMemo, useContext } from 'react';
import { PageProps as GatsbyPageProps, navigate, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import styles from './home.module.css';
import globalStyles from '../../styles/global.module.css';

import AutoComplete from '../__pure__/AutoComplete/autocomplete.component';
import { fetchJson, constructString, refreshableCallback } from '../../utils';
import { GraphqlOptions, SERVER_URI } from '../../configs';
import { AppContext } from '../../context';


const staticQuery = graphql`
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

const query = `
query FilteredBattles($value: String) {
  battles(param: $value) {
    ${GraphqlOptions.commonQueryFields}
  }
}
`;

export interface SearchSectionProps extends GatsbyPageProps { }

const SearchSection: React.FC<SearchSectionProps> = () => {
  const { GotBanner } = useStaticQuery(staticQuery);

  const { setBattle } = useContext(AppContext);
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
        const { data } = await fetchJson(SERVER_URI, {
          method: 'POST',
          body: JSON.stringify({ query, variables: { value } }),
          headers: GraphqlOptions.commonHeaders,
        });
        setOptions(data.battles);
      }, 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (<>
    <section className={[globalStyles.container, styles.home].join(' ')}>
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
          navigate(`/battle?id=${battle.id}`);
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
