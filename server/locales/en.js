export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          success: 'User registered successfully',
          error: 'Failed to register',
        },
        edit: {
          success: 'User edited successfully',
          error: 'Failed to edit',
          reject: 'You cannot edit another user',
        },
        delete: {
          success: 'User deleted successfully',
          error: 'Failed to delete',
          reject: 'You cannot delete another user',
        },
      },
      statuses: {
        create: {
          success: 'Status successfully created',
          error: 'Failed to create status',
        },
        edit: {
          success: 'Status successfully changed',
          error: 'Failed to change status',
        },
        delete: {
          success: 'Status successfully deleted',
          error: 'Failed to delete status',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      navbar: {
        users: 'Users',
        statuses: 'Statuses',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
      headers: {
        users: 'Users',
        signUp: 'Register',
        signIn: 'Login',
        editUser: 'Edit user',
        editStatus: 'Edit status',
        statuses: 'Statuses',
        statusCreation: 'Creating status',
      },
      buttons: {
        login: 'Login',
        save: 'Save',
        change: 'Change',
        delete: 'Delete',
        create: 'Create',
        createStatus: 'Create status',
      },
      inputs: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
        name: 'Name',
      },
      tableFields: {
        id: 'ID',
        fullName: 'Full name',
        email: 'Email',
        name: 'Name',
        createdAt: 'Created at',
        actions: 'Actions',
      },
    },
    views: {
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
