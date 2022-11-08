import config from '../config.json'
import styled from 'styled-components';
import {CSSReset} from '../src/components/CSSReset.js';
import Menu from '../src/components/Menu.js';
import { StyledTimeline } from '../src/components/timeline';

function HomePage() {
    const estilosDaHomePage = { 
        //backgroundColor: "red"
    };
    return (
        <>
        <CSSReset/>
            <div style={estilosDaHomePage}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    )
}
export default HomePage

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
  `;

function Header() {
    return (
        <StyledHeader>
            <img src="banner"></img>
            <img src={`https://github.com/${config.github}.png`}></img>
            <h2>{config.nome}</h2>
            <p>{config.job}</p>
        </StyledHeader>
    )
}

function Timeline(props) {
    console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <spam>
                                            {videos.title}
                                        </spam>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )

            })}
        </StyledTimeline>
    )
}