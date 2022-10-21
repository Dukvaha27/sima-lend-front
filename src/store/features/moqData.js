export const initialState = {
  steps: [
    { id: 0, label: "Логин и пароль" },
    { id: 1, label: "Где проживаете?" },
    { id: 2, label: "Номер телефона" },
  ],
  fields: [
    {
      label: "Введите логин",
      name: "login",
      stepId: 0,
      required: true,
    },
    {
      label: "Введите почту",
      name: "email",
      type: "email",
      stepId: 0,
      required: true,
    },
    {
      label: "Введите пароль",
      name: "password",
      type: "password",
      stepId: 0,
      required: true,
    },
    {
      label: "Повторите пароль",
      name: "repeatPassword",
      type: "password",
      stepId: 0,
      required: true,
    },
    {
      label: "Страна",
      name: "country",
      stepId: 1,
      required: true,
    },
    {
      label: "Город",
      name: "city",
      stepId: 1,
      required: true,
    },
    {
      label: "Улица",
      name: "street",
      stepId: 1,
      required: false,
    },
    {
      label: "Дом",
      name: "house",
      stepId: 1,
      required: false,
    },
    {
      label: "Номер телефона",
      name: "phone",
      type: "number",
      send:true,
      stepId: 2,
      required: true,
    },
    {
      label: "Введите код",
      name: "code",
      stepId: 2,
      required: true,
    },
  ],
};
