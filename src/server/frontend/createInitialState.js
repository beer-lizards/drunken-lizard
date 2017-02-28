import config from '../config';
import configReducer from '../../common/config/reducer';
import deviceReducer from '../../common/device/reducer';

export default function createInitialState() {
  return {
    config: configReducer(undefined, {})
      .set('appName', config.appName),
    device: deviceReducer(undefined, {}),
  };
}
