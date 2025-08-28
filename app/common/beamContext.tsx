import {
  createContext,
  useContext,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";

export type BeamConfig = {
  apiKey: string;
  chainId: number;
  storeId: number;
  debug: boolean;
  baseUrl: string;
};

export const defaultBeamConfig: BeamConfig = {
  apiKey:
    process.env.BEAM_API_KEY ||
    "beamtest-PPmpnrGsUJcY.a7becb88-b30e-45d8-996e-c29e3dc08017", // demo key for dev store
  chainId: 1,
  storeId: 1,
  debug: true,
  baseUrl: "https://api-dev.beamimpact.com",
};

export const BeamContext = createContext(defaultBeamConfig);

export const BeamProvider: FunctionComponent<
  PropsWithChildren<{ value: BeamConfig }>
> = ({ children, value = defaultBeamConfig }) => {
  return <BeamContext.Provider value={value}>{children}</BeamContext.Provider>;
};

export const useBeam = () => useContext(BeamContext);
