import { VNode, h } from "preact";

export function Info(props: h.JSX.IntrinsicElements["div"]) {
  return (
    <div
      data-display="flex"
      data-cross="center"
      data-fs="12"
      data-color="gray-600"
      {...props}
    />
  );
}
export interface Tab {
  id: number;
  title: string;
  content: VNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  handleTabClick: (id: number) => void;
}

export const Tabs = ({ tabs, activeTab, handleTabClick }: TabsProps) => {
  return (
    <div style={tabStyles.container}>
      <div style={tabStyles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              ...tabStyles.tab,
              ...(activeTab === tab.id ? tabStyles.activeTab : {}),
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div style={tabStyles.tabContent}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              ...tabStyles.tabPanel,
              ...(activeTab === tab.id ? tabStyles.activeTabPanel : {}),
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const tabStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
  },
  tab: {
    padding: "10px 100px",
    cursor: "pointer",
    borderBottom: "none",
  },
  activeTab: {
    borderBottom: "2px solid #007bff",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  tabPanel: {
    display: "none",
  },
  activeTabPanel: {
    display: "block",
    width: "100%",
  },
};
