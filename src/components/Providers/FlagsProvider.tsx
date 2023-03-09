import React, { useContext, createContext, ReactNode, useState, FC } from 'react'

export enum ShowFlags {
    Grid                = 1 << 0,
    SpawnPoint          = 1 << 1,
    Obstacles           = 1 << 2,
    Corridors           = 1 << 3,
    Spawns              = 1 << 4,
    EditMode            = 1 << 5,
    Unused6             = 1 << 6,
    Doors               = 1 << 7,
    Selectors           = 1 << 8,
    Unused9             = 1 << 9,
    Unused10            = 1 << 10,
    Unused11             = 1 << 11,
    ShowAllMap = Obstacles | Corridors | Spawns | Doors
  }

type ContextData = {
    setFlag: ( flag: ShowFlags, add: boolean) => void;
    isFlagSet: (flag: ShowFlags) => boolean;
    toggleFlag: (flag: ShowFlags) => void;
}

const initialFlagsContext: ContextData = {
    isFlagSet: () => false,
    setFlag: () => {},
    toggleFlag: () => {}
}


export const FlagsContext = createContext<ContextData>(initialFlagsContext);

export function useFlags() {
    return useContext(FlagsContext);
}

type Props = {
    localKey?: string
    initialFlags: number;
}

const FlagsProvider: FC<Props> = (props) => {
    const {children, localKey, initialFlags} = props;
    const startingFlag: number = localKey? parseInt(localStorage.getItem(localKey) || `${initialFlags}`) : initialFlags;
    const [flags, setFlags] = useState<number>(startingFlag);
    const { Provider } = FlagsContext;

    const setFlag = (flag: ShowFlags, add: boolean) => {
        let newFlags = flags;
        if (add) {
            newFlags |= flag;
        } else {
            newFlags &= ~flag;
        }
        setFlags(newFlags);
        storePlayerInStateandLocal(newFlags);
    }

    const toggleFlag = (flag: ShowFlags) => {
        setFlag(flag, !isFlagSet(flag))
    }

    const isFlagSet = (flag :ShowFlags) => {
        return (flag & flags) > 0
    }

    const storePlayerInStateandLocal = (newFlags: number) =>  {
        if (localKey) {
            localStorage.setItem(localKey, newFlags.toString());
        }

    }

    return <Provider value={{isFlagSet, setFlag, toggleFlag}}>{children}</Provider>
}
 
export default FlagsProvider;
