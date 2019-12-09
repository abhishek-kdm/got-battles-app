import React from 'react';
import './imgCircle.style.css';

interface ImgCircleProps {
  size: number
  progress: number
  imageUrl: string
  circleColor: string
}

const ImgCircle: React.FC<ImgCircleProps> = ({
  size,
  progress,
  imageUrl,
  circleColor,
}) => {
  const diameter = size / 1.033729509;
  const dx = size / 2;
  const dy = (size - diameter) / 2;
  const radius = diameter / 2;
  const circumference = 2 * Math.PI * radius;

  const fillPercent = circumference * progress / 100;

  return (<>
    <div className='img-overlay'>
      <img src={imageUrl} alt='' />
      <svg viewBox={`0 0 ${size} ${size}`}>
        <path
          className={'circle'}
          d={`M${dx} ${dy}
            a ${radius} ${radius} 0 0 1 0 ${diameter}
            a ${radius} ${radius} 0 0 1 0 -${diameter}`}
          stroke={circleColor}
          strokeDasharray={`${fillPercent}, ${circumference}`}
        />
      </svg>
    </div>
  </>);
}

export default ImgCircle;