export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          success: 'Пользователь успешно зарегистрирован',
          error: 'Не удалось зарегистрировать',
        },
        edit: {
          success: 'Пользователь успешно изменён',
          error: 'Не удалось изменить пользователя',
          reject: 'Вы не можете редактировать другого пользователя',
        },
        delete: {
          success: 'Пользователь успешно удален',
          error: 'Не удалось удалить пользователя',
          reject: 'Вы не можете удалять другого пользователя',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      navbar: {
        users: 'Пользователи',
        statuses: 'Статусы',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
      headers: {
        users: 'Пользователи',
        signUp: 'Регистрация',
        signIn: 'Вход',
        editUser: 'Изменение пользователя',
        statuses: 'Статусы',
        statusCreation: 'Создание статуса',
      },
      buttons: {
        login: 'Войти',
        save: 'Сохранить',
        change: 'Изменить',
        delete: 'Удалить',
        create: 'Создать',
        createStatus: 'Создать статус',
      },
      inputs: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        password: 'Пароль',
        name: 'Наименование',
      },
      tableFields: {
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
      },
    },
    views: {
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
