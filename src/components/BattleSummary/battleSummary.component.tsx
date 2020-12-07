import React, { useEffect, useContext } from 'react';
import style from './battleSummary.module.css';
import globalStyle from '../../styles/global.module.css';

import { PageProps as GatsbyPageProps, Link } from 'gatsby';

import KingdomSummary from '../__pure__/KingdomSummary/kingdomSummary.component';
import { AppContext } from '../../context';
import { fetchJson } from '../../utils';
import { SERVER_URI } from '../../configs';

const Note: React.FC<{ children: string }> = ({ children }) => {
  return (children && children.length) ? (<>
    <hr style={{ width: '70%'}} />
    <div className={style.note}>{children}</div>
  </>) : null;
}

interface BattleSummaryProps extends GatsbyPageProps { }

const BattleSummary: React.FC<BattleSummaryProps> = ({ location }) => {
  const { battle, setBattle } = useContext(AppContext);

  useEffect(() => {
    if (!battle) {
      const id = location.search.split('?')[1].split('=')[1];
      const url = `${SERVER_URI}/battle/${id}`;
      fetchJson(url).then(setBattle);
    }
  }, [battle, location]);

  if (!battle) {
    return null;
  }

  return (<>
    <section
      className={[
        globalStyle.container,
        style.battle__summary_section
      ].join(' ')}
    >
      <Link to='/' className={style.goback}>&lang;</Link>

      <h2 className={style.battle__title}>
        <label>{battle.name}</label>
      </h2>

      <div className={style.battle__summary_wrapper}>
        <KingdomSummary battle={battle} battleRole={'attacker'} />
        <KingdomSummary battle={battle} battleRole={'defender'} reverse />
      </div>

      <span className={style.battle__location}>
        {`${battle.battle_type} at `}
        {battle.location ? battle.location + ', ' : ''}
        {battle.region}
      </span>

      <Note>{battle.note}</Note>
    </section>
  </>);
}

export default BattleSummary;
