import light from "./leftsidebar.module.css"
import dark from "./leftsidebardark.module.css"
import useUserContext from "../pollProvider"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import profile from "../assets/profile.svg"
import profiledark from "../assets/profiledark.svg"
import explore from "../assets/explore.svg"
import exploredark from "../assets/exploredark.svg"
import mypolls from "../assets/mypolls.svg"
import mypollsdark from "../assets/mypollsdark.svg"
import newpoll from "../assets/newpoll.svg"
import newpolldark from "../assets/newpolldark.svg"
import settings from "../assets/settings.svg"
import settingsdark from "../assets/settingsdark.svg"
import favorites from "../assets/favorites.svg"
import favoritesdark from "../assets/favoritesdark.svg"
import mostvoted from "../assets/mostvoted.svg"
import mostvoteddark from "../assets/mostvoteddark.svg"
import logout from "../assets/logout.svg"
import logoutdark from "../assets/logoutdark.svg"
import expand from "../assets/expand.svg"
import expanddark from "../assets/expanddark.svg"
import collapse from "../assets/collapse.svg"
import collapsedark from "../assets/collapsedark.svg"

const LeftSideBar = () => {

	const { theme, user, setUser } = useUserContext()

	const navigate = useNavigate()

	const styles = theme ? light : dark

	const [collapsed, setCollapsed] = useState(true)
	const [width, setWidth] = useState(window.innerWidth)

	function getWindowWidth() {
		setWidth(window.innerWidth)
	}

	useEffect(() => {

		window.addEventListener("resize", getWindowWidth)

		return () => { window.removeEventListener("resize", getWindowWidth) }

	}, [])

	useEffect(() => {
		if (width < 700) {
			setCollapsed(true)
		}
	}, [width])

	return (

		<div className={collapsed ? styles.collapsedSideBar : styles.expandedSideBar} style={{ zIndex: "2" }}>

			<div className={styles.filters}>

			</div>

			<div className={styles.settings}>
				<div
					onClick={() => setCollapsed(!collapsed)}
					style={{ justifyContent: `${collapsed ? "start" : "end"}`,
									 paddingRight: `${collapsed ? "0" : "10px"}`}}>
					<img src={collapsed
						? theme ? expand : expanddark
						: theme ? collapse : collapsedark
					} />
				</div>
				{user && <div>{collapsed ? <img src={theme ? profile : profiledark} /> : <button>Profile</button>}</div>}
				{user && <div onClick={() => navigate("/mypolls")}>{collapsed ? <img src={theme ? mypolls : mypollsdark} /> : <button>My Polls</button>}</div>}
				<div onClick={() => navigate("/polls")}>{collapsed ? <img src={theme ? explore : exploredark} /> : <button>Explore</button>}</div>
				<div onClick={() => navigate("/new")}>{collapsed ? <img src={theme ? newpoll : newpolldark} /> : <button>New Poll</button>}</div>
				<div>{collapsed ? <img src={theme ? settings : settingsdark} /> : <button>Settings</button>}</div>
				{user && <div>{collapsed ? <img src={theme ? favorites : favoritesdark} /> : <button>Favorites</button>}</div>}
				<div>{collapsed ? <img src={theme ? mostvoted : mostvoteddark} /> : <button>Most Voted Polls</button>}</div>
				{user && <div onClick={() => {
					navigate("/")
					setUser(null)
				}}>
					{collapsed
					? <img src={theme ? logout : logoutdark} />
					: <button>Logout</button>}
				</div>
				}
			</div>

		</div>

	)

}

export default LeftSideBar
