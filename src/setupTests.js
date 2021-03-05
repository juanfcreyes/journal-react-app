import {createSerializer} from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter });
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
