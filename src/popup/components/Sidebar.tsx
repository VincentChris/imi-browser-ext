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
};

export const Sidebar = ({ tabs, activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="flex w-32 flex-col gap-3 border-r border-slate-800 bg-slate-950/80 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        功能
      </div>
      <nav className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = !tab.enabled;
          return (
            <span key={tab.id} title={isDisabled ? tab.disabledReason : ""}>
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onTabChange(tab.id)}
                className={`w-full rounded-md px-2 py-1.5 text-left text-xs transition ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                } ${
                  isDisabled
                    ? "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-slate-400"
                    : ""
                }`}
              >
                {tab.label}
              </button>
            </span>
          );
        })}
      </nav>
      <div className="mt-auto text-[10px] text-slate-500">Version 0.1.0</div>
    </aside>
  );
};
