import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ThreeDots } from "react-loader-spinner";
import { FaRegUserCircle, FaRegHeart, FaShare } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import styles from "./CampaignDetail.module.scss";
import { Link } from "react-router-dom";
import { Progress } from "antd";
import FooterMini from "../../subcomponents/FooterMini/FooterMini";
import { Steps } from "antd";
import { FaRegLightbulb } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { LuStore } from "react-icons/lu";
import { SiTicktick } from "react-icons/si";

const CampaignDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMoreBio, setShowMoreBio] = useState(false); // State to manage bio visibility
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://161.35.19.77:8001/api/catalog/campaigns/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setCampaign(response.data);
          setLiked(response.data.liked); // assuming the API response has a liked field
          setSaved(response.data.saved); // assuming the API response has a saved field
        } else {
          setError(`API returned status code ${response.status}`);
        }
      } catch (err) {
        if (err.response) {
          console.error("Error response data:", err.response.data);
          setError(
            `Error: ${err.response.data.detail || "Something went wrong."}`
          );
        } else if (err.request) {
          console.error("Error request data:", err.request);
          setError("Error: No response from server.");
        } else {
          console.error("Error message:", err.message);
          setError("Error: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const projectStates = [
    { key: "concept", title: "Concept", icon: <FaRegLightbulb /> },
    { key: "prototype", title: "Prototype", icon: <CiSettings /> },
    { key: "production", title: "Production", icon: <LuStore /> },
    { key: "launched", title: "Launched", icon: <SiTicktick /> },
  ];

  const toggleShowMoreBio = () => {
    setShowMoreBio((prevShowMore) => !prevShowMore);
  };

  const initialShowCount = 30; // Show the first 50 words initially
  const getTruncatedBio = (bio, wordLimit) => {
    const words = bio.split(" ");
    if (words.length <= wordLimit) return bio;
    return `${words.slice(0, wordLimit).join(" ")}...`;
  };

  const displayedBio = campaign?.creator?.bio
    ? showMoreBio
      ? campaign.creator.bio
      : getTruncatedBio(campaign.creator.bio, initialShowCount)
    : "No bio yet";

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://161.35.19.77:8001/api/catalog/campaigns/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (err) {
      alert("Failed to like campaign.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://161.35.19.77:8001/api/catalog/campaigns/${id}/save/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSaved(!saved);
      }
    } catch (err) {
      alert("Failed to save campaign.");
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <ThreeDots color="#A5FFB8" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!campaign) {
    return <p className={styles.noData}>No campaign details available.</p>;
  }

  const currentStateIndex = projectStates.findIndex(
    (state) => state.key === campaign.project_state
  );

  return (
    <section className={styles.campaignDetailContainer}>
      <Navbar />
      <div className={styles.middle}>
        <div className={styles.wrapper_card_campaign}>
          {campaign.media && campaign.media[0]?.file ? (
            <img
              className={styles.card_image}
              src={campaign.media[0].file}
              alt={campaign.title}
            />
          ) : (
            <div className={styles.placeholderImage}>No Image Available</div>
          )}
          <div className={styles.info_desc_card}>
            <h1 className={styles.title_card}>{campaign.title}</h1>
            <p className={styles.desc_card}>{campaign.description}</p>
            <div className={styles.user_info_card}>
              {campaign.creator.profile_image ? (
                <img
                  src={campaign.creator.profile_image}
                  alt={campaign.creator.name}
                  className={styles.img_creator}
                />
              ) : (
                <FaRegUserCircle className={styles.defaultProfileIcon} />
              )}
              <div className={styles.user_creator}>
                <h1>{campaign.creator.name}</h1>
                <p>
                  {campaign.creator.campaigns_count} campaigns |
                  <span> Location: {campaign.location}</span>
                </p>
              </div>
            </div>

            <div className={styles.statistic}>
              <div className={styles.miniStats_title}>
                <p>Raised: ${campaign.raised_amount}</p>
                <p>{campaign.days_left} days left</p>
              </div>
              <div className={styles.progressBarContainer}>
                <Progress
                  percent={campaign.percent_raised}
                  showInfo={false}
                  size={[660, 20]}
                />
              </div>
              <div className={styles.miniStats}>
                <p>
                  {campaign.percent_raised}% of ${campaign.goal_amount}
                </p>
                <p>{campaign.investors_count} people invested</p>
              </div>
            </div>
            <div className={styles.btn_card_camapign}>
              <Link className={styles.investmentgoto} to={""}>
                <button className={styles.investmentgoto_1}>
                  Invest in Campaign
                </button>
              </Link>
              <div className={styles.btn_function}>
                <button className={styles.like} onClick={handleLike}>
                  {liked ? <IoIosHeart /> : <FaRegHeart />} Like
                </button>
                <button className={styles.share}>
                  <FaShare />
                  Share
                </button>
                <button
                  className={styles.bookmark_campaign}
                  onClick={handleSave}
                >
                  {saved ? <IoBookmark /> : <IoBookmarkOutline />} Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper_tabs_review}>
          <div className={styles.tabsContainer}>
            <nav className={styles.tabNav}>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "overview" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("overview")}
              >
                Overview
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "faq" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("faq")}
              >
                FAQ
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "updates" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("updates")}
              >
                Updates
              </button>
            </nav>
            <div className={styles.tabContent}>
              {activeTab === "overview" && (
                <div className={styles.tab_container_wrapper_overview}>
                  <div className={styles.wrapper_overview_right}>
                    <h2>Project state</h2>
                    <p>
                      The project team has begun turning their prototype into
                      the final product. Their ability to ship the products may
                      be affected by product development or financial
                      challenges.
                    </p>
                    <Steps
                      current={currentStateIndex}
                      className={styles.stepsContainer}
                    >
                      {projectStates.map((step, index) => (
                        <Steps.Step
                          key={index}
                          title={step.title}
                          icon={step.icon}
                          status={
                            index < currentStateIndex
                              ? "finish"
                              : index === currentStateIndex
                              ? "process"
                              : "wait"
                          }
                        />
                      ))}
                    </Steps>
                  </div>
                  <div className={styles.wrapper_overview}>
                    <div className={styles.user_info_card_fortabs}>
                      {campaign.creator.profile_image ? (
                        <img
                          src={campaign.creator.profile_image}
                          alt={campaign.creator.name}
                          className={styles.img_creator}
                        />
                      ) : (
                        <FaRegUserCircle
                          className={styles.defaultProfileIcon}
                        />
                      )}
                      <div className={styles.user_creator_fortabs}>
                        <h1>{campaign.creator.name}</h1>
                        <p>
                          {campaign.creator.campaigns_count} campaigns |{" "}
                          <span> Location: {campaign.location}</span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.bioContainer}>
                      {campaign.creator.bio ? (
                        <p className={styles.real_bio}>{displayedBio}</p>
                      ) : (
                        <p className={styles.bio_creator}>No bio yet</p>
                      )}
                      {campaign.creator.bio && (
                        <p
                          className={styles.showMoreButton}
                          onClick={toggleShowMoreBio}
                        >
                          {showMoreBio ? "Show Less" : "Show More"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "faq" && (
                <div className={styles.tab_container_wrapper_faq}></div>
              )}
              {activeTab === "updates" && <div>Updates content goes here.</div>}
            </div>
          </div>
        </div>
        {/* <div className={styles.ask_question}>
          <h3>
            Don’t see the answer to <br /> your question ? Ask here{" "}
          </h3>
          <button className={styles.btn_ask}>Ask Question</button>
        </div> */}
      </div>
      <FooterMini />
    </section>
  );
};

export default CampaignDetail;
