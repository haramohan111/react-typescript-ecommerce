// navigationHelper.ts
import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | null = null;

export const setNavigate = (nav: NavigateFunction): void => {
    navigate = nav;
};

export const navigateTo = (path: string): void => {
    if (navigate) {
        navigate(path);
    }
};
