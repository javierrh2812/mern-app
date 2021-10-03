import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "hooks/useUser";
import yupResolver from "hooks/useYupValidationResolver";
import { Container, FormHelperText } from "@mui/material";
import TextField from "components/controlled/textField";
import Button from "components/button";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().max(255).required(),
  password: Yup.string().max(255).required(),
});

const Login = () => {
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
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
        <Container maxWidth="sm">
          <h2 style={{ textAlign: "center" }}> Iniciar sesión </h2>
          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Contraseña" />
          <br />
          {formMethods.formState.errors.form && (
            <FormHelperText error>
              {formMethods.formState.errors.form.message}
            </FormHelperText>
          )}
          <br />
          <Button type="submit">Iniciar sesión ahora</Button>
          <p style={{ textAlign: "center" }}>
            ¿No tienes una cuenta? <Link to="/register"> Regístrate</Link>
          </p>
        </Container>
      </form>
    </FormProvider>
  );
};
export default Login;
