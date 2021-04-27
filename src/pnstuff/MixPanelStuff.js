import React from 'react';
import {Mixpanel} from 'mixpanel-react-native';

export const MixpanelContext = React.createContext();

export const MixpanelProvider = MixpanelContext.Provider;

export const MixpanelConsumer = MixpanelContext.Consumer;

export default MixpanelContext;

/*
export const MixpanelProvider = ({children}) => {
  const [mixpanel, setMixpanel] = React.useState(null);

  React.useEffect(() => {
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '3e0fa58ece380382cd406509554aef3b',
      );
      setMixpanel(initializedMixpanel);
      mixpanel.identify('dummy_user_test');
      //mixpanel.track('init done of mixpanel');
    };

    initMixpanel();
  }, []);

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  );
};
*/
