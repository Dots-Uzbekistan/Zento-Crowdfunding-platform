import React, { useState, useEffect } from "react";
import styles from "./Tabs.module.scss";
import Basics from "../../EachTab/Basics/Basics";
import ContactsLinks from "../../EachTab/ContactsLinks/ContactsLinks";
import Team from "../../EachTab/Team/Team";
import Pitch from "../../EachTab/Pitch/Pitch";
import Contract from "../../EachTab/Contract/Contract";
import FundingGoals from "../../EachTab/FundingGoals/FundingGoals";
import Collaboration from "../../EachTab/Collaboration/Collaboration";
import { ThreeDots } from "react-loader-spinner";

const Tabs = ({ campaign }) => {
  const [activeTab, setActiveTab] = useState("Basics");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (campaign) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [campaign]);

  const renderTabContent = () => {
    const campaignId = campaign?.id;

    switch (activeTab) {
      case "Basics":
        return <Basics campaignId={campaignId} />;
      case "Contacts & Links":
        return <ContactsLinks campaignId={campaignId} />;
      case "Team":
        return <Team campaignId={campaignId} />;
      case "Pitch":
        return <Pitch campaignId={campaignId} />;
      case "Contract":
        return <Contract campaignId={campaignId} />;
      case "Funding Goals":
        return <FundingGoals campaignId={campaignId} />;
      case "Collaboration":
        return <Collaboration campaignId={campaignId} />;
      default:
        return <Basics campaignId={campaignId} />;
    }
  };

  const handleSelectChange = (e) => {
    setActiveTab(e.target.value);
  };

  return (
    <div className={styles.editCampaign}>
      {isMobile ? (
        <div className={styles.dropdownWrapper}>
          <select
            className={styles.dropdown}
            value={activeTab}
            onChange={handleSelectChange}
          >
            {[
              "Basics",
              "Contacts & Links",
              "Team",
              "Pitch",
              "Contract",
              "Funding Goals",
              "Collaboration",
            ].map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.tabs}>
          {[
            "Basics",
            "Contacts & Links",
            "Team",
            "Pitch",
            "Contract",
            "Funding Goals",
            "Collaboration",
          ].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className={styles.tabContent}>
        {loading ? (
          <div className={styles.loader}>
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  );
};

export default Tabs;
