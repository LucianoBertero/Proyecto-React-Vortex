import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const EmployeesApp = () => {
  return (
    <AppTheme>
      <AppRouter></AppRouter>
    </AppTheme>
  );
};
