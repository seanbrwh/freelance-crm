import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath
];
