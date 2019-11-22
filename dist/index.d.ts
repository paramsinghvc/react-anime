import React, { FC } from "react";
import { TransitionStatus, TransitionProps } from "react-transition-group/Transition";
import { AnimeParams, AnimeInstance } from "animejs";
export declare type AnimeProps = AnimeParams & {
    onEntering?: AnimeParams;
    onEntered?: AnimeParams;
    onExited?: AnimeParams;
    onExiting?: AnimeParams;
    initProps?: AnimeProps;
    animeRef?: React.MutableRefObject<AnimeInstance | undefined>;
};
export declare const AnimeComp: FC<AnimeProps & {
    status: TransitionStatus;
}>;
declare const Anime: FC<Pick<TransitionProps, "mountOnEnter" | "unmountOnExit" | "appear"> & AnimeProps & {
    open: boolean;
    duration: number;
    initProps?: AnimeProps;
    animeRef?: React.MutableRefObject<AnimeInstance | undefined>;
}>;
export default Anime;
