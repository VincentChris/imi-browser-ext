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
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
              Localization
            </p>
            <h1 className="text-xl font-semibold text-white">切换国家</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
            {isLocalhost ? "LOCAL ONLY" : "LOCKED"}
          </div>
        </div>
        <p className="text-xs text-slate-300">选择国家后写入 TIMEZONE_COUNTRY 与 TIMEZONE。</p>
      </header>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
            国家选择
          </span>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isLocalhost || isSaving}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span className={selectedCountry ? "" : "text-slate-500"}>{selectedLabel}</span>
              <span className="text-slate-500">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isDropdownOpen ? (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
                <Input
                  inputRef={searchInputRef}
                  type="text"
                  className="mb-2 w-full bg-slate-950/60"
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
                          className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-xs transition ${
                            isSelected
                              ? "bg-white/10 text-white"
                              : "text-slate-200 hover:bg-white/5 hover:text-white"
                          }`}
                          onClick={() => handleSelectionChange(option.countryName)}
                        >
                          <span>{option.countryName}</span>
                          <span className="text-[10px] text-slate-400">UTC{option.timeZone}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-[11px] text-slate-300">{isSaving ? "正在写入 cookie..." : ""}</div>
      </section>
    </>
  );
};
