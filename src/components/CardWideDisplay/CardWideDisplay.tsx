import { useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import useCardStore from '../../store/useCardStore';
import CardContent from '../CardContent/CardContent';
import styles from './CardWideDisplay.module.css';

import { MdHdrStrong } from "react-icons/md";
import { MdHdrWeak } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const CardWideDisplay = () => {
  const [cards, active_wide_card] = useCardStore((state) => [state.cards, state.active_wide_card]);
  const card = useMemo(() => cards.find((card) => card.id === active_wide_card), [cards, active_wide_card]);
  // const style = card?.background ? { backgroundImage: `url(${card?.background})` } : {};
  const [isShowcaseMode, setIsShowcaseMode] = useState(false);
  const [isAltDisplay, setIsAltDisplay] = useState(false);

  const bgImage_ref = useRef(null);

  useEffect(() => {
    setIsAltDisplay(false);
    setIsShowcaseMode(false);
  }, [card]);

  const animation = useSpring({
    y: active_wide_card ? 0 : -20,
    opacity: active_wide_card ? 1 : 0,
    gridTemplateColumns: isShowcaseMode ? '2fr 1fr' : '1fr 2fr',
    config: { mass: 15, friction: 500, tension: 4000 }
  });

  const animation_fade_in = useSpring({
    opacity: isShowcaseMode ? 1 : 0,
    config: { mass: 50, friction: 2000, tension: 4000 }
  });
  const animation_fade_out = useSpring({
    opacity: isShowcaseMode ? 0 : 1,
    config: { mass: 50, friction: 2000, tension: 4000 }
  });

  return (
    <div className={`${styles.CardWideDisplay} ${!active_wide_card && styles.CardWideDisplay__hidden}`}>
      <animated.div className={`${styles.card}`} style={animation}>

        <div className={styles.bgImageHeader}>
          <button
            className={`${styles.altModeToggleBtn} transparent-button`}
            onClick={() => setIsShowcaseMode(!isShowcaseMode)}
          >
            {isShowcaseMode ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
          </button>
          {
            isShowcaseMode && card?.background_alt &&
            <button
              className="transparent-button"
              onClick={() => setIsAltDisplay(!isAltDisplay)}
            >
              {isAltDisplay ? <MdHdrStrong /> : <MdHdrWeak />}
            </button>
          }
        </div>

        <div className={styles.bgImage} ref={bgImage_ref}>
          {
            isShowcaseMode
              ?
              <TransformWrapper
                initialScale={1}
                limitToBounds={false}
                minScale={0.25}
              >
                {
                  ({ zoomIn, zoomOut, resetTransform, zoomToElement, instance, ...rest }) => {
                    useEffect(() => {
                      resetTransform();
                    }, [isAltDisplay]);
                    return (
                      <>
                        <TransformComponent >
                          <animated.div style={animation_fade_in}>
                            <img src={isAltDisplay ? card?.background_alt : card?.background} />
                          </animated.div>
                        </TransformComponent>
                      </>
                    );
                  }
                }
              </TransformWrapper>
              :
              <animated.div
                className={styles.bgImage__static}
                style={card?.background ? { backgroundImage: `url(${card?.background})`, ...animation_fade_out } : { ...animation_fade_out }}
              />
          }
        </div>
        <div className={styles.content}>
          {card && <CardContent data={card} />}
        </div>
      </animated.div >
    </div>
  );
};

export default CardWideDisplay;