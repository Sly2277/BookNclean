import { Button, ButtonProps } from "@/components/ui/button";
import { isAuthenticated } from "@/services/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type Props = ButtonProps & {
	children: ReactNode;
	to?: string;
};

export const AuthButton = ({ children, to, onClick, ...rest }: Props) => {
	const navigate = useNavigate();
	const location = useLocation();

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		if (!isAuthenticated()) {
			navigate("/login", { state: { from: to || location.pathname } });
			return;
		}
		if (to) navigate(to);
		onClick?.(e);
	}

	return (
		<Button {...rest} onClick={handleClick}>
			{children}
		</Button>
	);
};

export default AuthButton;




