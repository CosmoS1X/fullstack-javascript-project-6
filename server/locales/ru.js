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
      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        edit: {
          success: 'Статус успешно изменён',
          error: 'Не удалось изменить статус',
        },
        delete: {
          success: 'Статус успешно удалён',
          error: 'Не удалось удалить статус',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        edit: {
          success: 'Задача успешно изменена',
          error: 'Не удалось изменить задачу',
          reject: 'Задачу может удалить только её автор',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      navbar: {
        users: 'Пользователи',
        statuses: 'Статусы',
        tasks: 'Задачи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
      headers: {
        users: 'Пользователи',
        signUp: 'Регистрация',
        signIn: 'Вход',
        editUser: 'Изменение пользователя',
        editStatus: 'Изменение статуса',
        statuses: 'Статусы',
        tasks: 'Задачи',
        createStatus: 'Создание статуса',
        createTask: 'Создание задачи',
      },
      buttons: {
        login: 'Войти',
        save: 'Сохранить',
        change: 'Изменить',
        delete: 'Удалить',
        create: 'Создать',
        createStatus: 'Создать статус',
        createTask: 'Создать задачу',
      },
      tableFields: {
        actions: 'Действия',
      },
      form: {
        inputs: {
          firstName: 'Имя',
          lastName: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
          name: 'Наименование',
        },
        textarea: {
          description: 'Описание',
        },
        selects: {
          status: 'Статус',
          executor: 'Исполнитель',
          defaults: {
            status: '-- Выберите статус --',
            executor: '-- Выберите исполнителя --',
          },
        },
      },
    },
    entityFields: {
      id: 'ID',
      fullName: 'Полное имя',
      email: 'Email',
      name: 'Наименование',
      status: 'Статус',
      creator: 'Автор',
      executor: 'Исполнитель',
      createdAt: 'Дата создания',
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
