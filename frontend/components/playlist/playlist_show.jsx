import React from 'react';
import SongIndexContainter from './../song/song_index_container';

class PlaylistShow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPlaylist(this.props.playlistId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playlistId !== prevProps.playlistId) {
      this.props.fetchPlaylist(this.props.playlistId)
    }
  }

  componentWillUnmount() {
    this.props.clearSongs();
  }

  render() {
    let title = '';
    let authorName = '';
    let trackCount = '';
    if (this.props.playlist) {
      title = this.props.playlist.title;
      authorName = this.props.playlist.authorName;
      trackCount = `${this.props.playlist.trackCount}`;
    }
    return(
      <div className='playlist-show'>
        <section className='playlist-header'>
          <h1>{title}</h1>
          <h2>{authorName}</h2>
          <h3>{trackCount} SONGS</h3>
        </section>
        <SongIndexContainter />
      </div>
    )
  }
}

export default PlaylistShow;