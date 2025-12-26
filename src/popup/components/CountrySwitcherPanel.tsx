import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRY_OPTIONS } from "../data/countryOptions";
import { useCountryCookies } from "../hooks/useCountryCookies";
import type { ToastType } from "../types";
import { Input } from "./ui/Input";

type CountrySwitcherPanelProps = {
  currentTabUrl: URL | null;
  isLocalhost: boolean;
  showToast: (message: string, type?: ToastType) => void;
};

export const CountrySwitcherPanel = ({
  currentTabUrl,
  isLocalhost,
  showToast
}: CountrySwitcherPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { selectedCountry, setSelectedCountry, isSaving, optionsByName, saveSelection } =
    useCountryCookies(
      currentTabUrl,
      isLocalhost,
      (message) => showToast(message, "error"),
      (message) => showToast(message, "success")
    );

  useEffect(() => {
    if (!isDropdownOpen) return;
    setSearchTerm("");
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredOptions = useMemo(() => {
    const base = normalizedSearch
      ? COUNTRY_OPTIONS.filter((option) =>
          option.countryName.toLowerCase().includes(normalizedSearch)
        )
      : COUNTRY_OPTIONS;

    if (selectedCountry && !base.some((option) => option.countryName === selectedCountry)) {
      const selectedOption = optionsByName.get(selectedCountry);
      if (selectedOption) return [selectedOption, ...base];
    }

    return base;
  }, [normalizedSearch, selectedCountry, optionsByName]);

  const handleSelectionChange = async (value: string) => {
    setSelectedCountry(value);
    setIsDropdownOpen(false);
    await saveSelection(value);
  };

  const selectedLabel = selectedCountry ? selectedCountry : "请选择国家";

  return (
    <>
      <header className="space-y-1">
        <h1 className="text-lg font-semibold">切换国家</h1>
        <p className="text-xs text-slate-400">选择国家后写入 TIMEZONE_COUNTRY 与 TIMEZONE</p>
      </header>

      <section className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <div className="space-y-1">
          <span className="text-xs text-slate-300">国家选择</span>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:border-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isLocalhost || isSaving}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span className={selectedCountry ? "" : "text-slate-500"}>{selectedLabel}</span>
              <span className="text-slate-500">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isDropdownOpen ? (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 rounded-md border border-slate-800 bg-slate-950 p-2 shadow-lg">
                <Input
                  inputRef={searchInputRef}
                  type="text"
                  className="mb-2 w-full bg-slate-900"
                  placeholder="输入国家名称"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="max-h-40 overflow-y-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="px-2 py-2 text-xs text-slate-500">未找到匹配国家</div>
                  ) : (
                    filteredOptions.map((option) => {
                      const isSelected = option.countryName === selectedCountry;
                      return (
                        <button
                          key={option.countryName}
                          type="button"
                          className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs transition ${
                            isSelected
                              ? "bg-slate-800 text-slate-100"
                              : "text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                          }`}
                          onClick={() => handleSelectionChange(option.countryName)}
                        >
                          <span>{option.countryName}</span>
                          <span className="text-[10px] text-slate-500">UTC{option.timeZone}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-xs text-slate-500">{isSaving ? "正在写入 cookie..." : ""}</div>
      </section>
    </>
  );
};
