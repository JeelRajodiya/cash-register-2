import { setCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
function performLogin(router: NextRouter) {
	setCookie("session", "true");
	router.push("/");
}

export default function Login() {
	const router = useRouter();
	return <button onClick={() => performLogin(router)}>Login</button>;
}
