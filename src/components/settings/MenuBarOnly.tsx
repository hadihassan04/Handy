import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";
import { useOsType } from "../../hooks/useOsType";

interface MenuBarOnlyProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const MenuBarOnly: React.FC<MenuBarOnlyProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const osType = useOsType();

    const menuBarOnly = getSetting("menu_bar_only") ?? false;

    if (osType !== "macos") {
      return null;
    }

    return (
      <ToggleSwitch
        checked={menuBarOnly}
        onChange={(enabled) => updateSetting("menu_bar_only", enabled)}
        isUpdating={isUpdating("menu_bar_only")}
        label={t("settings.advanced.menuBarOnly.label")}
        description={t("settings.advanced.menuBarOnly.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        tooltipPosition="bottom"
      />
    );
  },
);
