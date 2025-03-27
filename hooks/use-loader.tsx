import { create } from "zustand"


interface useLoaderProps {
    isLoading: boolean,
    onStartLoader: () => void,
    onStopLoader: () => void
}

export const useLoader = create<useLoaderProps>((set) => ({
    isLoading: false,
    onStartLoader: () => set({ isLoading: true }),
    onStopLoader: () => set({ isLoading: false })
}))

