import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth.schema";


const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      userType: '',
      gender: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="register-form min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[500px] space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Kayıt Ol
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md  border-gray-300"
                placeholder="Ad Soyad"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md  border-gray-300"
                placeholder="ornek@email.com"
                {...register("email", { required: true })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md  border-gray-300"
                placeholder="******"
                {...register("password", { required: true })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md  border-gray-300"
                placeholder="******"
                {...register("passwordConfirm", { required: true })}
              />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
            </div>
            <div className="form-item">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hesap Türü
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  {...register("userType", { required: true })}
                >
                  <option value="">Seçiniz</option>
                  <option value="personal">Bireysel</option>
                  <option value="business">Kurumsal</option>
                </select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.userType.message}
                  </p>
                )}
              </div>
            </div>
            <div className="form-item">
              <label className="block text-sm font-medium text-gray 700">
                Cinsiyet
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  {...register('gender')}
                  value="male"
                  className="h4 w-4"
                />
                <label className="ml-2 text-sm text-gray-900">Erkek</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  {...register('gender')}
                  value="female"
                  className="h4 w-4"
                />
                <label className="ml-2 text-sm text-gray-900">Kadın</label>
              </div>
              
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <Button color="primary" addClass="w-full">
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
