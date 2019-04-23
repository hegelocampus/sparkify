import React from 'react';
import ArtistIndexItem from './artist_index_item';

class ArtistIndex extends React.Component {
  render() {
    debugger;
    return (
      <div>
        <ul className="artist-index">
          {this.props.artists.map(artist => <ArtistIndexItem artist={artist} key={artist.id} />)}
        </ul>
      </div>
    )
  }

}

export default ArtistIndex;