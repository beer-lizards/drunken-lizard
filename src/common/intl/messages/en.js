export default {
  app: {
    description: 'Drink virtual beer with your friends.',
    footer: {
      name: 'Labetu Software',
      madeBy: 'Hand crafted by the engineers at Drinking Lizards.',
    },
    links: {
      beer: 'Beer',
      friends: 'Friends',
      overview: 'Overview',
      settings: 'Settings',
    },
    title: 'Lizards with Friends',
    titleTemplate: '%s - Lizards with Friends',
  },
  auth: {
    form: {
      button: {
        login: 'Login',
        signup: 'Sign up',
      },
      hint: 'Hint: pass1',
      legend: 'Classic XMLHttpRequest Login',
      placeholder: {
        email: 'your@email.com',
        password: 'password',
      },
      wrongPassword: 'Wrong password.',
    },
    logout: {
      button: 'Logout',
    },
    login: {
      title: 'Login',
    },
    validation: {
      email: 'Email address is not valid.',
      password: 'Password must contain at least {minLength} characters.',
      required: `Please fill out {prop, select,
        email {email}
        password {password}
        other {'{prop}'}
      }.`,
    },
  },
  beer: {
    header: 'Beer',
    subtext: 'Your beer history.',
    title: 'Beer History',
  },
  dashboard: {
    title: 'Dashboard',
  },
  loading: {
    header: 'This page isn\'t available',
    message: 'Please wait while the content loads',
    title: 'Loading',
  },
  me: {
    title: 'Me',
    welcome: 'Hi {email}. This is your secret page.',
  },
  notFound: {
    continueMessage: 'Continue here please.',
    header: 'This page isn\'t available',
    message: 'The link may be broken, or the page may have been removed.',
    title: 'Page Not Found',
  },
  profile: {
    title: 'Profile',
  },
  settings: {
    title: 'Settings',
  },
  signup: {
    buttons: {
      register: 'Register',
    },
    labels: {
      email: 'Email',
      password: 'Password',
    },
    placeholders: {
      email: 'email',
      password: 'eassword',
    },
    title: 'SignUp',
  },
};
