// Test data config - no hardcoded values
export const TestData = {
  credentials: {
    valid: {
      username: 'demo',
      password: 'pass123',
    },
    invalid: {
      username: 'wrong',
      password: 'wrong',
    },
    empty: {
      username: '',
      password: '',
    },
  },
  messages: {
    loginSuccess: 'Logged in',
    loginError: 'Invalid credentials',
    exportSuccess: 'Exported CSV',
  },
  routes: {
    login: '/login',
    dashboard: '/dashboard',
    posts: '/posts',
    users: '/users',
    root: '/',
  },
  tokens: {
    authToken: 'demo-token',
  },
  api: {
    login: '/api/auth/login',
  },
  testContent: {
    filterText: 'qui',
    filterValues: {
      sunt: 'sunt',
      qui: 'qui',
      est: 'est',
      facere: 'facere',
    },
    userNames: {
      leanneGraham: 'Leanne Graham',
      ervinHowell: 'Ervin Howell',
    },
    expectedPostTitle: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    nonExistentText: 'nonexistenttext12345',
  },
};

