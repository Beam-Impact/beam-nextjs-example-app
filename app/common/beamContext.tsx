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

const defaultBeamConfig: BeamConfig = {
  apiKey: "abc-123",
  chainId: 1,
  storeId: 1,
  debug: true,
  baseUrl: "http://localhost:8081/mocks",
};

export const BeamContext = createContext(defaultBeamConfig);

export const BeamProvider: FunctionComponent<
  PropsWithChildren<{ value: BeamConfig }>
> = ({ children, value = defaultBeamConfig }) => {
  return <BeamContext.Provider value={value}>{children}</BeamContext.Provider>;
};

export const useBeam = () => useContext(BeamContext);
