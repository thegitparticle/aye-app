import React from 'react';

export const MixpanelContext = React.createContext();

export const MixpanelProvider = MixpanelContext.Provider;

export const MixpanelConsumer = MixpanelContext.Consumer;

export default MixpanelContext;
