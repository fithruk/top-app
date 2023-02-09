import { createContext, ReactNode, useState } from "react";
import { TopLevelCategory } from "inteafaces/page.interface";
import { MenuItem } from "inteafaces/menu.interface";

export interface IAppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}
const initialContext: IAppContext = {
  menu: [],
  firstCategory: TopLevelCategory.Cources,
};

export const AppContext = createContext(initialContext);

export const AppContextProvider = ({
  menu,
  firstCategory,
  children,
}: IAppContext & { children: ReactNode }): JSX.Element => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);

  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  );
};
