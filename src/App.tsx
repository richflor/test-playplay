import { useState } from 'react'
import './App.css'
import { noEmbedResponse } from './Model';
import { VideoDisplay } from './VideoDisplay';

interface VideoList {
  [key:string]:noEmbedResponse
}

function App() {
  const noEmbedUrl = "https://noembed.com/embed?url="
  const [videoLink, setVideoLink] = useState<string>("");
  const [error, setError] = useState<boolean>(false)

  const [videoList, setVideoList] = useState<VideoList>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addVideo = (video:noEmbedResponse) => {
    if(videoList[video.title]) {
      return false;
    }
    setVideoList(prev => ({
      ...prev,
      [video.title] : video
    }))
    return true;
  }

  const deleteVideo = (video:noEmbedResponse) => {
    if(!videoList[video.title]) {
      return false;
    }
    let copy = {...videoList};
    delete copy[video.title];
    setVideoList(_prev => ({
      ...copy,
    }))
    return true;
  }

  const displayVideoThumbnail = async (link:string) => {
    try {
      const response = await noEmbedApi(link);
      setError(false);
      setVideoLink(response.url);
      if(!addVideo(response)) {
        displayError("Video already present in the list")
      }
    } catch (error) {
      displayError("Link is not valid");
    }
  }

  const displayError = (message:string) => {
    setError(true);
    setErrorMessage(message);
    setVideoLink("");
  }

  const noEmbedApi = async (link:string):Promise<noEmbedResponse> => {
    return fetch(noEmbedUrl + link)
    .then(response => response.json())
    .then((res) => {
      if(!checkValidity(res)) throw new Error ("Link is not valid")
      return res;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const checkValidity = (res:noEmbedResponse):boolean  => {
    if (res.error) return false;
    if (res.provider_name !== "YouTube" || res.type !== "video" || res.provider_url !== "https://www.youtube.com/") return false;
    return true;
  }

  const checkUrl = (url:string):boolean  => {
    if(url.includes("https://www.youtube.com/", 0)) {
      displayVideoThumbnail(url);
      return true;
    }
    displayError("Is not a youtube link");
    return false;
  }

  return (
    <>
      <div className='center'>
        <div>
          <input type="text" onChange={(e) => {
            setVideoLink(e.target.value);
          }}/>
          <button type="submit" onClick={() => checkUrl(videoLink)}>Submit</button>
        </div>
        {error && <p>{errorMessage}</p>}
      </div>
      <div className="display">
          {Object.values(videoList).map(video => <VideoDisplay video={video} deleteVideo={deleteVideo}/>)}
      </div>
    </>
  )
}

export default App
