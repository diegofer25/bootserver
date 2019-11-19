import ncp from 'ncp';
import { promisify } from 'util';
const copy = promisify(ncp);

export default ({ pathFrom, pathTo }) => {
  try {
    return copy(pathFrom, pathTo, {
      clobber: false,
    });
  } catch (error) {
    return console.log(error)
  }
}
