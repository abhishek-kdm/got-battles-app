import React, { useContext } from 'react';
import style from './battleSummary.module.css';
import globalStyle from '../../styles/global.module.css';

import { AppContext } from '../../context';
import KingdomSummary from '../__pure__/KingdomSummary/kingdomSummary.component';

const Note: React.FC<{ children: string }> = ({ children }) => {
  return (children && children.length) ? (<>
    <hr style={{ width: '70%'}} />
    <div className={style.note}>{children}</div>
  </>) : null;
}

const GoBack = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={style.goback}>&lang;</button>
);

interface BattleSummaryProps { }

const BattleSummary: React.FC<BattleSummaryProps> = () => {
  const { battle, setBattle } = useContext(AppContext);

  return (<>
  <section
    id={'battle-summary-section'}
    className={[
      globalStyle.container,
      style.battle__summary_section
    ].join(' ')}
  >
      <GoBack onClick={() => { setBattle(null) }} />

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
