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
      <header className="space-y-1">
        <h1 className="text-lg font-semibold">Cookie Sync</h1>
        <p className="text-xs text-slate-400">从当前 tab 读取 cookie，并同步到目标域名</p>
      </header>

      <section className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-300">同步域名</span>
          <Input
            placeholder="example.com"
            value={targetDomain}
            onChange={(event) => onTargetDomainChange(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-300">Cookie key</span>
          <Input
            placeholder="SESSION_ID"
            value={cookieKey}
            onChange={(event) => onCookieKeyChange(event.target.value)}
          />
        </label>
        <Button type="button" onClick={onSync} disabled={isLoading}>
          {isLoading ? "同步中..." : "同步"}
        </Button>
      </section>
    </>
  );
};
