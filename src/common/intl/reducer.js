import messages from './messages';

const initialState = {
  availableLanguages: ['en'],
  msg: messages.en,
  selectedLanguage: 'en',
};

export default function intlReducer(state = initialState, action) {
  if (!action) return state;

  // TODO: Add SET_APP_LANGUAGE action.

  return state;
}
