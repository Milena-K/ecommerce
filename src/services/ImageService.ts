export type Image = {
  id: number,
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface ImageSource {
  getImages: (page: number) => Promise<Image[]>
  filterValidImages: (images: Image[]) => Promise<string[]>
}


export class LoremPicsum implements ImageSource{
  async getImages(page: number): Promise<Image[]> {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=3`
    const res = await fetch(url).then(res => res.json())
    return res
  }

  async filterValidImages(images: Image[]): Promise<string[]> {
    const validImgs: string[] = []
    for (const image of images) {
      try{
        const imgRes = await fetch(image.download_url)
        if(imgRes.status === 200) {
          validImgs.push(imgRes.url)
        }
      } catch (err) {
        console.log(err)
      }
    }
    return validImgs
  }
}

export default class ImageService {
  private imageSource: ImageSource

  constructor(imageSource: ImageSource) {
    this.imageSource = imageSource
  }

  async fetchImages(page: number): Promise<string[]> {
    const images = await this.imageSource.getImages(page)
    return await this.imageSource.filterValidImages(images)
  }

  setImageSource(imageSource: ImageSource) {
    this.imageSource = imageSource
  }
}



// const getImg = async () => {
//     // return await fetch("", {mode: "no-cors"}).then(res => res.json())
// };

// export const ImageService = {
//     getImg
// };
