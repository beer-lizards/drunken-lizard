export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';
export const ON_APP_REHYDRATE = 'ON_APP_REHYDRATE';
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSED = 'DRAWER_CLOSED';

export function onAppComponentDidMount() {
  return () => ({
    type: ON_APP_COMPONENT_DID_MOUNT,
  });
}

export function opAppRehydrate() {
  return () => ({
    type: ON_APP_REHYDRATE,
  });
}

export function openDrawer() {
  return () => ({
    type: DRAWER_OPEN,
  });
}

export function closeDrawer() {
  return () => ({
    type: DRAWER_CLOSED,
  });
}
