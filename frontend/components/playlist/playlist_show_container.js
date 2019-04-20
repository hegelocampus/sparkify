import { connect } from 'react-redux';
import PlaylistShow from './playlist_show';
import { fetchPlaylist } from './../../actions/playlist_actions';
import { clearSongs } from './../../actions/song_actions';

const msp = (state, ownProps) => {
  let playlistId = ownProps.match.params.playlistId;
  let playlist = state.entities.playlists[playlistId];
  return({
    playlistId,
    playlist,
  })
}

const mdp = dispatch => {
  return({
    fetchPlaylist: id => dispatch(fetchPlaylist(id)),
    clearSongs: () => dispatch(clearSongs())
  })
}

export default connect(msp, mdp)(PlaylistShow);