import { useTranslations } from "next-intl";
import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const useAuthValidation = () => {
  const t = useTranslations("AUTH");

  const schema = z.object({
    email: z.string().trim().email(t("form.validation.email.invalid-email")),
    password: z
      .string()
      .trim()
      .min(8, t("form.validation.password.min"))
      .regex(/^\S*$/, t("form.validation.password.whitespace")),
  });

  return { schema };
};

export type AuthValues = z.infer<typeof schema>;
