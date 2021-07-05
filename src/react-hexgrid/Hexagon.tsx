import React, { FC } from 'react';
import { useLayout } from './LayoutProvider';

type Props = {
  q: number,
  r: number,
  onClick?: () => void,
  src: string;
  style?: Object;
}

const Hexagon: FC<Props> = (props) => {
  const layout = useLayout();
  const { size, getPosition} = layout;
  const { children, q, r, onClick, src, style } = props;
  const pixel = getPosition({q,r});

return (<div style={{position:"absolute", transform: `translate(${pixel.x}px, ${pixel.y}px)`}}>
          <div style={{position:"relative", alignItems: "center", justifyContent:"center", display:"flex", textAlign:"center", width:size.x *2, height: size.y * 1.8}}>
            <img onClick={() => onClick && onClick()} src={src} alt={`alt1-${q}-${r}`} style={{...style, width: "100%", height: "100%", objectFit: 'fill'}}/>
            {children}
        </div>
    </div>
  );
}

export default Hexagon;