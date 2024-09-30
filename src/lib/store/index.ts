import { writable, type Writable } from "svelte/store";

export const isOpenAboutModal = writable<boolean>(false);
export const isOpenSignupReciptModal = writable<boolean>(false);
export const isExpanded = writable(false);
export const parkEntryId = writable<string>("");
export const paymentRequestId = writable<any>("");
export const receiptEmail = writable<string>("");
export const isChecked = writable(false);
export const isDrawerOpen = writable(false);
export let isPaymentButtonEnabled = writable(false);
export let isSubmitting = writable(false);
export let isConfirmPayment = writable(false);

export interface ShowToastErrorState {
  showToastError: boolean;
  text: string;
}

export const ShowToastError = writable<ShowToastErrorState>({
  showToastError: false,
  text: "",
});
export interface CardExpandState {
  isExpanded: boolean;
  id: string | null;
}
export const IsCardExpanded = writable<CardExpandState>({
  isExpanded: false,
  id: "",
});

function createPersistentStore<T>(key: string, startValue: T): Writable<T> {
  const isBrowser: boolean = typeof window !== "undefined";
  let data: T = startValue;

  if (isBrowser) {
    const storedValue: string | null = localStorage.getItem(key);
    if (storedValue !== null) {
      data = JSON.parse(storedValue);
    }
  }

  const store: Writable<T> = writable(data);

  if (isBrowser) {
    store.subscribe((value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}

export const parkIdStore = createPersistentStore<string>("parkEntryId", "");
