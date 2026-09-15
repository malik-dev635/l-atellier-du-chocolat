import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "outline" | "outlineLight" | "solid";

interface CommonProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly className?: string;
}

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    readonly href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    readonly href?: undefined;
  };

type ButtonProps = AnchorProps | NativeButtonProps;

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  outline: "btn",
  outlineLight: "btn btn--light",
  solid: "btn btn--solid",
};

/**
 * Bouton fantôme à cadre décalé (défaut), sa variante claire pour les fonds
 * colorés, et la pilule pleine dorée réservée au CTA final.
 *
 * Tout le survol est en CSS (remplissage qui monte du bas + cadre qui se
 * recale) : aucun JS, donc utilisable depuis un composant serveur.
 */
export function Button(props: ButtonProps): ReactNode {
  const { children, variant = "outline", className } = props;
  const classes = [VARIANT_CLASS[variant], className ?? ""].filter(Boolean).join(" ");

  if (props.href !== undefined) {
    const { children: _c, variant: _v, className: _cl, ...anchorProps } = props;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const { children: _c, variant: _v, className: _cl, href: _h, ...buttonProps } = props;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
