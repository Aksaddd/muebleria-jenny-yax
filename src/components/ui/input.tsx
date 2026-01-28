import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   FORM COMPONENTS
   Accessible, styled form inputs with consistent visual language
   ═══════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────────────────
   Label
   ─────────────────────────────────────────────────────────────────────────── */

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Mark field as required visually */
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-small font-semibold text-text",
        "block mb-1.5",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-danger ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
);
Label.displayName = "Label";

/* ───────────────────────────────────────────────────────────────────────────
   Help Text — Below inputs for guidance
   ─────────────────────────────────────────────────────────────────────────── */

interface HelpTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Error state styling */
  error?: boolean;
}

const HelpText = React.forwardRef<HTMLParagraphElement, HelpTextProps>(
  ({ className, error, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-caption mt-1.5",
        error ? "text-danger" : "text-text-subtle",
        className
      )}
      {...props}
    />
  )
);
HelpText.displayName = "HelpText";

/* ───────────────────────────────────────────────────────────────────────────
   Base Input Styles (shared)
   ─────────────────────────────────────────────────────────────────────────── */

const inputBaseStyles = [
  // Layout
  "w-full",
  "min-h-touch",
  "px-4 py-3",
  // Typography
  "font-sans text-body text-text",
  "placeholder:text-text-subtle",
  // Appearance
  "bg-surface",
  "border border-border",
  "rounded-md",
  "shadow-inner-sm",
  // Transitions
  "transition-all duration-fast",
  // Hover
  "hover:border-border-strong",
  // Focus
  "focus:outline-none focus:ring-2 focus:ring-focus/30 focus:border-brand",
  // Disabled
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-alt",
  // Error state (applied via data attribute)
  "data-[error=true]:border-danger data-[error=true]:focus:ring-danger/30",
];

/* ───────────────────────────────────────────────────────────────────────────
   Input
   ─────────────────────────────────────────────────────────────────────────── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error state */
  error?: boolean;
  /** Icon to show on the left */
  leftIcon?: React.ReactNode;
  /** Icon to show on the right */
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, leftIcon, rightIcon, ...props }, ref) => {
    // If icons are present, wrap in a container
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle [&>svg]:h-5 [&>svg]:w-5">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            data-error={error}
            className={cn(
              inputBaseStyles,
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className
            )}
            aria-invalid={error}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-subtle [&>svg]:h-5 [&>svg]:w-5">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        data-error={error}
        className={cn(inputBaseStyles, className)}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/* ───────────────────────────────────────────────────────────────────────────
   Textarea
   ─────────────────────────────────────────────────────────────────────────── */

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state */
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      data-error={error}
      className={cn(
        inputBaseStyles,
        "min-h-[120px] resize-y",
        // Override min-h from base
        "py-3",
        className
      )}
      aria-invalid={error}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

/* ───────────────────────────────────────────────────────────────────────────
   Select
   ─────────────────────────────────────────────────────────────────────────── */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Error state */
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        data-error={error}
        className={cn(
          inputBaseStyles,
          "appearance-none cursor-pointer",
          "pr-10", // Space for chevron
          className
        )}
        aria-invalid={error}
        {...props}
      >
        {children}
      </select>
      {/* Chevron icon */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
);
Select.displayName = "Select";

/* ───────────────────────────────────────────────────────────────────────────
   Form Field — Composed wrapper for label + input + help text
   ─────────────────────────────────────────────────────────────────────────── */

interface FormFieldProps {
  /** Unique field ID (for accessibility) */
  id: string;
  /** Label text */
  label: string;
  /** Mark as required */
  required?: boolean;
  /** Help text or instructions */
  helpText?: string;
  /** Error message (shows error styling) */
  error?: string;
  /** The input element */
  children: React.ReactElement;
  /** Additional class for the wrapper */
  className?: string;
}

function FormField({
  id,
  label,
  required,
  helpText,
  error,
  children,
  className,
}: FormFieldProps) {
  const helpTextId = helpText || error ? `${id}-help` : undefined;

  return (
    <div className={cn("space-y-0", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {React.cloneElement(children, {
        id,
        "aria-describedby": helpTextId,
        error: !!error,
      })}
      {(helpText || error) && (
        <HelpText id={helpTextId} error={!!error}>
          {error || helpText}
        </HelpText>
      )}
    </div>
  );
}

export { Label, HelpText, Input, Textarea, Select, FormField };
