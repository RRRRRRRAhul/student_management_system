import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm = ({ setEmail, setPassword, handleSubmit, loading }) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
