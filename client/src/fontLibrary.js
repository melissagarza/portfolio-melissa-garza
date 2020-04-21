import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faAsterisk
} from '@fortawesome/free-solid-svg-icons';

const setupFontAwesomeLibrary = () => {
  library.add(
    faUser,
    faAsterisk
  );
};

export default setupFontAwesomeLibrary;
