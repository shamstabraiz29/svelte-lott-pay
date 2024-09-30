import { loadStripe } from "@stripe/stripe-js";

export const getStripe = async () => {
  const stripe = await loadStripe(
    import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  if (stripe) return stripe;

  throw new Error("stripe is incorrect");
};
