import ncp from 'ncp';
import { promisify } from 'util';
const copy = promisify(ncp);

export default ({ templateDirectory, targetDirectory }) => {
  return copy(templateDirectory, targetDirectory, {
    clobber: false,
  });
}
