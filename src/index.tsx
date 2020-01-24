import React, { FC, useCallback, useEffect, useRef, ReactElement } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import {
  TransitionStatus,
  TransitionProps
} from "react-transition-group/Transition";
import anime, { AnimeParams, AnimeInstance } from "animejs";
import { capitalize } from "./utils";

export type AnimeProps = AnimeParams & {
  onEntering?: AnimeParams;
  onEntered?: AnimeParams;
  onExited?: AnimeParams;
  onExiting?: AnimeParams;
  initProps?: AnimeProps;
  animeRef?: React.MutableRefObject<AnimeInstance | undefined>;
};

export const AnimeComp: FC<AnimeProps & {
  status: TransitionStatus;
}> = ({
  duration,
  children,
  status,
  onEntering,
  onEntered,
  onExited,
  onExiting,
  initProps,
  animeRef,
  ...props
}) => {
  const childRef = useRef<HTMLElement[]>([]);

  const buildAnimeOptions = useCallback(
    (
      state: TransitionStatus,
      animeOptions: AnimeParams,
      options: Pick<
        AnimeProps,
        "onEntering" | "onEntered" | "onExited" | "onExiting"
      >,
      callbackFn: () => void
    ) => {
      const stateIdentifier = "on" + capitalize(state);
      if (options[stateIdentifier]) {
        /* Removing the previous animation only when new onHook is intercepted */
        callbackFn();
        return { ...animeOptions, ...options[stateIdentifier] };
      }
      return animeOptions;
    },
    []
  );

  useEffect(() => {
    if (!childRef.current) return;

    let animeOptions = buildAnimeOptions(
      status,
      {
        targets: childRef.current as AnimeParams["targets"],
        duration,
        ...props
      },
      { onEntering, onEntered, onExited, onExiting },
      () => {
        if (childRef.current) {
          anime.remove(childRef.current);
        }
      }
    );
    if (initProps) {
      anime.set(childRef.current, initProps);
    }
    const animeInstance = anime(animeOptions);
    if (animeRef) {
      animeRef.current = animeInstance;
    }
  }, [
    status,
    childRef,
    duration,
    initProps,
    buildAnimeOptions,
    onEntering,
    onEntered,
    onExited,
    onExiting,
    props
  ]);

  const addTargetRef = useCallback(target => {
    if (target) childRef.current = [...childRef.current, target];
  }, []);

  return (
    <>
      {React.Children.map(
        children,
        (child, i) =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            ref: addTargetRef
          })
      )}
    </>
  );
};

export type AnimeTransitionProps = Pick<
  TransitionProps,
  "mountOnEnter" | "unmountOnExit" | "appear" | "in"
> &
  AnimeProps & {
    open?: boolean;
    duration: number;
    initProps?: AnimeProps;
    animeRef?: React.MutableRefObject<AnimeInstance | undefined>;
  };

const Anime: FC<AnimeTransitionProps> = ({
  in: inProp,
  duration,
  children,
  mountOnEnter = true,
  unmountOnExit = true,
  appear = false,
  initProps,
  ...props
}) => {
  return (
    <Transition
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      appear={appear}
      timeout={duration}
      in={inProp}
    >
      {(status: TransitionStatus) => (
        <AnimeComp
          duration={duration}
          status={status}
          initProps={initProps}
          {...(props as AnimeProps)}
        >
          {children}
        </AnimeComp>
      )}
    </Transition>
  );
};

export const AnimeGroup: FC<AnimeTransitionProps> = ({ children }) => {
  return <TransitionGroup>{children}</TransitionGroup>;
};

export const PerformAnime: FC<{
  perform: boolean;
  onPerform: AnimeParams;
  retract?: boolean;
  duration: number;
}> = ({ children, perform, onPerform, retract = true, duration }) => {
  const childRef = useRef<HTMLElement[]>([]);
  const addTargetRef = useCallback(target => {
    if (target) childRef.current = [...childRef.current, target];
  }, []);

  const isPerformingAnimation = useRef(false);
  const animatingInstanceRef = useRef<AnimeInstance | null>(null);

  useEffect(() => {
    if (!childRef.current) return;

    if (perform === false && isPerformingAnimation.current) {
      if (animatingInstanceRef.current) {
        if (retract) {
          animatingInstanceRef.current.reverse();
          animatingInstanceRef.current.play();
        } else {
          (animatingInstanceRef.current as any).reset();
        }
      }
      isPerformingAnimation.current = false;
    }

    if (perform === true && !isPerformingAnimation.current) {
      anime.remove(childRef.current);
      animatingInstanceRef.current = anime({
        duration,
        targets: childRef.current,
        autoplay: false,
        ...onPerform
      });
      animatingInstanceRef.current.play();
      isPerformingAnimation.current = true;
    }
  }, [perform, onPerform, retract, childRef, isPerformingAnimation.current]);

  function checkIfElementNotAnime(elem: ReactElement<any, any>) {
    if (elem.type === Anime) {
      throw new Error("Child element can't be <Anime />. Wrap it around a div");
    }
    return false;
  }

  return (
    <>
      {React.Children.map(
        children,
        child =>
          React.isValidElement(child) &&
          !checkIfElementNotAnime(child) &&
          React.cloneElement(child, {
            ref: target => {
              if (target) childRef.current = [...childRef.current, target];
              const { ref } = child as any;
              if (ref && typeof ref === "function") {
                ref(target);
              }
            }
          } as any)
      )}
    </>
  );
};

export default Anime;
