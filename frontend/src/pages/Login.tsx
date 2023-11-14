import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoginAuth } from "../api/auth";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

const loginFormSchema = z.object({
  email: z.string().email(),
  hash: z.string(),
});

export type loginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: loginFormData) => {
    const response = await LoginAuth(values);
    if (response?.status != 200) {
      console.log("Erro: ", response?.data.message);
    } else {
      console.log(response.data.token);
      alert("Usuário logado com sucesso!");
      navigate("/login");
    }
  };

  return (
    <div>
      Login
      <Form {...form}>
        <form className="px-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
