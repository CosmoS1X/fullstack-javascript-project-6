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
      tasks: {
        create: {
          success: 'Task successfully created',
          error: 'Failed to create task',
        },
        edit: {
          success: 'Task successfully changed',
          error: 'Failed to change task',
        },
        delete: {
          success: 'Task successfully deleted',
          error: 'Failed to delete task',
          reject: 'Task can be deleted only by its author',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      navbar: {
        users: 'Users',
        statuses: 'Statuses',
        tasks: 'Tasks',
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
        tasks: 'Tasks',
        createStatus: 'Status creation',
        createTask: 'Task creation',
      },
      buttons: {
        login: 'Login',
        save: 'Save',
        change: 'Change',
        delete: 'Delete',
        create: 'Create',
        createStatus: 'Create status',
        createTask: 'Create task',
      },
      tableFields: {
        actions: 'Actions',
      },
      form: {
        inputs: {
          firstName: 'First name',
          lastName: 'Last Name',
          email: 'Email',
          password: 'Password',
          name: 'Name',
        },
        textarea: {
          description: 'Description',
        },
        selects: {
          status: 'Status',
          executor: 'Executor',
          defaults: {
            status: '-- Select status --',
            executor: '-- Select executor --',
          },
        },
      },
    },
    entityFields: {
      id: 'ID',
      fullName: 'Full name',
      email: 'Email',
      name: 'Name',
      status: 'Status',
      creator: 'Author',
      executor: 'Executor',
      createdAt: 'Created at',
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
