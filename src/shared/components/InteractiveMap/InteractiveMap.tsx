import clsx from "clsx";
import React, { Suspense, useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import styles from "./InteractiveMap.module.css";

const MapSVG = React.lazy(() => import("~/shared/assets/images/MapSVG"));

type Props = {
  onSelect?: (id: number) => void;
};

export const InteractiveMap: React.FC<Props> = () => {
  const [map, setMap] = useState({
    scale: 0.4,
    translation: { x: 0, y: 0 }
  });

  return (
    <MapInteractionCSS
      showControls
      minScale={0.4}
      maxScale={1}
      plusBtnClass={styles.btn}
      minusBtnClass={clsx(styles["btn-minus"], styles.btn)}
      value={map}
      onChange={setMap}
    >
      <Suspense>
        <MapSVG />
      </Suspense>
    </MapInteractionCSS>
  );
};
