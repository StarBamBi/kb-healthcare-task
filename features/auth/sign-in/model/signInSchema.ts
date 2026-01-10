export const signInValidation = {
  email: {
    required: "이메일은 필수입니다.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "이메일 형식이 올바르지 않습니다.",
    },
  },
  password: {
    required: "비밀번호는 필수입니다.",
    minLength: {
      value: 8,
      message: "비밀번호는 8자 이상이어야 합니다.",
    },
    maxLength: {
      value: 24,
      message: "비밀번호는 24자 이하여야 합니다.",
    },
  },
};
