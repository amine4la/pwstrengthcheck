// possible strength options
type Strength = "weak" | "medium" | "strong";

// rules for strength (all will be checked)
interface PasswordRules {
  minLength: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
  hasSpecialChar: boolean;
}

// grab the input and the display from DOM
const input = document.getElementById("passwordInput") as HTMLInputElement;
const strengthText = document.getElementById("strengthText") as HTMLParagraphElement;

// base function to check based on rules, returned as interface
function checkRules(password: string): PasswordRules {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password)
  };
}

// decide if it's weak/medium/strong
function evaluateStrength(rules: PasswordRules): Strength {
  const passedRules = Object.values(rules).filter(Boolean).length;

  if (passedRules <= 1) return "weak";
  if (passedRules <= 3) return "medium";
  return "strong";
}

// event listenr for instant response based on typing 
input.addEventListener("input", () => {
  const password = input.value;
  const rules = checkRules(password);
  const strength = evaluateStrength(rules);

  strengthText.textContent = `Strength: ${strength}`;
});