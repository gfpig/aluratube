import config from '../config.json'
import styled from 'styled-components';
import Menu from '../src/components/Menu/index.js';
import { StyledTimeline } from '../src/components/timeline';
import React from 'react';
import { videoService } from '../src/services/videoService';

export default function HomePage() {
    const service = videoService();
    const estilosDaHomePage = {
        //backgroundColor: "red"
    };
    const [valor, setvalor] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
            service.getAllVideos()
            .then ((dados) => {
                console.log(dados.data);
                const novasPlaylists = {...playlists};
                dados.data.forEach((videos) => {
                    if(!novasPlaylists[videos.playlist]) {
                        novasPlaylists[videos.playlist] = [];
                    }
                    novasPlaylists[videos.playlist].push(videos);
                })
                setPlaylists(novasPlaylists);
            });
    }, []);
    
    return (
        <>
            <div style={estilosDaHomePage}>
                <Menu valor = {valor} setvalor = {setvalor} />
                <Header />
                <Timeline searchValue = {valor} playlists={playlists} favorites = {config.favorites}/>
            </div>
        </>
    )
}

const StyledBanner = styled.div`
    magin-top: 50px;
    background-image: url(${config.bgimagem});
    background-repeat: repeat-x;
    height: 200px
`;

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    {/*margin-top: 50px;*/}
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
            <StyledBanner/>
            <section className='user-info'>
                <img src={`https://github.com/${config.github}.png`}></img>
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    //console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    const favoritePeople = Object.keys(props.favorites);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                //const videos = props.playlists[playlistName];
                const videos = props.playlists[playlistName];
                //console.log(playlistName);
                //console.log(videos);
                return (
                    <section key= {playlistName}>
                        <h2>{playlistName}</h2>
                        <div className='videos'>
                            {videos.filter((video) => {
                                const titleNormalized = video.Title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.Title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
            {favoritePeople.map((favs) => {
                const pessoas = props.favorites[favs];
                return (
                    <section key = {favs}>
                        <h2>{favs}</h2>
                        <div className="favoritos">
                            {pessoas.map((pessoas) => {
                                return (
                                    <a href = {pessoas.site}>
                                        <img className = "favs" src={`https://github.com/${pessoas.github}.png`}></img>
                                        <span>
                                            {pessoas.github}
                                        </span>
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