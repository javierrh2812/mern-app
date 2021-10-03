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
  birthDate: Yup.string().required(),
  phoneNumber: Yup.number().min(900000000).max(999999999),
  campus: Yup.string(),
  firstName: Yup.string().matches(/^[aA-zZ\s]+$/),
  lastName: Yup.string().matches(/^[aA-zZ\s]+$/),
});
const Register = () => {
  const formMethods = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      birthDate: "",
      phoneNumber: "",
      campus: "",
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { signup } = useAuth();

  const onSubmit = async (values) => {
    signup(values).catch((err) => {
      formMethods.setError("form", { message: err });
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Container maxWidth="sm">
          <h2> Registrate</h2>
          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Contraseña" />
          <TextField
            name="birthDate"
            type="date"
            label="Fecha de nacimiento"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="phoneNumber"
            type="number"
            label="Celular"
            InputProps={{ startAdornment: <span>+51&nbsp;</span> }}
          />
          <TextField name="campus" label="Sede" />
          <TextField name="firstName" label="Nombres" />
          <TextField name="lastName" label="Apellidos" />
          <Button type="submit">Sign in now</Button>

          {formMethods.formState.errors.form && (
            <FormHelperText error>
              {formMethods.formState.errors.form.message}
            </FormHelperText>
          )}
          <p>
            ¿Ya tienes una cuenta? <Link to="/login"> Inicia Sesión </Link>
          </p>
        </Container>
      </form>
    </FormProvider>
  );
};
export default Register;
