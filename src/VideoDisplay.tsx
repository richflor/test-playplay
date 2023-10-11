import { noEmbedResponse } from "./Model";

export interface IAppProps {
    video:noEmbedResponse;
    deleteVideo: (video:noEmbedResponse) => boolean;
}

export function VideoDisplay ({ video, deleteVideo }: IAppProps) {
  return (
    <div className="thumbnail_container">
      <a href={video.url} target='_blank'><img className="thumbnail" src={video.thumbnail_url} alt="video_thumbnail" /></a>
      <button className="delete" onClick={()=> { deleteVideo(video)}}>Delete</button>
    </div>
  );
}
