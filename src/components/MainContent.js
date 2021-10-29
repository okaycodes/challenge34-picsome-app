import React, {useState, useEffect} from "react"
import add from "./../icons/add.svg"
import heartThin from "./../icons/heart-thin.svg"
import heartFilled from "./../icons/heart-filled.svg"



function MainContent(){
  const [photosData, setPhotosData] = useState([])

  const handleClick=(id)=>{
    const editedData =  photosData.map(i=>{
      if(i.id===id){
          return {...i, isFavorited: !i.isFavorited}
      }
      return i
    })
    setPhotosData(editedData)
  }


  useEffect(()=>{
    fetch("https://picsum.photos/v2/list?page=2&limit=10")
      .then(response=>response.json())
      .then(data=>{
        // add a new variable isFavorited before setting state
        const withFavoriteVar = data.map(i=>({...i, isFavorited: false}))
        setPhotosData(withFavoriteVar)
      })
  }, [])

    const photos = photosData.map(i=>
      <div key={i.id} className="photo" style={{backgroundImage: `url(${i.download_url})`}}>
        <div className="photo__actions">
          <img
          className={i.isFavorited ?"isLiked":"like"}
          src={i.isFavorited ? heartFilled:heartThin}
          alt=""
          onClick={()=>handleClick(i.id)}
          />
          <img
          className="add"
          src={add}
          alt=""
          />
        </div>
      </div>
    )

  return(
    <div className="photosCollage">
      {photos}
    </div>
  )
}


export default MainContent
