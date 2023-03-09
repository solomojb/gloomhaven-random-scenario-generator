import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
} from "react";

type LayoutContextType = {
  size: Point;
  rotateHex: boolean;
  getPosition: (hex: Hex) => Point;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type Props = {
  className?: string;
  flat?: boolean;
  origin?: Point;
  size?: Point;
  spacing?: number;
};

export const useLayout = () => {
  const result = useContext(LayoutContext);
  if (!result) {
    throw Error("No context. Call this inside a LayoutProvider");
  }
  return result;
};

const LAYOUT_FLAT: Orientation = {
  f0: 3.0 / 2.0,
  f1: 0.0,
  f2: Math.sqrt(3.0) / 2.0,
  f3: Math.sqrt(3.0),
};
const LAYOUT_POINTY: Orientation = {
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
};

const getOrientation = (flat: boolean) => {
  return flat ? LAYOUT_FLAT : LAYOUT_POINTY;
};

export const LayoutProvider: FC<Props> = (props) => {
  const {
    children,
    flat = false,
    origin = { x: 0, y: 0 },
    spacing = 1,
    size = { x: 6.2, y: 6.2 },
  } = props;
  const orientation = getOrientation(flat);

  const getPosition = useCallback(
    (hex: Hex): Point => {
      let x = (orientation.f0 * hex.q + orientation.f1 * hex.r) * size.x;
      let y = (orientation.f2 * hex.q + orientation.f3 * hex.r) * size.y;
      // Apply spacing
      x = x * spacing;
      y = y * spacing;
      return { x: x + origin.x, y: y + origin.y };
    },
    [orientation, spacing, origin, size]
  );

  const value = useMemo(
    () => ({
      size,
      rotateHex: !flat,
      getPosition,
    }),
    [flat, getPosition, size]
  );

  const { Provider } = LayoutContext;

  return <Provider value={value}>{children}</Provider>;
};

export default LayoutProvider;
