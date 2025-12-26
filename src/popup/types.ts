export type PersistedInputs = {
  targetDomain?: string;
  cookieKey?: string;
};

export type ToastType = "success" | "error" | "info";

export type ToastState = {
  message: string;
  type: ToastType;
};

export type TabId = "cookieSync" | "countrySwitcher";

export type CountryOption = {
  countryName: string;
  timeZone: string;
};
