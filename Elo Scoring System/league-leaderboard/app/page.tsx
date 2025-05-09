"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [activeTab, setActiveTab] = useState("ranked-solo")

  return (
    <main>
      <header className="header">
        <h1>Leaderboards</h1>
      </header>

      <div className="nav-tabs">
        <div
          className={`nav-tab ${activeTab === "ranked-solo" ? "active" : ""}`}
          onClick={() => setActiveTab("ranked-solo")}
        >
          Ranked Solo/Duo
        </div>
        <div
          className={`nav-tab ${activeTab === "ranked-flex" ? "active" : ""}`}
          onClick={() => setActiveTab("ranked-flex")}
        >
          Ranked Flex
        </div>
        <div
          className={`nav-tab ${activeTab === "champions" ? "active" : ""}`}
          onClick={() => setActiveTab("champions")}
        >
          Champions
        </div>
        <div className={`nav-tab ${activeTab === "level" ? "active" : ""}`} onClick={() => setActiveTab("level")}>
          Level
        </div>
        <div className={`nav-tab ${activeTab === "mastery" ? "active" : ""}`} onClick={() => setActiveTab("mastery")}>
          Mastery
        </div>
      </div>

      <div className="container">
        <div className="info-bar">
          <div>There are currently 1,081,746 summoners in Summoner's Rift</div>
          <div>Displaying summoners ranked Iron and above. Rankings are updated periodically</div>
        </div>

        <div className="filter-bar">
          <div className="filter-dropdown">
            <select>
              <option>NA</option>
              <option>EUW</option>
              <option>KR</option>
              <option>CN</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <select>
              <option>All Tiers</option>
              <option>Challenger</option>
              <option>Grandmaster</option>
              <option>Master</option>
              <option>Diamond</option>
            </select>
          </div>
          <div className="search-bar">
            <svg
              className="search-icon"
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Game name #NA1" />
          </div>
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Summoner</th>
              <th>Tier</th>
              <th>LP</th>
              <th>Most champions</th>
              <th>level</th>
              <th>Win rate</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr key={player.id}>
                <td>{player.rank}</td>
                <td>
                  <Link href={`/player/${player.id}`} className="summoner-cell">
                    <div className="avatar">
                      <Image src={player.avatar || "/placeholder.svg"} alt={player.name} width={32} height={32} />
                    </div>
                    <div className="summoner-info">
                      <span className="summoner-name">{player.name}</span>
                      <span className="summoner-tag">{player.tag}</span>
                    </div>
                  </Link>
                </td>
                <td>{player.tier}</td>
                <td>{player.lp.toLocaleString()}</td>
                <td>
                  <div className="champions-cell">
                    {player.champions.map((champion, index) => (
                      <Image
                        key={index}
                        src={champion || "/placeholder.svg"}
                        alt="Champion"
                        width={24}
                        height={24}
                        className="champion-icon"
                      />
                    ))}
                  </div>
                </td>
                <td>{player.level}</td>
                <td>
                  <div className="winrate-cell">
                    <div className="winrate-bar">
                      <div className="winrate-fill" style={{ width: `${player.winRate}%` }}></div>
                    </div>
                    <div className="winrate-stats">
                      <span className="wins">{player.wins}W</span>
                      <span className="losses">{player.losses}L</span>
                      <span className="percentage">{player.winRate}%</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">#1 ~ #100 / Total 1,081,746 Summoners</div>
          <div className="pagination-controls">
            <div className="page-link active">1</div>
            <div className="page-link">2</div>
            <div className="page-link">3</div>
            <div className="page-link">4</div>
            <div className="page-link">5</div>
            <div className="page-link">6</div>
            <div className="page-link">7</div>
            <div className="page-link">8</div>
            <div className="page-link">9</div>
            <div className="page-link">10</div>
            <div className="page-link">
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
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Pentaless",
    tag: "#penta",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1972,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 520,
    wins: 227,
    losses: 158,
    winRate: 59,
  },
  {
    id: 2,
    rank: 2,
    name: "C9 Loki",
    tag: "#kr3",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1972,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 70,
    wins: 253,
    losses: 167,
    winRate: 60,
  },
  {
    id: 3,
    rank: 3,
    name: "AD King",
    tag: "#LYON",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1905,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 81,
    wins: 320,
    losses: 230,
    winRate: 58,
  },
  {
    id: 4,
    rank: 4,
    name: "Zamudo",
    tag: "#0517",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1806,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 134,
    wins: 148,
    losses: 89,
    winRate: 62,
  },
  {
    id: 5,
    rank: 5,
    name: "dusklol",
    tag: "#000",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1767,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 396,
    wins: 187,
    losses: 134,
    winRate: 58,
  },
  {
    id: 6,
    rank: 6,
    name: "RoseThorn",
    tag: "#Rose",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1757,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 784,
    wins: 138,
    losses: 79,
    winRate: 64,
  },
  {
    id: 7,
    rank: 7,
    name: "Cryogen",
    tag: "#Tay",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1728,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 855,
    wins: 232,
    losses: 172,
    winRate: 57,
  },
  {
    id: 8,
    rank: 8,
    name: "TNIAS",
    tag: "#LYON",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1725,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 67,
    wins: 224,
    losses: 141,
    winRate: 61,
  },
  {
    id: 9,
    rank: 9,
    name: "ToastyAlex",
    tag: "#NA1",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1720,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 896,
    wins: 176,
    losses: 130,
    winRate: 58,
  },
  {
    id: 10,
    rank: 10,
    name: "Tenacity",
    tag: "#CN1",
    avatar: "/placeholder.svg?height=32&width=32",
    tier: "Challenger",
    lp: 1718,
    champions: [
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
      "/placeholder.svg?height=24&width=24",
    ],
    level: 492,
    wins: 199,
    losses: 137,
    winRate: 59,
  },
]
