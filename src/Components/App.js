import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { useState, useEffect } from "react";

import * as API from "../services/images-api";
import { Modal } from "./Modal/Modal";
import { Button } from "./LoadMoreButton/LoadMoreButton";
import { Loader } from "./Loader/Loader";

const App = () =>{

  const [value, setValue] = useState('')
  const [images, setImages] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true)
      try {
        const fetchedImages = await API.getImages(value, page)
        if(fetchedImages.length === 0){
          alert("No results")
        }
  
        setImages(prevState => prevState ? [...prevState, ...fetchedImages] : fetchedImages)
        setShowButton(!(fetchedImages.length < 12))   
      }
      catch (error) {alert("Error")}
      finally{setIsLoading(false)}
    } 
    if(value){
      getImages()
    }
  }, [value, page])
  
  const formHandler = ({ value }) => {
    setValue(value)
    setImages(null)
    setPage(1)
  }

  const onImgClick = (e) => {
    const selected = images.filter(el => parseInt(el.id) === parseInt(e.currentTarget.id))
    setSelected(selected[0])
    openModal()
  }

  const closeModal = () => {
     setShowModal(false)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const onBtnLoadMore = () => {
    setPage(prevState => prevState + 1)
  }

    return (<div>
      <SearchBar onSubmit={formHandler} />
      <ImageGallery images={images} onImgClick={onImgClick} />
      {images  && !isLoading && showButton && <Button click={onBtnLoadMore} />}

      {isLoading&&<Loader/>}
      {showModal && <Modal image={selected} onClose={closeModal} />}
    </div>)
  };

export default App
  

