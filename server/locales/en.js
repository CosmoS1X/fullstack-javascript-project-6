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
      labels: {
        create: {
          success: 'Label successfully created',
          error: 'Failed to create label',
        },
        edit: {
          success: 'Label successfully changed',
          error: 'Failed to change label',
        },
        delete: {
          success: 'Label successfully deleted',
          error: 'Failed to delete label',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      navbar: {
        users: 'Users',
        statuses: 'Statuses',
        labels: 'Labels',
        tasks: 'Tasks',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
      headers: {
        users: 'Users',
        statuses: 'Statuses',
        labels: 'Labels',
        tasks: 'Tasks',
        createStatus: 'Status creation',
        createTask: 'Task creation',
        createLabel: 'Label creation',
        editUser: 'Edit user',
        editStatus: 'Edit status',
        editLabel: 'Edit label',
        signUp: 'Register',
        signIn: 'Login',
      },
      buttons: {
        login: 'Login',
        save: 'Save',
        change: 'Change',
        delete: 'Delete',
        create: 'Create',
        show: 'Show',
        createStatus: 'Create status',
        createTask: 'Create task',
        createLabel: 'Create label',
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
          label: 'Label',
          labels: 'Labels',
          defaults: {
            status: '-- Select status --',
            executor: '-- Select executor --',
          },
        },
        checkboxes: {
          myTasks: 'My tasks only',
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
