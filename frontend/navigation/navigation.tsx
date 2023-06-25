import { Link, LinkProps } from "preact-router/match";
import { h } from "preact";
import * as bg from "@bgord/frontend";
import * as Icons from "iconoir-react";
import { RightPanel } from "../checkout/RightPanel";

export const Navigation = () => {
  bg.useWindowDimensions();
  // if (!width) return <NavigationShell />; // Don't SSR navigation

  // if (width <= 768) return <NavigationMobile />;
  return <NavigationDesktop />;
};

const NavigationDesktop = () => {
  const t = bg.useTranslations();

  const navigation = bg.useToggle();
  return (
    <nav
      data-display="flex"
      data-main="between"
      data-p="24"
      data-bg="gray-800"
      data-shadow
    >
      <NavigationLogo />

      <div data-cross="center" data-display="flex" data-gap="24">
        <NavigationLink href="/about">{t("about")}</NavigationLink>

        <NavigationLink href="/contact">{t("contact")}</NavigationLink>
      </div>
      <div data-cross="center" data-display="flex" data-gap="24">
        <button
          type="button"
          class="c-button"
          data-variant="bare"
          onClick={navigation.enable}
        >
          <Icons.Cart data-color="white" height="24" width="24" />
        </button>

        <RightPanel navigation={navigation} />
        <NavigationLink href="/logout">{t("logout")}</NavigationLink>
      </div>
    </nav>
  );
};

function NavigationLink(props: LinkProps) {
  return (
    <Link
      activeClassName="c-link--active"
      class="c-link"
      data-transform="capitalize"
      data-color="white"
      data-variant="bare"
      {...props}
    />
  );
}

const NavigationLogo = (props: LinkProps) => {
  const t = bg.useTranslations();

  return (
    <NavigationLink
      href="/dashboard"
      data-fs="20"
      data-ls="2"
      data-color="gray-100"
      data-fw="500"
      data-transform="uppercase"
      data-text-decoration="none"
      {...props}
    >
      {t("app-name")}
    </NavigationLink>
  );
};
