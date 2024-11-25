import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets.js";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Log in");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return "Invalid email address";
        }
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Include at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        if (!/[^A-Za-z0-9]/.test(value))
          return "Include at least one special character";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";

      case "terms":
        if (!value) return "You must accept the terms and conditions";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (name === "password") {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (
        currentState === "Log in" &&
        (key === "name" || key === "confirmPassword" || key === "terms")
      ) {
        return;
      }
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFormErrors(errors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(errors).length === 0) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", formData);
        setShowLogin(false);
      } catch (error) {
        setFormErrors((prev) => ({
          ...prev,
          submit: "An error occurred. Please try again.",
        }));
      }
    }
    setIsSubmitting(false);
  };
  return (
    <div className="auth-popup-overlay login-popup">
      <form
        onSubmit={handleSubmit}
        className="auth-modal login-popup-container"
      >
        <div className="auth-header login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className=" auth-form login-popup-inputs">
          {currentState === "Sign Up" && (
            <div className="auth-input-group">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && formErrors.name ? "has-error" : ""}
              />
              {touched.name && formErrors.name && (
                <span className="auth-error">{formErrors.name}</span>
              )}
            </div>
          )}

          <div className="auth-input-group">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && formErrors.email ? "has-error" : ""}
            />
            {touched.email && formErrors.email && (
              <span className="auth-error">{formErrors.email}</span>
            )}
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && formErrors.password ? "has-error" : ""
              }
            />
            {currentState === "Sign Up" && (
              <div
                className={`auth-password-meter ${
                  passwordStrength === 0 ? "d-none" : "d-block"
                } `}
              >
                <div className={`strength strength-${passwordStrength}`} />
                <span className="auth-strength-text">
                  {["Weak", "Fair", "Good", "Strong"][passwordStrength - 1]}
                </span>
              </div>
            )}
            {touched.password && formErrors.password && (
              <span className="auth-error">{formErrors.password}</span>
            )}
          </div>

          {currentState === "Sign Up" && (
            <>
              <div className="auth-input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    touched.confirmPassword && formErrors.confirmPassword
                      ? "has-error"
                      : ""
                  }
                />
                {touched.confirmPassword && formErrors.confirmPassword && (
                  <span className="auth-error">
                    {formErrors.confirmPassword}
                  </span>
                )}
              </div>

              <div className=" login-popup-condition">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>
                  I agree to the <span>Terms & Conditions</span>
                </p>
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={isSubmitting ? "unable" : ""}
        >
          {isSubmitting ? <span>Processing...</span> : currentState}
        </button>

        <p>
          {currentState === "Log in"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={() => {
              setCurrentState(currentState === "Log in" ? "Sign Up" : "Log in");
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false,
              });
              setFormErrors({});
              setTouched({});
            }}
          >
            {currentState === "Log in" ? "Sign Up" : "Log in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
