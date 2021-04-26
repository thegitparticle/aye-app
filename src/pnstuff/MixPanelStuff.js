import React from 'react';
import {Mixpanel} from 'mixpanel-react-native';

export const MixpanelContext = React.createContext();

export const MixpanelProvider = ({children}) => {
  const [mixpanel, setMixpanel] = React.useState(null);

  React.useEffect(() => {
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '3e0fa58ece380382cd406509554aef3b',
      );
      setMixpanel(initializedMixpanel);
    };

    initMixpanel();
  }, []);

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  );
};
