import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  setBasePath,
  setViewEngine,
  setStaticPath,
  serveIndex
];
