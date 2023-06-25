import { h } from "preact";
import * as bg from "@bgord/frontend";
import { CheckoutSummary } from "./CheckoutSummary";

interface RightPanelProps {
  navigation: bg.UseToggleReturnType;
}

export const RightPanel = ({ navigation }: RightPanelProps) => {
  return (
    <bg.Anima visible={navigation.on} effect="opacity">
      <nav
        data-display="flex"
        data-direction="column"
        data-wrap="nowrap"
        data-overflow="auto"
        data-position="fixed"
        data-inset="0"
        data-z="1"
        data-max-width="768"
        data-bc="gray-700"
        data-bw="2"
        style={{
          left: "unset",
          width: "40%",
          borderRadius: "20px",
          right: "10px",
          top: "10px",
          height: "98%",
          boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`,
          backgroundImage: `linear-gradient(to right, #141e30, #243b55)`,
        }}
      >
        <CheckoutSummary disable={navigation.disable} />
      </nav>
    </bg.Anima>
  );
};
