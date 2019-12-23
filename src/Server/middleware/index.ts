import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex,
  setSession
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex,
  setSession
];
