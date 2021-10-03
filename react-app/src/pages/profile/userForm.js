import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "hooks/useUser";
import yupResolver from "hooks/useYupValidationResolver";
import { FormHelperText } from "@mui/material";
import TextField from "components/controlled/textField";
import Button from "components/button";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string().max(255).required(),
});

const Login = () => {
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const { signin } = useAuth();

  const onSubmit = async ({ email, password }) => {
    signin(email, password).catch((err) => {
      formMethods.setError("form", { message: err });
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <TextField name="password" type="password" label="Contraseña" />
        <br />
        {formMethods.formState.errors.form && (
          <FormHelperText error>
            {formMethods.formState.errors.form.message}
          </FormHelperText>
        )}
        <br />
        <Button type="submit">Cambiar contraseña</Button>
      </form>
    </FormProvider>
  );
};
export default Login;
