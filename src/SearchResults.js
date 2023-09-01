import { useParams } from "react-router-dom"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function SearchResults() {

    const params = useParams()
    const [resultPhotos, setResultPhotos] = useState([])
    const [perPage, setPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    
    const getFlickrImages = async () => {
        //https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&q=bank
        try {
            await fetch(
                buildFlickrAPIURL()
            )
            .then(res => {
                if (res.ok) {                    
                    res.json()
                    .then(res => {
                        console.log(res)
                        if (res.stat === 'ok') {
                            setResultPhotos(res.photos.photo)
                            totalPage === 0 && setTotalPage(res.photos.pages)
                            setPage(res.photos.page)
                        }                        
                        
                    })
                }
            })                
        } catch (error) {
            console.log('getFlickrImages Error:', error)
        }
    }

    const buildFlickrAPIURL = () => {
        return (
        "https://api.flickr.com/services/rest?" + new URLSearchParams({
            method: "flickr.photos.search",
            format: "json",
            nojsoncallback: 1,
            text: params.queryText,
            api_key: process.env.REACT_APP_FLICKR_API_KEY,
            safe_search: 1,
            per_page: perPage,
            page: page
        })
        )
    }
    const buildImageURL = photo => {
        return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
    }
    console.log('Params: ',params.queryText)

    useEffect(()=> {
        getFlickrImages(params.queryText)
        return() => {
            // Clean up codes
        }
                    
    }, [params.queryText, page])


    //console.log(resultPhotos.length)
    return(
        <div className="search_results">
            <p>Search results here for {params.queryText}</p>
            <ImageList sx={{ width: 800, height: 600 }} cols={3} rowHeight={164}>
                {resultPhotos.map((photo, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={`${buildImageURL(photo)}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${buildImageURL(photo)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={photo.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Stack spacing={2}>
                <Pagination 
                    count={totalPage} 
                    color="primary" 
                    onChange={(e,page) => setPage(page)}
                />
            </Stack>
        </div>
    )
}
//`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`