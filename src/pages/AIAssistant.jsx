import { useEffect, useState } from "react";
import { getRecommendations } from "../services/aiService";
import {
  Bot,
  AlertTriangle,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";

function AIAssistant() {
const [recommendations, setRecommendations] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadRecommendations() {
    try {
      const data = await getRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error("Error loading AI recommendations:", error);
    } finally {
      setLoading(false);
    }
  }

  loadRecommendations();
}, []);
  return (
    <div className="dashboard">

      <div className="ai-container">

        <div className="ai-header">

          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "15px",
              background: "#eef2ff",
              color: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Bot size={28} />
          </div>

          <h1 style={{ marginTop: "15px" }}>
            ProjectPilot AI
          </h1>

          <p>
            AI-powered insights to help your team make better decisions.
          </p>

        </div>

        <div className="dashboard-grid">

          <div className="risk-card">

            <div className="risk-header">

              <div>
                <h3>Project Risk</h3>
                <p>AI analysis of your current project</p>
              </div>

              <AlertTriangle size={20} />

            </div>

            <div className="risk-score">

              <strong>82%</strong>

              <span>HIGH RISK</span>

            </div>

            <div className="progress">

              <div className="progress-bar" />

            </div>

            <div className="risk-message">

              Your project has a high probability of missing
              the deadline due to workload imbalance and
              delayed tasks.

            </div>

          </div>

          <div className="recent-tasks">

            <h3>AI Insights</h3>

            <div className="task">

              <span>
                <Users size={14} /> Team overload
              </span>

              <b className="high">
                High
              </b>

            </div>

            <div className="task">

              <span>
                <TrendingUp size={14} /> Deadline pressure
              </span>

              <b className="medium">
                Medium
              </b>

            </div>

            <div className="task">

              <span>
                <AlertTriangle size={14} /> Blocked task
              </span>

              <b className="high">
                High
              </b>

            </div>

          </div>

        </div>

        <div className="risk-card" style={{ marginTop: "18px" }}>

          <h3>Recommended Actions</h3>

          <div className="task">

            <div>

              <strong>
                Reassign Payment Integration
              </strong>

              <p>
                Rahul has 95% workload.
                Priya has available capacity.
              </p>

            </div>

            <button className="ai-button">
              Apply
              <ArrowRight size={13} />
            </button>

          </div>

          <div className="task">

            <div>

              <strong>
                Prioritize Authentication
              </strong>

              <p>
                This task is blocking 3 other tasks.
              </p>

            </div>

            <button className="ai-button">
              Prioritize
              <ArrowRight size={13} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;