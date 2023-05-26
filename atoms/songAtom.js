import { atom } from "recoil";

export const currentTrackIdState = atom ({
    key: "currentTrackIdState", // Unique ID (with respec to other atoms/selectors)
    default: null, // default value (aka inital value)
});

export const isPlayingState = atom ({
    key: "isPlayingState",
    default: false,
});