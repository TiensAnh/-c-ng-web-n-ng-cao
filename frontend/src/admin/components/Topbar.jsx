import Avatar from "./Avatar";
import IconButton from "./IconButton";
import SearchInput from "./SearchInput";

export default function Topbar({
  breadcrumb,
  onMenuClick,
  onSearchChange,
  profile,
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
        {profile ? (
          <div className="hidden items-center gap-3 border-l border-slate-100 pl-6 sm:flex">
            {profile.name ? (
              <div className="text-right">
                <p className="font-headline text-xs font-bold text-on-surface">{profile.name}</p>
                <p className="text-[10px] text-slate-500">{profile.role}</p>
              </div>
            ) : null}
            <Avatar
              src={profile.avatar}
              alt={profile.name || "Admin profile"}
              className="h-9 w-9 rounded-full border border-slate-100"
              initials={profile.name}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
