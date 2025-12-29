import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type CookieSyncPanelProps = {
  targetDomain: string;
  cookieKey: string;
  isLoading: boolean;
  onTargetDomainChange: (value: string) => void;
  onCookieKeyChange: (value: string) => void;
  onSync: () => Promise<void>;
};

export const CookieSyncPanel = ({
  targetDomain,
  cookieKey,
  isLoading,
  onTargetDomainChange,
  onCookieKeyChange,
  onSync
}: CookieSyncPanelProps) => {
  return (
    <>
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
              Cookie Tools
            </p>
            <h1 className="text-xl font-semibold text-white">Cookie Sync</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
            自动保存
          </div>
        </div>
        <p className="text-xs text-slate-300">从当前 tab 读取 cookie，并同步到目标域名。</p>
      </header>

      <section className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
            同步域名
          </span>
          <Input
            placeholder="example.com"
            value={targetDomain}
            onChange={(event) => onTargetDomainChange(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
            Cookie key
          </span>
          <Input
            placeholder="SESSION_ID"
            value={cookieKey}
            onChange={(event) => onCookieKeyChange(event.target.value)}
          />
        </label>
        <div className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-[11px] text-slate-300">
          将当前页面的 cookie 同步到目标域名
        </div>
        <Button type="button" onClick={onSync} disabled={isLoading} className="w-full">
          {isLoading ? "同步中..." : "开始同步"}
        </Button>
      </section>
    </>
  );
};
