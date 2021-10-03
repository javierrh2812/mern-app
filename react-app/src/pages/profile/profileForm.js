import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "hooks/useUser";
import yupResolver from "hooks/useYupValidationResolver";
import { FormHelperText, TextField as MuiTextField } from "@mui/material";
import TextField from "components/controlled/textField";
import Button from "components/button";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  profile: Yup.string(),
  specialization: Yup.string(),
  campus: Yup.string(),
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
        <TextField
          rows={5}
          name="profile"
          label="Perfil"
          placeholder="Hola! Soy ..."
        />
        <TextField name="specialization" label="Programa de especialización" />
        <TextField name="campus" label="Sede" />
        <MuiTextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          margin="dense"
          disabled
        />
        <TextField
          name="phoneNumber"
          type="number"
          label="Celular"
          InputProps={{ startAdornment: <span>+51&nbsp;</span> }}
        />
        <br />
        {formMethods.formState.errors.form && (
          <FormHelperText error>
            {formMethods.formState.errors.form.message}
          </FormHelperText>
        )}
        <br />
        <Button type="submit">Guardar perfil</Button>
      </form>
    </FormProvider>
  );
};
export default Login;
