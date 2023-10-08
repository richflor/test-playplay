import { useState } from 'react'
import './App.css'
import { noEmbedResponse } from './Model';

function App() {
  const [videoLink, setVideoLink] = useState<string>("");
  const [videoImg, setVideoImg] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false)
  const setState = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback:Function) => {
    if (e.target.value !== "") callback(e.target.value);
  }

  const displayVideoThumbnail = async (link:string) => {
    const response = await noEmbedApi(link);
    if (checkValidity(response)) {
      setError(false);
      setVideoLink(response.url);
      setVideoImg(response.thumbnail_url)
      setDisplay(true);
    } else {
      setError(true);
      setVideoLink("");
      setVideoImg("");
      setDisplay(false);
    }
  }

  const noEmbedApi = async (link:string):Promise<noEmbedResponse> => {
    return fetch("https://noembed.com/embed?url=" + link)
    .then(response => response.json())
    .catch((error) => {
      setError(true);
      console.log(error);
    })
  }

  const checkValidity = (res:noEmbedResponse):boolean  => {
    if (res.error) return false;
    if (res.provider_name !== "YouTube" || res.type !== "video" || res.provider_url !== "https://www.youtube.com/") return false;
    return true;
  }

  return (
    <>
      <div className='center'>
        <div>
          <input type="text" onChange={(e) => setState(e, setVideoLink)}/>
          <button type="submit" onClick={() => displayVideoThumbnail(videoLink)}>Submit</button>
        </div>
        {error && <p>Link is not valid</p>}
        {display && <a href={videoLink} target='_blank'><img src={videoImg} alt="video_thumbnail" /></a>}
      </div>
    </>
  )
}

export default App
