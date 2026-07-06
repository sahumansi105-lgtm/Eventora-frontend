import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Rewards.css";

const API_BASE_URL = "http://localhost:8080";

export default function Rewards() {
  const [rewardData, setRewardData] = useState(null);
  const [loadingClaim, setLoadingClaim] = useState(null);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchRewards = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rewards`, getConfig());
      setRewardData(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load rewards");
    }
  };

  const claimReward = async (rewardId) => {
    try {
      setLoadingClaim(rewardId);
      await axios.post(`${API_BASE_URL}/rewards/claim/${rewardId}`, {}, getConfig());
      alert("Reward claimed successfully");
      fetchRewards();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.response?.data || "Unable to claim reward");
    } finally {
      setLoadingClaim(null);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  if (!rewardData) {
    return <h2>Loading Rewards...</h2>;
  }

  const points = rewardData.loyaltyPoints || 0;
  const nextLevelPoints = rewardData.nextLevelPoints || 0;
  const percent = nextLevelPoints > 0 ? Math.min((points / nextLevelPoints) * 100, 100) : 100;

  return (
    <div className="rewards-page">
      <h1>My Rewards</h1>

      <div className="reward-top-card">
        <h2>{rewardData.membershipLevel}</h2>
        <p>Current Membership</p>
        <h1>{points}</h1>
        <span>Loyalty Points</span>
      </div>

      <div className="progress-card">
        <h3>Next Level Progress</h3>
        <div className="reward-progress">
          <div className="reward-fill" style={{ width: `${percent}%` }} />
        </div>
        <p>
          {nextLevelPoints > points
            ? `${rewardData.remainingPoints} points remaining`
            : "Top level reached"}
        </p>
      </div>

      <div className="benefits-grid">
        {(rewardData.availableRewards || []).map((reward) => (
          <div className="benefit-card" key={reward.rewardId}>
            <h2>{reward.rewardName}</h2>
            <p>{reward.description}</p>
            <p>{reward.pointsRequired || 0} points required</p>
            <button
              onClick={() => claimReward(reward.rewardId)}
              disabled={loadingClaim === reward.rewardId || points < (reward.pointsRequired || 0)}
            >
              {loadingClaim === reward.rewardId ? "Claiming..." : "Claim"}
            </button>
          </div>
        ))}
      </div>

      <div className="next-target">
        <h2>Claimed Rewards</h2>
        {(rewardData.claimedRewards || []).length === 0 ? (
          <p>No rewards claimed yet.</p>
        ) : (
          (rewardData.claimedRewards || []).map((claim) => (
            <p key={claim.claimId}>
              <strong>{claim.reward?.rewardName}</strong> - Code: {claim.rewardCode} ({claim.status})
            </p>
          ))
        )}
      </div>

      <div className="motivation-card">
        <h2>Keep Booking</h2>
        <p>Every paid booking earns loyalty points and unlocks better rewards.</p>
      </div>
    </div>
  );
}
