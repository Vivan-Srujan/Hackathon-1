import { AlertTriangle } from "lucide-react";

function RiskCard() {

  return (
    <div className="risk-card">

      <div className="risk-header">

        <div>
          <h3>Project Health</h3>
          <p>AI Risk Analysis</p>
        </div>

        <AlertTriangle size={28} />

      </div>

      <div className="risk-score">
        <strong>82%</strong>
        <span>High Risk</span>
      </div>

      <div className="progress">
        <div className="progress-bar"></div>
      </div>

      <p className="risk-message">
        ⚠️ Your project has a high probability of missing
        the deadline.
      </p>

      <button className="ai-button">
        View AI Recommendation →
      </button>

    </div>
  );
}

export default RiskCard;