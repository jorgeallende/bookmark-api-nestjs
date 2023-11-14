import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useMutation } from "@tanstack/react-query";

const createUserFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "Nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    email: z
      .string()
      .email("Insira um email válido")
      .min(1, { message: "Email é obrigatório" }),
    hash: z.string().min(1, { message: "Senha é obrigatório" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmar senha é obrigatório" }),
  })
  .refine((data) => data.hash === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type createUserFormData = z.infer<typeof createUserFormSchema>;

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const registerUser = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (data: createUserFormData) => API.post("/auth/signup", data),
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.data.token);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values: createUserFormData) => {
    registerUser.mutate(values);
  };

  return (
    <div>
      Register
      <Form {...form}>
        <form className="px-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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

export default Register;
