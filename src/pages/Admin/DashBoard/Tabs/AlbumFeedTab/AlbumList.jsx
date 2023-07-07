export default AlbumList = ({ albums }) => {
    return <>
        {albums ?
            albums.map((album, index) => <div key={index} className={Styles.card}>
                <div className={Styles.left}>
                    <h5>{album.title}</h5>
                    <p>{album.description}</p>
                    <br />
                    <p>Date: {album.date}</p>
                    <p>Published: {album.publishable ? <strong>Yes</strong> : <strong>No</strong>}</p>
                    <br />
                    <ul>
                        {album.photos.map(photo => <li key={photo._id} >{photo.thumbnailUrl}</li>)}
                    </ul>
                </div>
                <div className={Styles.right}>
                    <button className="button btn-small" onClick={() => {
                        console.log("EDIT");
                        dispach(setSelectedItem(album))
                        dispach(setCurrentState(OperationStates.edit))
                    }}>Edit</button>
                    <button className="button btn-small" onClick={() => onDeleteClick(album)}>Delete</button>
                </div>

            </div>
            ) : null
        }
        <div className={Styles.end}></div>
    </>
}