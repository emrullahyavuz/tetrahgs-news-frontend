import * as yup from 'yup';

// password rules
const passwordRules = {
  min: 6,
  minMessage: 'Şifre en az 6 karakter olmalıdır!',
  required: 'Şifre alanı zorunludur!',
};

// login schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz!')
    .required('Email alanı zorunludur!')
    .min(10, 'Email en az 3 karakter olmalıdır!')
    ,
  password: yup
    .string()
    .min(passwordRules.min, passwordRules.minMessage)
    .required(passwordRules.required),
  rememberMe:yup.boolean()
});

// register schema
export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Ad Soyad alanı zorunludur!')
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır!'),
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz!')
    .required('Email alanı zorunludur!'),
  password: yup
    .string()
    .min(passwordRules.min, passwordRules.minMessage)
    .required(passwordRules.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor!')
    .required('Şifre tekrarı zorunludur!'),
  userType: yup
    .string()
    .oneOf(['personal', 'business'], 'Lütfen kullanıcı tipini seçiniz!')
    .required('Kullanıcı tip zorunludur!'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Lütfen cinsiyet seçiniz!')
    .required('Cinsiyet seçimi zorunludur!'),
});