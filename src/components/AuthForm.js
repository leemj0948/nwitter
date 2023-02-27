import { authService, signIn, signup } from "fbase";
import { useState } from "react";

const AuthForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = ({ target: { name, value } }) =>
        setForm({ ...form, [name]: value });
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const auth = authService;
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let data = "";
            if (newAccount) {
                data = await signup(auth, form.email, form.password);
            } else {
                // login
                data = await signIn(auth, form.email, form.password);
            }
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    defaultValue={form.email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    defaultValue={form.password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                    onClick={toggleAccount}
                />
            </form>
            {error && <div>{error}</div>}
        </>
    );
};
export default AuthForm;
