import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { registerSchema } from '../../schemas/auth.schema';

import Button from '../UI/Button';
import toast from 'react-hot-toast';

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

  const navigate = useNavigate();

  const notify = (role) => {
    toast.success("Kayıt İşlemi Başarılı!");
    if(role === "business")
    {
      setTimeout(() => {
        navigate("/admin/dashboard",{ replace: true })
      }, 2000);
    }
    else {
      setTimeout(() => {
        navigate("/")
      }, 2000);
     
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const {fullName, email, password, userType, gender} = data;
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: 'POST',
        body: JSON.stringify({fullName, email, password, userType, gender}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      
      
      if (!response.ok) {
        throw new Error(data.message || 'Giriş işlemi başarısız');
      }

      else {
       notify(userType)
       
      }
    }
    catch(err)
    {
      console.log("Kayıt işlemi başarısız", err);
    }
  };

  return (
    <div className="register-form min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
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
                {...register('fullName', { required: true })}
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Ad Soyad"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="ornek@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="******"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <input
                {...register('confirmPassword', { required: true })}
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="******"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-item space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hesap Türü
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  {...register('userType')}
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
          <Button color="#F7A91E" textColor="#231F20" addClass="w-full">
            Kayıt Ol
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;