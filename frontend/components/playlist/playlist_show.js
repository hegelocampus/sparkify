import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from './../../actions/playlist_actions';
import { setLoadingFalse, setLoadingTrue } from './../../actions/loading_actions';
import { openModal } from "./../../actions/modal_actions";
import React from 'react';
import SongIndex from '../song/song_index';
import { followPlaylist, unfollowPlaylist } from "./../../util/playlist_api_util";
import { deletePlaylist } from './../../actions/playlist_actions';
import { IconContext } from "react-icons";
import { IoMdHeartEmpty, IoMdHeart, IoIosCog } from "react-icons/io";
import { setCurrentSong } from './../../actions/music_actions';

class PlaylistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followed: false };
    this.followPlaylist = this.followPlaylist.bind(this);
    this.unfollowPlaylist = this.unfollowPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.reveal = this.reveal.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.editPlaylist = this.editPlaylist.bind(this);
    this.playPlaylist = this.playPlaylist.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchPlaylist(this.props.playlistId)
      .then(() => this.setState({ followed: this.props.playlist.followed }))
      .then(() => this.props.setLoadingFalse());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playlistId !== prevProps.playlistId) {
      this.props.setLoadingTrue();
      this.props
        .fetchPlaylist(this.props.playlistId)
        .then(() => this.props.setLoadingFalse());
    }
  }

  componentWillUnmount() {
    this.props.setLoadingTrue();
  }

  followPlaylist() {
    // let id = this.props.playlist.id;
    this.props
      .followPlaylist(this.props.playlist.id)
      .then(() => this.setState({ followed: true }));
  }

  unfollowPlaylist() {
    let id = this.props.playlist.id;
    this.props
      .unfollowPlaylist(id)
      .then(() => this.setState({ followed: false }));
  }

  deletePlaylist() {
    this.props.setLoadingTrue();
    this.props
      .deletePlaylist(this.props.playlist.id)
      .then(() => this.props.history.push("/collection"));
  }

  reveal() {
    $("#revealcog").addClass("hidden");
    $("#playlistdropdown").removeClass("hidden");
    $(document).on("click", this.hideDropdown);
  }

  hideDropdown() {
    $("#playlistdropdown").addClass("hidden");
    $("#revealcog").removeClass("hidden");
    $(document).off("click", this.hideDropdown);
  }

  editPlaylist(e) {
    this.props.openModal({ modalType: 'editPlaylist', playlist: this.props.playlist })
  }

  playPlaylist() {
    this.props.setCurrentSong({
      currentSong: this.props.songs[0],
      currentIdx: 0,
      queue: this.props.songs,
      queueName: this.props.playlist.title
    });
  }

  render() {
    const { songs, playlist, loading } = this.props;

    if (loading) {
      return null;
    }

    let playlistTitle = "";
    let playlistImage = "";
    let songIndex = "";
    let playlistInfo = "";
    if (playlist) {
      playlistTitle = (
        <span className="album-show-album-title">{playlist.title}</span>
      );
      songIndex = (
        <div className="album-show-songs">
          <SongIndex
            songs={songs}
            indexType="playlist"
            playlistId={playlist.id}
            playlistTitle={playlist.title}
            ownedPlaylist={playlist.userId == this.props.currentUserId}
            queueName={playlist.title}
          />
        </div>
      );
      playlistImage = (
        <div className="album-show-image">
          <img src={playlist.image_url} alt={playlist.title} />
        </div>
      );
      playlistInfo = (
        <span className="album-show-year">
          by {playlist.authorName} • {playlist.trackCount} SONGS
        </span>
      );
    }

    let button;
    if (this.props.currentUserId != this.props.playlist.userId) {
      if (!this.state.followed) {
        button = (
          <IconContext.Provider
            value={{ className: "playlist-follow-btn reacticon", size: "3em" }}
          >
            <IoMdHeartEmpty onClick={this.followPlaylist} />
          </IconContext.Provider>
        );
      } else {
        button = (
          <IconContext.Provider
            value={{ className: "playlist-follow-btn reacticon", size: "3em" }}
          >
            <IoMdHeart onClick={this.unfollowPlaylist} />
          </IconContext.Provider>
        );
      }
    } else {
      button = (
        <div id="revealcog">
          <IconContext.Provider
            value={{
              className: "playlist-follow-btn reacticon",
              size: "2em"
            }}
          >
            <IoIosCog onClick={this.reveal} />
          </IconContext.Provider>
        </div>
      );
      // button = <button onClick={this.deletePlaylist}>DELETE</button>
    }
    return (
      <div className="album-show">
        <div className="album-show-info">
          {playlistImage}
          <div className="album-show-details">
            {playlistTitle}
            {playlistInfo}
            <button className='play-collection' onClick={this.playPlaylist}>PLAY</button>
            {button}
            <ul id="playlistdropdown" className="playlistdropdown hidden">
              <li key={1}>
                <button onClick={this.editPlaylist}>Edit Playlist</button>
              </li>
              <li key={2}>
                <button onClick={this.deletePlaylist}>Delete Playlist</button>
              </li>
            </ul>
          </div>
        </div>
        {songIndex}
      </div>
    );
  }
}



const msp = (state, ownProps) => {
  let playlistId = ownProps.match.params.playlistId;
  let playlist = state.entities.playlists[playlistId];
  let songs = Object.values(state.entities.songs);
  let loading = state.ui.loading.status;
  let currentUserId = state.session.currentUserId;
  return({
    playlistId,
    playlist,
    songs,
    loading,
    currentUserId
  });
};

const mdp = dispatch => {
  return {
    fetchPlaylist: id => dispatch(fetchPlaylist(id)),
    setLoadingTrue: () => dispatch(setLoadingTrue()),
    setLoadingFalse: () => dispatch(setLoadingFalse()),
    followPlaylist: id => followPlaylist(id),
    unfollowPlaylist: id => unfollowPlaylist(id),
    deletePlaylist: id => dispatch(deletePlaylist(id)),
    openModal: modalInfo => dispatch(openModal(modalInfo)),
    setCurrentSong: song => dispatch(setCurrentSong(song))
  };
};

export default withRouter(connect(msp, mdp)(PlaylistShow));