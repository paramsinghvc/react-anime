import React, { FC, useCallback, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
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

const Anime: FC<Pick<
  TransitionProps,
  "mountOnEnter" | "unmountOnExit" | "appear"
> &
  AnimeProps & {
    open: boolean;
    duration: number;
    initProps?: AnimeProps;
    animeRef?: React.MutableRefObject<AnimeInstance | undefined>;
  }> = ({
  open,
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
      in={open}
      timeout={duration}
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

export default Anime;
