import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="subtitle">
          <p>Connect With Me</p>
        </div>
        <div className="link-container">
          <a
            href="http://linkedin.com/in/raghavendraachari"
            target="_blank"
            rel="noreferrer noopener"
          >
            <JamLinkedinCircle />
          </a>

          <a
            href="http://github.com/RaghavendraAchari"
            target="_blank"
            rel="noreferrer noopener"
          >
            <JamGithubCircle />
          </a>
          <a
            href="http://twitter.com/raghav_achari"
            target="_blank"
            rel="noreferrer noopener"
          >
            <JamTwitterCircle />
          </a>
          <a
            href="http://instagram.com/raghav_achari2"
            target="_blank"
            rel="noreferrer noopener"
          >
            <JamInstagram />
          </a>
          <a
            href="mailto:raghav.achari.l@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <JamGoogleCircle />
          </a>
        </div>
        <div className="quick-links">
          <p>Quick Links</p>
          <div>
            <Link className="quickLink" to="/photography">
              Photography
            </Link>
            <Link className="quickLink" to="/art">
              Art
            </Link>
            <Link className="quickLink" to="/admin">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="copyright">
          <p>2022 | Copyright@ Raghavendra Achari</p>
        </div>
      </footer>
    );
  }
}

export function JamGoogleCircle(props) {
  return (
    <svg width="1em" height="1em" viewBox="-2 -2 24 24" {...props}>
      <g fill="currentColor">
        <path d="M7.188 9.034a2.972 2.972 0 0 0 .028 2.01a2.973 2.973 0 0 0 4.285 1.522a2.98 2.98 0 0 0 1.283-1.522H10.11V9.066h4.803a5.005 5.005 0 0 1-1.783 4.833A5 5 0 1 1 10 5a4.982 4.982 0 0 1 3.191 1.152l-1.62 1.326a2.974 2.974 0 0 0-4.384 1.557h.001z"></path>
        <path d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10z"></path>
      </g>
    </svg>
  );
}

// function BxBxlGmail(props) {
//   return (
//     <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
//       <path
//         d="M18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"
//         fill="currentColor"
//       ></path>
//     </svg>
//   );
// }
function JamInstagram(props) {
  return (
    <svg width="1em" height="1em" viewBox="-2 -2 24 24" {...props}>
      <g fill="currentColor">
        <path d="M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z"></path>
        <path d="M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164a5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31a3.155 3.155 0 0 1 0 6.31z"></path>
        <circle cx="15.156" cy="4.858" r="1.237"></circle>
      </g>
    </svg>
  );
}

function JamTwitterCircle(props) {
  return (
    <svg width="1em" height="1em" viewBox="-2 -2 24 24" {...props}>
      <g fill="currentColor">
        <path d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10z"></path>
        <path d="M15 6.947c-.368.16-.763.27-1.178.318c.424-.25.748-.646.902-1.117a4.16 4.16 0 0 1-1.304.49A2.06 2.06 0 0 0 11.923 6c-1.133 0-2.051.905-2.051 2.02c0 .158.018.312.053.46a5.854 5.854 0 0 1-4.228-2.11a1.982 1.982 0 0 0-.278 1.015c0 .7.363 1.32.913 1.681a2.076 2.076 0 0 1-.93-.253v.025a2.03 2.03 0 0 0 1.646 1.98a2.108 2.108 0 0 1-.927.034a2.049 2.049 0 0 0 1.916 1.403a4.156 4.156 0 0 1-2.548.864c-.165 0-.328-.01-.489-.028A5.863 5.863 0 0 0 8.144 14c3.774 0 5.837-3.078 5.837-5.748l-.007-.262A4.063 4.063 0 0 0 15 6.947z"></path>
      </g>
    </svg>
  );
}

function JamGithubCircle(props) {
  return (
    <svg width="1em" height="1em" viewBox="-2 -2 24 24" {...props}>
      <g fill="currentColor">
        <path d="M8.18 15.008c.12 0 .211-.004.271-.012a.317.317 0 0 0 .18-.107c.06-.063.09-.154.09-.274l-.004-.557c-.003-.355-.004-.637-.004-.844l-.188.033a2.41 2.41 0 0 1-.455.028a3.498 3.498 0 0 1-.57-.057a1.276 1.276 0 0 1-.548-.246a1.04 1.04 0 0 1-.36-.503l-.082-.189a2.046 2.046 0 0 0-.258-.417a.989.989 0 0 0-.357-.312l-.057-.04a.602.602 0 0 1-.106-.1a.455.455 0 0 1-.074-.114c-.016-.038-.003-.07.04-.094a.533.533 0 0 1 .238-.037l.164.025c.11.021.245.087.406.196c.16.11.293.251.397.426c.126.224.277.395.455.512a.964.964 0 0 0 .536.176c.18 0 .336-.013.467-.04a1.63 1.63 0 0 0 .369-.124c.049-.365.182-.647.4-.843a5.61 5.61 0 0 1-.839-.148a3.346 3.346 0 0 1-.77-.32a2.204 2.204 0 0 1-.66-.548c-.174-.219-.317-.505-.43-.86a4.09 4.09 0 0 1-.167-1.229c0-.66.216-1.223.647-1.687c-.202-.497-.183-1.054.057-1.671c.159-.05.394-.013.705.11c.311.123.54.228.684.316c.145.087.26.16.348.22a5.814 5.814 0 0 1 1.573-.212c.54 0 1.065.07 1.573.213l.31-.197c.214-.13.465-.251.754-.36c.29-.11.511-.14.664-.09c.246.617.268 1.174.065 1.67c.432.465.648 1.027.648 1.688c0 .464-.056.875-.168 1.233c-.112.358-.257.644-.434.86a2.29 2.29 0 0 1-.664.545a3.342 3.342 0 0 1-.77.32a5.605 5.605 0 0 1-.84.147c.284.245.426.633.426 1.163v1.957c0 .093.014.168.041.226a.226.226 0 0 0 .131.119c.06.021.114.035.16.04c.047.006.113.009.2.009H8.181z"></path>
        <path d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10z"></path>
      </g>
    </svg>
  );
}

function JamLinkedinCircle(props) {
  return (
    <svg width="1em" height="1em" viewBox="-2 -2  24 24" {...props}>
      <g fill="currentColor">
        <path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457c-.592 0-.945.398-1.1.784c-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066c1.41 0 2.468.922 2.468 2.902zM6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115c-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144V8.38H5.127v6.447z"></path>
        <path d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10z"></path>
      </g>
    </svg>
  );
}

export default Footer;
