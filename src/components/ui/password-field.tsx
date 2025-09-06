import { Control, useFormContext } from "react-hook-form";
import { Box } from "@/components/ui/box";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createElement, useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

type PasswordFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  formControl?: Control;
};

export function PasswordField({
  name = "password",
  label = "Your password",
  placeholder = "Enter password",
  description,
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{label}</FormLabel>
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${
                  getFieldState(name).error && "text-destructive"
                }`}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? IconEyeClosed : IconEye, {
                  className: "h-6 w-6",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && (
            <FormDescription className="text-right font-semibold">
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
