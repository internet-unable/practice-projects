export type RegisterError = { errors: { phone?: { type: string; message?: string }; email?: { type: string; message?: string }; root?: { type: string; message: string } } };
export type RegisterResponse = true | RegisterError;

export function isRegisterError(result: any): result is RegisterError {
  return result && typeof result === "object" && "errors" in result;
}
