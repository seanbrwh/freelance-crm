import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faEnvelopeOpenText,
  faUserClock,
  faCreditCard,
  faChartBar,
  faSun
} from "@fortawesome/free-solid-svg-icons";

export default () =>
  library.add(
    fab,
    faCheckSquare,
    faEnvelopeOpenText,
    faUserClock,
    faCreditCard,
    faChartBar,
    faSun
  );
