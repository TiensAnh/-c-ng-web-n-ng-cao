import IconButton from "./IconButton";
import SearchInput from "./SearchInput";

export default function Topbar({
  breadcrumb,
  onMenuClick,
  onSearchChange,
  searchPlaceholder,
  searchValue,
}) {
  return (
    <header className="glass-topbar">
      <div className="flex items-center gap-4">
        <IconButton icon="menu" className="lg:hidden" onClick={onMenuClick} />
        <nav className="flex items-center text-sm font-medium">
          <span className="text-slate-500">Admin</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-blue-700">{breadcrumb}</span>
        </nav>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        {searchPlaceholder ? (
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            containerClassName="hidden w-72 md:block"
            className="rounded-full bg-surface-container-low"
          />
        ) : null}
        <div className="flex items-center gap-1 lg:gap-2">
          <IconButton icon="notifications" />
          <IconButton icon="settings" />
        </div>
      </div>
    </header>
  );
}
