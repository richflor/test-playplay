export interface noEmbedResponse {
    thumbnail_height: number,
    version: string,
    url: string,
    thumbnail_width: number,
    width: number,
    provider_name: string,
    type: string,
    height: number,
    provider_url: string,
    html: string,
    author_url: string,
    thumbnail_url: string,
    author_name: string,
    title: string,
    error?: string,
}

export interface Video extends noEmbedResponse {
    id:number
}