import React, { useMemo } from 'react';
import style from './kingdomSummary.module.css';
import globalStyle from '../../../styles/global.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSynagogue,
  faFistRaised,
  faAsterisk,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';

import ImgCircle from '../ImgCircle/imgCircle.component';
import { fancyNumber } from '../../../utils';

interface KingdomSummaryProps {
  battle: any
  battleRole: string
  reverse?: boolean
}
const KingdomSummary: React.FC<KingdomSummaryProps> = ({
  battle,
  battleRole,
  reverse,
}) => {
  const classes = useMemo(() => [
    style.summary__container,
    reverse ? style.reverse : ''
  ].join(' '), [reverse]);

  const warriors = [
    battle[`${battleRole}_1`],
    battle[`${battleRole}_2`],
    battle[`${battleRole}_3`],
    battle[`${battleRole}_4`]
  ];

  const color = (
    (battleRole === 'attacker' && battle.attacker_outcome === 'win') ||
    (battleRole === 'defender' && battle.attacker_outcome === 'loss')
  ) ? '#7BEFB2' : '#F03434';

  return (<>
    <div className={classes}>
      <div className={style.summary}>
        {battle[`${battleRole}_king_bg`] && (<>
          <img
            className={style.summary__image}
            src={battle[`${battleRole}_king_bg`]}
            alt={battle[`${battleRole}_king`]}
            title={battle[`${battleRole}_king`]}
          />
        </>)}
        <div className={style.summary__overlay}>
          <ImgCircle
            size={5}
            progress={100}
            imageUrl={battle[`${battleRole}_king_img`]}
            circleColor={color}
          />
          <hr style={{ width: '40%' }} />
          <small className={globalStyle.medium}>
            {battle[`${battleRole}_king`]}
          </small>
          <small className={globalStyle.smaller}>
            {warriors
              .filter((x) => x && x.trim().length > 0)
              .join(', ')}
          </small>
        </div>
      </div>
      <div className={style.battle__stats}>
        {!reverse && (
          <span
            className={style.stats__logo}
            title={battle[`${battleRole}_king`] || '--'}
          >
            <FontAwesomeIcon icon={faSynagogue} />
          </span>)
        }
        <span title={'Army Size'}>
          <FontAwesomeIcon icon={faFistRaised} />
          {fancyNumber(battle[`${battleRole}_size`] || null)}
        </span>
        <span title={'Major Captures'}>
          <FontAwesomeIcon icon={faAsterisk} />
          {fancyNumber(battle.major_capture || null)}
        </span>
        <span title={'Major Deaths'}>
          <FontAwesomeIcon icon={faSkull} />
          {fancyNumber(battle.major_death || null)}
        </span>
        {reverse && (
          <span
            className={style.stats__logo}
            title={battle[`${battleRole}_king`] || '--'}
          >
            <FontAwesomeIcon icon={faSynagogue} />
          </span>)
        }
      </div>
    </div>
  </>);
}

export default KingdomSummary;

