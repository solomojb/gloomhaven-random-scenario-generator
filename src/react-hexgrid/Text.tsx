import React, { FC } from 'react';
import { useLayout } from './LayoutProvider';

type Props = {
  q: number,
  r: number,
  text: string;
}

const Text = (props:Props) => {
  const layout = useLayout();
  const { getPosition} = layout;
  const { q, r, text } = props;
  const pixel = getPosition({q,r});

return (<div style={{position:"absolute", transform: `translate(${pixel.x + 25}px, ${pixel.y + 25}px)`}}>
          <text style={{fontSize:"13pt"}}>{text}</text>
    </div>
  );
}

export default Text;