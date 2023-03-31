import AuthForm from "@/components/Authform";
import { useCookies } from "react-cookie";
export default function Signin() {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  return (
    <div>
      <AuthForm mode="signin" />
    </div>
  );
}
