import { h, VNode } from "preact";
import * as bg from "@bgord/frontend";

interface RightPanelProps {
  navigation: bg.UseToggleReturnType;
  children: VNode;
}

export const RightPanel = ({ navigation, children }: RightPanelProps) => {
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
        data-bw="2"
        data-shadow
        data-bg="gray-600"
        style={{
          maxWidth: 440,
          left: "unset",
          borderRadius: "20px",
          right: "10px",
          top: "10px",
          height: "98%",
        }}
      >
        {children}
      </nav>
    </bg.Anima>
  );
};
