import "../styles/global.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";

import Header from "../components/Header";
import styles from "../styles/app.module.scss";
import Player from "../components/Player";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContextProvider>
  )
}

export default MyApp;
