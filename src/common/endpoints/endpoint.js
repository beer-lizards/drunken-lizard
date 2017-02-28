import { Record } from 'immutable';

const Endpoint = Record({
  endpointId: '',
  endpointVersion: '',
  hostName: '',
  lastCheckInDate: null,
  lastCrawled: null,
  macAddress: '',
  operatingSystem: '',
});

export default Endpoint;
