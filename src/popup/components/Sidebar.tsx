import type { TabId } from "../types";

type TabItem = {
  id: TabId;
  label: string;
  enabled: boolean;
  disabledReason?: string;
};

type SidebarProps = {
  tabs: TabItem[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  isLocalhost: boolean;
};

export const Sidebar = ({ tabs, activeTab, onTabChange, isLocalhost }: SidebarProps) => {
  return (
    <aside className="relative flex w-40 flex-col gap-5 border-r border-white/10 bg-slate-950/70 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400/80 via-sky-400/70 to-fuchsia-400/70 p-[1px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)]">
          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
            IMI
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-300">
            imi
          </div>
          <div className="text-[11px] text-slate-400">Utility Deck</div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
        <span
          className={`h-2 w-2 rounded-full ${
            isLocalhost ? "bg-emerald-400" : "bg-rose-400"
          } shadow-[0_0_12px_rgba(126,249,255,0.6)]`}
        />
        {isLocalhost ? "LOCAL" : "REMOTE"}
      </div>

      <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
        功能
      </div>
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = !tab.enabled;
          return (
            <span key={tab.id} title={isDisabled ? tab.disabledReason : ""}>
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onTabChange(tab.id)}
                className={`group flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-[11px] font-semibold transition ${
                  isActive
                    ? "border-white/20 bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(126,249,255,0.12)]"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                } ${
                  isDisabled
                    ? "cursor-not-allowed opacity-60 hover:border-transparent hover:bg-transparent hover:text-slate-400"
                    : ""
                }`}
              >
                <span>{tab.label}</span>
                {isDisabled ? (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-slate-400">
                    锁定
                  </span>
                ) : null}
              </button>
            </span>
          );
        })}
      </nav>
      <div className="mt-auto text-[10px] text-slate-400">Version 0.1.0</div>
    </aside>
  );
};
