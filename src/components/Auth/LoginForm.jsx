import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth.schema";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


const LoginForm = () => {
  const navigate = useNavigate();
  const {login} = useAuth()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const notify = () => {
    toast.success("Giriş Başarılı!");
    login();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const onSubmit = (data) => {
    console.log(data);
    notify();
  };

  return (
    <div className="login-form min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Giriş Yap
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="form-item">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
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
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  {...register("rememberMe")}
                />
                <span>Beni Hatırla</span>
              </label>
            </div>
          </div>
          <Button color="#F7A91E" textColor="#231F20" addClass="w-full">
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
