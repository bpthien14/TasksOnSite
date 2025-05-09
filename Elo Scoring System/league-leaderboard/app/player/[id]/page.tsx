"use client"

import { useState } from "react"
import Image from "next/image"

export default function PlayerDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("summary")
  const [activeMatchTab, setActiveMatchTab] = useState("overview")
  const [expandedMatch, setExpandedMatch] = useState<number | null>(0)

  const toggleMatchDetails = (matchId: number) => {
    if (expandedMatch === matchId) {
      setExpandedMatch(null)
    } else {
      setExpandedMatch(matchId)
    }
  }

  // Find player data based on the ID
  const player = playerData.find((p) => p.id.toString() === params.id) || playerData[0]

  return (
    <main>
      <header className="header">
        <div className="container">
          <h1>Player Profile</h1>
        </div>
      </header>

      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <Image src={player.avatar || "/placeholder.svg"} alt={player.name} width={80} height={80} />
            <div className="profile-level">{player.level}</div>
          </div>
          <div className="profile-info">
            <div className="profile-name">
              <h2>{player.name}</h2>
              <span className="profile-tag">{player.tag}</span>
            </div>
            <div className="profile-rank">
              Ladder Rank {player.ladderRank} ({player.topPercent}% of top)
            </div>
            <div className="profile-actions">
              <button className="btn btn-primary">Update</button>
              <button className="btn btn-secondary">Tier Graph</button>
            </div>
            <div className="last-updated">Last updated: {player.lastUpdated}</div>
          </div>
        </div>

        <div className="nav-tabs">
          <div className={`nav-tab ${activeTab === "summary" ? "active" : ""}`} onClick={() => setActiveTab("summary")}>
            Summary
          </div>
          <div
            className={`nav-tab ${activeTab === "champions" ? "active" : ""}`}
            onClick={() => setActiveTab("champions")}
          >
            Champions
          </div>
          <div className={`nav-tab ${activeTab === "mastery" ? "active" : ""}`} onClick={() => setActiveTab("mastery")}>
            Mastery
          </div>
          <div
            className={`nav-tab ${activeTab === "live-game" ? "active" : ""}`}
            onClick={() => setActiveTab("live-game")}
          >
            Live Game
          </div>
          <div
            className={`nav-tab ${activeTab === "teamfight-tactics" ? "active" : ""}`}
            onClick={() => setActiveTab("teamfight-tactics")}
          >
            Teamfight Tactics
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="rank-card">
              <div className="rank-header">
                <h3 className="rank-title">Ranked Solo/Duo</h3>
                <div>ⓘ</div>
              </div>
              <div className="rank-info">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Rank Emblem"
                  width={64}
                  height={64}
                  className="rank-emblem"
                />
                <div className="rank-details">
                  <div className="rank-tier">Challenger</div>
                  <div className="rank-lp">1,485 LP</div>
                  <div className="rank-winrate">Win rate 56%</div>
                </div>
              </div>
              <div className="rank-history">
                <div className="rank-history-item">
                  <div className="rank-season">Season</div>
                  <div className="rank-tier-col">Tier</div>
                  <div className="rank-lp-col">LP</div>
                </div>
                <div className="rank-history-item">
                  <div className="rank-season">S2024 S3</div>
                  <div className="rank-tier-col">
                    <span className="tier-icon challenger"></span>
                    Challenger
                  </div>
                  <div className="rank-lp-col">1,015</div>
                </div>
                <div className="rank-history-item">
                  <div className="rank-season">S2024 S2</div>
                  <div className="rank-tier-col">
                    <span className="tier-icon challenger"></span>
                    Challenger
                  </div>
                  <div className="rank-lp-col">1,103</div>
                </div>
                <div className="rank-history-item">
                  <div className="rank-season">S2024 S1</div>
                  <div className="rank-tier-col">
                    <span className="tier-icon challenger"></span>
                    Challenger
                  </div>
                  <div className="rank-lp-col">993</div>
                </div>
                <div className="rank-history-item">
                  <div className="rank-season">S2023 S2</div>
                  <div className="rank-tier-col">
                    <span className="tier-icon grandmaster"></span>
                    Grandmaster
                  </div>
                  <div className="rank-lp-col">903</div>
                </div>
                <div className="view-more">
                  View all season tiers
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="match-history">
              {player.matches.map((match, index) => (
                <div key={match.id} className="match-item">
                  <div className={`match-header ${match.result}`}>
                    <div className="match-type">
                      <div className="match-queue">{match.queue}</div>
                      <div className="match-time">{match.time}</div>
                    </div>
                    <div className="match-result">
                      <div className={`match-result-text ${match.result}`}>
                        {match.result === "victory" ? "Victory" : "Defeat"}
                      </div>
                      <div className="match-duration">{match.duration}</div>
                    </div>
                  </div>

                  <div className="match-overview">
                    <div className="champion-played">
                      <Image
                        src={match.champion.image || "/placeholder.svg"}
                        alt={match.champion.name}
                        width={48}
                        height={48}
                        className="champion-img"
                      />
                      <div className="champion-level">{match.champion.level}</div>
                    </div>

                    <div className="summoner-spells">
                      {match.spells.map((spell, idx) => (
                        <Image
                          key={idx}
                          src={spell || "/placeholder.svg"}
                          alt="Spell"
                          width={22}
                          height={22}
                          className="spell-img"
                        />
                      ))}
                    </div>

                    <div className="runes">
                      {match.runes.map((rune, idx) => (
                        <Image
                          key={idx}
                          src={rune || "/placeholder.svg"}
                          alt="Rune"
                          width={22}
                          height={22}
                          className="rune-img"
                        />
                      ))}
                    </div>

                    <div className="kda-container">
                      <div className="kda-numbers">
                        {match.kills} / {match.deaths} / {match.assists}
                      </div>
                      <div className="kda-ratio">{match.kda} KDA</div>
                    </div>

                    <div className="match-stats">
                      <div className="stat-label">
                        Laning {match.laning.score} : {100 - match.laning.score}
                      </div>
                      <div className="stat-value">P/Kill {match.pkill}%</div>
                      <div className="stat-value">
                        CS {match.cs} ({match.csPerMin})
                      </div>
                      <div className="stat-value">{match.tier}</div>
                    </div>

                    <div className="items-built">
                      {match.items.map((item, idx) =>
                        item ? (
                          <Image
                            key={idx}
                            src={item || "/placeholder.svg"}
                            alt="Item"
                            width={22}
                            height={22}
                            className="item-img"
                          />
                        ) : (
                          <div
                            key={idx}
                            style={{ width: 22, height: 22, borderRadius: 4, backgroundColor: "#f0f2f5" }}
                          ></div>
                        ),
                      )}
                    </div>

                    <div className="match-players">
                      <div className="team-players">
                        {match.blueTeam.slice(0, 2).map((player, idx) => (
                          <div key={idx} className="player-icon">
                            <Image
                              src={player.champion || "/placeholder.svg"}
                              alt="Champion"
                              width={20}
                              height={20}
                              className="player-champion"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="team-players">
                        {match.redTeam.slice(0, 2).map((player, idx) => (
                          <div key={idx} className="player-icon">
                            <Image
                              src={player.champion || "/placeholder.svg"}
                              alt="Champion"
                              width={20}
                              height={20}
                              className="player-champion"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="match-actions">
                      <button
                        className={`btn-match-detail ${expandedMatch === match.id ? "active" : ""}`}
                        onClick={() => toggleMatchDetails(match.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline
                            points={expandedMatch === match.id ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
                          ></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {match.badges && (
                    <div style={{ padding: "0 16px 12px", display: "flex", gap: "4px" }}>
                      {match.badges.map((badge, idx) => (
                        <div key={idx} className={`badge ${badge.toLowerCase()}`}>
                          {badge}
                        </div>
                      ))}
                    </div>
                  )}

                  {expandedMatch === match.id && (
                    <div className={`match-detail ${expandedMatch === match.id ? "active" : ""}`}>
                      <div className="match-tabs">
                        <div
                          className={`match-tab ${activeMatchTab === "overview" ? "active" : ""}`}
                          onClick={() => setActiveMatchTab("overview")}
                        >
                          Overview
                        </div>
                        <div
                          className={`match-tab ${activeMatchTab === "op-score" ? "active" : ""}`}
                          onClick={() => setActiveMatchTab("op-score")}
                        >
                          OP Score
                        </div>
                        <div
                          className={`match-tab ${activeMatchTab === "team-analysis" ? "active" : ""}`}
                          onClick={() => setActiveMatchTab("team-analysis")}
                        >
                          Team analysis
                        </div>
                        <div
                          className={`match-tab ${activeMatchTab === "build" ? "active" : ""}`}
                          onClick={() => setActiveMatchTab("build")}
                        >
                          Build
                        </div>
                        <div
                          className={`match-tab ${activeMatchTab === "etc" ? "active" : ""}`}
                          onClick={() => setActiveMatchTab("etc")}
                        >
                          Etc.
                        </div>
                      </div>

                      <div className="team-header">
                        <div className="team-title victory">Victory (Blue Team)</div>
                        <div className="team-stats">
                          <div className="team-stat">OP Score</div>
                          <div className="team-stat">KDA</div>
                          <div className="team-stat">Damage</div>
                          <div className="team-stat">Wards</div>
                          <div className="team-stat">CS</div>
                          <div className="team-stat">Items</div>
                        </div>
                      </div>

                      {match.detailedStats.blueTeam.map((player, idx) => (
                        <div key={idx} className="player-row">
                          <div className="player-champion-col">
                            <Image
                              src={player.champion || "/placeholder.svg"}
                              alt="Champion"
                              width={32}
                              height={32}
                              className="player-champion-img"
                            />
                            <div>
                              <div className="player-name-col">{player.name}</div>
                              <div className="player-tier-col">{player.tier}</div>
                            </div>
                          </div>
                          <div className="player-score-col">
                            <div className="score-value">{player.opScore}</div>
                            <div className="score-rank">{player.rank}</div>
                          </div>
                          <div className="player-kda-col">
                            <div className="kda-detail">
                              {player.kills}/{player.deaths}/{player.assists} ({player.killParticipation}%)
                            </div>
                            <div className={player.perfect ? "kda-perfect" : ""}>
                              {player.kdaRatio}
                              {player.perfect ? " Perfect" : ""}
                            </div>
                          </div>
                          <div className="player-damage-col">
                            <div className="damage-bar" style={{ width: `${player.damagePercentage}%` }}></div>
                            <div className="damage-value">{player.damage.toLocaleString()}</div>
                          </div>
                          <div className="player-wards-col">
                            <div className="wards-value">
                              {player.wards.placed} / {player.wards.destroyed}
                            </div>
                          </div>
                          <div className="player-cs-col">
                            <div className="cs-value">{player.cs}</div>
                            <div className="cs-per-min">{player.csPerMin}/m</div>
                          </div>
                          <div className="player-items-col">
                            <div className="detail-items">
                              {player.items.map((item, itemIdx) =>
                                item ? (
                                  <Image
                                    key={itemIdx}
                                    src={item || "/placeholder.svg"}
                                    alt="Item"
                                    width={22}
                                    height={22}
                                    className="detail-item-img"
                                  />
                                ) : null,
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="team-summary">
                        <div className="team-stat-row">
                          <div className="team-stat-label">Total Kill</div>
                          <div className="team-stat-bar">
                            <div
                              className="team-stat-fill blue"
                              style={{ width: `${match.teamStats.killsPercentage.blue}%` }}
                            >
                              {match.teamStats.kills.blue}
                            </div>
                            <div
                              className="team-stat-fill red"
                              style={{ width: `${match.teamStats.killsPercentage.red}%` }}
                            >
                              {match.teamStats.kills.red}
                            </div>
                          </div>
                        </div>
                        <div className="team-stat-row">
                          <div className="team-stat-label">Total Gold</div>
                          <div className="team-stat-bar">
                            <div
                              className="team-stat-fill blue"
                              style={{ width: `${match.teamStats.goldPercentage.blue}%` }}
                            >
                              {match.teamStats.gold.blue.toLocaleString()}
                            </div>
                            <div
                              className="team-stat-fill red"
                              style={{ width: `${match.teamStats.goldPercentage.red}%` }}
                            >
                              {match.teamStats.gold.red.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="team-header" style={{ marginTop: "24px" }}>
                        <div className="team-title defeat">Defeat (Red Team)</div>
                        <div className="team-stats">
                          <div className="team-stat">OP Score</div>
                          <div className="team-stat">KDA</div>
                          <div className="team-stat">Damage</div>
                          <div className="team-stat">Wards</div>
                          <div className="team-stat">CS</div>
                          <div className="team-stat">Items</div>
                        </div>
                      </div>

                      {match.detailedStats.redTeam.map((player, idx) => (
                        <div key={idx} className="player-row">
                          <div className="player-champion-col">
                            <Image
                              src={player.champion || "/placeholder.svg"}
                              alt="Champion"
                              width={32}
                              height={32}
                              className="player-champion-img"
                            />
                            <div>
                              <div className="player-name-col">{player.name}</div>
                              <div className="player-tier-col">{player.tier}</div>
                            </div>
                          </div>
                          <div className="player-score-col">
                            <div className="score-value">{player.opScore}</div>
                            <div className="score-rank">{player.rank}</div>
                          </div>
                          <div className="player-kda-col">
                            <div className="kda-detail">
                              {player.kills}/{player.deaths}/{player.assists} ({player.killParticipation}%)
                            </div>
                            <div>{player.kdaRatio}</div>
                          </div>
                          <div className="player-damage-col">
                            <div className="damage-bar" style={{ width: `${player.damagePercentage}%` }}></div>
                            <div className="damage-value">{player.damage.toLocaleString()}</div>
                          </div>
                          <div className="player-wards-col">
                            <div className="wards-value">
                              {player.wards.placed} / {player.wards.destroyed}
                            </div>
                          </div>
                          <div className="player-cs-col">
                            <div className="cs-value">{player.cs}</div>
                            <div className="cs-per-min">{player.csPerMin}/m</div>
                          </div>
                          <div className="player-items-col">
                            <div className="detail-items">
                              {player.items.map((item, itemIdx) =>
                                item ? (
                                  <Image
                                    key={itemIdx}
                                    src={item || "/placeholder.svg"}
                                    alt="Item"
                                    width={22}
                                    height={22}
                                    className="detail-item-img"
                                  />
                                ) : null,
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const playerData = [
  {
    id: 4,
    name: "Zamudo",
    tag: "#0517",
    avatar: "/placeholder.svg?height=80&width=80",
    level: 134,
    ladderRank: 4,
    topPercent: 0.0054,
    lastUpdated: "3 hours ago",
    matches: [
      {
        id: 1,
        queue: "Ranked Solo/Duo",
        time: "2 days ago",
        result: "defeat",
        duration: "31m 41s",
        champion: {
          name: "Katarina",
          image: "/placeholder.svg?height=48&width=48",
          level: 18,
        },
        spells: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        runes: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        kills: 4,
        deaths: 4,
        assists: 0,
        kda: "1.00:1",
        laning: {
          score: 45,
        },
        pkill: 33,
        cs: 292,
        csPerMin: "9.2",
        tier: "Challenger",
        items: [
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
        ],
        blueTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        redTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        badges: ["ACE", "Struggle"],
        detailedStats: {
          blueTeam: [
            {
              name: "I will trade",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 6.1,
              rank: "5th",
              kills: 4,
              deaths: 3,
              assists: 8,
              killParticipation: 34,
              kdaRatio: "4.00:1",
              damage: 24803,
              damagePercentage: 70,
              wards: { placed: 13, destroyed: 0 },
              cs: 231,
              csPerMin: "7.3",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "Mr Dude",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 8.2,
              rank: "4th",
              kills: 6,
              deaths: 1,
              assists: 10,
              killParticipation: 46,
              kdaRatio: "16.00:1",
              damage: 40104,
              damagePercentage: 90,
              wards: { placed: 10, destroyed: 4 },
              cs: 213,
              csPerMin: "6.7",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "ToastyAlex",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 8.2,
              rank: "3rd",
              kills: 9,
              deaths: 4,
              assists: 9,
              killParticipation: 51,
              kdaRatio: "4.50:1",
              damage: 32524,
              damagePercentage: 75,
              wards: { placed: 14, destroyed: 4 },
              cs: 287,
              csPerMin: "9.1",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "fiction",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 9.1,
              rank: "2nd",
              kills: 12,
              deaths: 4,
              assists: 9,
              killParticipation: 60,
              perfect: false,
              kdaRatio: "5.25:1",
              damage: 31880,
              damagePercentage: 80,
              wards: { placed: 8, destroyed: 5 },
              cs: 271,
              csPerMin: "8.6",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "Virtuosa",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 10,
              rank: "MVP",
              kills: 4,
              deaths: 0,
              assists: 21,
              killParticipation: 71,
              perfect: true,
              kdaRatio: "Perfect",
              damage: 20638,
              damagePercentage: 60,
              wards: { placed: 42, destroyed: 13 },
              cs: 54,
              csPerMin: "1.7",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
          ],
          redTeam: [
            {
              name: "Zamudo",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 3.9,
              rank: "ACE",
              kills: 4,
              deaths: 4,
              assists: 0,
              killParticipation: 33,
              kdaRatio: "1.00:1",
              damage: 23829,
              damagePercentage: 65,
              wards: { placed: 12, destroyed: 2 },
              cs: 292,
              csPerMin: "9.2",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "kisno",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 2.4,
              rank: "9th",
              kills: 3,
              deaths: 8,
              assists: 2,
              killParticipation: 42,
              kdaRatio: "0.63:1",
              damage: 21305,
              damagePercentage: 55,
              wards: { placed: 2, destroyed: 4 },
              cs: 235,
              csPerMin: "7.4",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                null,
                null,
              ],
            },
            {
              name: "gg wtf",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 2.5,
              rank: "8th",
              kills: 2,
              deaths: 9,
              assists: 4,
              killParticipation: 50,
              kdaRatio: "0.67:1",
              damage: 25108,
              damagePercentage: 60,
              wards: { placed: 4, destroyed: 3 },
              cs: 147,
              csPerMin: "4.6",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                null,
                null,
                null,
              ],
            },
            {
              name: "chaechae1",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Challenger",
              opScore: 2.2,
              rank: "10th",
              kills: 1,
              deaths: 9,
              assists: 5,
              killParticipation: 50,
              kdaRatio: "0.67:1",
              damage: 10915,
              damagePercentage: 30,
              wards: { placed: 11, destroyed: 5 },
              cs: 262,
              csPerMin: "8.3",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
              ],
            },
            {
              name: "Zats",
              champion: "/placeholder.svg?height=32&width=32",
              tier: "Grandmaster",
              opScore: 3,
              rank: "7th",
              kills: 2,
              deaths: 5,
              assists: 4,
              killParticipation: 50,
              kdaRatio: "1.20:1",
              damage: 9471,
              damagePercentage: 25,
              wards: { placed: 35, destroyed: 3 },
              cs: 41,
              csPerMin: "1.3",
              items: [
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                "/placeholder.svg?height=22&width=22",
                null,
              ],
            },
          ],
        },
        teamStats: {
          kills: {
            blue: 35,
            red: 12,
          },
          killsPercentage: {
            blue: 75,
            red: 25,
          },
          gold: {
            blue: 70608,
            red: 56183,
          },
          goldPercentage: {
            blue: 56,
            red: 44,
          },
        },
      },
      {
        id: 2,
        queue: "Ranked Solo/Duo",
        time: "2 days ago",
        result: "defeat",
        duration: "24m 07s",
        champion: {
          name: "Akali",
          image: "/placeholder.svg?height=48&width=48",
          level: 14,
        },
        spells: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        runes: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        kills: 5,
        deaths: 5,
        assists: 4,
        kda: "1.80:1",
        laning: {
          score: 62,
        },
        pkill: 47,
        cs: 202,
        csPerMin: "8.4",
        tier: "Challenger",
        items: [
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
        ],
        blueTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        redTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        badges: ["6th", "Unlucky"],
        detailedStats: {
          blueTeam: [],
          redTeam: [],
        },
        teamStats: {
          kills: {
            blue: 25,
            red: 15,
          },
          killsPercentage: {
            blue: 62,
            red: 38,
          },
          gold: {
            blue: 55000,
            red: 45000,
          },
          goldPercentage: {
            blue: 55,
            red: 45,
          },
        },
      },
      {
        id: 3,
        queue: "Ranked Solo/Duo",
        time: "2 days ago",
        result: "victory",
        duration: "26m 54s",
        champion: {
          name: "Yasuo",
          image: "/placeholder.svg?height=48&width=48",
          level: 17,
        },
        spells: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        runes: ["/placeholder.svg?height=22&width=22", "/placeholder.svg?height=22&width=22"],
        kills: 9,
        deaths: 1,
        assists: 5,
        kda: "14.00:1",
        laning: {
          score: 46,
        },
        pkill: 58,
        cs: 260,
        csPerMin: "9.7",
        tier: "Challenger",
        items: [
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
          "/placeholder.svg?height=22&width=22",
        ],
        blueTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        redTeam: [
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
          { champion: "/placeholder.svg?height=20&width=20" },
        ],
        badges: ["Quadra Kill", "3rd", "Late bloomer"],
        detailedStats: {
          blueTeam: [],
          redTeam: [],
        },
        teamStats: {
          kills: {
            blue: 30,
            red: 10,
          },
          killsPercentage: {
            blue: 75,
            red: 25,
          },
          gold: {
            blue: 65000,
            red: 40000,
          },
          goldPercentage: {
            blue: 62,
            red: 38,
          },
        },
      },
    ],
  },
]
