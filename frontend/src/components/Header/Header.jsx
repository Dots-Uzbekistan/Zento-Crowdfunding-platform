import React from "react";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import { FaUser, FaMoneyBill } from "react-icons/fa";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <section className={styles.header_main}>
      <div className={styles.left}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={styles.header_text}
        >
          Invest in founders building the future
        </motion.p>
        <div className={styles.green_container_wrapper}>
          <motion.article
            className={styles.green_cont}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.text_green_group}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.text_green}
              >
                Campaigns funded
              </motion.p>
              <motion.div
                className={styles.header_icon1}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaUser />
              </motion.div>
            </div>
            <CountUp end={3466} className={styles.number_header_countup} />
          </motion.article>
          <motion.article
            className={styles.green_cont}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.text_green_group}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={styles.text_green}
              >
                Raised on Fundflow
              </motion.p>
              <motion.div
                className={styles.header_icon1}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaMoneyBill />
              </motion.div>
            </div>
            <CountUp
              prefix="$"
              suffix="M"
              end={774}
              className={styles.number_header_countup}
            />
          </motion.article>
        </div>
      </div>
      <div className={styles.right}>
        <motion.div
          className={styles.yellow_cont}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.text_yellow}
          >
            One click <br /> away from <br />
            bright future
          </motion.p>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className={styles.yellow_icon}
          >
            <svg
              width="65"
              height="65"
              viewBox="0 0 85 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M74.3782 12.9164L84.5236 30.9527L53.6364 42.4509L84.5236 53.9491L74.1527 72.4364L48.4509 52.1455L53.1854 84.8364H32.4436L36.7273 52.1455L11.0255 72.8873L0.203635 53.7236L30.8655 42.2255L0.203635 31.1782L10.5745 12.6909L36.9527 32.9818L32.4436 0.0654643H53.4109L48.4509 32.9818L74.3782 12.9164Z"
                fill="black"
              />
            </svg>
          </motion.span>
        </motion.div>
        {token ? (
          <motion.button
            className={styles.button_signup}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={"/dashboard"} className={styles.signup_register}>
              <p>Explore</p>
            </Link>
            <svg
              width="27"
              height="27"
              viewBox="0 0 31 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.102783 0.210393H11.8064L30.4996 18.6598L11.8064 37.1092H0.102783L18.8773 18.6598L0.102783 0.210393Z"
                fill="black"
              />
            </svg>
          </motion.button>
        ) : (
          <motion.button
            className={styles.button_signup}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={"/registration"} className={styles.signup_register}>
              <p>Sign up</p>
            </Link>
            <svg
              width="27"
              height="27"
              viewBox="0 0 31 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.102783 0.210393H11.8064L30.4996 18.6598L11.8064 37.1092H0.102783L18.8773 18.6598L0.102783 0.210393Z"
                fill="black"
              />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default Header;
