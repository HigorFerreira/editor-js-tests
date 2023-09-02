import type { Dispatch, SetStateAction } from "react";

export type PublicStates = {
    settingsSetColumns: Dispatch<SetStateAction<number>> | null
    mainComponentSetColumns: Dispatch<SetStateAction<number>> | null
};
