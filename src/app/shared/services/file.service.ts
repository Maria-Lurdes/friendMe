import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  pushFileToStorage(id, fileUpload) {
    let fireStorage = getStorage();
    let url = ref(fireStorage, id);

    const metadata = {
      contentType: 'image/jpeg',
    };
    uploadBytes(url, fileUpload, metadata).then((data) => {
      console.log(data, 'image datat')
    })
  }
}
