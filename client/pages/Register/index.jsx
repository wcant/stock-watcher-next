import AuthForm from "@/components/Authform";
import { useCookies } from "react-cookie";
export default function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  return (
    <div>
      <AuthForm mode="register" />
    </div>
  );
}
