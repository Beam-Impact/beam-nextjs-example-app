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
    "24T5yQFIIz6x.abc317ce-bd1f-47ed-909f-d1c11b03601e", // demo key for dev store
  chainId: 1,
  storeId: 1,
  debug: true,
  baseUrl: "https://dev-central-backend.beamimpact.com",
};

export const BeamContext = createContext(defaultBeamConfig);

export const BeamProvider: FunctionComponent<
  PropsWithChildren<{ value: BeamConfig }>
> = ({ children, value = defaultBeamConfig }) => {
  return <BeamContext.Provider value={value}>{children}</BeamContext.Provider>;
};

export const useBeam = () => useContext(BeamContext);
