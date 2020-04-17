import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser
} from '@fortawesome/free-solid-svg-icons';

const setupFontAwesomeLibrary = () => {
  library.add(
    faUser
  );
};

export default setupFontAwesomeLibrary;
