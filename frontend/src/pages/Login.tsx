import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
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
import { useMutation } from "@tanstack/react-query";
import { API } from "../api";

const loginFormSchema = z.object({
  email: z.string().email(),
  hash: z.string(),
});

export type loginFormData = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const loginAuth = useMutation({
    mutationKey: ["loginAuth"],
    mutationFn: (data: loginFormData) => API.post("/auth/signin", data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values: loginFormData) => {
    loginAuth.mutate(values);
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
